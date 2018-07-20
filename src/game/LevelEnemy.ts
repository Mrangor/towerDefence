/*
* 等级怪物
*/
class LevelEnemy {
    public enemys: Array<Enemy> = [];//怪物集合
    private dt: number;
    constructor(level: number) {
        this.enemys = [];
        this.dt = 0;
        let gameLevel = tb_game.level[level];
        if (gameLevel) {
            for (let k in gameLevel) {
                let e = gameLevel[k];
                if (e) {
                    let tb = tb_game.enemy[e.enemy];
                    if (tb.ai == Define.Enemy_Ai_Nomeral) {
                        let enemy = new Enemy(e.enemy, e.time,e.pos_x,e.pos_y);
                        this.enemys.push(enemy);
                    } if (tb.ai == Define.Enemy_Ai_Stone) {
                        let enemy = new EnemyStone(e.enemy, e.time,e.pos_x,e.pos_y);
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
    public flushEnemy(): void {
        this.dt += Define.UpdateTime;
        //刷新怪物
        for (let i = this.enemys.length - 1; i >= 0; i--) {
            let enemy = this.enemys[i];
            if (enemy.time <= this.dt) {
                enemy.initEnemy();
            }
        }
    }
}