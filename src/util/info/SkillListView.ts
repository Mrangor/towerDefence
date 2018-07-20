/*
* 英雄界面
*/
class SkillListView extends ui.info.SkillListUI {
    constructor() {
        super();
        this.initList();
        this.down_view.skill_btn.scale(1.1, 1.08);
        this.down_view.skill_btn.mouseEnabled = false;
        notifyManager.on(NotifyType.ChangeSkill, this, this.onListRender);
    }
    /**
       * 初始化ListUI
       */
    private initList() {
        var rankDatas = this.getRankDatas();
        this.list.vScrollBarSkin = '';
        this.list.repeatY = rankDatas.length;
        this.list.array = rankDatas;
        this.list.renderHandler = new Laya.Handler(this, this.onListRender);
    };
    /**
    * 选择列表渲染
    */
    private onListRender(cell: laya.ui.Box, index: number) {
        if (index > this.list.array.length) {
            return;
        }
        var data = this.list.array[index] as MSkill;
        var icon = cell.getChildByName("icon") as Laya.Image;
        var skillname = cell.getChildByName("skillname") as Laya.Label;
        var blevel = cell.getChildByName("blevel") as laya.ui.Box;
        var level = blevel.getChildByName("level") as laya.ui.Label;
        var desc = cell.getChildByName("desc") as Laya.Label;
        var block = cell.getChildByName("block") as laya.ui.Box;
        var skill_btn = block.getChildByName("skill_btn") as Laya.Image;
        var title = block.getChildByName("title") as Laya.Label;
        var money_icon = skill_btn.getChildByName("money_icon") as Laya.Image;
        var money = skill_btn.getChildByName("money") as Laya.Label;
        var bmap = cell.getChildByName("bmap") as Laya.Box;
        var maplevel = bmap.getChildByName("maplevel") as Laya.Label;
        var bmax = cell.getChildByName("bmax") as Laya.Box;
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
    /**
     *获取选择列表数据
     */
    private getRankDatas() {
        var rankDatas = new Array();
        for (var k in player.skills) {
            var s = player.skills[k];
            rankDatas.push(s);
        }
        return rankDatas;
    };
    /**
    *点击效果
    * @param box
    */
    private addClickEvent(cell: Laya.Box, index: number, box: Laya.Image, skillId: number) {
        box.on(Laya.Event.CLICK, box, this.clickEvent, [cell, index, skillId]);
    };
    private clickEvent(cell: Laya.Box, index: number, skillId: number) {
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
    /**
    * 召唤巨石
    * @param box
    */
    private summoningStone(box: Laya.Image, skillId: number) {
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

}
