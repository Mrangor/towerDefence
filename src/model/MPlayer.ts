/*
*玩家数据中心
*/
class MPlayer {
    public generals: { [key: number]: MGeneral } = {};//英雄集合
    public skills: { [key: number]: MSkill } = {};//技能集合
    public _money1: number = 0;//紫钻
    public _money2: number = 100;//绿钻
    public _money3: number = 0;//金币
    public _maxLvel: number = 0;//最大关卡

    //加成值
    public addmap: { [key: number]: number } = {};
    constructor() {
        this.decode();
    }
    public get money1(): number {
        return this._money1;
    }
    public get money2(): number {
        return this._money2;
    }
    public get money3(): number {
        return this._money3;
    }
    public addmoney1(money1: number) {
        this.money1 += money1;
    }
    public addmoney2(money2: number) {
        this.money2 += money2;
    }
    public addmoney3(money3: number) {
        this.money3 += money3;
    }
    public set money1(money1: number) {
        this._money1 = money1;
        notifyManager.event(NotifyType.Money1Change);
        Laya.LocalStorage.setItem("money1", money1.toString());
    }
    public set money2(money2: number) {
        this._money2 = money2;
        notifyManager.event(NotifyType.Money2Change);
        Laya.LocalStorage.setItem("money2", money2.toString());
    }
    public set money3(money3: number) {
        this._money3 = money3;
        notifyManager.event(NotifyType.Money3Change);
        Laya.LocalStorage.setItem("money3", money3.toString());
    }
    /**
     * 添加英雄
     * @param general 
     */
    public addGeneral(general: MGeneral) {
        let g = this.generals[general.generalId];
        if (g) {
            g.changeNum();
        } else {
            this.generals[general.generalId] = general;
            general.encode();
        }
    }
    /**
     * 改变最大关卡值
     * @param level 
     */
    public changeLevel(level: number) {
        if (this._maxLvel < level) {
            this._maxLvel = level;
            Laya.LocalStorage.setItem("maxLvel", this._maxLvel.toString());
            this.unlockByMapLevel();
        }
    }
    /**
     * 通关技能解锁
     */
    public unlockByMapLevel() {
        for (let k in this.skills) {
            let skill = this.skills[k];
            skill.unlockByMapLevel(this._maxLvel);
        }
    }


    /**
     * 获取伤害加成
     * @param flash 刷新伤害数值
     */
    public addHarmRate(flash: boolean = false): number {
        let addHarm: number = this.addmap[SkillType.AddHarm];
        if (!addHarm || flash) {
            addHarm = 0;
            for (let k in this.skills) {
                let skill = this.skills[k];
                if (skill.isUnLock() && SkillType.AddHarm == skill.type) {
                    addHarm += skill.addValue;
                }
            }
            this.addmap[SkillType.AddHarm] = addHarm;
        }
        return addHarm;
    }
    /**
     * ture 金币翻倍
     */
    public addSkillMoney3(): number {
        for (let k in this.skills) {
            let skill = this.skills[k];
            if (SkillType.AddMoney3 == skill.type) {
                if (skill.isUnLock()) {
                    return skill.addValue;
                }
                break;
            }
        }
        return 1;
    }
    /**
   * 绿宝石翻倍
   */
    public addSkillMoney2(): number {
        for (let k in this.skills) {
            let skill = this.skills[k];
            if (SkillType.AddMoney2 == skill.type) {
                if (skill.isUnLock()) {
                    return skill.addValue;
                }
                break;
            }
        }
        return 1;
    }
    /**
     *石头防御加成
     */
    public addDefense(): number {
        for (let k in this.skills) {
            let skill = this.skills[k];
            if (SkillType.AddDefense == skill.type) {
                if (skill.isUnLock()) {
                    return skill.addValue;
                }
                break;
            }
        }
        return 0;
    }
    public decode() {
        let money1 = Laya.LocalStorage.getItem("money1");
        if (money1) {
            this._money1 = Number(money1);
        }
        let money2 = Laya.LocalStorage.getItem("money2");
        if (money2) {
            this._money2 = Number(money2);
        } else {
            this._money2 = Define.Init_Money2;
        }
        let money3 = Laya.LocalStorage.getItem("money3");
        if (money3) {
            this._money3 = Number(money3);
        }
        let maxLvel = Laya.LocalStorage.getItem("maxLvel");
        if (maxLvel) {
            this._maxLvel = Number(maxLvel);
        }
        for (let k in tb_game.general) {
            let json = Laya.LocalStorage.getItem("general" + k);
            if (json) {
                let g = <MGeneral>JSON.parse(json);
                let mg = new MGeneral(g.generalId, g.level, g.num);
                this.generals[g.generalId] = mg;
            }
        }
        for (let k in tb_game.skill) {
            let json = Laya.LocalStorage.getItem("skill" + k);
            if (json) {
                let s = <MSkill>JSON.parse(json);
                let ms = new MSkill(s.skillId, s.level);
                this.skills[ms.skillId] = ms;
            } else {
                let ms = new MSkill(Number(k));
                this.skills[ms.skillId] = ms;
                ms.encode();
            }
        }
    }
}
let player: MPlayer;