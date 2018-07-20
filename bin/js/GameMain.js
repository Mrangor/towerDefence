// 程序入口
var Main = /** @class */ (function () {
    function Main() {
        Laya.MiniAdpter.init();
        Laya.init(640, 1136, Laya.WebGL);
        this.initStage();
        this.loadResource();
        Laya.URL.basePath = "https://www.xlanc.club/tf/";
    }
    Main.prototype.initStage = function () {
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.bgColor = "#232628";
    };
    Main.prototype.loadResource = function () {
        var uiResArry = [
            { url: "res/atlas/bullet.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/enemy.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/general.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/icon.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/map.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/skill.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/general/1.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(uiResArry, Laya.Handler.create(this, function () {
            console.log(Laya.Browser.now());
            player = new MPlayer();
            game = new Game();
            game.init();
            game.mapView = new MapView();
            Laya.stage.addChild(game.mapView);
            if (game.state == Define.Game_No) {
                var mapChangeView = new MapChangeView();
                Laya.stage.addChild(mapChangeView);
            }
            else if (game.state == Define.Game_Over) {
                var view = new GameOver();
                Laya.stage.addChild(view);
            }
            else if (game.state == Define.Game_ChangeLevel) {
                var view = new GameOverChangeLevel();
                Laya.stage.addChild(view);
            }
            else {
                game.startGame();
            }
        }));
    };
    return Main;
}());
new Main();
//# sourceMappingURL=GameMain.js.map