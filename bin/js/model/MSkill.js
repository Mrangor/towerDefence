/*
*技能
*/
var MSkill = /** @class */ (function () {
    function MSkill(skillId, level) {
        if (level === void 0) { level = 0; }
        this.level = 0; //等级
        //下一次释放时间
        this.cdtime = 0;
        this.skillId = skillId;
        if (level == 0 && this.needmoney1 == 0 && this.needmaplevel == 0) {
            this.level = 1;
        }
        else {
            this.level = level;
        }
    }
    /**
     * 保存数据
     */
    MSkill.prototype.encode = function () {
        Laya.LocalStorage.setItem("skill" + this
            .skillId, JSON.stringify(this));
    };
    /**
     * 释放技能CD
     */
    MSkill.prototype.startCD = function () {
        this.cdtime = this.maxCDTime;
        var cdtime = Math.ceil(this.cdtime / 1000);
        notifyManager.event(NotifyType.CDSkill, [this.skillId, cdtime]);
    };
    /**
     * 刷新冷却时间
     */
    MSkill.prototype.flushCDTime = function () {
        if (this.cdtime == 0) {
            return;
        }
        var cdtime = Math.ceil(this.cdtime / 1000);
        this.cdtime -= Define.UpdateTime;
        if (this.cdtime < 0) {
            this.cdtime = 0;
        }
        var ncdtime = Math.ceil(this.cdtime / 1000);
        if (cdtime != ncdtime) {
            //刷新技能
            notifyManager.event(NotifyType.CDSkill, [this.skillId, ncdtime]);
        }
    };
    /**
     * 充值冷却时间
     */
    MSkill.prototype.resetCDTime = function () {
        this.cdtime = 0;
        //刷新技能
        notifyManager.event(NotifyType.CDSkill, [this.skillId, 0]);
    };
    /**
     *是否可以升级
     */
    MSkill.prototype.isUplevel = function () {
        return this.level == 0 || this.level >= this.maxlevel;
    };
    /**
     * 技能升级
     */
    MSkill.prototype.uplevel = function () {
        if (this.isUplevel()) {
            return false;
        }
        this.level++;
        this.encode();
        if (this.type == SkillType.AddHarm) {
            player.addHarmRate(true); //重新计算加成伤害
        }
        return true;
    };
    /**
   * 满级
   */
    MSkill.prototype.isMaxLevel = function () {
        return this.level >= this.maxlevel;
    };
    /**
     * true已解锁
     */
    MSkill.prototype.isUnLock = function () {
        return this.level > 0;
    };
    /**
     * 解锁技能
     */
    MSkill.prototype.unlock = function () {
        if (this.level != 0) {
            return false;
        }
        this.level++;
        this.encode();
        return true;
    };
    /**
   * 解锁技能(通关解锁)
   */
    MSkill.prototype.unlockByMapLevel = function (mapLevel) {
        if (this.level != 0 || this.needmaplevel != mapLevel) {
            return;
        }
        this.level = 1;
        this.encode();
    };
    Object.defineProperty(MSkill.prototype, "maxlevel", {
        /**
        *最大等级
        */
        get: function () {
            return tb_game.skill[this.skillId].max_level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "needmoney1", {
        /**
        * 解锁条件(money1)
        */
        get: function () {
            return tb_game.skill[this.skillId].need_money1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "needmaplevel", {
        /**
        * 解锁条件(关卡)
        */
        get: function () {
            return tb_game.skill[this.skillId].need_map_level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "name", {
        /**
          * 名称
          */
        get: function () {
            return tb_game.skill[this.skillId].name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "desc", {
        /**
        * 名称
        */
        get: function () {
            return tb_game.skill[this.skillId].desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "uplevelmoney1", {
        /**
        * 升级需要花费money1
        */
        get: function () {
            return tb_game.skill[this.skillId].uplevel_money1 * (this.level);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "uplevelmoney3", {
        /**
         * 升级需要花费money3
         */
        get: function () {
            return tb_game.skill[this.skillId].uplevel_money3 * (this.level);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "type", {
        /**
         * 技能类型
         */
        get: function () {
            return tb_game.skill[this.skillId].type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "base", {
        /**
         * 时间
         */
        get: function () {
            return tb_game.skill[this.skillId].base;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "addValue", {
        /**
          * 技能加成属性值
          */
        get: function () {
            return tb_game.skill[this.skillId].base + (this.level - 1) * tb_game.skill[this.skillId].add_base;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "useMoney1", {
        /**
          * 技能加成属性值
          */
        get: function () {
            return tb_game.skill[this.skillId].use_money1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MSkill.prototype, "maxCDTime", {
        /**
         *冷却时间
         */
        get: function () {
            var cdTime = tb_game.skill[this.skillId].cd_time;
            if (this.type == SkillType.Skill_Frozen) {
                cdTime += this.addValue;
            }
            return cdTime * 1000;
        },
        enumerable: true,
        configurable: true
    });
    return MSkill;
}());
//# sourceMappingURL=MSkill.js.map