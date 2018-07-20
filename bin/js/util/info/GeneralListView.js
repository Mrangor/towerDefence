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
* 英雄界面
*/
var GeneralListView = /** @class */ (function (_super) {
    __extends(GeneralListView, _super);
    function GeneralListView() {
        var _this = _super.call(this) || this;
        _this.initList();
        _this.down_view.general_btn.scale(1.1, 1.08);
        _this.down_view.general_btn.mouseEnabled = false;
        notifyManager.on(NotifyType.ChangeSkill, _this, _this.initList);
        return _this;
    }
    /**
     * 初始化ListUI
     */
    GeneralListView.prototype.initList = function () {
        var data1 = new GeneralListColorView(1);
        var data2 = new GeneralListColorView(2);
        data2.y = data1.y + data1.height;
        var data3 = new GeneralListColorView(3);
        data3.y = data2.y + data2.height;
        var data4 = new GeneralListColorView(4);
        data4.y = data3.y + data3.height;
        this.general_panel.vScrollBarSkin = '';
        this.general_panel.addChild(data1);
        this.general_panel.addChild(data2);
        this.general_panel.addChild(data3);
        this.general_panel.addChild(data4);
    };
    return GeneralListView;
}(ui.info.GeneralListUI));
//# sourceMappingURL=GeneralListView.js.map