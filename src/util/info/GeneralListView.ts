/*
* 英雄界面
*/
class GeneralListView extends ui.info.GeneralListUI {
    constructor() {
        super();
        this.initList();
        this.down_view.general_btn.scale(1.1, 1.08);
        this.down_view.general_btn.mouseEnabled = false;
        notifyManager.on(NotifyType.ChangeSkill, this, this.initList);
    }
    /**
     * 初始化ListUI
     */
    private initList() {
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
    }

}
