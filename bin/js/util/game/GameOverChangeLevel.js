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
* 游戏结束选择关卡
*/
var GameOverChangeLevel = /** @class */ (function (_super) {
    __extends(GameOverChangeLevel, _super);
    function GameOverChangeLevel() {
        var _this = _super.call(this) || this;
        _this.to1_btn.on(Laya.Event.CLICK, _this, _this.toLevel, [1]);
        var level = Math.floor(game.level / 10) + 1;
        if (level > 1) {
            _this.to_lately_btn.on(Laya.Event.CLICK, _this, _this.toLevel, [level]);
        }
        else {
            _this.to_lately_btn.visible = false;
        }
        return _this;
    }
    GameOverChangeLevel.prototype.toLevel = function (level) {
        game.level = level;
        game.state = Define.Game_No;
        game.resetStone();
        this.removeSelf();
        var view = new MapChangeView();
        Laya.stage.addChild(view);
    };
    return GameOverChangeLevel;
}(ui.game.GameOverChangeLevelUI));
//# sourceMappingURL=GameOverChangeLevel.js.map