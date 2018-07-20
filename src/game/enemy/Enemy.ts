/*
* 普通怪物
*/
class Enemy extends Laya.Animation {
    public enemyId: number;//怪物类型
    public hp: number;//怪物血量
    public posNode: ANode;//怪物所在位置
    public posNodes: Array<ANode>;//移动轨迹
    public nextPos: MPos;
    public hpBar: Laya.ProgressBar;
    public time: number;//出现时间
    public die: boolean = false;
    public angle: number = Define.Enemy_DOWN;//方向：默认向下走
    public move: number = 0;
    public dieTime = 1500;
    public constructor(enemyId: number, time: number, posX: number, posY: number) {
        super();
        this.posNode = new ANode(posX, posY);
        this.enemyId = enemyId;
        this.time = time;
        this.hp = this.maxhp;

    }
    public initEnemy() {
        this.loadAnimation("ani/enemy/" + this.icon + ".ani", Laya.Handler.create(this, this.onLoaded), "res/atlas/enemy/" + this.icon + ".atlas");
    }
    private onLoaded(): void {
        let sp = new Laya.Sprite();
        sp.loadImage("enemy/" + this.icon + "/enemy" + this.icon + "_1_1.png");
        sp.scale(0.5, 0.5);
        this.height = sp.height;
        this.width = sp.width;


        let pos = Utils.calc_pos_xy(this.posNode);
        this.pos(pos.x, pos.y);

        //创建血条
        this.hpBar = new Laya.ProgressBar("enemy/hp.png");
        this.hpBar.width = 42;
        this.hpBar.y = -this.height / 2;
        this.hpBar.pivotX = this.hpBar.width / 2;
        this.hpBar.sizeGrid = "5,5,5,5";
        this.hpBar.value = this.hp / this.maxhp;
        this.addChild(this.hpBar);
        game.mapView.game_map.addChild(this);
        var index = game.levelEnemy.enemys.indexOf(this);
        if (index > -1) {
            game.enemys.push(this);
            game.levelEnemy.enemys.splice(index, 1);
            //计算运动轨迹
            this.findNode();
            this.next();
        }

    }
    public next(): void {
        if (this.posNodes && this.posNodes.length > 0) {
            this.posNode = this.posNodes.shift();
            this.nextPos = Utils.calc_pos_xy(this.posNode);
            //计算方位
            this.angle = Utils.angle(this.x, this.y, this.nextPos.x, this.nextPos.y);
            this.playEnemy(this.angle);
        } else {
            game.gameOver();
        }
    }
    /**
     * 修改怪物位置
     */
    public updatePos(): void {
        if (this.die) {
            this.dieTime -= Define.UpdateTime;
            if (this.dieTime <= 0) {
               this.remove();
            }
        } else
            if (this.move == 0) {
                if (this.angle == Define.Enemy_RIGHT) {
                    let x = this.x + (this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate);
                    this.x = x;
                    if (x >= this.nextPos.x) {
                        this.x = this.nextPos.x
                        this.next();
                    }
                } else if (this.angle == Define.Enemy_LIFT) {
                    let x = this.x - (this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate);
                    this.x = x;
                    if (x <= this.nextPos.x) {
                        this.x = this.nextPos.x
                        this.next();
                    }
                } else if (this.angle == Define.Enemy_UP) {
                    let y = this.x - (this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate);
                    this.y = y;
                    if (y <= this.nextPos.y) {
                        this.y = this.nextPos.y;
                        this.next();
                    }
                } else if (this.angle == Define.Enemy_DOWN) {
                    let y = this.y + (this.speed * game.enemySpeed * Define.Speed / Define.UpdateTime_Rate);
                    this.y = y;
                    if (y >= this.nextPos.y) {
                        this.y = this.nextPos.y;
                        this.next();
                    }
                }
                this.zOrder = this.y + this.x;
            }
    }
    /**
     * 暂停
     */
    public stopMove() {
        this.move++;
        this.stop();
    }
    /**
     * 结束暂停
     */
    public stopOverMove() {
        this.move--;
        if (this.move == 0) {
            this.play();
        }
    }
    /**
     * 选择目的点
     */
    public findNode() {
        this.posNodes = AStar.findA(game.NODES, this.posNode, Define.endNode);
    }
    /**
     * 怪物死亡
     */
    private diePlay() {
        if (this.die) {
            return;
        }
        this.die = true;
        this.hpBar.visible=false;
        this.playEnemy(Define.Enemy_Die,false);
    }
    /**
     * 清理数据
     */
    public remove(): void {
        var index = game.enemys.indexOf(this);
        if (index > -1) {
            game.enemys.splice(index, 1);
        }
        this.removeSelf();
    }
    /**
     * 运行动画
     * @param loop 
     * @param name 
     * @param showWarn 
     */
    public playEnemy(name: number,loop:boolean=true) {
        this.play(0, loop, name + "");
    }
    /**
     * 受到攻击
     * @param harm 
     */
    public harmHp(harm: number): void {
        let hp = this.hp - harm;
        hp = hp < 0 ? 0 : hp;
        this.hp = hp;
        this.hpBar.value = this.hp / this.maxhp;
        if (hp == 0) {
            //产出
            let m3 = this.getMoney3() * player.addSkillMoney3();
            player.addmoney3(m3);
            let m1Rate = this.getMoney1Rate();
            let m1Num = Math.floor(m1Rate / 100);
            let m1r = Math.floor(m1Rate % 100);
            if (Utils.nextNumber(0, 100) <= m1r) {
                m1Num += 1;
            }
            if (m1Num > 0) {
                new MoneyAdd(1, m1Num, this.x, this.y);
            }

            if (Utils.nextNumber(0, 100) <= this.getMoney2Rate()) {
                new MoneyAdd(2, 1, this.x, this.y);
            }

            let m2Rate = this.getMoney2Rate();
            let m2Num = Math.floor(m2Rate / 100);
            let m2r = Math.floor(m2Rate % 100);
            if (Utils.nextNumber(0, 100) <= m2r) {
                m2Num += 1;
            }
            if (m2Num > 0) {
                m2Num = m2Num * player.addSkillMoney2();
                new MoneyAdd(2, m2Num, this.x, this.y);
            }

            this.diePlay();
        }
    }
    /**
     * 子弹碰撞检测
     */
    public collide(x: number, y: number): boolean {
        let minx = this.x - 10;
        let maxx = this.x + 10;
        let miny = this.y - 10;
        let maxy = this.y + 10;
        return x >= minx && x <= maxx && y >= miny && y <= maxy;
    }
    /**
      * 最大血量
      */
    public get maxhp(): number {
        return tb_game.enemy[this.enemyId].hp;
    }
    /**
     * 速度
     */
    public get speed(): number {
        return tb_game.enemy[this.enemyId].speed;
    }
    /**
     * 图片数量
     */
    public get icon(): number {
        return tb_game.enemy[this.enemyId].icon;
    }
    /**
     * 图片数量
     */
    public get iconnum(): number {
        return tb_game.enemy[this.enemyId].icon_num;
    }
    /**
     * 获取速度
     */
    public getSpeed(): number {
        return this.speed;
    }
    /**
     * 紫金概率
     */
    public getMoney1Rate(): number {
        return tb_game.enemy[this.enemyId].money1_rate;
    }
    /**
    * 绿钻概率
    */
    public getMoney2Rate(): number {
        return tb_game.enemy[this.enemyId].money2_rate;
    }
    /**
     * 金币数量
     */
    public getMoney3(): number {
        return tb_game.enemy[this.enemyId].money3;
    }

    /**
    * 攻击伤害
    */
    public get harm(): number {
        return tb_game.enemy[this.enemyId].harm;
    }
    /**
    * 攻击时间
    */
    public get harmtime(): number {
        return tb_game.enemy[this.enemyId].harm_time;
    }
}