/*
*玩家数据中心
*/
var MPlayer = /** @class */ (function () {
    function MPlayer() {
        this.generals = {}; //英雄集合
        this.skills = {}; //技能集合
        this._money1 = 0; //紫钻
        this._money2 = 100; //绿钻
        this._money3 = 0; //金币
        this._maxLvel = 0; //最大关卡
        //加成值
        this.addmap = {};
        this.decode();
    }
    Object.defineProperty(MPlayer.prototype, "money1", {
        get: function () {
            return this._money1;
        },
        set: function (money1) {
            this._money1 = money1;
            notifyManager.event(NotifyType.Money1Change);
            Laya.LocalStorage.setItem("money1", money1.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MPlayer.prototype, "money2", {
        get: function () {
            return this._money2;
        },
        set: function (money2) {
            this._money2 = money2;
            notifyManager.event(NotifyType.Money2Change);
            Laya.LocalStorage.setItem("money2", money2.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MPlayer.prototype, "money3", {
        get: function () {
            return this._money3;
        },
        set: function (money3) {
            this._money3 = money3;
            notifyManager.event(NotifyType.Money3Change);
            Laya.LocalStorage.setItem("money3", money3.toString());
        },
        enumerable: true,
        configurable: true
    });
    MPlayer.prototype.addmoney1 = function (money1) {
        this.money1 += money1;
    };
    MPlayer.prototype.addmoney2 = function (money2) {
        this.money2 += money2;
    };
    MPlayer.prototype.addmoney3 = function (money3) {
        this.money3 += money3;
    };
    /**
     * 添加英雄
     * @param general
     */
    MPlayer.prototype.addGeneral = function (general) {
        var g = this.generals[general.generalId];
        if (g) {
            g.changeNum();
        }
        else {
            this.generals[general.generalId] = general;
            general.encode();
        }
    };
    /**
     * 改变最大关卡值
     * @param level
     */
    MPlayer.prototype.changeLevel = function (level) {
        if (this._maxLvel < level) {
            this._maxLvel = level;
            Laya.LocalStorage.setItem("maxLvel", this._maxLvel.toString());
            this.unlockByMapLevel();
        }
    };
    /**
     * 通关技能解锁
     */
    MPlayer.prototype.unlockByMapLevel = function () {
        for (var k in this.skills) {
            var skill = this.skills[k];
            skill.unlockByMapLevel(this._maxLvel);
        }
    };
    /**
     * 获取伤害加成
     * @param flash 刷新伤害数值
     */
    MPlayer.prototype.addHarmRate = function (flash) {
        if (flash === void 0) { flash = false; }
        var addHarm = this.addmap[SkillType.AddHarm];
        if (!addHarm || flash) {
            addHarm = 0;
            for (var k in this.skills) {
                var skill = this.skills[k];
                if (skill.isUnLock() && SkillType.AddHarm == skill.type) {
                    addHarm += skill.addValue;
                }
            }
            this.addmap[SkillType.AddHarm] = addHarm;
        }
        return addHarm;
    };
    /**
     * ture 金币翻倍
     */
    MPlayer.prototype.addSkillMoney3 = function () {
        for (var k in this.skills) {
            var skill = this.skills[k];
            if (SkillType.AddMoney3 == skill.type) {
                if (skill.isUnLock()) {
                    return skill.addValue;
                }
                break;
            }
        }
        return 1;
    };
    /**
   * 绿宝石翻倍
   */
    MPlayer.prototype.addSkillMoney2 = function () {
        for (var k in this.skills) {
            var skill = this.skills[k];
            if (SkillType.AddMoney2 == skill.type) {
                if (skill.isUnLock()) {
                    return skill.addValue;
                }
                break;
            }
        }
        return 1;
    };
    /**
     *石头防御加成
     */
    MPlayer.prototype.addDefense = function () {
        for (var k in this.skills) {
            var skill = this.skills[k];
            if (SkillType.AddDefense == skill.type) {
                if (skill.isUnLock()) {
                    return skill.addValue;
                }
                break;
            }
        }
        return 0;
    };
    MPlayer.prototype.decode = function () {
        var money1 = Laya.LocalStorage.getItem("money1");
        if (money1) {
            this._money1 = Number(money1);
        }
        var money2 = Laya.LocalStorage.getItem("money2");
        if (money2) {
            this._money2 = Number(money2);
        }
        else {
            this._money2 = Define.Init_Money2;
        }
        var money3 = Laya.LocalStorage.getItem("money3");
        if (money3) {
            this._money3 = Number(money3);
        }
        var maxLvel = Laya.LocalStorage.getItem("maxLvel");
        if (maxLvel) {
            this._maxLvel = Number(maxLvel);
        }
        for (var k in tb_game.general) {
            var json = Laya.LocalStorage.getItem("general" + k);
            if (json) {
                var g = JSON.parse(json);
                var mg = new MGeneral(g.generalId, g.level, g.num);
                this.generals[g.generalId] = mg;
            }
        }
        for (var k in tb_game.skill) {
            var json = Laya.LocalStorage.getItem("skill" + k);
            if (json) {
                var s = JSON.parse(json);
                var ms = new MSkill(s.skillId, s.level);
                this.skills[ms.skillId] = ms;
            }
            else {
                var ms = new MSkill(Number(k));
                this.skills[ms.skillId] = ms;
                ms.encode();
            }
        }
    };
    return MPlayer;
}());
var player;
//# sourceMappingURL=MPlayer.js.map