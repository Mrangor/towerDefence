/**
 * a星节点
 */
class ANode {
    public x: number;
    public y: number;

    public F: number;
    public G: number;
    public H: number;
    public parent: ANode;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public calcF(): void {
        this.F = this.G + this.H;
    }


}
/**
 * a星算法
 */
class AStar {
    private NODES: number[][];
    private static STEP: number = 10;
    private openList: Array<ANode>;
    private closeList: Array<ANode>;

    private findMinFANodeInOpneList(): ANode {
        let tempNode = this.openList[0];
        for (let i = 1; i < this.openList.length; i++) {
            let node = this.openList[i];
            if (node.F < tempNode.F) {
                tempNode = node;
            }
        }
        return tempNode;
    }
    private findNeighborNodes(currentNode: ANode): Array<ANode> {
        let arrayList = new Array<ANode>();
        // 仅仅考虑上下左右，不考虑斜对角
        let topX = currentNode.x;
        let topY = currentNode.y - 1;
        if (this.canReach(topX, topY) && !this.exists2(this.closeList, topX, topY)) {
            arrayList.push(new ANode(topX, topY));
        }
        let bottomX = currentNode.x;
        let bottomY = currentNode.y + 1;
        if (this.canReach(bottomX, bottomY) && !this.exists2(this.closeList, bottomX, bottomY)) {
            arrayList.push(new ANode(bottomX, bottomY));
        }
        let leftX = currentNode.x - 1;
        let leftY = currentNode.y;
        if (this.canReach(leftX, leftY) && !this.exists2(this.closeList, leftX, leftY)) {
            arrayList.push(new ANode(leftX, leftY));
        }
        let rightX = currentNode.x + 1;
        let rightY = currentNode.y;
        if (this.canReach(rightX, rightY) && !this.exists2(this.closeList, rightX, rightY)) {
            arrayList.push(new ANode(rightX, rightY));
        }
        return arrayList;
    }

    private canReach(x: number, y: number): boolean {
        if (y >= 0 && y < this.NODES.length && x >= 0 && x < this.NODES[0].length) {
            return this.NODES[y][x] == 0;
        }
        return false;
    }

    private exists(nodes: Array<ANode>, node: ANode): boolean {
        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if ((n.x == node.x) && (n.y == node.y)) {
                return true;
            }
        }
        return false;
    }
    private exists2(nodes: Array<ANode>, x: number, y: number): boolean {
        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if ((n.x == x) && (n.y == y)) {
                return true;
            }
        }
        return false;
    }
    private calcG(start: ANode, node: ANode): number {
        let G = AStar.STEP;
        let parentG = node.parent != null ? node.parent.G : 0;
        return G + parentG;
    }
    private foundPoint(tempStart: ANode, node: ANode): void {
        let G = this.calcG(tempStart, node);
        if (G < node.G) {
            node.parent = tempStart;
            node.G = G;
            node.calcF();
        }
    }
    private calcH(end: ANode, node: ANode): number {
        let step = Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
        return step * AStar.STEP;
    }

    private notFoundPoint(tempStart: ANode, end: ANode, node: ANode): void {
        node.parent = tempStart;
        node.G = this.calcG(tempStart, node);
        node.H = this.calcH(end, node);
        node.calcF();
        this.openList.push(node);
    }
    private findPath(startNode: ANode, endNode: ANode): ANode {
        // 把起点增加 open list
        this.openList.push(startNode);

        while (this.openList.length > 0) {
            // 遍历 open list 。查找 F值最小的节点，把它作为当前要处理的节点
            let currentNode = this.findMinFANodeInOpneList();
            // 从open list中移除
            var index = this.openList.indexOf(currentNode);
            if (index > -1) {
                this.openList.splice(index, 1);
            }
            // 把这个节点移到 close list
            this.closeList.push(currentNode);

            let neighborNodes = this.findNeighborNodes(currentNode);
            for (let i = 0; i < neighborNodes.length; i++) {
                let node = neighborNodes[i];
                if (this.exists(this.openList, node)) {
                    this.foundPoint(currentNode, node);
                } else {
                    this.notFoundPoint(currentNode, endNode, node);
                }
            }
            for (let i = 0; i < neighborNodes.length; i++) {
                let node = neighborNodes[i];
                if (this.exists(this.openList, node)) {
                    this.foundPoint(currentNode, node);
                } else {
                    this.notFoundPoint(currentNode, endNode, node);
                }
            }
            if (this.find(this.openList, endNode) != null) {
                return this.find(this.openList, endNode);
            }
        }

        return this.find(this.openList, endNode);
    }
    private find(nodes: Array<ANode>, point: ANode): ANode {
        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if ((n.x == point.x) && (n.y == point.y)) {
                return n;
            }
        }
        return null;
    }

    private findA(NODES: number[][], startNode: ANode, endNode: ANode): Array<ANode> {
        this.NODES = NODES;
        this.openList = new Array<ANode>();
        this.closeList = new Array<ANode>();
        let parent = this.findPath(startNode, endNode);
        let arrayList = new Array<ANode>();
        while (true) {
            if (parent != null && parent.parent != null) {
                arrayList.unshift(new ANode(parent.x, parent.y));
                parent = parent.parent;
            } else {
                break;
            }
        }
        return arrayList;
    }
    /**
     * A*查询最短路径
     * @param NODES 地图
     * @param startNode 开始点
     * @param endNode 结束点
     */
    public static findA(NODES: number[][], startNode: ANode, endNode: ANode): Array<ANode> {
        return new AStar().findA(NODES, startNode, endNode);
    }
}