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
* 怪物
*/
var MoneyAdd = /** @class */ (function (_super) {
    __extends(MoneyAdd, _super);
    function MoneyAdd(type, money, x, y) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.money = money;
        _this.x = x;
        _this.y = y;
        game.mapView.addChild(_this);
        if (type == 1) {
            _this.loadImage("map/m11.png");
            //动作
            Laya.Tween.to(_this, { x: 20, y: 90 }, 2000, null, laya.utils.Handler.create(_this, _this.addMoney));
        }
        else if (type == 2) {
            _this.loadImage("map/m21.png");
            Laya.Tween.to(_this, { x: 20, y: 150 }, 2000, null, laya.utils.Handler.create(_this, _this.addMoney));
        }
        return _this;
    }
    MoneyAdd.prototype.addMoney = function () {
        this.removeSelf();
        this.destroy();
        if (this.type == 1) {
            player.addmoney1(this.money);
        }
        else if (this.type == 2) {
            player.addmoney2(this.money);
        }
    };
    return MoneyAdd;
}(Laya.Sprite));
//# sourceMappingURL=MoneyAdd.js.map