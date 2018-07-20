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
* 游戏结束
*/
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.graphics.drawRect(0, 0, _this.width, _this.height, "#000000");
        _this.game_again.on(Laya.Event.CLICK, _this, _this.again);
        _this.game_change.on(Laya.Event.CLICK, _this, _this.gameChange);
        return _this;
    }
    GameOver.prototype.again = function () {
        this.removeSelf();
        game.startGame();
    };
    GameOver.prototype.gameChange = function () {
        this.removeSelf();
        game.state = Define.Game_ChangeLevel;
        var view = new GameOverChangeLevel();
        Laya.stage.addChild(view);
    };
    return GameOver;
}(ui.game.GameOverUI));
//# sourceMappingURL=GameOver.js.map