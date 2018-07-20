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
* 冰冻技能效果
*/
var Skill5 = /** @class */ (function (_super) {
    __extends(Skill5, _super);
    function Skill5(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.time = 4000; //开始时间
        _this.state = 1; //1冰冻2破碎
        _this.sphere = new Laya.Animation;
        _this.sphere.loadAnimation("ani/skill/" + 5 + ".ani", Laya.Handler.create(_this, _this.onLoaded), "res/atlas/skill/" + 5 + ".atlas");
        return _this;
    }
    Skill5.prototype.onLoaded = function () {
        this.sphere.x = this.x;
        this.sphere.y = this.y;
        game.mapView.game_ui.addChild(this.sphere);
        game.skills.push(this);
        this.sphere.play(0, false, "1");
        //暂停效果
        this.enemys = game.findEnemys(50, this.x, this.y);
        this.enemys.forEach(function (val, idx, array) {
            val.stopMove();
        });
    };
    /**
     * 更新技能动画
     */
    Skill5.prototype.updata = function () {
        this.time -= Define.UpdateTime;
        if (this.time < 0) {
            this.time = 0;
        }
        if (this.state == 1) {
            if (this.time == 0) {
                this.sphere.play(0, false, "2");
                this.state = 2;
                this.time = 1000;
            }
        }
        else if (this.state == 2) {
            if (this.time == 0) {
                this.remove();
            }
        }
    };
    Skill5.prototype.remove = function () {
        //移除暂停效果
        this.enemys.forEach(function (val, idx, array) {
            val.stopOverMove();
        });
        this.sphere.removeSelf();
        var index = game.skills.indexOf(this);
        game.skills.splice(index, 1);
    };
    return Skill5;
}(Skill));
//# sourceMappingURL=Skill5.js.map