var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var MapLevelUpView = /** @class */ (function (_super) {
    __extends(MapLevelUpView, _super);
    function MapLevelUpView() {
        var _this = _super.call(this) || this;
        game.mapView.visible = false;
        //初始化
        _this.edit_ext_btn.on(Laya.Event.CLICK, _this, _this.editext, [true]); //退出
        notifyManager.on(NotifyType.Money3Change, _this, _this.cmoney3);
        notifyManager.on(NotifyType.ChangeGeneral, _this, _this.initGeneral);
        //初始化数据
        for (var i = 1; i <= 9; i++) {
            var stone = game.stones[i];
            var stoneBox = _this["stone" + i];
            stoneBox.hp.text = stone.hp.toString();
            if (stone.hp > 0) {
                stoneBox.visible = true;
            }
            else {
                stoneBox.visible = false;
            }
        }
        _this.initMap();
        _this.cmoney3();
        _this.initGeneral();
        return _this;
    }
    /**
      * 初始化地图
      */
    MapLevelUpView.prototype.initMap = function () {
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
    ;
    MapLevelUpView.prototype.initGeneral = function () {
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
    ;
    /**
     * 设置黄金
     */
    MapLevelUpView.prototype.cmoney3 = function () {
        this.money3.text = player.money3.toString();
    };
    ;
    /**
     * 武将升级
     * @param pos
     */
    MapLevelUpView.prototype.levelup = function (pos) {
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
    ;
    MapLevelUpView.prototype.changeGeneral = function (mappos) {
        //更换除英雄
        var view = new ChangeGeneralView(mappos);
        if (view.list.array.length > 0) {
            Laya.stage.addChild(view);
            console.log("选择更换除英雄");
        }
    };
    ;
    MapLevelUpView.prototype.msg = function (mappos) {
        console.log("英雄信息");
        var g = game.generals[mappos];
        if (g) {
            var msg = new GeneralInfoView(g.tb);
            Laya.stage.addChild(msg);
        }
    };
    ;
    /**
     * 退出
     * @param stopover
     */
    MapLevelUpView.prototype.editext = function (stopover) {
        this.removeSelf();
        game.mapView.visible = true;
        game.stopover();
    };
    ;
    return MapLevelUpView;
}(ui.game.MapLevelUpUI));
//# sourceMappingURL=MapLevelUpView.js.map