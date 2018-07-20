/*
* 召唤界面
*/
class RecruitView extends ui.game.RecruitUI {
    constructor() {
        super();
        this.close_btn.on(Laya.Event.CLICK, this, this.closeBtn);
        this.btn1.on(Laya.Event.CLICK, this, this.recruit, [1]);
        this.btn2.on(Laya.Event.CLICK, this, this.recruit, [2]);
        this.btn3.on(Laya.Event.CLICK, this, this.recruit, [3]);
        notifyManager.on(NotifyType.Money1Change, this, this.money1Change);
        notifyManager.on(NotifyType.Money2Change, this, this.money2Change);
        this.money1Change();
        this.money2Change();
    }
    public recruit(num: number) {
        var r = tb_game.recruit[num];
        if (player.money2 < r.money2 || player.money1 < r.money1) {
            return;
        }
        //随机英雄1
        if (r.money1 > 0) {
            player.addmoney1(-r.money1);
        }
        if (r.money2 > 0) {
            player.addmoney2(-r.money2);
        }
        //RecruitGIDs
        let gid = 0;
        if (num == 1) {//初始玩家固定出这几个英雄
            for (let k in Define.RecruitGIDs) {
                let id = Define.RecruitGIDs[k];
                let g = player.generals[Define.RecruitGIDs[id]];
                if (!g) {
                    gid = id;
                    break;
                }
            }
        }
        if (gid == 0) {
            gid = this.randon(num);
        }
        var general = new MGeneral(gid);
        this._name.text = general.name;
        this._name.color = Utils.getColour(general.colour);
        player.addGeneral(general);
        Laya.loader.load("res/atlas/general/" + general.icon + ".atlas", Laya.Handler.create(this, this.playAni, [general.icon], false), null, Laya.Loader.ATLAS);
    }
    /**
     * 随机英雄
     * @param num 
     */
    private randon(num: number): number {
        var rs = tb_game.recruit_rate[num];
        var total = 0;
        for (var k in rs) {
            var r_1 = rs[k];
            total += r_1.rate;
        }
        var effRate = Utils.nextNumber(0, total);
        var temp = 0;
        var gid = 1;
        for (var id in rs) {
            var r_2 = rs[id];
            temp += r_2.rate;
            if (effRate <= temp) {
                gid = Number(id);
                break;
            }
        }
        return gid;
    }
    public playAni(icon: number) {
        this._ani.loadAnimation("ani/general/" + icon + ".ani");
        this._ani.play(0, true, Define.General_Stand);
        this._ani.visible = true;
        this._name.visible = true;
    }
    private money1Change() {
        this.money1.text = player.money1.toString();
    }
    private money2Change() {
        if (player.money2 < 10) {
            this.bg1.loadImage("map/btn.png");
        }
        if (player.money2 < 30) {
            this.bg2.loadImage("map/btn.png");
        }
        this.money2.changeText(player.money2.toString());
    }
    /**
    * 关闭列表
    */
    private closeBtn(): void {
        this.removeSelf();
        this.destroy(false);
        game.stopover();
    }
}