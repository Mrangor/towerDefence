var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 子弹
*/
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(target, type, harm, range, posx, posy) {
        var _this = _super.call(this) || this;
        _this.speed = 4; //100
        _this.target = target;
        _this.type = type;
        _this.harm = harm;
        _this.range = range;
        _this.pos(posx, posy);
        _this.createBullet();
        return _this;
    }
    Bullet.prototype.createBullet = function () {
        this.initAnimation();
        this.pivot(this.width / 2, this.height / 2);
        this.interval = 50;
        this.playAni(0, true, "fly");
        this.zOrder = 10000;
        game.mapView.addChild(this);
    };
    /**
     * 清理数据
     */
    Bullet.prototype.remove = function () {
        this.removeSelf();
        var index = game.bullets.indexOf(this);
        if (index > -1) {
            game.bullets.splice(index, 1);
        }
    };
    /**
     * 运行动画
     * @param start
     * @param loop
     * @param name
     * @param showWarn
     */
    Bullet.prototype.playAni = function (start, loop, name, showWarn) {
        this.play(start, loop, "bullet" + this.type + name, showWarn);
    };
    /**
     * 初始化动画
     */
    Bullet.prototype.initAnimation = function () {
        var sp = new Laya.Sprite();
        sp.loadImage("bullet/bullet" + this.type + "_1.png");
        sp.scale(0.5, 0.5);
        this.height = sp.height;
        this.width = 70;
        Laya.Animation.createFrames(this.aniUrls("fly", 1, 1), "bullet" + this.type + "fly");
    };
    /**
    * 动画数据
    * @param aniName
    * @param start
    * @param end
    */
    Bullet.prototype.aniUrls = function (aniName, start, end) {
        var urls = [];
        for (var i = start; i <= end; ++i) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push("bullet/bullet" + this.type + "_" + i + ".png");
        }
        return urls;
    };
    /**
     * 更新子弹位置
     */
    Bullet.prototype.updatePos = function () {
        var _this = this;
        var speed = this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate; //单位速度
        var angle = Math.atan2((this.target.y - this.y), (this.target.x - this.x)); //弧度  0.6435011087932844
        var x = Math.cos(angle) * speed;
        var y = Math.sin(angle) * speed;
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
            }
            else {
                var enemys = game.findEnemys(this.range, this.x, this.y);
                enemys.forEach(function (val, idx, array) {
                    val.harmHp(_this.harm);
                });
            }
        }
    };
    return Bullet;
}(Laya.Animation));
//# sourceMappingURL=Bullet.js.map