type tb_game_enemy={ readonly id:number,readonly name:string,readonly ai:number,readonly harm:number,readonly harm_time:number,readonly hp:number,readonly speed:number,readonly icon:number,readonly icon_num:number,readonly money1_rate:number,readonly money2_rate:number,readonly money3:number};
type tb_game_general={ readonly id:number,readonly name:string,readonly colour:number,readonly harm_type:number,readonly bullet_type:number,readonly harm:number,readonly harm_up:number,readonly distance:number,readonly range:number,readonly harm_time:number,readonly icon:number,readonly icon_num:number,readonly desc:string,readonly max_level:number,readonly up_money3:number};
type tb_game_level={ readonly enemy:number,readonly time:number,readonly pos_x:number,readonly pos_y:number};
type tb_game_recruit={ readonly id:number,readonly money1:number,readonly money2:number,readonly desc:string};
type tb_game_recruit_rate={ readonly general_id:number,readonly rate:number,readonly desc1:string};
type tb_game_skill={ readonly id:number,readonly name:string,readonly desc:string,readonly need_map_level:number,readonly need_money1:number,readonly use_money1:number,readonly max_level:number,readonly type:number,readonly base:number,readonly add_base:number,readonly cd_time:number,readonly up_num:number,readonly uplevel_money1:number,readonly uplevel_money3:number};
type tb_game_stone_pos={ readonly id:number,readonly nx:number,readonly ny:number};
class tb_game {
	static readonly enemy:{[key:number]:tb_game_enemy} = {
		[1]:{id:1 , name:'怪物1' , ai:1 , harm:0 , harm_time:0 , hp:100 , speed:1 , icon:1 , icon_num:2 , money1_rate:10 , money2_rate:10 , money3:1},
		[2]:{id:2 , name:'拆墙怪物' , ai:2 , harm:100 , harm_time:2000 , hp:200 , speed:1 , icon:1 , icon_num:4 , money1_rate:10 , money2_rate:10 , money3:1},
		[3]:{id:3 , name:'怪物3' , ai:1 , harm:0 , harm_time:0 , hp:400 , speed:1 , icon:1 , icon_num:4 , money1_rate:10 , money2_rate:10 , money3:1},
		[4]:{id:4 , name:'怪物4' , ai:1 , harm:0 , harm_time:0 , hp:800 , speed:1 , icon:1 , icon_num:5 , money1_rate:10 , money2_rate:10 , money3:1},
		[5]:{id:5 , name:'怪物5' , ai:1 , harm:0 , harm_time:0 , hp:1600 , speed:1 , icon:1 , icon_num:2 , money1_rate:10 , money2_rate:10 , money3:1},
		[6]:{id:6 , name:'boss1' , ai:1 , harm:0 , harm_time:0 , hp:5000 , speed:1 , icon:2 , icon_num:4 , money1_rate:0 , money2_rate:300 , money3:10},
		[7]:{id:7 , name:'boss2' , ai:2 , harm:500 , harm_time:1000 , hp:5000 , speed:1 , icon:2 , icon_num:4 , money1_rate:0 , money2_rate:300 , money3:10}
	};
	static readonly general:{[key:number]:tb_game_general} = {
		[1]:{id:1 , name:'英雄1' , colour:1 , harm_type:1 , bullet_type:1 , harm:17 , harm_up:5 , distance:115 , range:0 , harm_time:1000 , icon:1 , icon_num:7 , desc:'绿色' , max_level:100 , up_money3:10},
		[2]:{id:2 , name:'英雄2' , colour:1 , harm_type:2 , bullet_type:0 , harm:17 , harm_up:5 , distance:115 , range:0 , harm_time:1000 , icon:2 , icon_num:6 , desc:'绿色' , max_level:100 , up_money3:10},
		[3]:{id:3 , name:'英雄3' , colour:1 , harm_type:1 , bullet_type:2 , harm:17 , harm_up:5 , distance:115 , range:0 , harm_time:1000 , icon:3 , icon_num:6 , desc:'绿色' , max_level:100 , up_money3:10},
		[4]:{id:4 , name:'英雄4' , colour:2 , harm_type:1 , bullet_type:3 , harm:27 , harm_up:7 , distance:115 , range:70 , harm_time:500 , icon:4 , icon_num:7 , desc:'蓝色' , max_level:100 , up_money3:10},
		[5]:{id:5 , name:'英雄5' , colour:2 , harm_type:1 , bullet_type:1 , harm:27 , harm_up:7 , distance:115 , range:0 , harm_time:1000 , icon:1 , icon_num:7 , desc:'蓝色' , max_level:100 , up_money3:10},
		[6]:{id:6 , name:'英雄6' , colour:3 , harm_type:2 , bullet_type:0 , harm:37 , harm_up:7 , distance:115 , range:0 , harm_time:1000 , icon:2 , icon_num:6 , desc:'紫色' , max_level:100 , up_money3:10},
		[7]:{id:7 , name:'英雄7' , colour:3 , harm_type:1 , bullet_type:3 , harm:37 , harm_up:10 , distance:115 , range:0 , harm_time:1000 , icon:3 , icon_num:6 , desc:'紫色' , max_level:100 , up_money3:10},
		[8]:{id:8 , name:'英雄8' , colour:4 , harm_type:1 , bullet_type:1 , harm:47 , harm_up:10 , distance:115 , range:0 , harm_time:1000 , icon:4 , icon_num:7 , desc:'金色' , max_level:100 , up_money3:10},
		[9]:{id:9 , name:'英雄9' , colour:4 , harm_type:1 , bullet_type:1 , harm:47 , harm_up:10 , distance:115 , range:0 , harm_time:1000 , icon:1 , icon_num:7 , desc:'金色' , max_level:100 , up_money3:10}
	};
	static readonly level:{[level:number]:{[key:number]:tb_game_level}} = {
		[1]:{
			[1]:{enemy:1 , time:0 , pos_x:3 , pos_y:0}
		},
		[2]:{
			[1]:{enemy:1 , time:0 , pos_x:5 , pos_y:0},
			[2]:{enemy:1 , time:1000 , pos_x:3 , pos_y:0}
		},
		[3]:{
			[1]:{enemy:1 , time:0 , pos_x:5 , pos_y:0},
			[2]:{enemy:1 , time:1000 , pos_x:5 , pos_y:0},
			[3]:{enemy:1 , time:2000 , pos_x:4 , pos_y:0},
			[4]:{enemy:1 , time:3000 , pos_x:4 , pos_y:0},
			[5]:{enemy:1 , time:4000 , pos_x:3 , pos_y:0},
			[6]:{enemy:1 , time:5000 , pos_x:3 , pos_y:0}
		},
		[4]:{
			[1]:{enemy:1 , time:0 , pos_x:3 , pos_y:0},
			[2]:{enemy:1 , time:1000 , pos_x:3 , pos_y:0},
			[3]:{enemy:1 , time:2000 , pos_x:4 , pos_y:0},
			[4]:{enemy:1 , time:3000 , pos_x:3 , pos_y:0},
			[5]:{enemy:1 , time:4000 , pos_x:5 , pos_y:0},
			[6]:{enemy:1 , time:5000 , pos_x:3 , pos_y:0},
			[7]:{enemy:1 , time:6000 , pos_x:3 , pos_y:0}
		},
		[5]:{
			[1]:{enemy:1 , time:0 , pos_x:3 , pos_y:0},
			[2]:{enemy:1 , time:1000 , pos_x:5 , pos_y:0},
			[3]:{enemy:1 , time:2000 , pos_x:5 , pos_y:0},
			[4]:{enemy:1 , time:3000 , pos_x:3 , pos_y:0},
			[5]:{enemy:1 , time:4000 , pos_x:4 , pos_y:0},
			[6]:{enemy:1 , time:5000 , pos_x:3 , pos_y:0},
			[7]:{enemy:1 , time:6000 , pos_x:5 , pos_y:0},
			[8]:{enemy:1 , time:7000 , pos_x:4 , pos_y:0}
		},
		[6]:{
			[1]:{enemy:1 , time:0 , pos_x:5 , pos_y:0},
			[2]:{enemy:1 , time:1000 , pos_x:5 , pos_y:0},
			[3]:{enemy:1 , time:2000 , pos_x:5 , pos_y:0},
			[4]:{enemy:2 , time:3000 , pos_x:4 , pos_y:0},
			[5]:{enemy:2 , time:4000 , pos_x:3 , pos_y:0},
			[6]:{enemy:2 , time:5000 , pos_x:3 , pos_y:0},
			[7]:{enemy:1 , time:6000 , pos_x:3 , pos_y:0},
			[8]:{enemy:1 , time:7000 , pos_x:3 , pos_y:0},
			[9]:{enemy:1 , time:8000 , pos_x:3 , pos_y:0},
			[10]:{enemy:1 , time:9000 , pos_x:5 , pos_y:0}
		},
		[7]:{
			[1]:{enemy:1 , time:0 , pos_x:4 , pos_y:0},
			[2]:{enemy:1 , time:1000 , pos_x:5 , pos_y:0},
			[3]:{enemy:1 , time:2000 , pos_x:5 , pos_y:0},
			[4]:{enemy:2 , time:3000 , pos_x:4 , pos_y:0},
			[5]:{enemy:2 , time:4000 , pos_x:5 , pos_y:0},
			[6]:{enemy:2 , time:5000 , pos_x:4 , pos_y:0},
			[7]:{enemy:1 , time:6000 , pos_x:5 , pos_y:0},
			[8]:{enemy:1 , time:7000 , pos_x:3 , pos_y:0},
			[9]:{enemy:1 , time:8000 , pos_x:5 , pos_y:0},
			[10]:{enemy:1 , time:9000 , pos_x:3 , pos_y:0},
			[11]:{enemy:1 , time:10000 , pos_x:3 , pos_y:0},
			[12]:{enemy:1 , time:11000 , pos_x:4 , pos_y:0},
			[13]:{enemy:1 , time:12000 , pos_x:3 , pos_y:0},
			[14]:{enemy:1 , time:13000 , pos_x:5 , pos_y:0},
			[15]:{enemy:1 , time:14000 , pos_x:4 , pos_y:0}
		}
	};
	static readonly recruit:{[key:number]:tb_game_recruit} = {
		[1]:{id:1 , money1:0 , money2:10 , desc:'低级'},
		[2]:{id:2 , money1:0 , money2:30 , desc:'中级'},
		[3]:{id:3 , money1:60 , money2:0 , desc:'史诗级'}
	};
	static readonly recruit_rate:{[level:number]:{[key:number]:tb_game_recruit_rate}} = {
		[1]:{
			[1]:{general_id:1 , rate:1 , desc1:'英雄1'},
			[2]:{general_id:2 , rate:1 , desc1:'英雄2'},
			[3]:{general_id:3 , rate:1 , desc1:'英雄3'},
			[4]:{general_id:4 , rate:1 , desc1:'英雄4'},
			[5]:{general_id:5 , rate:1 , desc1:'英雄5'},
			[6]:{general_id:6 , rate:1 , desc1:'英雄6'},
			[7]:{general_id:7 , rate:1 , desc1:'英雄7'},
			[8]:{general_id:8 , rate:1 , desc1:'英雄8'},
			[9]:{general_id:9 , rate:1 , desc1:'英雄9'}
		},
		[2]:{
			[1]:{general_id:4 , rate:1 , desc1:'英雄4'},
			[2]:{general_id:5 , rate:1 , desc1:'英雄5'},
			[3]:{general_id:6 , rate:1 , desc1:'英雄6'},
			[4]:{general_id:7 , rate:1 , desc1:'英雄7'},
			[5]:{general_id:8 , rate:1 , desc1:'英雄8'},
			[6]:{general_id:9 , rate:1 , desc1:'英雄9'}
		},
		[3]:{
			[1]:{general_id:8 , rate:1 , desc1:'英雄8'},
			[2]:{general_id:9 , rate:1 , desc1:'英雄9'}
		}
	};
	static readonly skill:{[key:number]:tb_game_skill} = {
		[1]:{id:1 , name:'英雄攻击力2倍' , desc:'所有英雄基础攻击力变为两倍' , need_map_level:0 , need_money1:500 , use_money1:0 , max_level:1 , type:1 , base:2 , add_base:0 , cd_time:0 , up_num:1 , uplevel_money1:0 , uplevel_money3:0},
		[2]:{id:2 , name:'超级金币挖掘机' , desc:'入侵者掉落的金币变成两倍' , need_map_level:0 , need_money1:1000 , use_money1:0 , max_level:1 , type:2 , base:2 , add_base:0 , cd_time:0 , up_num:1 , uplevel_money1:0 , uplevel_money3:0},
		[3]:{id:3 , name:'超级宝石挖掘机' , desc:'入侵者掉落宝石数量变为两倍' , need_map_level:0 , need_money1:2000 , use_money1:0 , max_level:1 , type:3 , base:2 , add_base:0 , cd_time:0 , up_num:1 , uplevel_money1:0 , uplevel_money3:0},
		[4]:{id:4 , name:'天降火球' , desc:'对入侵者造成70伤害' , need_map_level:0 , need_money1:0 , use_money1:0 , max_level:100 , type:4 , base:70 , add_base:54 , cd_time:7 , up_num:1 , uplevel_money1:0 , uplevel_money3:10},
		[5]:{id:5 , name:'绝对零度' , desc:'冷冻范围内所有敌人1s' , need_map_level:21 , need_money1:0 , use_money1:0 , max_level:50 , type:5 , base:1 , add_base:1 , cd_time:61 , up_num:1 , uplevel_money1:0 , uplevel_money3:50},
		[6]:{id:6 , name:'雷霆万钧' , desc:'造成无视防御力的范围伤害 攻击力:1500' , need_map_level:41 , need_money1:0 , use_money1:0 , max_level:100 , type:6 , base:1500 , add_base:1500 , cd_time:50 , up_num:1 , uplevel_money1:0 , uplevel_money3:100},
		[7]:{id:7 , name:'英雄加攻咒文' , desc:'提升所有英雄攻击力10%' , need_map_level:11 , need_money1:0 , use_money1:0 , max_level:100 , type:1 , base:10 , add_base:1 , cd_time:0 , up_num:1 , uplevel_money1:0 , uplevel_money3:50},
		[8]:{id:8 , name:'究极加攻咒文' , desc:'提升所有英雄攻击力10%' , need_map_level:0 , need_money1:10 , use_money1:0 , max_level:100 , type:1 , base:10 , add_base:1 , cd_time:0 , up_num:1 , uplevel_money1:10 , uplevel_money3:0},
		[9]:{id:9 , name:'巨力冶炼' , desc:'强化石头防御力.防御力:1000' , need_map_level:51 , need_money1:0 , use_money1:0 , max_level:100 , type:7 , base:1000 , add_base:100 , cd_time:0 , up_num:1 , uplevel_money1:1000 , uplevel_money3:0},
		[10]:{id:10 , name:'召唤巨石' , desc:'重新召唤地图上所有石头' , need_map_level:51 , need_money1:0 , use_money1:100 , max_level:1 , type:8 , base:1 , add_base:0 , cd_time:0 , up_num:1 , uplevel_money1:0 , uplevel_money3:0}
	};
	static readonly stone_pos:{[key:number]:tb_game_stone_pos} = {
		[1]:{id:1 , nx:3 , ny:4},
		[2]:{id:2 , nx:5 , ny:4},
		[3]:{id:3 , nx:7 , ny:4},
		[4]:{id:4 , nx:1 , ny:6},
		[5]:{id:5 , nx:3 , ny:6},
		[6]:{id:6 , nx:5 , ny:6},
		[7]:{id:7 , nx:3 , ny:8},
		[8]:{id:8 , nx:5 , ny:8},
		[9]:{id:9 , nx:7 , ny:8}
	};
}