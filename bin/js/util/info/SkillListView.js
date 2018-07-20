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
* 英雄界面
*/
var SkillListView = /** @class */ (function (_super) {
    __extends(SkillListView, _super);
    function SkillListView() {
        var _this = _super.call(this) || this;
        _this.initList();
        _this.down_view.skill_btn.scale(1.1, 1.08);
        _this.down_view.skill_btn.mouseEnabled = false;
        notifyManager.on(NotifyType.ChangeSkill, _this, _this.onListRender);
        return _this;
    }
    /**
       * 初始化ListUI
       */
    SkillListView.prototype.initList = function () {
        var rankDatas = this.getRankDatas();
        this.list.vScrollBarSkin = '';
        this.list.repeatY = rankDatas.length;
        this.list.array = rankDatas;
        this.list.renderHandler = new Laya.Handler(this, this.onListRender);
    };
    ;
    /**
    * 选择列表渲染
    */
    SkillListView.prototype.onListRender = function (cell, index) {
        if (index > this.list.array.length) {
            return;
        }
        var data = this.list.array[index];
        var icon = cell.getChildByName("icon");
        var skillname = cell.getChildByName("skillname");
        var blevel = cell.getChildByName("blevel");
        var level = blevel.getChildByName("level");
        var desc = cell.getChildByName("desc");
        var block = cell.getChildByName("block");
        var skill_btn = block.getChildByName("skill_btn");
        var title = block.getChildByName("title");
        var money_icon = skill_btn.getChildByName("money_icon");
        var money = skill_btn.getChildByName("money");
        var bmap = cell.getChildByName("bmap");
        var maplevel = bmap.getChildByName("maplevel");
        var bmax = cell.getChildByName("bmax");
        skillname.changeText(data.name);
        level.changeText((data.level).toString());
        desc.text = data.desc;
        icon.skin = "skill/skill" + data.skillId + ".png";
        //1满级显示
        if (data.isMaxLevel()) {
            bmax.visible = true;
            bmap.visible = false;
            block.visible = false;
        }
        else {
            bmax.visible = false;
            if (data.level == 0) {
                if (data.needmaplevel > 0) {
                    block.visible = false;
                    maplevel.text = "第" + data.needmaplevel;
                }
                else if (data.needmoney1 > 0) {
                    bmap.visible = false;
                    money.text = data.needmoney1.toString();
                    this.addClickEvent(cell, index, skill_btn, data.skillId);
                }
                blevel.visible = false;
            }
            else {
                if (data.type == SkillType.Summoning_Stone) {
                    bmap.visible = false;
                    title.text = "使用";
                    money_icon.skin = "map/m11.png";
                    money.text = data.uplevelmoney1.toString();
                    this.summoningStone(skill_btn, data.skillId);
                }
                else {
                    level.visible = true;
                    bmap.visible = false;
                    title.text = "升级";
                    if (data.uplevelmoney1 > 0) {
                        money_icon.skin = "map/m11.png";
                        money.text = data.uplevelmoney1.toString();
                    }
                    else if (data.uplevelmoney3 > 0) {
                        money_icon.skin = "map/m31.png";
                        money.text = data.uplevelmoney3.toString();
                    }
                    this.addClickEvent(cell, index, skill_btn, data.skillId);
                }
            }
        }
    };
    ;
    /**
     *获取选择列表数据
     */
    SkillListView.prototype.getRankDatas = function () {
        var rankDatas = new Array();
        for (var k in player.skills) {
            var s = player.skills[k];
            rankDatas.push(s);
        }
        return rankDatas;
    };
    ;
    /**
    *点击效果
    * @param box
    */
    SkillListView.prototype.addClickEvent = function (cell, index, box, skillId) {
        box.on(Laya.Event.CLICK, box, this.clickEvent, [cell, index, skillId]);
    };
    ;
    SkillListView.prototype.clickEvent = function (cell, index, skillId) {
        console.log("点击(解锁或者升级)");
        var data = player.skills[skillId];
        if (data.isMaxLevel()) {
            new TipsMsg("最大等级");
            return;
        }
        //2关卡解锁显示
        if (data.level == 0) {
            if (data.needmaplevel > 0) {
                return;
            }
            else if (data.needmoney1 > 0) {
                //消耗money1解锁
                if (player.money1 > data.needmoney1) {
                    player.addmoney1(-data.needmoney1);
                    data.unlock();
                    new TipsMsg("解锁成功");
                    notifyManager.event(NotifyType.ChangeSkill, [cell, index]);
                }
                else {
                    new TipsMsg("紫钻不足");
                }
                return;
            }
        }
        else {
            if (data.uplevelmoney1 > 0) {
                if (player.money1 > data.uplevelmoney1) {
                    player.addmoney1(-data.uplevelmoney1);
                    data.uplevel();
                    new TipsMsg("升级成功");
                    notifyManager.event(NotifyType.ChangeSkill, [cell, index]);
                }
                else {
                    new TipsMsg("紫钻不足");
                }
            }
            else if (data.uplevelmoney3 > 0) {
                if (player.money3 > data.uplevelmoney3) {
                    player.addmoney3(-data.uplevelmoney3);
                    data.uplevel();
                    new TipsMsg("升级成功");
                    notifyManager.event(NotifyType.ChangeSkill, [cell, index]);
                }
                else {
                    new TipsMsg("金币不足");
                }
            }
        }
    };
    ;
    /**
    * 召唤巨石
    * @param box
    */
    SkillListView.prototype.summoningStone = function (box, skillId) {
        var self = this;
        box.on(Laya.Event.CLICK, box, function (skillId) {
            console.log("点击使用");
            var data = player.skills[skillId];
            if (data.useMoney1 > 0) {
                //消耗money1解锁
                if (player.money1 > data.useMoney1) {
                    player.addmoney1(-data.useMoney1);
                    new TipsMsg(data.name);
                    game.resetStone();
                }
                else {
                    new TipsMsg("紫钻不足");
                }
                return;
            }
        }, [skillId]);
    };
    ;
    return SkillListView;
}(ui.info.SkillListUI));
//# sourceMappingURL=SkillListView.js.map