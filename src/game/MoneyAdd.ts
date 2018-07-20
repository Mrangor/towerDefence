/*
* 怪物
*/
class MoneyAdd extends Laya.Sprite {
    public type: number;//金钱类型
    public money: number;//金钱类型
    public constructor(type: number, money: number, x: number, y: number) {
        super();
        this.type = type;
        this.money = money;
        this.x = x;
        this.y = y;
        game.mapView.addChild(this);
        if (type == 1) {
            this.loadImage("map/m11.png");
            //动作
            Laya.Tween.to(this, { x: 20, y: 90 }, 2000, null, laya.utils.Handler.create(this, this.addMoney));
        } else if (type == 2) {
            this.loadImage("map/m21.png");
            Laya.Tween.to(this, { x: 20, y: 150 }, 2000, null, laya.utils.Handler.create(this, this.addMoney));
        }
    }
    private addMoney() {
        this.removeSelf();
        this.destroy();
        if (this.type == 1) {
            player.addmoney1(this.money);
        } else if (this.type == 2) {
            player.addmoney2(this.money);
        }
    }
}