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
* 英雄选择界面
*/
var ChangeGeneralView = /** @class */ (function (_super) {
    __extends(ChangeGeneralView, _super);
    function ChangeGeneralView(gpos) {
        var _this = _super.call(this) || this;
        _this.gpos = gpos;
        _this.initList();
        _this.close_btn.on(Laya.Event.CLICK, _this, _this.closeBtn);
        return _this;
    }
    /**
     * 初始化ListUI
     */
    ChangeGeneralView.prototype.initList = function () {
        var rankDatas = this.getRankDatas();
        this.list.vScrollBarSkin = '';
        this.list.repeatY = rankDatas.length;
        this.list.array = rankDatas;
        this.list.renderHandler = new Laya.Handler(this, this.onListRender);
    };
    /**
    * 选择列表渲染
    */
    ChangeGeneralView.prototype.onListRender = function (cell, index) {
        if (index > this.list.array.length) {
            return;
        }
        var data = this.list.array[index];
        var iconImg = cell.getChildByName("icon");
        var name = cell.getChildByName("b1").getChildByName("gname");
        var level = cell.getChildByName("b2").getChildByName("level");
        var desc = cell.getChildByName("b3").getChildByName("desc");
        name.changeText(data.name);
        level.changeText((data.level).toString());
        desc.changeText(data.desc);
        iconImg.skin = "icon/general" + data.icon + "_0.png";
        this.addMouseOutEvent(cell);
        this.addMouseOverEvent(cell);
        this.addClickEvent(cell, data.generalId);
    };
    /**
     *获取选择列表数据
     */
    ChangeGeneralView.prototype.getRankDatas = function () {
        var rankDatas = new Array;
        var ids = game.generalIds;
        for (var k in player.generals) {
            var id = Number(k);
            if (ids.indexOf(id) > -1) {
                continue;
            }
            var g = player.generals[k];
            rankDatas.push(g);
        }
        return this.sortRankByScore(rankDatas);
    };
    /**
    * 列表排序
    * @param Array
    */
    ChangeGeneralView.prototype.sortRankByScore = function (rankDatas) {
        return rankDatas;
    };
    /**
     * 关闭列表
     */
    ChangeGeneralView.prototype.closeBtn = function () {
        this.removeSelf();
    };
    /**
     * 鼠标进入到按钮，按钮效果
     * @param box
     */
    ChangeGeneralView.prototype.addMouseOverEvent = function (box) {
        box.on(Laya.Event.MOUSE_OVER, box, function () {
            box.scale(1.2, 1.2);
        });
    };
    /**
     * 鼠标离开到按钮，按钮效果
     * @param box
     */
    ChangeGeneralView.prototype.addMouseOutEvent = function (box) {
        box.on(Laya.Event.MOUSE_OUT, box, function () {
            box.scale(1, 1);
        });
    };
    /**
    *点击效果
    * @param box
    */
    ChangeGeneralView.prototype.addClickEvent = function (box, generalId) {
        var self = this;
        box.on(Laya.Event.CLICK, box, function (pos, generalId) {
            console.log("更换英雄");
            var g = new General(generalId, pos);
            game.generals[pos] = g;
            notifyManager.event(NotifyType.ChangeGeneral);
            self.closeBtn();
        }, [this.gpos,
            generalId]);
    };
    return ChangeGeneralView;
}(ui.game.ChangeGeneralUI));
//# sourceMappingURL=ChangeGeneralView.js.map