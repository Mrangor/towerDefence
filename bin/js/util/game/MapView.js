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
var MapView = /** @class */ (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super.call(this) || this;
        //初始化
        for (var i = 1; i <= 9; i++) {
            _this["pos" + i].on(Laya.Event.CLICK, _this, _this.levelUpView);
        }
        _this.edit_btn.on(Laya.Event.CLICK, _this, _this.levelUpView); //进入升级英雄状态
        _this.recruit_btn.on(Laya.Event.CLICK, _this, _this.openRecruit); //进入招募界面
        _this.info_btn.on(Laya.Event.CLICK, _this, _this.openInfo); //进入玩家信息(默认技能列表)
        //初始化数据
        _this.initMap();
        _this.initGeneral();
        _this.initSkill();
        _this.initMapLevelLab();
        _this.map_level_lab.text = game.level.toString();
        for (var i = 1; i <= 9; i++) {
            _this.stoneChangeUI(i);
        }
        _this.cmoney1();
        _this.cmoney2();
        _this.cmoney3();
        //TODO 清理缓存按钮 
        _this.cler_btn.on(Laya.Event.CLICK, _this, _this.clear);
        notifyManager.on(NotifyType.Money1Change, _this, _this.cmoney1); //修改金钱
        notifyManager.on(NotifyType.Money2Change, _this, _this.cmoney2);
        notifyManager.on(NotifyType.Money3Change, _this, _this.cmoney3);
        notifyManager.on(NotifyType.StoneHp, _this, _this.stoneChangeUI);
        notifyManager.on(NotifyType.ChangeGeneral, _this, _this.initGeneral); //改变英雄
        notifyManager.on(NotifyType.RemoveGeneral, _this, _this.initGeneral); //移除英雄
        notifyManager.on(NotifyType.CDSkill, _this, _this.cdSkill); //技能CD
        notifyManager.on(NotifyType.MapLevel, _this, _this.initMapLevelLab); //技能CD
        notifyManager.on(NotifyType.UpdateMap, _this, _this.updateMap); //技能CD
        _this.game_ui.zOrder = 10000;
        return _this;
    }
    MapView.prototype.initMapLevelLab = function () {
        this.map_level_lab.text = game.level.toString();
    };
    /**
     * 初始化地图
     */
    MapView.prototype.initMap = function () {
        for (var y in game.NODES) {
            for (var x in game.NODES[y]) {
                var way = new ui.game.WayUI();
                way.name = "map_" + x + "_" + y;
                var anode = new ANode(Number(x), Number(y));
                var mpos = Utils.calc_pos_xy(anode);
                way.pos(mpos.x, mpos.y);
                this.bg.addChild(way);
                if (game.NODES[y][x] == 0) {
                    way.visible = true;
                }
                else {
                    way.visible = false;
                }
            }
        }
    };
    /**
     * 修改地图
     */
    MapView.prototype.updateMap = function (x, y, visible) {
        var name = "map_" + x + "_" + y;
        var way = this.bg.getChildByName(name);
        way.visible = visible;
    };
    MapView.prototype.initGeneral = function () {
        for (var i = 1; i <= 9; i++) {
            var vpos = this["pos" + i];
            var g = game.generals[i];
            if (g) {
                g.posx = vpos.x;
                g.posy = vpos.y;
                vpos.removeChildByName("g");
                var node = new Laya.Sprite;
                node.addChild(g);
                node.name = "g";
                node.pos(vpos.width / 2, vpos.height);
                vpos.addChild(node);
            }
            else {
                vpos.removeChildByName("g");
            }
        }
    };
    /**
     * 初始化技能
     */
    MapView.prototype.initSkill = function () {
        for (var i = 4; i <= 6; i++) {
            var skillbtn = this["skill" + i + "_btn"];
            var skillMsg = this["skill" + i + "_msg"];
            var skill = player.skills[i];
            if (!skill.isUnLock()) {
                skillMsg.text = "解锁";
                skillbtn.skin = "skill/lock.png";
            }
            else {
                skillbtn.skin = "skill/skill" + i + ".png";
                skillbtn.on(Laya.Event.CLICK, this, this.preSkill, [i]);
            }
        }
    };
    /**
     * 准备释放技能
     * @param skillId
     */
    MapView.prototype.preSkill = function (skillId) {
        var skill = player.skills[skillId];
        if (!skill.isUnLock()) {
            new TipsMsg("未解锁");
            return;
        }
        if (skill.cdtime > 0) {
            return;
        }
        if (game.skillId == skillId) {
            var skillbtn_1 = this["skill" + game.skillId + "_btn"];
            skillbtn_1.filters = [];
            this.bg.off(Laya.Event.CLICK, this, this.skill);
            game.skillId = 0;
            return;
        }
        if (game.skillId != 0) {
            var skillbtn_2 = this["skill" + game.skillId + "_btn"];
            skillbtn_2.filters = [];
        }
        //设置滤镜集合为发光滤镜
        game.skillId = skillId;
        var skillbtn = this["skill" + game.skillId + "_btn"];
        var glowFilter = new Laya.GlowFilter("#ffffff", 20, 0, 0);
        skillbtn.filters = [glowFilter];
        this.bg.on(Laya.Event.CLICK, this, this.skill);
    };
    /**
     * 释放技能
     * @param e
     * @param skillId
     */
    MapView.prototype.skill = function (e) {
        //释放技能
        if (game.skillId != 0) {
            var mskill = player.skills[game.skillId];
            //获取坐标
            //console.log("点击位置", e.stageX, e.stageY);
            mskill.startCD();
            //位置
            if (game.skillId == 4) {
                new Skill4(player.skills[game.skillId].addValue, e.stageX, e.stageY);
            }
            if (game.skillId == 5) {
                new Skill5(e.stageX, e.stageY);
            }
            if (game.skillId == 6) {
                new Skill6(player.skills[game.skillId].addValue, e.stageX, e.stageY);
            }
            //释放完成后 取消特效
            var skillbtn = this["skill" + game.skillId + "_btn"];
            skillbtn.filters = [];
            game.skillId = 0;
        }
    };
    /**
     * @param skillId 技能ID
     * @param cdtime CD时间
     */
    MapView.prototype.cdSkill = function (skillId, cdtime) {
        var skillMsg = this["skill" + skillId + "_msg"];
        if (cdtime > 0) {
            skillMsg.text = cdtime + "s";
            skillMsg.visible = true;
        }
        else {
            skillMsg.visible = false;
        }
    };
    /**
     * @param gpos 移除位置
     */
    MapView.prototype.removeGeneral = function (gpos) {
        this.removeChildAt(gpos);
    };
    MapView.prototype.cmoney1 = function () {
        this.money1.text = player.money1.toString();
    };
    MapView.prototype.cmoney2 = function () {
        this.money2.text = player.money2.toString();
    };
    MapView.prototype.cmoney3 = function () {
        this.money3.text = player.money3.toString();
    };
    /**
     * 打开设置武将界面
     * @param pos
     */
    MapView.prototype.generalInfo = function (pos) {
        game.stop();
        var view = new ChangeGeneralView(pos);
        Laya.stage.addChild(view);
    };
    /**
     * 打开招募界面
     */
    MapView.prototype.openRecruit = function () {
        game.stop();
        var view = new RecruitView();
        Laya.stage.addChild(view);
    };
    /**
     *进入升级界面
     */
    MapView.prototype.levelUpView = function () {
        if (game.state == Define.Game_Start) {
            game.stop();
            var levelUpView = new MapLevelUpView();
            Laya.stage.addChild(levelUpView);
        }
        else if (game.state == Define.Game_No) {
            var mapChangeView = new MapChangeView();
            Laya.stage.addChild(mapChangeView);
        }
    };
    /**
     *进入信息列表
     */
    MapView.prototype.openInfo = function () {
        game.stop();
        var view = new SkillListView();
        Laya.stage.addChild(view);
    };
    MapView.prototype.clear = function () {
        Laya.LocalStorage.clear();
    };
    /**
     * 修改石头UI
     * @param pos
     */
    MapView.prototype.stoneChangeUI = function (pos) {
        var stone = game.stones[pos];
        var stoneUi = this["stone" + pos];
        if (stone.hp > 0) {
            stoneUi.hp.text = stone.hp.toString();
            stoneUi.visible = true;
        }
        else {
            stoneUi.hp.text = stone.hp.toString();
            stoneUi.visible = false;
        }
    };
    return MapView;
}(ui.game.MapUI));
//# sourceMappingURL=MapView.js.map