/*
*石头
*/
var MStone = /** @class */ (function () {
    function MStone(pos) {
        this._pos = pos;
        this._hp = 1000 + player.addDefense();
        var sp = tb_game.stone_pos[this.pos];
        this._x = sp.nx;
        this._y = sp.ny;
        this._row = Math.ceil(this._pos / 3);
    }
    Object.defineProperty(MStone.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MStone.prototype, "hp", {
        get: function () {
            return this._hp;
        },
        set: function (hp) {
            this._hp = hp;
            if (hp == 0) {
                if (game.NODES[this.y][this.x] != 0) {
                    game.NODES[this.y][this.x] = 0;
                    notifyManager.event(NotifyType.UpdateMap, [this.x, this.y, true]);
                }
            }
            else {
                if (game.NODES[this.y][this.x] != 2) {
                    game.NODES[this.y][this.x] = 2;
                    notifyManager.event(NotifyType.UpdateMap, [this.x, this.y, false]);
                }
            }
            Laya.LocalStorage.setItem("stone_" + this.pos, this.hp.toString());
            notifyManager.event(NotifyType.StoneHp, [this._pos]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MStone.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MStone.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    MStone.prototype.updataHp = function (hp) {
        var nhp = this._hp - hp;
        if (nhp <= 0) {
            nhp = 0;
        }
        this.hp = nhp;
    };
    MStone.prototype.reset = function () {
        this.hp = 1000;
    };
    Object.defineProperty(MStone.prototype, "anode", {
        /**
         * 获取石头攻击位置
         */
        get: function () {
            var anode = new ANode(this.x, this.y - 1);
            return anode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MStone.prototype, "nextAnode", {
        /**
        *石头碎了进入石头下面
        */
        get: function () {
            var anode = new ANode(this.x, this.y + 1);
            return anode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MStone.prototype, "row", {
        /**
         * 第几行
         */
        get: function () {
            return this._row;
        },
        enumerable: true,
        configurable: true
    });
    return MStone;
}());
//# sourceMappingURL=MStone.js.map