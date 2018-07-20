/*
* 英雄选择界面
*/
class DownView extends ui.info.DownUI {
    private gpos: number;
    constructor(gpos: number) {
        super();
        this.skill_btn.on(Laya.Event.CLICK, this, this.skillListBtn);
        this.general_btn.on(Laya.Event.CLICK, this, this.generalListBtn);
        this.shop_btn.on(Laya.Event.CLICK, this, this.shopListbtn);
        this.close_btn.on(Laya.Event.CLICK, this, this.closeBtn);
    }

    private generalListBtn() {
        this.parent.removeSelf();
        Laya.stage.addChild(new GeneralListView());
    };
    private skillListBtn() {
        this.parent.removeSelf();
        Laya.stage.addChild(new SkillListView());
    };
    private shopListbtn() {
        this.parent.removeSelf();
        Laya.stage.addChild(new ShopListView());
    };
    /**
     * 关闭列表
     */
    private closeBtn() {
        this.parent.removeSelf();
        game.stopover();
    };
}
