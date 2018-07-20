/*
* 英雄选择界面
*/
class ChangeGeneralView extends ui.game.ChangeGeneralUI {
    private gpos: number;
    constructor(gpos: number) {
        super();
        this.gpos = gpos;
        this.initList();
        this.close_btn.on(Laya.Event.CLICK, this, this.closeBtn);
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
    }
    /**
    * 选择列表渲染
    */
    private onListRender(cell: laya.ui.Box, index: number): void {
        if (index > this.list.array.length) {
            return;
        }
        var data: MGeneral = this.list.array[index];
        var iconImg: Laya.Image = cell.getChildByName("icon") as Laya.Image;
        var name: Laya.Label = cell.getChildByName("b1").getChildByName("gname") as Laya.Label;
        var level: Laya.Label = cell.getChildByName("b2").getChildByName("level") as Laya.Label;
        var desc: Laya.Label = cell.getChildByName("b3").getChildByName("desc") as Laya.Label;
        name.changeText(data.name);
        level.changeText((data.level).toString());
        desc.changeText(data.desc);
        iconImg.skin = "icon/general" + data.icon + "_0.png";
        this.addMouseOutEvent(cell);
        this.addMouseOverEvent(cell);
        this.addClickEvent(cell, data.generalId);
    }

    /**
     *获取选择列表数据
     */
    private getRankDatas(): Array<MGeneral> {
        var rankDatas = new Array;
        let ids = game.generalIds;
        for (let k in player.generals) {
            let id = Number(k);
            if (ids.indexOf(id) > -1) {
                continue;
            }
            var g = player.generals[k];
            rankDatas.push(g);
        }
        return this.sortRankByScore(rankDatas);
    }
    /**
    * 列表排序
    * @param Array 
    */
    private sortRankByScore(rankDatas: Array<MGeneral>): Array<MGeneral> {
        return rankDatas;
    }
    /**
     * 关闭列表
     */
    private closeBtn(): void {
        this.removeSelf();
    }

    /**
     * 鼠标进入到按钮，按钮效果
     * @param box 
     */
    private addMouseOverEvent(box: laya.ui.Box) {
        box.on(Laya.Event.MOUSE_OVER, box, function () {
            box.scale(1.2, 1.2);
        });
    }

    /**
     * 鼠标离开到按钮，按钮效果
     * @param box 
     */
    private addMouseOutEvent(box: laya.ui.Box) {
        box.on(Laya.Event.MOUSE_OUT, box, function () {
            box.scale(1, 1);
        });
    }
    /**
    *点击效果
    * @param box 
    */
    private addClickEvent(box: laya.ui.Box, generalId: number) {
        let self = this;
        box.on(Laya.Event.CLICK, box, function (pos: number, generalId: number) {
            console.log("更换英雄");
            let g = new General(generalId, pos);
            game.generals[pos] = g;
            notifyManager.event(NotifyType.ChangeGeneral);
            self.closeBtn();
        }, [this.gpos
                , generalId]);
    }
}
