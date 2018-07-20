/*
* 英雄界面
*/
class GeneralListColorView extends ui.info.GeneralListColorUI {
    constructor(color: number) {
        super();
        this.initList(color);
    }
    /**
     * 初始化ListUI
     */
    private initList(color: number) {
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
    }
    /**
   * 选择列表渲染
   */
    public onListRender(cell: ui.info.GeneralIconUI, index: number) {
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
    /**
     *获取选择列表数据
     */
    private getRankDatas(color: number) {
        var data = new Array;
        for (var k in tb_game.general) {
            var g = tb_game.general[k];
            if (g.colour == color) {
                data.push(g);
            }
        }
        return data;
    };
}
