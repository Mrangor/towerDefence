/*
* name;
*/
class MapView extends ui.game.MapUI {
    constructor() {
        super();
        //初始化
        for (var i = 1; i <= 9; i++) {
            this["pos" + i].on(Laya.Event.CLICK, this, this.levelUpView);
        }
        this.edit_btn.on(Laya.Event.CLICK, this, this.levelUpView); //进入升级英雄状态
        this.recruit_btn.on(Laya.Event.CLICK, this, this.openRecruit); //进入招募界面
        this.info_btn.on(Laya.Event.CLICK, this, this.openInfo); //进入玩家信息(默认技能列表)
        //初始化数据
        this.initMap();
        this.initGeneral();
        this.initSkill();
        this.initMapLevelLab();
        this.map_level_lab.text = game.level.toString();
        for (var i = 1; i <= 9; i++) {
            this.stoneChangeUI(i);
        }
        this.cmoney1();
        this.cmoney2();
        this.cmoney3();
        //TODO 清理缓存按钮 
        this.cler_btn.on(Laya.Event.CLICK, this, this.clear);
        notifyManager.on(NotifyType.Money1Change, this, this.cmoney1); //修改金钱
        notifyManager.on(NotifyType.Money2Change, this, this.cmoney2);
        notifyManager.on(NotifyType.Money3Change, this, this.cmoney3);
        notifyManager.on(NotifyType.StoneHp, this, this.stoneChangeUI);
        notifyManager.on(NotifyType.ChangeGeneral, this, this.initGeneral); //改变英雄
        notifyManager.on(NotifyType.RemoveGeneral, this, this.initGeneral); //移除英雄
        notifyManager.on(NotifyType.CDSkill, this, this.cdSkill); //技能CD
        notifyManager.on(NotifyType.MapLevel, this, this.initMapLevelLab); //技能CD
        notifyManager.on(NotifyType.UpdateMap, this, this.updateMap); //技能CD
        this.game_ui.zOrder = 10000;
    }
    public initMapLevelLab() {
        this.map_level_lab.text = game.level.toString();
    }
    /**
     * 初始化地图
     */
    public initMap() {
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
    }

    /**
     * 修改地图
     */
    public updateMap(x: number, y: number, visible: boolean) {
        var name = "map_" + x + "_" + y;
        var way = this.bg.getChildByName(name) as ui.game.WayUI;
        way.visible = visible;
    }
    public initGeneral() {
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
    }
    /**
     * 初始化技能
     */
    public initSkill() {
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
    }
    /**
     * 准备释放技能
     * @param skillId 
     */
    public preSkill(skillId: number) {
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
    }
    /**
     * 释放技能
     * @param e 
     * @param skillId 
     */
    public skill(e: Laya.Event) {
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
    }
    /** 
     * @param skillId 技能ID
     * @param cdtime CD时间
     */
    public cdSkill(skillId: number, cdtime: number) {
        let skillMsg = this["skill" + skillId + "_msg"] as laya.ui.Label;
        if (cdtime > 0) {
            skillMsg.text = cdtime + "s";
            skillMsg.visible = true;
        }
        else {
            skillMsg.visible = false;
        }
    }
    /**
     * @param gpos 移除位置
     */
    public removeGeneral(gpos: number) {
        this.removeChildAt(gpos);
    }
    public cmoney1() {
        this.money1.text = player.money1.toString();
    }
    public cmoney2() {
        this.money2.text = player.money2.toString();
    }
    public cmoney3() {
        this.money3.text = player.money3.toString();
    }
    /**
     * 打开设置武将界面
     * @param pos 
     */
    private generalInfo(pos: number): void {
        game.stop();
        let view = new ChangeGeneralView(pos);
        Laya.stage.addChild(view);
    }
    /**
     * 打开招募界面
     */
    private openRecruit() {
        game.stop();
        let view = new RecruitView();
        Laya.stage.addChild(view);
    }
    /**
     *进入升级界面
     */
    private levelUpView() {
        if (game.state == Define.Game_Start) {
            game.stop();
            let levelUpView = new MapLevelUpView();
            Laya.stage.addChild(levelUpView);
        } else if (game.state == Define.Game_No) {
            let mapChangeView = new MapChangeView();
            Laya.stage.addChild(mapChangeView);
        }

    }
    /**
     *进入信息列表
     */
    private openInfo() {
        game.stop();
        let view = new SkillListView();
        Laya.stage.addChild(view);
    }
    public clear() {
        Laya.LocalStorage.clear();
    }
    /**
     * 修改石头UI
     * @param pos 
     */
    private stoneChangeUI(pos: number): void {
        let stone = game.stones[pos];
        let stoneUi = this["stone" + pos] as ui.game.StoneUI;
        if (stone.hp > 0) {
            stoneUi.hp.text = stone.hp.toString();
            stoneUi.visible = true;
        } else {
            stoneUi.hp.text = stone.hp.toString();
            stoneUi.visible = false;
        }
    }
}