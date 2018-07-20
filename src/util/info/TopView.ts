/*
*顶部
*/
class TopView extends ui.info.TopUI {
    constructor() {
        super();
        this.cmoney1();
        this.cmoney2();
        this.cmoney3();
        notifyManager.on(NotifyType.Money1Change, this, this.cmoney1);
        notifyManager.on(NotifyType.Money2Change, this, this.cmoney2);
        notifyManager.on(NotifyType.Money3Change, this, this.cmoney3);
    }
    private cmoney1() {
        this.money1.text = player.money1.toString();
    };
    private cmoney2() {
        this.money2.text = player.money2.toString();
    };
    private cmoney3() {
        this.money3.text = player.money3.toString();
    };
}
