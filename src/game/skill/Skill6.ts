/*
*雷电技能
*/
class Skill6 extends Skill {
    private static RTime: number = 1000;//消失时间
    private static ZTime: number = 500;//下落时间
    private harm: number;
    private time: number = 0;//下落时间
    private sphere: Laya.Animation;//下落雷电
    private state: number = 1;//1下落状态 2消失状态
    private speed: number;
    constructor(harm: number, x: number, y: number) {
        super(x, y);
        this.harm = harm;
        this.sphere = new Laya.Animation;
        this.sphere.loadAnimation("ani/skill/" + 6 + ".ani", Laya.Handler.create(this, this.onLoaded), "res/atlas/skill/" + 6 + ".atlas");

    }
    private onLoaded() {
        this.sphere.x = this.x;
        this.sphere.y = 0;
        let num = this.y / 81;
        this.sphere.scaleY = num;
        game.skills.push(this);
        game.mapView.game_ui.addChild(this.sphere);
        this.sphere.play(0, true, "1");
    }
    /**
     * 更新技能动画
     */
    public updata() {
        this.time += Define.UpdateTime;
        if (this.state == 1) {
            if (this.time > Skill6.ZTime) {
                this.time = Skill6.ZTime;
            }
            if (this.time == Skill6.ZTime) {
                //计算伤害
                let enemys = game.findEnemys(100, this.x, this.y);
                enemys.forEach((val, idx, array) => {
                    val.harmHp(this.harm);
                });
                this.state = 2;
                this.time = 0;
                this.sphere.y = this.y;
                this.sphere.scaleY = 1;
                this.sphere.play(0, false, "2");
            }
        } else
            if (this.state == 2) {
                if (this.time > Skill6.RTime) {
                    this.time = Skill6.RTime;
                }
                if (this.time == Skill6.RTime) {
                    this.remove();
                }
            }

    }
    public remove() {
        this.sphere.removeSelf();
        let index = game.skills.indexOf(this);
        game.skills.splice(index, 1);
    }
}