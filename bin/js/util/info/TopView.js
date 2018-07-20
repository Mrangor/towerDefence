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
*顶部
*/
var TopView = /** @class */ (function (_super) {
    __extends(TopView, _super);
    function TopView() {
        var _this = _super.call(this) || this;
        _this.cmoney1();
        _this.cmoney2();
        _this.cmoney3();
        notifyManager.on(NotifyType.Money1Change, _this, _this.cmoney1);
        notifyManager.on(NotifyType.Money2Change, _this, _this.cmoney2);
        notifyManager.on(NotifyType.Money3Change, _this, _this.cmoney3);
        return _this;
    }
    TopView.prototype.cmoney1 = function () {
        this.money1.text = player.money1.toString();
    };
    ;
    TopView.prototype.cmoney2 = function () {
        this.money2.text = player.money2.toString();
    };
    ;
    TopView.prototype.cmoney3 = function () {
        this.money3.text = player.money3.toString();
    };
    ;
    return TopView;
}(ui.info.TopUI));
//# sourceMappingURL=TopView.js.map