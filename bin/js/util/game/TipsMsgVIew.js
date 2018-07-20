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
* tips消息
*/
var TipsMsg = /** @class */ (function (_super) {
    __extends(TipsMsg, _super);
    function TipsMsg(msg, color) {
        if (color === void 0) { color = "#FFD700"; }
        var _this = _super.call(this) || this;
        _this.msg_lab.text = msg;
        _this.msg_lab.color = color;
        _this.x = Laya.stage.width / 2;
        _this.y = Laya.stage.height / 2 - 100;
        Laya.stage.addChild(_this);
        Laya.Tween.to(_this, { y: 100 }, 2000, null, laya.utils.Handler.create(_this, _this.removeSelf));
        return _this;
    }
    return TipsMsg;
}(ui.game.TipsMsgUI));
//# sourceMappingURL=TipsMsgVIew.js.map