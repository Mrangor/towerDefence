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
* 火球技能效果
*/
var Skill4 = /** @class */ (function (_super) {
    __extends(Skill4, _super);
    function Skill4(harm, x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.time = 0; //下落时间
        _this.state = 1; //1下落状态 2消失状态
        _this.harm = harm;
        _this.sphere = new Laya.Animation;
        _this.sphere.loadAnimation("ani/skill/" + 4 + ".ani", Laya.Handler.create(_this, _this.onLoaded), "res/atlas/skill/" + 4 + ".atlas");
        return _this;
    }
    Skill4.prototype.onLoaded = function () {
        this.sphere.x = this.x;
        this.sphere.y = -100;
        this.speed = (this.y + 100) * Define.UpdateTime / Skill4.ZTime;
        //影子
        this.shadow = new Laya.Sprite();
        this.shadow.graphics.drawCircle(0, 0, 1, "#000000");
        this.shadow.x = this.x;
        this.shadow.y = this.y;
        this.shadow.visible = true;
        game.skills.push(this);
        game.mapView.bg.addChild(this.shadow);
        game.mapView.game_ui.addChild(this.sphere);
        this.sphere.play(0, true, "fly");
    };
    /**
     * 更新技能动画
     */
    Skill4.prototype.updata = function () {
        var _this = this;
        this.time += Define.UpdateTime;
        if (this.state == 1) { //下落
            if (this.time > Skill4.ZTime) {
                this.time = Skill4.ZTime;
            }
            //位置移动
            this.sphere.y += this.speed;
            //改变影子大小
            this.shadow.scaleX = this.time * 30 / Skill4.ZTime;
            this.shadow.scaleY = this.time * 30 / Skill4.ZTime;
            if (this.time == Skill4.ZTime) {
                this.shadow.visible = false;
                this.sphere.play(0, false, "boom");
                this.state = 2;
                this.time = 0;
                //计算伤害
                var enemys = game.findEnemys(100, this.x, this.y);
                enemys.forEach(function (val, idx, array) {
                    val.harmHp(_this.harm);
                });
            }
        }
        else if (this.state == 2) {
            if (this.time > Skill4.RTime) {
                this.time = Skill4.RTime;
            }
            if (this.time == Skill4.RTime) {
                this.remove();
            }
        }
    };
    Skill4.prototype.remove = function () {
        this.sphere.removeSelf();
        this.shadow.removeSelf();
        var index = game.skills.indexOf(this);
        game.skills.splice(index, 1);
    };
    Skill4.RTime = 1000; //消失时间
    Skill4.ZTime = 2000; //下落时间
    return Skill4;
}(Skill));
//# sourceMappingURL=Skill4.js.map