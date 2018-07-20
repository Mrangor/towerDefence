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
var ShopListView = /** @class */ (function (_super) {
    __extends(ShopListView, _super);
    function ShopListView() {
        var _this = _super.call(this) || this;
        _this.initList();
        _this.down_view.shop_btn.scale(1.1, 1.08);
        _this.down_view.shop_btn.mouseEnabled = false;
        _this.shop_money3_btn.on(Laya.Event.CLICK, _this, _this.shopMoney3);
        _this.shop_money2_btn.on(Laya.Event.CLICK, _this, _this.shopMoney2);
        return _this;
    }
    /**
     * 初始化ListUI
     */
    ShopListView.prototype.initList = function () {
        var rankDatas = this.getRankDatas();
        this.list.vScrollBarSkin = '';
        this.list.repeatY = rankDatas.length;
        this.list.array = rankDatas;
        this.list.renderHandler = new Laya.Handler(this, this.onListRender);
    };
    ;
    /**
    * 选择列表渲染
    */
    ShopListView.prototype.onListRender = function (cell, index) {
        if (index > this.list.array.length) {
            return;
        }
        var data = this.list.array[index];
        var icon = cell.getChildByName("icon");
        var money1 = icon.getChildByName("money1");
        var shop_money_btn = cell.getChildByName("shop_money_btn");
        var money = shop_money_btn.getChildByName("money");
        money.text = data.money.toString() + "元";
        money1.text = data.money_game.toString();
        cell.on(Laya.Event.CLICK, cell, this.shopMoney1, [data.id]);
    };
    ;
    /**
     *获取选择列表数据
     */
    ShopListView.prototype.getRankDatas = function () {
        var rankDatas = new Array();
        for (var k in tb_bill.tb_bill_define) {
            var s = tb_bill.tb_bill_define[k];
            rankDatas.push(s);
        }
        return rankDatas;
    };
    ;
    /**
     * 购买金币
     */
    ShopListView.prototype.shopMoney3 = function () {
        var money1 = 10;
        var money3 = 200;
        if (player.money1 >= money1) {
            player.addmoney1(-money1);
            player.addmoney3(money3);
            new TipsMsg("购买成功");
        }
        else {
            new TipsMsg("紫钻不足");
        }
        return;
    };
    ;
    /**
      * 购买召唤水晶
      */
    ShopListView.prototype.shopMoney2 = function () {
        var money2 = 10;
        var money3 = 300;
        if (player.money3 >= money3) {
            player.addmoney3(-money3);
            player.addmoney2(money2);
            new TipsMsg("购买成功");
        }
        else {
            new TipsMsg("黄金不足");
        }
        return;
    };
    ;
    /**
     * 购买钻石
     * @param billId
     */
    ShopListView.prototype.shopMoney1 = function (billId) {
        var tb = tb_bill.tb_bill_define[billId];
        player.addmoney1(tb.money_game);
        new TipsMsg("购买成功");
    };
    ;
    return ShopListView;
}(ui.info.ShopListUI));
//# sourceMappingURL=ShopListView.js.map