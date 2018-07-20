/*
* 冰冻技能效果
*/
class Skill5 extends Skill {
    private time: number = 4000;//开始时间
    private sphere: Laya.Animation;
    private enemys: Array<Enemy>;
    private state: number = 1;//1冰冻2破碎
    constructor(x: number, y: number) {
        super(x, y);
        this.sphere = new Laya.Animation;
        this.sphere.loadAnimation("ani/skill/" + 5 + ".ani", Laya.Handler.create(this, this.onLoaded), "res/atlas/skill/" + 5 + ".atlas");


    }
    public onLoaded() {
        this.sphere.x = this.x;
        this.sphere.y = this.y;
        game.mapView.game_ui.addChild(this.sphere);
        game.skills.push(this);
        this.sphere.play(0, false, "1");
        //暂停效果
        this.enemys = game.findEnemys(50, this.x, this.y);
        this.enemys.forEach((val, idx, array) => {
            val.stopMove();
        });

    }
    /**
     * 更新技能动画
     */
    public updata() {
        this.time -= Define.UpdateTime;
        if (this.time < 0) {
            this.time = 0;
        }
        if (this.state == 1) {
            if (this.time == 0) {
                this.sphere.play(0, false, "2");
                this.state = 2;
                this.time = 1000;
            }
        } else if (this.state == 2) {
            if (this.time == 0) {
                this.remove();
            }
        }

    }
    public remove() {
        //移除暂停效果
        this.enemys.forEach((val, idx, array) => {
            val.stopOverMove();
        });
        this.sphere.removeSelf();
        let index = game.skills.indexOf(this);
        game.skills.splice(index, 1);
    }
}