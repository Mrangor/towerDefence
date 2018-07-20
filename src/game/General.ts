/*
* 英雄
*/
class General extends Laya.Animation {
    //记录参数
    public generalId: number;//英雄类型
    public gpos: number;//英雄位置
    //
    public posx: number;
    public posy: number;
    private dt: number = 0;//下一次出手时间
    private stad_dt: number = 0;//下一次出手时间
    public enemy:Enemy;//上一次攻击的怪物(英雄默认攻击同一个怪)
    public constructor(generalId: number, gpos: number) {
        super();
        this.generalId = generalId;
        this.gpos = gpos;
        this.loadAnimation("ani/general/" + this.tb.icon + ".ani", Laya.Handler.create(this, this.onLoaded,[],false), "res/atlas/general/" + this.tb.icon + ".atlas");
    }

    public onLoaded() {
        this.pos(0, -20);
        this.scaleX = -1;
        this.width = 30;
        this.height = 50;
        this.interval = 50;
        this.play(0, true, Define.General_Stand);
        //保存位置信息
        Laya.LocalStorage.setItem("pos_" + this.gpos, this.generalId.toString());
    }
    /**
     * 清理数据
     */
    public remove(): void {
        this.removeSelf();
        this.destroy();
    }
    /**
    *计算下一处出手时间
    */
    public hitEnemy(enemy:Enemy): void {
        this.enemy=enemy;
        if (enemy.x < this.posx) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
        }
        this.play(0, false, Define.General_Hit);
        this.dt = this.tb.harmTime;
        this.stad_dt = 500;//1后切换到待机动作
        console.log("攻击时间"+Laya.Browser.now());
    }
    /**
    *攻击
    */
    public isHit(): boolean {
        this.dt -= Define.UpdateTime;
        this.stad_dt -= Define.UpdateTime;
        if (this.dt <= 0) {
            this.dt = 0;
        }
        let hit = this.dt <= 0;
        if (this.stad_dt <= 0) {
            this.stad_dt = 0;
            this.play(0, true, Define.General_Stand);
        }
        return hit;
    }
    public applayFilter1(): void {
        //创建一个发光滤镜
        var glowFilter: Laya.GlowFilter = new Laya.GlowFilter("#ffff00", 20, 0, 0);
        //设置滤镜集合为发光滤镜
        this.filters = [glowFilter];
    }

    public applayFilter(num: number = 1): void {
        //创建一个发光滤镜
        //设置滤镜集合为发光滤镜
        if (num == 1) {
            var glowFilte1: Laya.GlowFilter = new Laya.GlowFilter("#ffff00", 10, 0, 0);
            this.filters = [glowFilte1];
        } else if (num == 2) {
            var glowFilter2: Laya.GlowFilter = new Laya.GlowFilter("#ffff00", 20, 0, 0);
            this.filters = [glowFilter2];
        } else if (num == 3) {
            var glowFilter3: Laya.GlowFilter = new Laya.GlowFilter("#ffff00", 30, 0, 0);
            this.filters = [glowFilter3];
        } else {
            this.filters = [];
            return;
        }
        num++;
        Laya.timer.loop(100, this, this.applayFilter, [num]);
    }
    public get tb(): MGeneral {
        return player.generals[this.generalId];
    }

}