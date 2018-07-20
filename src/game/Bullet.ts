/*
* 子弹
*/
class Bullet extends Laya.Animation {
    public target: Enemy;//子弹目标
    public type: number;//子弹类型
    public speed: number = 4;//100
    public harm: number;//伤害
    public range: number;//范围

    constructor(target: Enemy, type: number, harm: number, range: number, posx: number, posy: number) {
        super();
        this.target = target;
        this.type = type;
        this.harm = harm;
        this.range = range;
        this.pos(posx, posy);
        this.createBullet();
    }
    public createBullet(): void {
        this.initAnimation();
        this.pivot(this.width / 2, this.height / 2);
        this.interval = 50;
        this.playAni(0, true, "fly");
        this.zOrder = 10000;
        game.mapView.addChild(this);
    }
    /**
     * 清理数据
     */
    public remove(): void {
        this.removeSelf();
        var index = game.bullets.indexOf(this);
        if (index > -1) {
            game.bullets.splice(index, 1);
        }
    }
    /**
     * 运行动画
     * @param start 
     * @param loop 
     * @param name 
     * @param showWarn 
     */
    public playAni(start?: any, loop?: boolean, name?: string, showWarn?: boolean) {
        this.play(start, loop, "bullet" + this.type + name, showWarn);
    }
    /**
     * 初始化动画
     */
    public initAnimation() {
        let sp = new Laya.Sprite();
        sp.loadImage("bullet/bullet" + this.type + "_1.png");
        sp.scale(0.5, 0.5);
        this.height = sp.height;
        this.width = 70;
        Laya.Animation.createFrames(this.aniUrls("fly", 1, 1), "bullet" + this.type + "fly");
    }
    /**
    * 动画数据
    * @param aniName 
    * @param start 
    * @param end 
    */
    private aniUrls(aniName: string, start: number, end: number) {
        let urls: any = [];
        for (var i: number = start; i <= end; ++i) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push("bullet/bullet" + this.type + "_" + i + ".png");
        }
        return urls;
    }
    /**
     * 更新子弹位置
     */
    public updatePos(): void {
        let speed = this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate;//单位速度
        var angle: number = Math.atan2((this.target.y - this.y), (this.target.x - this.x)) //弧度  0.6435011087932844

        let x = Math.cos(angle) * speed;
        let y = Math.sin(angle) * speed;
        this.x += x;
        this.y += y;
        if (this.target.collide(this.x, this.y)) {
            // 发送碰撞 =======
            //console.log("发送碰撞");
            this.remove();
            //播放被攻击特效
            var hit = new Laya.Animation();
            hit.loadAnimation("ani/hit.ani");
            hit.pos(this.x, this.y);
            hit.play();
            game.mapView.addChild(hit);
            Laya.timer.once(500, hit, function () {
                hit.removeSelf();
            });
            if (this.range == 0) {
                //目标受伤
                this.target.harmHp(this.harm);
            } else {
                let enemys = game.findEnemys(this.range, this.x, this.y);
                enemys.forEach((val, idx, array) => {
                    val.harmHp(this.harm);
                });
            }
        }
    }
}