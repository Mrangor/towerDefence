/*
* 下一关UI
*/
class NextLevel extends ui.game.NextLevelUI {
    constructor() {
        super();
        this.pos((Laya.stage.width) / 2, (Laya.stage.height) / 2);
        this.txt.visible = true;
        this.txt.changeText("通关了\n点击再来");
        this.on(Laya.Event.CLICK, this, this.resetGame);

    }
    /**
     * 重新开始游戏
     */
    private resetGame(): void {
        this.removeSelf();
        game.level = 1;
        game.startGame();
    }
}