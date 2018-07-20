/*
* 英雄界面
*/
class ShopListView extends ui.info.ShopListUI {
    constructor() {
        super();
        this.initList();
        this.down_view.shop_btn.scale(1.1, 1.08);
        this.down_view.shop_btn.mouseEnabled = false;
        this.shop_money3_btn.on(Laya.Event.CLICK, this, this.shopMoney3);
        this.shop_money2_btn.on(Laya.Event.CLICK, this, this.shopMoney2);
    }
    /**
     * 初始化ListUI
     */
    private initList() {
        var rankDatas = this.getRankDatas();
        this.list.vScrollBarSkin = '';
        this.list.repeatY = rankDatas.length;
        this.list.array = rankDatas;
        this.list.renderHandler = new Laya.Handler(this, this.onListRender);
    };
    /**
    * 选择列表渲染
    */
    private onListRender(cell, index) {
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
    /**
     *获取选择列表数据
     */
    private getRankDatas(): Array<tb_bill_define> {
        var rankDatas = new Array<tb_bill_define>();
        for (var k in tb_bill.tb_bill_define) {
            var s = tb_bill.tb_bill_define[k];
            rankDatas.push(s);
        }
        return rankDatas;
    };
    /**
     * 购买金币
     */
    private shopMoney3() {
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
    /**
      * 购买召唤水晶
      */
    private shopMoney2() {
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
    /**
     * 购买钻石
     * @param billId
     */
    private shopMoney1(billId: number) {
        var tb = tb_bill.tb_bill_define[billId];
        player.addmoney1(tb.money_game);
        new TipsMsg("购买成功");
    };

}
