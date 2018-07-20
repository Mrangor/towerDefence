/*
* name;
*/
class MapChangeView extends ui.game.MapChanegeUI {
    constructor() {
        super();
        game.mapView.visible = false;
        this.no_qr_btn.on(Laya.Event.CLICK, this, this.noqrbtn); //编辑完成
        this.recruit_btn.on(Laya.Event.CLICK, this, this.openRecruit); //进入招募界面
        //初始化数据
        this.initMap();
        this.initGeneral();
        this.cmoney2();
        for (var i = 1; i <= 9; i++) {
            var stone = game.stones[i];
            var stoneBox = this["stone" + i] as ui.game.StoneUI;
            stoneBox.hp.text = stone.hp.toString();
            if (stone.hp > 0) {
                stoneBox.visible = true;
            }
            else {
                stoneBox.visible = false;
            }
        }
        notifyManager.on(NotifyType.Money2Change, this, this.cmoney2);
        notifyManager.on(NotifyType.ChangeGeneral, this, this.initGeneral);
        notifyManager.on(NotifyType.RemoveGeneral, this, this.initGeneral);
    }
    /**
     * 初始化地图
     */
    public initMap() {
        for (var y in game.NODES) {
            for (var x in game.NODES[y]) {
                if (game.NODES[y][x] == 0) {
                    var way = new ui.game.WayUI();
                    var anode = new ANode(Number(x), Number(y));
                    var mpos = Utils.calc_pos_xy(anode);
                    way.pos(mpos.x, mpos.y);
                    this.map.addChild(way);
                }
            }
        }
    }
    public initGeneral() {
        for (var i = 1; i <= 9; i++) {
            var vpos = this["pos" + i] as ui.game.PosChangeUI;
            var msg_btn = vpos.msg_btn;
            var yc_btn = vpos.yc_btn;
            var gh_btn = vpos.gh_btn;
            var g = game.generals[i];
            if (g) {
                msg_btn.removeChildByName("g");
                var node = new Laya.Sprite;
                var eg = new General(g.generalId, g.gpos);
                node.addChild(eg);
                node.name = "g";
                node.pos(msg_btn.width / 2, msg_btn.height);
                msg_btn.addChild(node);
                msg_btn.on(Laya.Event.CLICK, this, this.msg, [i]);
                gh_btn.on(Laya.Event.CLICK, this, this.changeGeneral, [i]);
                yc_btn.on(Laya.Event.CLICK, this, this.removeGeneral, [i]);
                yc_btn.visible = true;
                gh_btn.visible = true;
            }
            else {
                msg_btn.removeChildByName("g");
                msg_btn.on(Laya.Event.CLICK, msg_btn, this.changeGeneral, [i]);
                yc_btn.visible = false;
                gh_btn.visible = false;
            }
        }
    }

    public cmoney2() {
       this.money2.text = player.money2.toString();
    }
    /**
    * 打开招募界面
    */
    private openRecruit() {
        let view = new RecruitView();
        Laya.stage.addChild(view);
    }
    /**
     * 打开设置武将界面
     * @param pos 
     */
    private openChange(pos: number): void {
        let view = new ChangeGeneralView(pos);
        Laya.stage.addChild(view);
    }
    private noqrbtn() {
        //编辑好英雄后  开始游戏
        this.removeSelf();
        game.mapView.visible = true;
        game.startGame();
    }

    public removeGeneral(mappos: number) {
        console.log("移除英雄" + mappos);
        delete game.generals[mappos];
        notifyManager.event(NotifyType.RemoveGeneral);
    }
    public changeGeneral(mappos: number) {
        //更换除英雄
        let view = new ChangeGeneralView(mappos);
        if (view.list.array.length > 0) {
            Laya.stage.addChild(view);
            console.log("选择更换除英雄");
        }
    }
    public msg(mappos: number) {
        console.log("英雄信息");
        let g = game.generals[mappos];
        if (g) {
            let msg = new GeneralInfoView(g.tb);
            Laya.stage.addChild(msg);
        }
    }
}