/*
* name;
*/
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.angle = function (x1, y1, x2, y2) {
        var diff_x = Math.abs(x2 - x1), diff_y = Math.abs(y2 - y1);
        if (diff_x == 0 || diff_x < diff_y) {
            if (y1 < y2) {
                //下
                return Define.Enemy_DOWN;
            }
            //上
            return Define.Enemy_UP;
        }
        if (diff_y == 0 || diff_x > diff_y) {
            if (x1 > x2) {
                //左
                return Define.Enemy_LIFT;
            }
            //右
            return Define.Enemy_RIGHT;
        }
        return Define.Enemy_RIGHT;
    };
    /**
     *
     * @param x1 计算两点距离
     * @param y1
     * @param x2
     * @param y2
     */
    Utils.range = function (x1, y1, x2, y2) {
        var xdiff = x2 - x1; // 计算两个点的横坐标之差
        var ydiff = y2 - y1; // 计算两个点的纵坐标之差
        return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
    };
    /**
     * 点转坐标
     * @param posNode
     */
    Utils.calc_pos_xy = function (posNode) {
        var x = posNode.x;
        var y = posNode.y;
        var pos = new MPos(x * 70 + 30, y * 90 + 35);
        return pos;
    };
    /**
     * 判断是否在攻击距离内
     * @param distance
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    Utils.isDistance = function (distance, x1, y1, x2, y2) {
        distance = distance;
        var dx = Math.abs(x1 - x2);
        var dy = Math.abs(y1 - y2);
        var distancePos = Math.sqrt(dx * dx + dy * dy);
        if (distancePos <= distance) {
            console.log("攻击点" + (distancePos <= distance) + ",distance:" + distance + ",x1:" + x1 + ",y1:" + y1 + ",x2:" + x2 + ",y2:" + y2);
        }
        return distancePos <= distance;
    };
    /**
     * 随机一个数
     * @param lower
     * @param upper
     */
    Utils.nextNumber = function (lower, upper) {
        if (lower == upper) {
            return lower;
        }
        var r = Math.random();
        return Math.floor((r * upper) + ((1 - r) * lower) + r);
    };
    /**
     * 颜色
     */
    Utils.getColour = function (colour) {
        switch (colour) {
            case 1:
                return Define.Color_Green;
            case 2:
                return Define.Color_Blue;
            case 3:
                return Define.Color_Purple;
            case 4:
                return Define.Color_Yellow;
        }
        return Define.Color_Yellow;
    };
    return Utils;
}());
//# sourceMappingURL=Utils.js.map