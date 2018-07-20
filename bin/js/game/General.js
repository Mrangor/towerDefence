var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 英雄
*/
var General = /** @class */ (function (_super) {
    __extends(General, _super);
    function General(generalId, gpos) {
        var _this = _super.call(this) || this;
        _this.dt = 0; //下一次出手时间
        _this.stad_dt = 0; //下一次出手时间
        _this.generalId = generalId;
        _this.gpos = gpos;
        _this.loadAnimation("ani/general/" + _this.tb.icon + ".ani", Laya.Handler.create(_this, _this.onLoaded, [], false), "res/atlas/general/" + _this.tb.icon + ".atlas");
        return _this;
    }
    General.prototype.onLoaded = function () {
        this.pos(0, -20);
        this.scaleX = -1;
        this.width = 30;
        this.height = 50;
        this.interval = 50;
        this.play(0, true, Define.General_Stand);
        //保存位置信息
        Laya.LocalStorage.setItem("pos_" + this.gpos, this.generalId.toString());
    };
    /**
     * 清理数据
     */
    General.prototype.remove = function () {
        this.removeSelf();
        this.destroy();
    };
    /**
    *计算下一处出手时间
    */
    General.prototype.hitEnemy = function (enemy) {
        this.enemy = enemy;
        if (enemy.x < this.posx) {
            this.scaleX = -1;
        }
        else {
            this.scaleX = 1;
        }
        this.play(0, false, Define.General_Hit);
        this.dt = this.tb.harmTime;
        this.stad_dt = 500; //1后切换到待机动作
        console.log("攻击时间" + Laya.Browser.now());
    };
    /**
    *攻击
    */
    General.prototype.isHit = function () {
        this.dt -= Define.UpdateTime;
        this.stad_dt -= Define.UpdateTime;
        if (this.dt <= 0) {
            this.dt = 0;
        }
        var hit = this.dt <= 0;
        if (this.stad_dt <= 0) {
            this.stad_dt = 0;
            this.play(0, true, Define.General_Stand);
        }
        return hit;
    };
    General.prototype.applayFilter1 = function () {
        //创建一个发光滤镜
        var glowFilter = new Laya.GlowFilter("#ffff00", 20, 0, 0);
        //设置滤镜集合为发光滤镜
        this.filters = [glowFilter];
    };
    General.prototype.applayFilter = function (num) {
        if (num === void 0) { num = 1; }
        //创建一个发光滤镜
        //设置滤镜集合为发光滤镜
        if (num == 1) {
            var glowFilte1 = new Laya.GlowFilter("#ffff00", 10, 0, 0);
            this.filters = [glowFilte1];
        }
        else if (num == 2) {
            var glowFilter2 = new Laya.GlowFilter("#ffff00", 20, 0, 0);
            this.filters = [glowFilter2];
        }
        else if (num == 3) {
            var glowFilter3 = new Laya.GlowFilter("#ffff00", 30, 0, 0);
            this.filters = [glowFilter3];
        }
        else {
            this.filters = [];
            return;
        }
        num++;
        Laya.timer.loop(100, this, this.applayFilter, [num]);
    };
    Object.defineProperty(General.prototype, "tb", {
        get: function () {
            return player.generals[this.generalId];
        },
        enumerable: true,
        configurable: true
    });
    return General;
}(Laya.Animation));
//# sourceMappingURL=General.js.map