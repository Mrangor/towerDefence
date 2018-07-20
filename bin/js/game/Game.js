/*
* 游戏中心
*/
var Game = /** @class */ (function () {
    function Game() {
        //记录关卡
        this._level = 1;
        //运行数据
        this._state = Define.Game_No; //状态
        this.enemys = []; //怪物集合
        this.generals = {}; //英雄集合
        this.bullets = []; //子弹集合
        this.skills = []; //技能集合
        this.stones = {}; //石头
        this.enemySpeed = 1;
        this.skillId = 0; //准备释放的技能
        this.nextTime = 3000; //下一关时间
        this._stop = true; //
    }
    Game.prototype.init = function () {
        this.NODES = Define.NODES;
        //1加载关卡数据
        var level = Laya.LocalStorage.getItem("level");
        if (level) {
            this._level = Number(level);
        }
        var state = Laya.LocalStorage.getItem("state");
        if (state) {
            this._state = Number(state);
        }
        //2加载英雄数据
        for (var gpos = 1; gpos <= 9; gpos++) {
            var generalId = Laya.LocalStorage.getItem("pos_" + gpos);
            if (generalId) {
                var g = new General(Number(generalId), gpos);
                this.generals[gpos] = g;
            }
        }
        //第一次初始化数据 石头
        for (var spos = 1; spos <= 9; spos++) {
            var hp = Laya.LocalStorage.getItem("stone_" + spos);
            var ms = new MStone(spos);
            if (hp) {
                ms.hp = Number(hp);
            }
            this.stones[spos] = ms;
        }
        Laya.timer.loop(Define.UpdateTime, this, this.loop);
    };
    /**
     * 循环方法
     */
    Game.prototype.loop = function () {
        if (this._stop) {
            return;
        }
        if (this.state != Define.Game_Next && this.state != Define.Game_Start) {
            return;
        }
        if (this.state == Define.Game_Next) {
            this.nextTime -= Define.UpdateTime;
            if (this.nextTime <= 0) {
                this.state = Define.Game_Start;
            }
        }
        else if (this.state == Define.Game_Start) {
            if (this.enemys.length == 0 && this.levelEnemy.enemys.length == 0) {
                this.nextLevel();
            }
            else {
                //刷新怪物
                this.flushEnemy();
            }
        }
        //修改怪物位置
        for (var i = this.enemys.length - 1; i >= 0; i--) {
            var enemy = this.enemys[i];
            enemy.updatePos();
        }
        //检测子弹攻击
        for (var i = this.bullets.length - 1; i >= 0; i--) {
            var bullet = this.bullets[i];
            bullet.updatePos();
        }
        for (var i in player.skills) {
            var skill = player.skills[i];
            skill.flushCDTime();
        }
        //检测子弹攻击
        for (var i = this.skills.length - 1; i >= 0; i--) {
            var skill = this.skills[i];
            skill.updata();
        }
        //检测攻击
        for (var k in this.generals) {
            var val = this.generals[k];
            if (val.isHit()) {
                var gen = val.tb;
                var harm = gen.zharm;
                var distance = gen.distance;
                var harmType = gen.harmType;
                var range = gen.range;
                var posx = val.posx;
                var posy = val.posy;
                if (harmType == Define.Harm_Bullet) {
                    var enemy = this.findEnemy(distance, posx, posy, val.enemy);
                    if (enemy) {
                        val.hitEnemy(enemy);
                        var bullet = new Bullet(enemy, gen.bulletType, harm, gen.range, posx, posy);
                        this.bullets.push(bullet);
                    }
                }
                else if (harmType == Define.Harm_Nomeral) {
                    var enemy = this.findEnemy(distance, posx, posy, val.enemy);
                    if (enemy) {
                        val.hitEnemy(enemy);
                        var hit = new Laya.Animation();
                        hit.loadAnimation("ani/hit.ani");
                        hit.play();
                        enemy.addChild(hit);
                        Laya.timer.once(500, enemy, function () {
                            hit.removeSelf();
                            hit.destroy();
                        });
                        enemy.harmHp(harm);
                    }
                }
            }
        }
    };
    /**
     * 开始游戏
     */
    Game.prototype.startGame = function () {
        if (!this.isGeneral()) {
            return;
        }
        this._stop = false;
        this.state = Define.Game_Start;
        if (this.enemys) {
            for (var i = this.enemys.length - 1; i >= 0; i--) {
                var enemy = this.enemys[i];
                enemy.remove();
            }
        }
        if (this.bullets) {
            for (var i = this.bullets.length - 1; i >= 0; i--) {
                var bullet = this.bullets[i];
                bullet.remove();
            }
        }
        if (this.skills) {
            for (var i = this.skills.length - 1; i >= 0; i--) {
                var skill = this.skills[i];
                skill.remove();
            }
        }
        for (var k = 4; k <= 6; k++) {
            var skill = player.skills[k];
            skill.resetCDTime();
        }
        this.bullets = [];
        this.enemys = [];
        this.levelEnemy = new LevelEnemy(this._level);
        if (!this.generals) {
            this.generals = [];
        }
    };
    /**
      * 暂停游戏
      */
    Game.prototype.stop = function () {
        console.log("暂停游戏");
        if (this._stop) {
            return;
        }
        this._stop = true;
    };
    /**
    * 暂停结束
    */
    Game.prototype.stopover = function () {
        if (!this._stop) {
            return;
        }
        this._stop = false;
    };
    /**
     * 获取攻击目标(单个目标)
     * @param distance
     * @param range
     * @param x1
     * @param y1
     */
    Game.prototype.findEnemy = function (distance, x1, y1, enemy) {
        var arr = [];
        this.enemys.forEach(function (val, idx, array) {
            if (!val.die && Utils.isDistance(distance, x1, y1, val.x, val.y)) {
                arr.push(val);
            }
        });
        if (arr.length == 0) {
            return null;
        }
        if (enemy && arr.indexOf(enemy) > 0) {
            return enemy;
        }
        var index = Utils.nextNumber(0, arr.length - 1);
        return arr[index];
    };
    /**
    * 获取攻击目标(多个目标)
    * @param distance
    * @param range
    * @param x1
    * @param y1
    */
    Game.prototype.findEnemys = function (distance, x1, y1) {
        var arr = [];
        this.enemys.forEach(function (val, idx, array) {
            if (!val.die && Utils.isDistance(distance, x1, y1, val.x, val.y)) {
                arr.push(val);
            }
        });
        return arr;
    };
    /**
     * 刷新怪物
     */
    Game.prototype.flushEnemy = function () {
        if (!this.levelEnemy) {
            return;
        }
        //刷新怪物
        this.levelEnemy.flushEnemy();
    };
    Game.prototype.gameOver = function () {
        if (this.state != Define.Game_Start) {
            return;
        }
        this.state = Define.Game_Over;
        console.log("游戏结束");
        var gameOver = new GameOver();
        Laya.stage.addChild(gameOver);
    };
    /**
     *过关表现
     */
    Game.prototype.nextLevel = function () {
        var next = game.level + 1;
        if (tb_game.level[next]) {
            console.log("进入下一关");
            game.level = next;
            player.changeLevel(game.level);
            this.levelEnemy = new LevelEnemy(this._level);
            //3秒后进入下一关
            this.state = Define.Game_Next;
            this.nextTime = 3000;
        }
        else {
            game.stop();
            console.log("通关提示");
            var nextLevel = new NextLevel();
            Laya.stage.addChild(nextLevel);
        }
    };
    /**
     * 怪物变速
     */
    Game.prototype.enemySpeedUp = function (enemySpeed) {
        console.log("怪物加速:" + enemySpeed);
        this.enemySpeed = enemySpeed;
    };
    /**
    * 怪物变速
    */
    Game.prototype.hitEnemy = function (harm) {
        console.log("怪物受伤:" + harm);
        if (this.enemys) {
            for (var i = 0; i < this.enemys.length; i++) {
                var enemy = this.enemys[i];
                enemy.harmHp(harm);
            }
        }
    };
    Object.defineProperty(Game.prototype, "generalIds", {
        get: function () {
            var ids = new Array;
            for (var k in this.generals) {
                var val = this.generals[k];
                ids.push(val.generalId);
            }
            return ids;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否有武将防守
     */
    Game.prototype.isGeneral = function () {
        for (var k in this.generals) {
            var val = this.generals[k];
            if (val) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(Game.prototype, "level", {
        /**
         * 获取关卡
         */
        get: function () {
            return this._level;
        },
        /**
        * 保存关卡进度
        */
        set: function (level) {
            this._level = level;
            notifyManager.event(NotifyType.MapLevel);
            Laya.LocalStorage.setItem("level", this._level.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "state", {
        /**
         *获取游戏状态
         */
        get: function () {
            return this._state;
        },
        /**
         * 设置游戏状态
         */
        set: function (state) {
            this._state = state;
            Laya.LocalStorage.setItem("state", this._state.toString());
        },
        enumerable: true,
        configurable: true
    });
    /**
   * 重置石头血量
   */
    Game.prototype.resetStone = function () {
        for (var k in this.stones) {
            var stone = this.stones[k];
            stone.reset();
        }
    };
    return Game;
}());
var game;
//# sourceMappingURL=Game.js.map