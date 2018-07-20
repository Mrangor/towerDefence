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
var GeneralListColorView = /** @class */ (function (_super) {
    __extends(GeneralListColorView, _super);
    function GeneralListColorView(color) {
        var _this = _super.call(this) || this;
        _this.initList(color);
        return _this;
    }
    /**
     * 初始化ListUI
     */
    GeneralListColorView.prototype.initList = function (color) {
        //普通怪物
        if (color == 1) {
            this.title_lab.text = "普通";
            this.title_lab.color = Define.Color_Green;
        }
        if (color == 2) {
            this.title_lab.text = "精英";
            this.title_lab.color = Define.Color_Blue;
        }
        if (color == 3) {
            this.title_lab.text = "史诗";
            this.title_lab.color = Define.Color_Purple;
        }
        if (color == 4) {
            this.title_lab.text = "传说";
            this.title_lab.color = Define.Color_Yellow;
        }
        //普通怪物
        var data = this.getRankDatas(color);
        this.icon_list.vScrollBarSkin = '';
        this.icon_list.repeatY = data.length;
        this.icon_list.array = data;
        this.icon_list.renderHandler = new Laya.Handler(this, this.onListRender);
        // this.icon_list.height = Math.ceil(data.length / 6) * 150;
        this.icon_list.height = Math.ceil(data.length / this.icon_list.repeatX) * 200;
        this.height = 100 + this.icon_list.height;
        // this.list.scrollBar.min = 1;//设置滚动条的最小值
        // this.list.scrollBar.max = 1000;//设置滚动条的最大值
        // this.list.scrollBar.value = 1000;//设置滚动条当前值
        this.icon_list.scrollBar.touchScrollEnable = false; //取消滚动条的监听
        //置空你的滚动条皮肤就可以停止list的滚动监听
        //this.icon_list.vScrollBarSkin = null;
        //this.icon_list.hScrollBarSkin = null;
    };
    /**
   * 选择列表渲染
   */
    GeneralListColorView.prototype.onListRender = function (cell, index) {
        if (index > this.icon_list.array.length) {
            return;
        }
        var data = this.icon_list.array[index];
        var g = player.generals[data.id];
        if (g) {
            cell.icon_img.skin = "icon/general" + data.icon + "_0.png";
            cell.level.text = g.level.toString();
            cell["star" + g.star].visible = true;
        }
        else {
            cell.blevel.visible = false;
            cell.icon_img.skin = "icon/general" + data.icon + "_1.png";
        }
    };
    ;
    /**
     *获取选择列表数据
     */
    GeneralListColorView.prototype.getRankDatas = function (color) {
        var data = new Array;
        for (var k in tb_game.general) {
            var g = tb_game.general[k];
            if (g.colour == color) {
                data.push(g);
            }
        }
        return data;
    };
    ;
    return GeneralListColorView;
}(ui.info.GeneralListColorUI));
//# sourceMappingURL=GeneralListColorView.js.map