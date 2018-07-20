/*
* 等级怪物
*/
var LevelEnemy = /** @class */ (function () {
    function LevelEnemy(level) {
        this.enemys = []; //怪物集合
        this.enemys = [];
        this.dt = 0;
        var gameLevel = tb_game.level[level];
        if (gameLevel) {
            for (var k in gameLevel) {
                var e = gameLevel[k];
                if (e) {
                    var tb = tb_game.enemy[e.enemy];
                    if (tb.ai == Define.Enemy_Ai_Nomeral) {
                        var enemy = new Enemy(e.enemy, e.time, e.pos_x, e.pos_y);
                        this.enemys.push(enemy);
                    }
                    if (tb.ai == Define.Enemy_Ai_Stone) {
                        var enemy = new EnemyStone(e.enemy, e.time, e.pos_x, e.pos_y);
                        this.enemys.push(enemy);
                    }
                }
            }
            // let enemy = new EnemyStone(2, 0);
            // this.enemys.push(enemy);
        }
    }
    /**
    * 刷新怪物
    */
    LevelEnemy.prototype.flushEnemy = function () {
        this.dt += Define.UpdateTime;
        //刷新怪物
        for (var i = this.enemys.length - 1; i >= 0; i--) {
            var enemy = this.enemys[i];
            if (enemy.time <= this.dt) {
                enemy.initEnemy();
            }
        }
    };
    return LevelEnemy;
}());
//# sourceMappingURL=LevelEnemy.js.map