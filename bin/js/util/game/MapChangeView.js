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
var MapChangeView = /** @class */ (function (_super) {
    __extends(MapChangeView, _super);
    function MapChangeView() {
        var _this = _super.call(this) || this;
        game.mapView.visible = false;
        _this.no_qr_btn.on(Laya.Event.CLICK, _this, _this.noqrbtn); //编辑完成
        _this.recruit_btn.on(Laya.Event.CLICK, _this, _this.openRecruit); //进入招募界面
        //初始化数据
        _this.initMap();
        _this.initGeneral();
        _this.cmoney2();
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
        notifyManager.on(NotifyType.Money2Change, _this, _this.cmoney2);
        notifyManager.on(NotifyType.ChangeGeneral, _this, _this.initGeneral);
        notifyManager.on(NotifyType.RemoveGeneral, _this, _this.initGeneral);
        return _this;
    }
    /**
     * 初始化地图
     */
    MapChangeView.prototype.initMap = function () {
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
    MapChangeView.prototype.initGeneral = function () {
        for (var i = 1; i <= 9; i++) {
            var vpos = this["pos" + i];
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
    };
    MapChangeView.prototype.cmoney2 = function () {
        this.money2.text = player.money2.toString();
    };
    /**
    * 打开招募界面
    */
    MapChangeView.prototype.openRecruit = function () {
        var view = new RecruitView();
        Laya.stage.addChild(view);
    };
    /**
     * 打开设置武将界面
     * @param pos
     */
    MapChangeView.prototype.openChange = function (pos) {
        var view = new ChangeGeneralView(pos);
        Laya.stage.addChild(view);
    };
    MapChangeView.prototype.noqrbtn = function () {
        //编辑好英雄后  开始游戏
        this.removeSelf();
        game.mapView.visible = true;
        game.startGame();
    };
    MapChangeView.prototype.removeGeneral = function (mappos) {
        console.log("移除英雄" + mappos);
        delete game.generals[mappos];
        notifyManager.event(NotifyType.RemoveGeneral);
    };
    MapChangeView.prototype.changeGeneral = function (mappos) {
        //更换除英雄
        var view = new ChangeGeneralView(mappos);
        if (view.list.array.length > 0) {
            Laya.stage.addChild(view);
            console.log("选择更换除英雄");
        }
    };
    MapChangeView.prototype.msg = function (mappos) {
        console.log("英雄信息");
        var g = game.generals[mappos];
        if (g) {
            var msg = new GeneralInfoView(g.tb);
            Laya.stage.addChild(msg);
        }
    };
    return MapChangeView;
}(ui.game.MapChanegeUI));
//# sourceMappingURL=MapChangeView.js.map