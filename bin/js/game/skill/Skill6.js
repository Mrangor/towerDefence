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
*雷电技能
*/
var Skill6 = /** @class */ (function (_super) {
    __extends(Skill6, _super);
    function Skill6(harm, x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.time = 0; //下落时间
        _this.state = 1; //1下落状态 2消失状态
        _this.harm = harm;
        _this.sphere = new Laya.Animation;
        _this.sphere.loadAnimation("ani/skill/" + 6 + ".ani", Laya.Handler.create(_this, _this.onLoaded), "res/atlas/skill/" + 6 + ".atlas");
        return _this;
    }
    Skill6.prototype.onLoaded = function () {
        this.sphere.x = this.x;
        this.sphere.y = 0;
        var num = this.y / 81;
        this.sphere.scaleY = num;
        game.skills.push(this);
        game.mapView.game_ui.addChild(this.sphere);
        this.sphere.play(0, true, "1");
    };
    /**
     * 更新技能动画
     */
    Skill6.prototype.updata = function () {
        var _this = this;
        this.time += Define.UpdateTime;
        if (this.state == 1) {
            if (this.time > Skill6.ZTime) {
                this.time = Skill6.ZTime;
            }
            if (this.time == Skill6.ZTime) {
                //计算伤害
                var enemys = game.findEnemys(100, this.x, this.y);
                enemys.forEach(function (val, idx, array) {
                    val.harmHp(_this.harm);
                });
                this.state = 2;
                this.time = 0;
                this.sphere.y = this.y;
                this.sphere.scaleY = 1;
                this.sphere.play(0, false, "2");
            }
        }
        else if (this.state == 2) {
            if (this.time > Skill6.RTime) {
                this.time = Skill6.RTime;
            }
            if (this.time == Skill6.RTime) {
                this.remove();
            }
        }
    };
    Skill6.prototype.remove = function () {
        this.sphere.removeSelf();
        var index = game.skills.indexOf(this);
        game.skills.splice(index, 1);
    };
    Skill6.RTime = 1000; //消失时间
    Skill6.ZTime = 500; //下落时间
    return Skill6;
}(Skill));
//# sourceMappingURL=Skill6.js.map