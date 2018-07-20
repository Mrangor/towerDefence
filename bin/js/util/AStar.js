/**
 * a星节点
 */
var ANode = /** @class */ (function () {
    function ANode(x, y) {
        this.x = x;
        this.y = y;
    }
    ANode.prototype.calcF = function () {
        this.F = this.G + this.H;
    };
    return ANode;
}());
/**
 * a星算法
 */
var AStar = /** @class */ (function () {
    function AStar() {
    }
    AStar.prototype.findMinFANodeInOpneList = function () {
        var tempNode = this.openList[0];
        for (var i = 1; i < this.openList.length; i++) {
            var node = this.openList[i];
            if (node.F < tempNode.F) {
                tempNode = node;
            }
        }
        return tempNode;
    };
    AStar.prototype.findNeighborNodes = function (currentNode) {
        var arrayList = new Array();
        // 仅仅考虑上下左右，不考虑斜对角
        var topX = currentNode.x;
        var topY = currentNode.y - 1;
        if (this.canReach(topX, topY) && !this.exists2(this.closeList, topX, topY)) {
            arrayList.push(new ANode(topX, topY));
        }
        var bottomX = currentNode.x;
        var bottomY = currentNode.y + 1;
        if (this.canReach(bottomX, bottomY) && !this.exists2(this.closeList, bottomX, bottomY)) {
            arrayList.push(new ANode(bottomX, bottomY));
        }
        var leftX = currentNode.x - 1;
        var leftY = currentNode.y;
        if (this.canReach(leftX, leftY) && !this.exists2(this.closeList, leftX, leftY)) {
            arrayList.push(new ANode(leftX, leftY));
        }
        var rightX = currentNode.x + 1;
        var rightY = currentNode.y;
        if (this.canReach(rightX, rightY) && !this.exists2(this.closeList, rightX, rightY)) {
            arrayList.push(new ANode(rightX, rightY));
        }
        return arrayList;
    };
    AStar.prototype.canReach = function (x, y) {
        if (y >= 0 && y < this.NODES.length && x >= 0 && x < this.NODES[0].length) {
            return this.NODES[y][x] == 0;
        }
        return false;
    };
    AStar.prototype.exists = function (nodes, node) {
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if ((n.x == node.x) && (n.y == node.y)) {
                return true;
            }
        }
        return false;
    };
    AStar.prototype.exists2 = function (nodes, x, y) {
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if ((n.x == x) && (n.y == y)) {
                return true;
            }
        }
        return false;
    };
    AStar.prototype.calcG = function (start, node) {
        var G = AStar.STEP;
        var parentG = node.parent != null ? node.parent.G : 0;
        return G + parentG;
    };
    AStar.prototype.foundPoint = function (tempStart, node) {
        var G = this.calcG(tempStart, node);
        if (G < node.G) {
            node.parent = tempStart;
            node.G = G;
            node.calcF();
        }
    };
    AStar.prototype.calcH = function (end, node) {
        var step = Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
        return step * AStar.STEP;
    };
    AStar.prototype.notFoundPoint = function (tempStart, end, node) {
        node.parent = tempStart;
        node.G = this.calcG(tempStart, node);
        node.H = this.calcH(end, node);
        node.calcF();
        this.openList.push(node);
    };
    AStar.prototype.findPath = function (startNode, endNode) {
        // 把起点增加 open list
        this.openList.push(startNode);
        while (this.openList.length > 0) {
            // 遍历 open list 。查找 F值最小的节点，把它作为当前要处理的节点
            var currentNode = this.findMinFANodeInOpneList();
            // 从open list中移除
            var index = this.openList.indexOf(currentNode);
            if (index > -1) {
                this.openList.splice(index, 1);
            }
            // 把这个节点移到 close list
            this.closeList.push(currentNode);
            var neighborNodes = this.findNeighborNodes(currentNode);
            for (var i = 0; i < neighborNodes.length; i++) {
                var node = neighborNodes[i];
                if (this.exists(this.openList, node)) {
                    this.foundPoint(currentNode, node);
                }
                else {
                    this.notFoundPoint(currentNode, endNode, node);
                }
            }
            for (var i = 0; i < neighborNodes.length; i++) {
                var node = neighborNodes[i];
                if (this.exists(this.openList, node)) {
                    this.foundPoint(currentNode, node);
                }
                else {
                    this.notFoundPoint(currentNode, endNode, node);
                }
            }
            if (this.find(this.openList, endNode) != null) {
                return this.find(this.openList, endNode);
            }
        }
        return this.find(this.openList, endNode);
    };
    AStar.prototype.find = function (nodes, point) {
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if ((n.x == point.x) && (n.y == point.y)) {
                return n;
            }
        }
        return null;
    };
    AStar.prototype.findA = function (NODES, startNode, endNode) {
        this.NODES = NODES;
        this.openList = new Array();
        this.closeList = new Array();
        var parent = this.findPath(startNode, endNode);
        var arrayList = new Array();
        while (true) {
            if (parent != null && parent.parent != null) {
                arrayList.unshift(new ANode(parent.x, parent.y));
                parent = parent.parent;
            }
            else {
                break;
            }
        }
        return arrayList;
    };
    /**
     * A*查询最短路径
     * @param NODES 地图
     * @param startNode 开始点
     * @param endNode 结束点
     */
    AStar.findA = function (NODES, startNode, endNode) {
        return new AStar().findA(NODES, startNode, endNode);
    };
    AStar.STEP = 10;
    return AStar;
}());
//# sourceMappingURL=AStar.js.map