
/*
*技能
*/
class MSkill {
    public skillId: number;//类型
    public level: number = 0;//等级
    //下一次释放时间
    public cdtime: number = 0;
    constructor(skillId: number, level: number = 0) {
        this.skillId = skillId;
        if (level == 0 && this.needmoney1 == 0 && this.needmaplevel == 0) {
            this.level = 1;
        } else {
            this.level = level;
        }
    }
    /**
     * 保存数据
     */
    public encode() {
        Laya.LocalStorage.setItem("skill" + this
            .skillId, JSON.stringify(this));
    }
    /**
     * 释放技能CD
     */
    public startCD() {
        this.cdtime = this.maxCDTime;
        let cdtime = Math.ceil(this.cdtime / 1000);
        notifyManager.event(NotifyType.CDSkill, [this.skillId, cdtime]);
    }
    /**
     * 刷新冷却时间
     */
    public flushCDTime(): void {
        if (this.cdtime == 0) {
            return;
        }
        let cdtime = Math.ceil(this.cdtime / 1000);
        this.cdtime -= Define.UpdateTime;
        if (this.cdtime < 0) {
            this.cdtime = 0;
        }
        let ncdtime = Math.ceil(this.cdtime / 1000);
        if (cdtime != ncdtime) {
            //刷新技能
            notifyManager.event(NotifyType.CDSkill, [this.skillId, ncdtime]);
        }
    }
    /**
     * 充值冷却时间
     */
    public resetCDTime(): void {
        this.cdtime = 0;
        //刷新技能
        notifyManager.event(NotifyType.CDSkill, [this.skillId, 0]);
    }
    /**
     *是否可以升级
     */
    public isUplevel() {
        return this.level == 0 || this.level >= this.maxlevel;
    }
    /**
     * 技能升级
     */
    public uplevel() {
        if (this.isUplevel()) {
            return false;
        }
        this.level++;
        this.encode();
        if (this.type == SkillType.AddHarm) {
            player.addHarmRate(true);//重新计算加成伤害
        }
        return true;

    }
    /**
   * 满级
   */
    public isMaxLevel() {
        return this.level >= this.maxlevel
    }
    /**
     * true已解锁
     */
    public isUnLock(): boolean {
        return this.level > 0;
    }
    /**
     * 解锁技能
     */
    public unlock() {
        if (this.level != 0) {
            return false;
        }
        this.level++;
        this.encode();
        return true;

    }
    /**
   * 解锁技能(通关解锁)
   */
    public unlockByMapLevel(mapLevel: number) {
        if (this.level != 0 || this.needmaplevel != mapLevel) {
            return;
        }
        this.level = 1;
        this.encode();
    }
    /**
    *最大等级
    */
    public get maxlevel(): number {
        return tb_game.skill[this.skillId].max_level;
    }
    /**
    * 解锁条件(money1)
    */
    public get needmoney1(): number {
        return tb_game.skill[this.skillId].need_money1;
    }
    /**
    * 解锁条件(关卡)
    */
    public get needmaplevel(): number {
        return tb_game.skill[this.skillId].need_map_level;
    }
    /**
      * 名称
      */
    public get name(): string {
        return tb_game.skill[this.skillId].name;
    }
    /**
    * 名称
    */
    public get desc(): string {
        return tb_game.skill[this.skillId].desc;
    }
    /**
    * 升级需要花费money1
    */
    public get uplevelmoney1(): number {
        return tb_game.skill[this.skillId].uplevel_money1 * (this.level);
    }
    /**
     * 升级需要花费money3
     */
    public get uplevelmoney3(): number {
        return tb_game.skill[this.skillId].uplevel_money3 * (this.level);
    }
    /**
     * 技能类型
     */
    public get type(): number {
        return tb_game.skill[this.skillId].type;
    }
    /**
     * 时间
     */
    public get base(): number {
        return tb_game.skill[this.skillId].base;
    }
    /**
      * 技能加成属性值
      */
    public get addValue(): number {
        return tb_game.skill[this.skillId].base + (this.level - 1) * tb_game.skill[this.skillId].add_base;
    }
    /**
      * 技能加成属性值
      */
    public get useMoney1(): number {
        return tb_game.skill[this.skillId].use_money1;
    }
    /**
     *冷却时间
     */
    public get maxCDTime(): number {
        let cdTime = tb_game.skill[this.skillId].cd_time;
        if (this.type == SkillType.Skill_Frozen) {
            cdTime += this.addValue;
        }
        return cdTime * 1000;
    }
}