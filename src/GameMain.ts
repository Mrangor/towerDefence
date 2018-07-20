// 程序入口
class Main {
    constructor() {
        Laya.MiniAdpter.init();
        Laya.init(640, 1136, Laya.WebGL);
        this.initStage();
        this.loadResource();
        Laya.URL.basePath = "https://www.xlanc.club/tf/";
    }

    private initStage() {
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.bgColor = "#232628";
    }

    private loadResource() {
        let uiResArry = [
            { url: "res/atlas/bullet.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/enemy.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/general.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/icon.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/map.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/skill.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/general/1.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, () => {
            console.log(Laya.Browser.now());
            player = new MPlayer();
            game = new Game();
            game.init();
            game.mapView = new MapView();
            Laya.stage.addChild(game.mapView);
            if (game.state == Define.Game_No) {
                let mapChangeView = new MapChangeView();
                Laya.stage.addChild(mapChangeView);
            } else if (game.state == Define.Game_Over) {
                let view = new GameOver();
                Laya.stage.addChild(view);
            } else if (game.state == Define.Game_ChangeLevel) {
                let view = new GameOverChangeLevel();
                Laya.stage.addChild(view);
            } else {
                game.startGame();
            }
        }));
    }
}
new Main();