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
/**
* 通知管理类
*/
var core;
(function (core) {
    var NotifyManager = /** @class */ (function (_super) {
        __extends(NotifyManager, _super);
        function NotifyManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NotifyManager;
    }(Laya.EventDispatcher));
    core.NotifyManager = NotifyManager;
})(core || (core = {}));
var notifyManager = new core.NotifyManager();
//# sourceMappingURL=NotifyManager.js.map