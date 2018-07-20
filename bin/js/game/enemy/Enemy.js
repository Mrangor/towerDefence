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
* 普通怪物
*/
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(enemyId, time, posX, posY) {
        var _this = _super.call(this) || this;
        _this.die = false;
        _this.angle = Define.Enemy_DOWN; //方向：默认向下走
        _this.move = 0;
        _this.dieTime = 1500;
        _this.posNode = new ANode(posX, posY);
        _this.enemyId = enemyId;
        _this.time = time;
        _this.hp = _this.maxhp;
        return _this;
    }
    Enemy.prototype.initEnemy = function () {
        this.loadAnimation("ani/enemy/" + this.icon + ".ani", Laya.Handler.create(this, this.onLoaded), "res/atlas/enemy/" + this.icon + ".atlas");
    };
    Enemy.prototype.onLoaded = function () {
        var sp = new Laya.Sprite();
        sp.loadImage("enemy/" + this.icon + "/enemy" + this.icon + "_1_1.png");
        sp.scale(0.5, 0.5);
        this.height = sp.height;
        this.width = sp.width;
        var pos = Utils.calc_pos_xy(this.posNode);
        this.pos(pos.x, pos.y);
        //创建血条
        this.hpBar = new Laya.ProgressBar("enemy/hp.png");
        this.hpBar.width = 42;
        this.hpBar.y = -this.height / 2;
        this.hpBar.pivotX = this.hpBar.width / 2;
        this.hpBar.sizeGrid = "5,5,5,5";
        this.hpBar.value = this.hp / this.maxhp;
        this.addChild(this.hpBar);
        game.mapView.game_map.addChild(this);
        var index = game.levelEnemy.enemys.indexOf(this);
        if (index > -1) {
            game.enemys.push(this);
            game.levelEnemy.enemys.splice(index, 1);
            //计算运动轨迹
            this.findNode();
            this.next();
        }
    };
    Enemy.prototype.next = function () {
        if (this.posNodes && this.posNodes.length > 0) {
            this.posNode = this.posNodes.shift();
            this.nextPos = Utils.calc_pos_xy(this.posNode);
            //计算方位
            this.angle = Utils.angle(this.x, this.y, this.nextPos.x, this.nextPos.y);
            this.playEnemy(this.angle);
        }
        else {
            game.gameOver();
        }
    };
    /**
     * 修改怪物位置
     */
    Enemy.prototype.updatePos = function () {
        if (this.die) {
            this.dieTime -= Define.UpdateTime;
            if (this.dieTime <= 0) {
                this.remove();
            }
        }
        else if (this.move == 0) {
            if (this.angle == Define.Enemy_RIGHT) {
                var x = this.x + (this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate);
                this.x = x;
                if (x >= this.nextPos.x) {
                    this.x = this.nextPos.x;
                    this.next();
                }
            }
            else if (this.angle == Define.Enemy_LIFT) {
                var x = this.x - (this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate);
                this.x = x;
                if (x <= this.nextPos.x) {
                    this.x = this.nextPos.x;
                    this.next();
                }
            }
            else if (this.angle == Define.Enemy_UP) {
                var y = this.x - (this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate);
                this.y = y;
                if (y <= this.nextPos.y) {
                    this.y = this.nextPos.y;
                    this.next();
                }
            }
            else if (this.angle == Define.Enemy_DOWN) {
                var y = this.y + (this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate);
                this.y = y;
                if (y >= this.nextPos.y) {
                    this.y = this.nextPos.y;
                    this.next();
                }
            }
            this.zOrder = this.y + this.x;
        }
    };
    /**
     * 暂停
     */
    Enemy.prototype.stopMove = function () {
        this.move++;
        this.stop();
    };
    /**
     * 结束暂停
     */
    Enemy.prototype.stopOverMove = function () {
        this.move--;
        if (this.move == 0) {
            this.play();
        }
    };
    /**
     * 选择目的点
     */
    Enemy.prototype.findNode = function () {
        this.posNodes = AStar.findA(game.NODES, this.posNode, Define.endNode);
    };
    /**
     * 怪物死亡
     */
    Enemy.prototype.diePlay = function () {
        if (this.die) {
            return;
        }
        this.die = true;
        this.hpBar.visible = false;
        this.playEnemy(Define.Enemy_Die, false);
    };
    /**
     * 清理数据
     */
    Enemy.prototype.remove = function () {
        var index = game.enemys.indexOf(this);
        if (index > -1) {
            game.enemys.splice(index, 1);
        }
        this.removeSelf();
    };
    /**
     * 运行动画
     * @param loop
     * @param name
     * @param showWarn
     */
    Enemy.prototype.playEnemy = function (name, loop) {
        if (loop === void 0) { loop = true; }
        this.play(0, loop, name + "");
    };
    /**
     * 受到攻击
     * @param harm
     */
    Enemy.prototype.harmHp = function (harm) {
        var hp = this.hp - harm;
        hp = hp < 0 ? 0 : hp;
        this.hp = hp;
        this.hpBar.value = this.hp / this.maxhp;
        if (hp == 0) {
            //产出
            var m3 = this.getMoney3() * player.addSkillMoney3();
            player.addmoney3(m3);
            var m1Rate = this.getMoney1Rate();
            var m1Num = Math.floor(m1Rate / 100);
            var m1r = Math.floor(m1Rate % 100);
            if (Utils.nextNumber(0, 100) <= m1r) {
                m1Num += 1;
            }
            if (m1Num > 0) {
                new MoneyAdd(1, m1Num, this.x, this.y);
            }
            if (Utils.nextNumber(0, 100) <= this.getMoney2Rate()) {
                new MoneyAdd(2, 1, this.x, this.y);
            }
            var m2Rate = this.getMoney2Rate();
            var m2Num = Math.floor(m2Rate / 100);
            var m2r = Math.floor(m2Rate % 100);
            if (Utils.nextNumber(0, 100) <= m2r) {
                m2Num += 1;
            }
            if (m2Num > 0) {
                m2Num = m2Num * player.addSkillMoney2();
                new MoneyAdd(2, m2Num, this.x, this.y);
            }
            this.diePlay();
        }
    };
    /**
     * 子弹碰撞检测
     */
    Enemy.prototype.collide = function (x, y) {
        var minx = this.x - 10;
        var maxx = this.x + 10;
        var miny = this.y - 10;
        var maxy = this.y + 10;
        return x >= minx && x <= maxx && y >= miny && y <= maxy;
    };
    Object.defineProperty(Enemy.prototype, "maxhp", {
        /**
          * 最大血量
          */
        get: function () {
            return tb_game.enemy[this.enemyId].hp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "speed", {
        /**
         * 速度
         */
        get: function () {
            return tb_game.enemy[this.enemyId].speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "icon", {
        /**
         * 图片数量
         */
        get: function () {
            return tb_game.enemy[this.enemyId].icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "iconnum", {
        /**
         * 图片数量
         */
        get: function () {
            return tb_game.enemy[this.enemyId].icon_num;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取速度
     */
    Enemy.prototype.getSpeed = function () {
        return this.speed;
    };
    /**
     * 紫金概率
     */
    Enemy.prototype.getMoney1Rate = function () {
        return tb_game.enemy[this.enemyId].money1_rate;
    };
    /**
    * 绿钻概率
    */
    Enemy.prototype.getMoney2Rate = function () {
        return tb_game.enemy[this.enemyId].money2_rate;
    };
    /**
     * 金币数量
     */
    Enemy.prototype.getMoney3 = function () {
        return tb_game.enemy[this.enemyId].money3;
    };
    Object.defineProperty(Enemy.prototype, "harm", {
        /**
        * 攻击伤害
        */
        get: function () {
            return tb_game.enemy[this.enemyId].harm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "harmtime", {
        /**
        * 攻击时间
        */
        get: function () {
            return tb_game.enemy[this.enemyId].harm_time;
        },
        enumerable: true,
        configurable: true
    });
    return Enemy;
}(Laya.Animation));
//# sourceMappingURL=Enemy.js.map