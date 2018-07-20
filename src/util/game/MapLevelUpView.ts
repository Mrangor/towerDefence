/*
* name;
*/
class MapLevelUpView extends ui.game.MapLevelUpUI {
    constructor() {
        super();
        game.mapView.visible = false;
        //初始化
        this.edit_ext_btn.on(Laya.Event.CLICK, this, this.editext, [true]); //退出
        notifyManager.on(NotifyType.Money3Change, this, this.cmoney3);
        notifyManager.on(NotifyType.ChangeGeneral, this, this.initGeneral);
        //初始化数据
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
        this.initMap();
        this.cmoney3();
        this.initGeneral();
    }
    /**
      * 初始化地图
      */
    private initMap() {
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
    };
    private initGeneral() {
        for (var i = 1; i <= 9; i++) {
            var vpos = this["pos" + i];
            var msg_btn = vpos.msg_btn;
            var levelup_btn = vpos.levelup_btn;
            var levelup_money2 = vpos.levelup_money2;
            var g = game.generals[i];
            if (g) {
                msg_btn.removeChildByName("g");
                var node = new Laya.Sprite;
                var eg = new General(g.generalId, g.gpos);
                node.addChild(eg);
                node.name = "g";
                node.pos(msg_btn.width / 2, msg_btn.height);
                msg_btn.addChild(node);
                var mg = g.tb;
                msg_btn.on(Laya.Event.CLICK, this, this.msg, [i]);
                if (!mg.isMaxLevel()) {
                    levelup_btn.on(Laya.Event.CLICK, this, this.levelup, [i]);
                    levelup_money2.text = mg.upLevelMoney3().toString();
                }
                else {
                    levelup_money2.text = "max";
                    levelup_btn.disabled = true;
                }
                levelup_btn.visible = true;
            }
            else {
                msg_btn.on(Laya.Event.CLICK, this, this.changeGeneral, [i]);
                msg_btn.removeChildByName("g");
            }
        }
    };
    /**
     * 设置黄金
     */
    private cmoney3() {
        this.money3.text = player.money3.toString();
    };
    /**
     * 武将升级
     * @param pos
     */
    private levelup(pos: number) {
        var g = game.generals[pos];
        if (g) {
            var mg = player.generals[g.generalId];
            var b = mg.uplevel();
            if (b) {
                //升级特效
                g.applayFilter();
            }
            var vpos = this["pos" + pos];
            if (!mg.isMaxLevel()) {
                vpos.levelup_money2.text = mg.upLevelMoney3().toString();
            }
            else {
                vpos.levelup_money2.text = "max";
                vpos.levelup_btn.disabled = true;
            }
        }
    };
    private changeGeneral(mappos: number) {
        //更换除英雄
        var view = new ChangeGeneralView(mappos);
        if (view.list.array.length > 0) {
            Laya.stage.addChild(view);
            console.log("选择更换除英雄");
        }
    };
    private msg(mappos: number) {
        console.log("英雄信息");
        var g = game.generals[mappos];
        if (g) {
            var msg = new GeneralInfoView(g.tb);
            Laya.stage.addChild(msg);
        }
    };
    /**
     * 退出
     * @param stopover
     */
    private editext(stopover) {
        this.removeSelf();
        game.mapView.visible = true;
        game.stopover();
    };
}