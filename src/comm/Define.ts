
class Define {
    static Init_Money2=25;//初始化召唤水晶
    static UpdateTime = 50;//一帧时间
    static UpdateTime_Rate = 1000/Define.UpdateTime;//评率
    static Speed = 70;//单位移动速度

    //怪物ai类型
    static Enemy_Ai_Nomeral = 1;//普通类型
    static Enemy_Ai_Stone = 2;//游戏攻击石头
    //怪物动画
    static Enemy_UP: number = 1;//上
    static Enemy_DOWN: number = 2;//下
    static Enemy_LIFT: number = 3;//左
    static Enemy_RIGHT: number = 4;//右
    static Enemy_Hit: number = 5;//攻击石头
    static Enemy_Die: number = 6;//攻击石头
    //英雄
    //英雄——攻击类型
    static Harm_Bullet: number = 1;//子弹攻击
    static Harm_Nomeral: number = 2;//普通攻击
    //英雄-状态
    static General_Stand: string = "1";//待机
    static General_Hit: string = "2";//攻击
    //位置类型
    static Pos_General = 1;//英雄
    static Pos_Stone = 2;//石头
    //游戏状态
    static Game_No: number = 0;//游戏初始化(没有英雄)
    static Game_Start: number = 1;//游戏中
    static Game_Next: number = 2;//下一关
    static Game_Over: number = 3;//游戏结束界面
    static Game_ChangeLevel: number = 4;//时光倒流界面

    //颜色
    static Color_Green = "#00FF00"; //绿色;
    static Color_Blue = "#0000FF";//蓝色
    static Color_Purple = "#CC3299";//紫色
    static Color_Yellow = "#FFFF00";//黄色
    //默认地图
    static endNode: ANode = new ANode(4, 10);//终点
    static NODES: number[][] = [
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
        [1, 1, 1, 1, 1, 1, 1, 1, 1]];

        static RecruitGIDs=[4,1,6];//前3个招募固定
}