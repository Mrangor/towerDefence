/*
* 怪物攻击石头
* 目的地是石头上方
* 1寻找第一排石头(攻击)
* 2寻找第二排石头(攻击)
* 3寻找第三排排石头(攻击)
*/
class EnemyHit {
    /**
     * 获取攻击目标石头，如果返回为空直接去终点
     * 默认攻击第一排石头
     * @param num 第几排
     */
    public static getStonePos(num: number = 1): MStone {
        if (num <= 1) {
            let arr = new Array<MStone>();
            for (let i = 1; i <= 3; i++) {
                let stone = game.stones[i];
                if (stone.hp > 0) {
                    arr.push(stone);
                }
            }
            if (arr.length > 0) { //随机
                let index = Utils.nextNumber(0, arr.length - 1);
                return arr[index];
            }
        }
        if (num <= 2) {
            let arr = new Array<MStone>();
            for (let i = 4; i <= 6; i++) {
                let stone = game.stones[i];
                if (stone.hp > 0) {
                    arr.push(stone);
                }
            }
            if (arr.length > 0) { //随机
                let index = Utils.nextNumber(0, arr.length - 1);
                return arr[index];
            }
        }
        if (num <= 3) {
            let arr = new Array<MStone>();
            for (let i = 7; i <= 9; i++) {
                let stone = game.stones[i];
                if (stone.hp > 0) {
                    arr.push(stone);
                }
            }
            if (arr.length > 0) { //随机
                let index = Utils.nextNumber(0, arr.length - 1);
                return arr[index];
            }
        }
        return;
    }
}