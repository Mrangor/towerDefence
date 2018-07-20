/*
* 火球技能效果
*/
class Skill4 extends Skill {
    private static RTime: number = 1000;//消失时间
    private static ZTime: number = 2000;//下落时间
    private harm: number;
    private time: number = 0;//下落时间
    private sphere: Laya.Animation;//下落球体
    private shadow: Laya.Sprite;//影子
    private state: number = 1;//1下落状态 2消失状态

    private speed: number;
    constructor(harm: number, x: number, y: number) {
        super(x, y);
        this.harm = harm;
        this.sphere = new Laya.Animation;
        this.sphere.loadAnimation("ani/skill/" + 4 + ".ani", Laya.Handler.create(this, this.onLoaded), "res/atlas/skill/" + 4 + ".atlas");

    }
    public onLoaded() {
        this.sphere.x = this.x;
        this.sphere.y = -100;
        this.speed = (this.y + 100) * Define.UpdateTime / Skill4.ZTime;
        //影子
        this.shadow = new Laya.Sprite();
        this.shadow.graphics.drawCircle(0, 0, 1, "#000000");
        this.shadow.x = this.x;
        this.shadow.y = this.y;
        this.shadow.visible = true;

        game.skills.push(this);
        game.mapView.bg.addChild(this.shadow);
        game.mapView.game_ui.addChild(this.sphere);
        this.sphere.play(0, true, "fly");

    }
    /**
     * 更新技能动画
     */
    public updata() {
        this.time += Define.UpdateTime;
        if (this.state == 1) {//下落
            if (this.time > Skill4.ZTime) {
                this.time = Skill4.ZTime;
            }
            //位置移动
            this.sphere.y += this.speed;
            //改变影子大小
            this.shadow.scaleX = this.time * 30 / Skill4.ZTime;
            this.shadow.scaleY = this.time * 30 / Skill4.ZTime;
            if (this.time == Skill4.ZTime) {
                this.shadow.visible = false;
                this.sphere.play(0, false, "boom");
                this.state = 2;
                this.time = 0;
                //计算伤害
                let enemys = game.findEnemys(100, this.x, this.y);
                enemys.forEach((val, idx, array) => {
                    val.harmHp(this.harm);
                });
            }
        } else
            if (this.state == 2) {
                if (this.time > Skill4.RTime) {
                    this.time = Skill4.RTime;
                }
                if (this.time == Skill4.RTime) {
                    this.remove();
                }
            }

    }
    public remove() {
        this.sphere.removeSelf();
        this.shadow.removeSelf();
        let index = game.skills.indexOf(this);
        game.skills.splice(index, 1);
    }
}