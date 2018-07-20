/*
* 怪物攻击石头
* 目的地是石头上方
* 1寻找第一排石头(攻击)
* 2寻找第二排石头(攻击)
* 3寻找第三排排石头(攻击)
*/
var EnemyHit = /** @class */ (function () {
    function EnemyHit() {
    }
    /**
     * 获取攻击目标石头，如果返回为空直接去终点
     * 默认攻击第一排石头
     * @param num 第几排
     */
    EnemyHit.getStonePos = function (num) {
        if (num === void 0) { num = 1; }
        if (num <= 1) {
            var arr = new Array();
            for (var i = 1; i <= 3; i++) {
                var stone = game.stones[i];
                if (stone.hp > 0) {
                    arr.push(stone);
                }
            }
            if (arr.length > 0) { //随机
                var index = Utils.nextNumber(0, arr.length - 1);
                return arr[index];
            }
        }
        if (num <= 2) {
            var arr = new Array();
            for (var i = 4; i <= 6; i++) {
                var stone = game.stones[i];
                if (stone.hp > 0) {
                    arr.push(stone);
                }
            }
            if (arr.length > 0) { //随机
                var index = Utils.nextNumber(0, arr.length - 1);
                return arr[index];
            }
        }
        if (num <= 3) {
            var arr = new Array();
            for (var i = 7; i <= 9; i++) {
                var stone = game.stones[i];
                if (stone.hp > 0) {
                    arr.push(stone);
                }
            }
            if (arr.length > 0) { //随机
                var index = Utils.nextNumber(0, arr.length - 1);
                return arr[index];
            }
        }
        return;
    };
    return EnemyHit;
}());
//# sourceMappingURL=EnemyHit.js.map