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
* 召唤界面
*/
var RecruitView = /** @class */ (function (_super) {
    __extends(RecruitView, _super);
    function RecruitView() {
        var _this = _super.call(this) || this;
        _this.close_btn.on(Laya.Event.CLICK, _this, _this.closeBtn);
        _this.btn1.on(Laya.Event.CLICK, _this, _this.recruit, [1]);
        _this.btn2.on(Laya.Event.CLICK, _this, _this.recruit, [2]);
        _this.btn3.on(Laya.Event.CLICK, _this, _this.recruit, [3]);
        notifyManager.on(NotifyType.Money1Change, _this, _this.money1Change);
        notifyManager.on(NotifyType.Money2Change, _this, _this.money2Change);
        _this.money1Change();
        _this.money2Change();
        return _this;
    }
    RecruitView.prototype.recruit = function (num) {
        var r = tb_game.recruit[num];
        if (player.money2 < r.money2 || player.money1 < r.money1) {
            return;
        }
        //随机英雄1
        if (r.money1 > 0) {
            player.addmoney1(-r.money1);
        }
        if (r.money2 > 0) {
            player.addmoney2(-r.money2);
        }
        //RecruitGIDs
        var gid = 0;
        if (num == 1) { //初始玩家固定出这几个英雄
            for (var k in Define.RecruitGIDs) {
                var id = Define.RecruitGIDs[k];
                var g = player.generals[Define.RecruitGIDs[id]];
                if (!g) {
                    gid = id;
                    break;
                }
            }
        }
        if (gid == 0) {
            gid = this.randon(num);
        }
        var general = new MGeneral(gid);
        this._name.text = general.name;
        this._name.color = Utils.getColour(general.colour);
        player.addGeneral(general);
        Laya.loader.load("res/atlas/general/" + general.icon + ".atlas", Laya.Handler.create(this, this.playAni, [general.icon], false), null, Laya.Loader.ATLAS);
    };
    /**
     * 随机英雄
     * @param num
     */
    RecruitView.prototype.randon = function (num) {
        var rs = tb_game.recruit_rate[num];
        var total = 0;
        for (var k in rs) {
            var r_1 = rs[k];
            total += r_1.rate;
        }
        var effRate = Utils.nextNumber(0, total);
        var temp = 0;
        var gid = 1;
        for (var id in rs) {
            var r_2 = rs[id];
            temp += r_2.rate;
            if (effRate <= temp) {
                gid = Number(id);
                break;
            }
        }
        return gid;
    };
    RecruitView.prototype.playAni = function (icon) {
        this._ani.loadAnimation("ani/general/" + icon + ".ani");
        this._ani.play(0, true, Define.General_Stand);
        this._ani.visible = true;
        this._name.visible = true;
    };
    RecruitView.prototype.money1Change = function () {
        this.money1.text = player.money1.toString();
    };
    RecruitView.prototype.money2Change = function () {
        if (player.money2 < 10) {
            this.bg1.loadImage("map/btn.png");
        }
        if (player.money2 < 30) {
            this.bg2.loadImage("map/btn.png");
        }
        this.money2.changeText(player.money2.toString());
    };
    /**
    * 关闭列表
    */
    RecruitView.prototype.closeBtn = function () {
        this.removeSelf();
        this.destroy(false);
        game.stopover();
    };
    return RecruitView;
}(ui.game.RecruitUI));
//# sourceMappingURL=RecruitView.js.map