/*
* 游戏结束
*/
class GameOver extends ui.game.GameOverUI {
    constructor() {
        super();
        this.graphics.drawRect(0, 0, this.width, this.height, "#000000");
        this.game_again.on(Laya.Event.CLICK, this, this.again);
        this.game_change.on(Laya.Event.CLICK, this, this.gameChange);
    }
    private again(): void {
        this.removeSelf();
        game.startGame();
    }
    private gameChange(): void {
        this.removeSelf();
        game.state = Define.Game_ChangeLevel;
        let view = new GameOverChangeLevel();
        Laya.stage.addChild(view);
    }
}