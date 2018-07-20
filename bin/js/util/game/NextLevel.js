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
* 下一关UI
*/
var NextLevel = /** @class */ (function (_super) {
    __extends(NextLevel, _super);
    function NextLevel() {
        var _this = _super.call(this) || this;
        _this.pos((Laya.stage.width) / 2, (Laya.stage.height) / 2);
        _this.txt.visible = true;
        _this.txt.changeText("通关了\n点击再来");
        _this.on(Laya.Event.CLICK, _this, _this.resetGame);
        return _this;
    }
    /**
     * 重新开始游戏
     */
    NextLevel.prototype.resetGame = function () {
        this.removeSelf();
        game.level = 1;
        game.startGame();
    };
    return NextLevel;
}(ui.game.NextLevelUI));
//# sourceMappingURL=NextLevel.js.map