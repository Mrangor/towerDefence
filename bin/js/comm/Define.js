var Define = /** @class */ (function () {
    function Define() {
    }
    Define.Init_Money2 = 25; //初始化召唤水晶
    Define.UpdateTime = 50; //一帧时间
    Define.UpdateTime_Rate = 1000 / Define.UpdateTime; //评率
    Define.Speed = 70; //单位移动速度
    //怪物ai类型
    Define.Enemy_Ai_Nomeral = 1; //普通类型
    Define.Enemy_Ai_Stone = 2; //游戏攻击石头
    //怪物动画
    Define.Enemy_UP = 1; //上
    Define.Enemy_DOWN = 2; //下
    Define.Enemy_LIFT = 3; //左
    Define.Enemy_RIGHT = 4; //右
    Define.Enemy_Hit = 5; //攻击石头
    Define.Enemy_Die = 6; //攻击石头
    //英雄
    //英雄——攻击类型
    Define.Harm_Bullet = 1; //子弹攻击
    Define.Harm_Nomeral = 2; //普通攻击
    //英雄-状态
    Define.General_Stand = "1"; //待机
    Define.General_Hit = "2"; //攻击
    //位置类型
    Define.Pos_General = 1; //英雄
    Define.Pos_Stone = 2; //石头
    //游戏状态
    Define.Game_No = 0; //游戏初始化(没有英雄)
    Define.Game_Start = 1; //游戏中
    Define.Game_Next = 2; //下一关
    Define.Game_Over = 3; //游戏结束界面
    Define.Game_ChangeLevel = 4; //时光倒流界面
    //颜色
    Define.Color_Green = "#00FF00"; //绿色;
    Define.Color_Blue = "#0000FF"; //蓝色
    Define.Color_Purple = "#CC3299"; //紫色
    Define.Color_Yellow = "#FFFF00"; //黄色
    //默认地图
    Define.endNode = new ANode(4, 10); //终点
    Define.NODES = [
        [1, 1, 1, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 2, 1, 2, 1, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 1, 2, 1, 2, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 2, 1, 2, 1, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    Define.RecruitGIDs = [4, 1, 6]; //前3个招募固定
    return Define;
}());
//# sourceMappingURL=Define.js.map