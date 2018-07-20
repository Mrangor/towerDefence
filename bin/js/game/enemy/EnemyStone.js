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
var EnemyStone = /** @class */ (function (_super) {
    __extends(EnemyStone, _super);
    function EnemyStone(enemyId, time, posX, posY) {
        var _this = _super.call(this, enemyId, time, posX, posY) || this;
        _this.dt = 0;
        return _this;
    }
    /**
     * 进行移动
     */
    EnemyStone.prototype.next = function () {
        if (this.posNodes && this.posNodes.length > 0) {
            this.posNode = this.posNodes.shift();
            this.nextPos = Utils.calc_pos_xy(this.posNode);
            //计算方位
            this.angle = Utils.angle(this.x, this.y, this.nextPos.x, this.nextPos.y);
            this.playEnemy(this.angle);
        }
        else {
            if (this.stone) {
                if (this.stone.hp > 0) {
                    this.startHit();
                }
                else {
                    this.findNode();
                }
            }
            else {
                //没有攻击石头 没有目的地直接结束
                game.gameOver();
            }
        }
    };
    EnemyStone.prototype.updatePos = function () {
        if (this.angle != Define.Enemy_Hit) {
            _super.prototype.updatePos.call(this);
        }
        else {
            if (this.stone.hp <= 0) {
                this.endHit();
                this.next();
            }
            else if (this.isHit()) {
                this.stone.updataHp(this.harm);
            }
        }
    };
    /**
     *攻击:true表可以攻击
     */
    EnemyStone.prototype.isHit = function () {
        if (this.move == 0) {
            this.dt -= Define.UpdateTime;
            if (this.dt <= 0) {
                this.dt = 0;
            }
        }
        var hit = this.dt == 0;
        if (hit) {
            this.hitStone();
        }
        return hit;
    };
    /**
      *计算下一处出手时间
      */
    EnemyStone.prototype.hitStone = function () {
        this.dt = this.harmtime;
    };
    /**
     * 开始攻击
     */
    EnemyStone.prototype.startHit = function () {
        this.angle = Define.Enemy_Hit;
        this.hitStone();
        this.playEnemy(Define.Enemy_Hit);
    };
    /**
     * 结束攻击
     */
    EnemyStone.prototype.endHit = function () {
        this.angle = Define.Enemy_RIGHT;
        this.posNodes.push(this.stone.nextAnode);
    };
    /**
     * 选择目的点
     */
    EnemyStone.prototype.findNode = function () {
        //计算运动轨迹
        var row = 0;
        if (this.stone) {
            row = this.stone.row;
        }
        var stone = EnemyHit.getStonePos(row + 1);
        if (stone) {
            this.stone = stone;
            var node = stone.anode;
            this.posNodes = AStar.findA(game.NODES, this.posNode, node);
        }
        else {
            this.stone = null;
            this.posNodes = AStar.findA(game.NODES, this.posNode, Define.endNode);
        }
    };
    return EnemyStone;
}(Enemy));
//# sourceMappingURL=EnemyStone.js.map