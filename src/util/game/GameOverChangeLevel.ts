/*
* 游戏结束选择关卡
*/
class GameOverChangeLevel extends ui.game.GameOverChangeLevelUI {
    constructor() {
        super();
        this.to1_btn.on(Laya.Event.CLICK, this, this.toLevel, [1]);
        var level = Math.floor(game.level / 10) + 1;
        if (level > 1) {
            this.to_lately_btn.on(Laya.Event.CLICK, this, this.toLevel, [level]);
        }
        else {
            this.to_lately_btn.visible = false;
        }
    }
    private toLevel(level: number): void {
        game.level = level;
        game.state = Define.Game_No;
        game.resetStone();
        this.removeSelf();
        var view = new MapChangeView();
        Laya.stage.addChild(view);
    }

}