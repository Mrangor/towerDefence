/*
* 英雄信息
*/
class GeneralInfoView extends ui.game.GeneralInfoUI {
    constructor(general: MGeneral) {
        super();
        this.gname.changeText(general.name);
        this.level.changeText((general.level).toString());
        this.desc.changeText(general.desc);
        this.icon.skin = "icon/general" + general.icon + "_0.png";
        this.on(Laya.Event.CLICK, this, this.removeSelf);
    }
}