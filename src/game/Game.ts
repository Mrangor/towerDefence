/*
* 游戏中心
*/
class Game {
    //记录关卡
    private _level: number = 1;
    //运行数据
    public _state: number = Define.Game_No;//状态
    public mapView: MapView;
    public levelEnemy: LevelEnemy;
    public enemys: Array<Enemy> = [];//怪物集合
    public generals: { [key: number]: General } = {};//英雄集合
    public bullets: Array<Bullet> = [];//子弹集合
    public skills: Array<Skill> = [];//技能集合
    public stones: { [key: number]: MStone } = {};//石头
    public NODES: number[][];//地图
    public enemySpeed: number = 1;
    public skillId: number = 0;//准备释放的技能
    public nextTime = 3000;//下一关时间
    private _stop: boolean = true;//
    public init() {
        this.NODES = Define.NODES;
        //1加载关卡数据
        let level = Laya.LocalStorage.getItem("level");
        if (level) {
            this._level = Number(level);
        }
        let state = Laya.LocalStorage.getItem("state");
        if (state) {
            this._state = Number(state);
        }
        //2加载英雄数据
        for (let gpos = 1; gpos <= 9; gpos++) {
            let generalId = Laya.LocalStorage.getItem("pos_" + gpos);
            if (generalId) {
                let g = new General(Number(generalId), gpos);
                this.generals[gpos] = g;
            }
        }
        //第一次初始化数据 石头
        for (let spos = 1; spos <= 9; spos++) {
            let hp = Laya.LocalStorage.getItem("stone_" + spos);
            let ms = new MStone(spos);
            if (hp) {
                ms.hp = Number(hp);
            }
            this.stones[spos] = ms;
        }
        Laya.timer.loop(Define.UpdateTime, this, this.loop);
    }
    /**
     * 循环方法
     */
    private loop(): void {
        if (this._stop) {
            return;
        }
        if (this.state != Define.Game_Next && this.state != Define.Game_Start) {
            return;
        }
        if (this.state == Define.Game_Next) {
            this.nextTime -= Define.UpdateTime;
            if (this.nextTime <= 0) {
                this.state = Define.Game_Start;
            }
        } else if (this.state == Define.Game_Start) {
            if (this.enemys.length == 0 && this.levelEnemy.enemys.length == 0) {
                this.nextLevel();
            } else {
                //刷新怪物
                this.flushEnemy();
            }
        }
        //修改怪物位置
        for (let i = this.enemys.length - 1; i >= 0; i--) {
            let enemy = this.enemys[i];
            enemy.updatePos();
        }
        //检测子弹攻击
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let bullet = this.bullets[i];
            bullet.updatePos();
        }
        for (let i in player.skills) {
            let skill = player.skills[i];
            skill.flushCDTime();
        }
        //检测子弹攻击
        for (let i = this.skills.length - 1; i >= 0; i--) {
            let skill = this.skills[i];
            skill.updata();
        }
        //检测攻击
        for (let k in this.generals) {
            let val = this.generals[k];
            if (val.isHit()) {
                let gen = val.tb;
                let harm = gen.zharm;
                let distance = gen.distance;
                let harmType = gen.harmType;
                let range = gen.range;
                let posx = val.posx;
                let posy = val.posy;
                if (harmType == Define.Harm_Bullet) {
                    let enemy = this.findEnemy(distance, posx, posy, val.enemy);
                    if (enemy) {
                        val.hitEnemy(enemy);
                        let bullet = new Bullet(enemy, gen.bulletType, harm, gen.range, posx, posy);
                        this.bullets.push(bullet);
                    }
                } else if (harmType == Define.Harm_Nomeral) {
                    let enemy = this.findEnemy(distance, posx, posy, val.enemy);
                    if (enemy) {
                        val.hitEnemy(enemy);
                        var hit = new Laya.Animation();
                        hit.loadAnimation("ani/hit.ani");
                        hit.play();
                        enemy.addChild(hit);
                        Laya.timer.once(500, enemy, function () {
                            hit.removeSelf();
                            hit.destroy();
                        });
                        enemy.harmHp(harm);
                    }
                }

            }
        }

    }
    /**
     * 开始游戏
     */
    public startGame(): void {
        if (!this.isGeneral()) {
            return;
        }
        this._stop = false;
        this.state = Define.Game_Start;
        if (this.enemys) {
            for (let i = this.enemys.length - 1; i >= 0; i--) {
                let enemy = this.enemys[i];
                enemy.remove();
            }
        }
        if (this.bullets) {
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                let bullet = this.bullets[i];
                bullet.remove();
            }
        }
        if (this.skills) {
            for (let i = this.skills.length - 1; i >= 0; i--) {
                let skill = this.skills[i];
                skill.remove();
            }
        }
        for (let k = 4; k <= 6; k++) {
            let skill = player.skills[k];
            skill.resetCDTime();
        }
        this.bullets = [];
        this.enemys = [];
        this.levelEnemy = new LevelEnemy(this._level);
        if (!this.generals) {
            this.generals = [];
        }

    }
    /**
      * 暂停游戏
      */
    public stop(): void {
        console.log("暂停游戏");
        if (this._stop) {
            return;
        }
        this._stop = true;
    }
    /**
    * 暂停结束
    */
    public stopover(): void {
        if (!this._stop) {
            return;
        }
        this._stop = false;
    }
    /**
     * 获取攻击目标(单个目标)
     * @param distance  
     * @param range 
     * @param x1 
     * @param y1 
     */
    private findEnemy(distance: number, x1: number, y1: number, enemy: Enemy): Enemy {
        let arr = [];
        this.enemys.forEach((val, idx, array) => {
            if (!val.die && Utils.isDistance(distance, x1, y1, val.x, val.y)) {
                arr.push(val);
            }
        });
        if (arr.length == 0) {
            return null;
        }
        if (enemy && arr.indexOf(enemy) > 0) {
            return enemy;
        }
        var index = Utils.nextNumber(0, arr.length - 1);
        return arr[index];
    }
    /**
    * 获取攻击目标(多个目标)
    * @param distance  
    * @param range 
    * @param x1 
    * @param y1 
    */
    public findEnemys(distance: number, x1: number, y1: number): Array<Enemy> {
        let arr = [];
        this.enemys.forEach((val, idx, array) => {
            if (!val.die && Utils.isDistance(distance, x1, y1, val.x, val.y)) {
                arr.push(val);
            }
        });
        return arr;
    }
    /**
     * 刷新怪物
     */
    private flushEnemy(): void {
        if (!this.levelEnemy) {
            return;
        }
        //刷新怪物
        this.levelEnemy.flushEnemy();
    }
    public gameOver(): void {
        if (this.state != Define.Game_Start) {
            return;
        }
        this.state = Define.Game_Over;
        console.log("游戏结束");
        let gameOver = new GameOver();
        Laya.stage.addChild(gameOver);
    }
    /**
     *过关表现
     */
    public nextLevel(): void {
        var next = game.level + 1;
        if (tb_game.level[next]) {
            console.log("进入下一关");
            game.level = next;
            player.changeLevel(game.level);
            this.levelEnemy = new LevelEnemy(this._level);
            //3秒后进入下一关
            this.state = Define.Game_Next;
            this.nextTime = 3000;
        } else {
            game.stop();
            console.log("通关提示");
            let nextLevel = new NextLevel();
            Laya.stage.addChild(nextLevel);
        }
    }
    /**
     * 怪物变速
     */
    public enemySpeedUp(enemySpeed: number): void {
        console.log("怪物加速:" + enemySpeed);
        this.enemySpeed = enemySpeed;
    }
    /**
    * 怪物变速
    */
    public hitEnemy(harm: number): void {
        console.log("怪物受伤:" + harm);
        if (this.enemys) {
            for (let i = 0; i < this.enemys.length; i++) {
                let enemy = this.enemys[i];
                enemy.harmHp(harm);
            }
        }
    }
    public get generalIds(): Array<number> {
        let ids = new Array;
        for (let k in this.generals) {
            let val = this.generals[k];
            ids.push(val.generalId);
        }
        return ids;
    }
    /**
     * 是否有武将防守
     */
    public isGeneral(): boolean {
        for (let k in this.generals) {
            let val = this.generals[k];
            if (val) {
                return true;
            }
        }
        return false;
    }
    /**
    * 保存关卡进度
    */
    public set level(level: number) {
        this._level = level;
        notifyManager.event(NotifyType.MapLevel);
        Laya.LocalStorage.setItem("level", this._level.toString());
    }
    /**
     * 获取关卡
     */
    public get level(): number {
        return this._level;
    }
    /**
     *获取游戏状态 
     */
    public get state(): number {
        return this._state;
    }
    /**
     * 设置游戏状态
     */
    public set state(state: number) {
        this._state = state;
        Laya.LocalStorage.setItem("state", this._state.toString());
    }
    /**
   * 重置石头血量
   */
    public resetStone() {
        for (let k in this.stones) {
            let stone = this.stones[k];
            stone.reset();
        }
    }
}
let game: Game;