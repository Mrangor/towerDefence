/*
*石头
*/
class MStone {
    private _pos: number;//石头位置
    private _hp: number;//血量
    private _x: number;
    private _y: number;
    private _row: number;
    constructor(pos: number) {
        this._pos = pos;
        this._hp = 1000 + player.addDefense();
        let sp = tb_game.stone_pos[this.pos];
        this._x = sp.nx;
        this._y = sp.ny;
        this._row = Math.ceil(this._pos / 3);
    }
    public get pos(): number {
        return this._pos;
    }
    public get hp(): number {
        return this._hp;
    }
    public set hp(hp: number) {
        this._hp = hp;
        if (hp == 0) {
            if (game.NODES[this.y][this.x] != 0) {
                game.NODES[this.y][this.x] = 0;
                notifyManager.event(NotifyType.UpdateMap, [this.x, this.y, true]);
            }
        } else {
            if (game.NODES[this.y][this.x] != 2) {
                game.NODES[this.y][this.x] = 2;
                notifyManager.event(NotifyType.UpdateMap, [this.x, this.y, false]);
            }
        }
        Laya.LocalStorage.setItem("stone_" + this.pos, this.hp.toString());
        notifyManager.event(NotifyType.StoneHp, [this._pos]);
    }
    public get x() {
        return this._x;
    }
    public get y() {
        return this._y;
    }
    public updataHp(hp: number) {
        let nhp = this._hp - hp;
        if (nhp <= 0) {
            nhp = 0;
        }
        this.hp = nhp;

    }
    public reset() {
        this.hp = 1000;
    }
    /**
     * 获取石头攻击位置
     */
    public get anode(): ANode {
        let anode = new ANode(this.x, this.y - 1);
        return anode;
    }
    /**
    *石头碎了进入石头下面
    */
    public get nextAnode(): ANode {
        let anode = new ANode(this.x, this.y + 1);
        return anode;
    }
    /**
     * 第几行
     */
    public get row() {
        return this._row;
    }
}