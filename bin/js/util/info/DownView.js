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
* 英雄选择界面
*/
var DownView = /** @class */ (function (_super) {
    __extends(DownView, _super);
    function DownView(gpos) {
        var _this = _super.call(this) || this;
        _this.skill_btn.on(Laya.Event.CLICK, _this, _this.skillListBtn);
        _this.general_btn.on(Laya.Event.CLICK, _this, _this.generalListBtn);
        _this.shop_btn.on(Laya.Event.CLICK, _this, _this.shopListbtn);
        _this.close_btn.on(Laya.Event.CLICK, _this, _this.closeBtn);
        return _this;
    }
    DownView.prototype.generalListBtn = function () {
        this.parent.removeSelf();
        Laya.stage.addChild(new GeneralListView());
    };
    ;
    DownView.prototype.skillListBtn = function () {
        this.parent.removeSelf();
        Laya.stage.addChild(new SkillListView());
    };
    ;
    DownView.prototype.shopListbtn = function () {
        this.parent.removeSelf();
        Laya.stage.addChild(new ShopListView());
    };
    ;
    /**
     * 关闭列表
     */
    DownView.prototype.closeBtn = function () {
        this.parent.removeSelf();
        game.stopover();
    };
    ;
    return DownView;
}(ui.info.DownUI));
//# sourceMappingURL=DownView.js.map