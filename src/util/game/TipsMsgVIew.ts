/*
* tips消息
*/
class TipsMsg extends ui.game.TipsMsgUI {
    constructor(msg: string, color: string = "#FFD700") {
        super();
        this.msg_lab.text = msg;
        this.msg_lab.color = color;
        this.x = Laya.stage.width / 2;
        this.y = Laya.stage.height / 2 - 100;
        Laya.stage.addChild(this);
        Laya.Tween.to(this, { y: 100 }, 2000, null, laya.utils.Handler.create(this, this.removeSelf));
    }
}