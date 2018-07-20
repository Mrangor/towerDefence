/*
* 普通怪物
*/
class EnemyStone extends Enemy {
    public stone: MStone;//正在攻击的石头
    private dt: number = 0;
    public constructor(enemyId: number, time: number, posX: number, posY: number) {
        super(enemyId, time, posX, posY);
    }
    /**
     * 进行移动
     */
    public next(): void {
        if (this.posNodes && this.posNodes.length > 0) {
            this.posNode = this.posNodes.shift();
            this.nextPos = Utils.calc_pos_xy(this.posNode);
            //计算方位
            this.angle = Utils.angle(this.x, this.y, this.nextPos.x, this.nextPos.y);
            this.playEnemy(this.angle);
        } else {
            if (this.stone) {
                if (this.stone.hp > 0) {
                    this.startHit();
                } else {
                    this.findNode();
                }
            } else {
                //没有攻击石头 没有目的地直接结束
                game.gameOver();
            }
        }
    }
    public updatePos(): void {
        if (this.angle != Define.Enemy_Hit) {
            super.updatePos();
        } else {
            if (this.stone.hp <= 0) {
                this.endHit();
                this.next();
            } else if (this.isHit()) {
                this.stone.updataHp(this.harm);
            }
        }
    }

    /**
     *攻击:true表可以攻击
     */
    public isHit(): boolean {
        if (this.move == 0) {
            this.dt -= Define.UpdateTime;
            if (this.dt <= 0) {
                this.dt = 0;
            }
        }
        let hit = this.dt == 0;
        if (hit) {
            this.hitStone();
        }
        return hit;
    }
    /**
      *计算下一处出手时间
      */
    public hitStone(): void {
        this.dt = this.harmtime;
    }
    /**
     * 开始攻击
     */
    public startHit() {
        this.angle = Define.Enemy_Hit;
        this.hitStone();
        this.playEnemy(Define.Enemy_Hit);
    }
    /**
     * 结束攻击
     */
    public endHit() {
        this.angle = Define.Enemy_RIGHT;
        this.posNodes.push(this.stone.nextAnode);
    }
    /**
     * 选择目的点
     */
    public findNode() {
        //计算运动轨迹
        let row = 0
        if (this.stone) {
            row = this.stone.row;
        }
        let stone = EnemyHit.getStonePos(row + 1);
        if (stone) {
            this.stone = stone;
            let node = stone.anode;
            this.posNodes = AStar.findA(game.NODES, this.posNode, node);
        } else {
            this.stone = null;
            this.posNodes = AStar.findA(game.NODES, this.posNode, Define.endNode);
        }
    }

}