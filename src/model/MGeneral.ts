
/*
*英雄数据
*/
class MGeneral {
    public generalId: number;//类型
    public level: number;//等级
    public num: number;//星级
    constructor(generalId: number, level: number = 1, num = 1) {
        this.generalId = generalId;
        this.level = level;
        this.num = num;
    }

    /**  
    * 升级需要的钱
    */
    public upLevelMoney3(): number {
        return tb_game.general[this.generalId].up_money3 * this.level;
    }
    /**
     * 保存数据
     */
    public encode() {
        Laya.LocalStorage.setItem("general" + this
            .generalId, JSON.stringify(this));
    }
    /**
     *升级
     */
    public uplevel(): boolean {
        if (this.isMaxLevel()) {
            return false;
        }
        this.level++;
        return true;
    }
    /**
     *修改星级
     */
    public changeNum() {
        if (this.num >= 6) {
            if (this.colour == 1) {
                player.addmoney3(100);
            } else if (this.colour == 2) {
                player.addmoney3(200);
            } else if (this.colour == 3) {
                player.addmoney3(300);
            } else if (this.colour == 4) {
                player.addmoney3(1000);
            }
            return;
        } else {
            this.num++;
            this.encode();
        }
    }
    /**
     * 获取星级
     */
    public get star() {
        if (this.num < 3) {
            return 1;
        }
        if (this.num < 6) {
            return 2;
        }
        return 3;
    }
    /**
     * 总伤害
     */
    public get zharm(): number {
        let harm = this.harm * (100 + player.addHarmRate()) / 100;
        return harm;
    }
    /**
    *伤害
    */
    public get harm(): number {
        let g = tb_game.general[this.generalId];
        return g.harm + (this.level - 1) * g.harm_up;
    }
    /**
     * 子弹类型
     */
    public get bulletType(): number {
        return tb_game.general[this.generalId].bullet_type;
    }
    /**
     * 攻击类型
     */
    public get harmType(): number {
        return tb_game.general[this.generalId].harm_type;
    }
    /**
     * 攻击速度
     */
    public get harmTime(): number {
        return tb_game.general[this.generalId].harm_time;
    }
    /**
       * 图片
       */
    public get icon(): number {
        return tb_game.general[this.generalId].icon;
    }
    /**
     * 图片数量
     */
    public get iconnum(): number {
        return tb_game.general[this.generalId].icon_num;
    }

    /**攻击距离*/
    public get distance(): number {
        return tb_game.general[this.generalId].distance;
    }
    /**
     * 攻击范围
     */
    public get range(): number {
        return tb_game.general[this.generalId].range;
    }
    /**
     *名字
     */
    public get name(): string {
        return tb_game.general[this.generalId].name;
    }
    /**  
     * 颜色
     */
    public get colour(): number {
        return tb_game.general[this.generalId].colour;
    }
    /**  
    * 颜色
    */
    public get desc(): string {
        return tb_game.general[this.generalId].desc;
    }
    /**  
     * 最大等级
     */
    public get maxlevel(): number {
        return tb_game.general[this.generalId].max_level;
    }
    /**  
     * 一级需要的钱
     */
    public get upMoney3(): number {
        return tb_game.general[this.generalId].up_money3;
    }
    /**  
    * 是否满级
    */
    public isMaxLevel(): boolean {
        return this.level >= this.maxlevel;
    }
}