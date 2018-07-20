/*
*英雄数据
*/
var MGeneral = /** @class */ (function () {
    function MGeneral(generalId, level, num) {
        if (level === void 0) { level = 1; }
        if (num === void 0) { num = 1; }
        this.generalId = generalId;
        this.level = level;
        this.num = num;
    }
    /**
    * 升级需要的钱
    */
    MGeneral.prototype.upLevelMoney3 = function () {
        return tb_game.general[this.generalId].up_money3 * this.level;
    };
    /**
     * 保存数据
     */
    MGeneral.prototype.encode = function () {
        Laya.LocalStorage.setItem("general" + this
            .generalId, JSON.stringify(this));
    };
    /**
     *升级
     */
    MGeneral.prototype.uplevel = function () {
        if (this.isMaxLevel()) {
            return false;
        }
        this.level++;
        return true;
    };
    /**
     *修改星级
     */
    MGeneral.prototype.changeNum = function () {
        if (this.num >= 6) {
            if (this.colour == 1) {
                player.addmoney3(100);
            }
            else if (this.colour == 2) {
                player.addmoney3(200);
            }
            else if (this.colour == 3) {
                player.addmoney3(300);
            }
            else if (this.colour == 4) {
                player.addmoney3(1000);
            }
            return;
        }
        else {
            this.num++;
            this.encode();
        }
    };
    Object.defineProperty(MGeneral.prototype, "star", {
        /**
         * 获取星级
         */
        get: function () {
            if (this.num < 3) {
                return 1;
            }
            if (this.num < 6) {
                return 2;
            }
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "zharm", {
        /**
         * 总伤害
         */
        get: function () {
            var harm = this.harm * (100 + player.addHarmRate()) / 100;
            return harm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "harm", {
        /**
        *伤害
        */
        get: function () {
            var g = tb_game.general[this.generalId];
            return g.harm + (this.level - 1) * g.harm_up;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "bulletType", {
        /**
         * 子弹类型
         */
        get: function () {
            return tb_game.general[this.generalId].bullet_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "harmType", {
        /**
         * 攻击类型
         */
        get: function () {
            return tb_game.general[this.generalId].harm_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "harmTime", {
        /**
         * 攻击速度
         */
        get: function () {
            return tb_game.general[this.generalId].harm_time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "icon", {
        /**
           * 图片
           */
        get: function () {
            return tb_game.general[this.generalId].icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "iconnum", {
        /**
         * 图片数量
         */
        get: function () {
            return tb_game.general[this.generalId].icon_num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "distance", {
        /**攻击距离*/
        get: function () {
            return tb_game.general[this.generalId].distance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "range", {
        /**
         * 攻击范围
         */
        get: function () {
            return tb_game.general[this.generalId].range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "name", {
        /**
         *名字
         */
        get: function () {
            return tb_game.general[this.generalId].name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "colour", {
        /**
         * 颜色
         */
        get: function () {
            return tb_game.general[this.generalId].colour;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "desc", {
        /**
        * 颜色
        */
        get: function () {
            return tb_game.general[this.generalId].desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "maxlevel", {
        /**
         * 最大等级
         */
        get: function () {
            return tb_game.general[this.generalId].max_level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MGeneral.prototype, "upMoney3", {
        /**
         * 一级需要的钱
         */
        get: function () {
            return tb_game.general[this.generalId].up_money3;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 是否满级
    */
    MGeneral.prototype.isMaxLevel = function () {
        return this.level >= this.maxlevel;
    };
    return MGeneral;
}());
//# sourceMappingURL=MGeneral.js.map