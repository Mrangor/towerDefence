
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.game {
    export class ChangeGeneralUI extends View {
		public list:Laya.List;
		public close_btn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"skin":"map/bg.png"}},{"type":"Image","props":{"width":640,"top":0,"skin":"map/btn.png","sizeGrid":"10,14,19,17","height":100,"centerX":0,"anchorX":0.5},"child":[{"type":"Label","props":{"text":"选择英雄","fontSize":48,"font":"Helvetica","color":"#f4eb03","centerY":0,"centerX":0,"bold":true}}]},{"type":"List","props":{"width":640,"var":"list","top":100,"repeatX":1,"centerX":0,"bottom":100,"anchorX":0.5},"child":[{"type":"Box","props":{"y":0,"x":0,"width":640,"renderType":"render","height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"map/btn.png","sizeGrid":"10,14,19,17","height":100}},{"type":"Box","props":{"y":17,"x":202,"name":"b1"},"child":[{"type":"Text","props":{"width":61,"text":"名称:","height":25,"fontSize":24,"font":"SimHei","color":"#d9ca1f"}},{"type":"Text","props":{"y":0,"x":60,"text":"英雄1","name":"gname","fontSize":24,"font":"Helvetica","color":"#20d710"}}]},{"type":"Box","props":{"y":17,"x":362,"name":"b2"},"child":[{"type":"Text","props":{"width":61,"text":"等级:","height":25,"fontSize":24,"font":"SimHei","color":"#d9ca1f"}},{"type":"Text","props":{"y":0,"x":60,"text":"11L","name":"level","fontSize":24,"font":"Helvetica","color":"#20d710"}}]},{"type":"Box","props":{"y":53,"x":203,"name":"b3"},"child":[{"type":"Text","props":{"width":61,"text":"描述:","height":25,"fontSize":24,"font":"SimHei"}},{"type":"Text","props":{"y":0,"x":60,"text":"单体攻击很牛逼","name":"desc","fontSize":16,"font":"Helvetica"}}]},{"type":"Image","props":{"y":13,"x":123,"skin":"icon/general1_0.png","name":"icon"}}]}]},{"type":"Image","props":{"y":0,"skin":"map/btn.png","sizeGrid":"10,14,19,17","right":0,"left":0,"height":80,"bottom":0,"anchorX":0.5},"child":[{"type":"Image","props":{"var":"close_btn","skin":"map/closeB1.png","right":20,"centerY":0}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.game.ChangeGeneralUI.uiView);

        }

    }
}

module ui.game {
    export class GameOverUI extends View {
		public game_again:Laya.Box;
		public game_change:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":640,"height":1136,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":0,"skin":"map/bg.png"}},{"type":"Box","props":{"y":250,"width":310,"var":"game_again","height":100,"centerX":0,"anchorX":0.5},"child":[{"type":"Label","props":{"text":"点击重来","fontSize":40,"font":"Arial","color":"#f4f400","centerX":0,"bottom":0}}]},{"type":"Box","props":{"width":310,"var":"game_change","top":420,"height":100,"centerX":0,"anchorX":0.5},"child":[{"type":"Label","props":{"y":676,"x":75,"text":"回到过去","fontSize":40,"font":"Arial","color":"#f4f400","centerX":0,"bottom":0}}]},{"type":"Image","props":{"top":200,"skin":"map/gameover.png","centerX":0,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.GameOverUI.uiView);
        }
    }
}

module ui.game {
    export class GameOverChangeLevelUI extends View {
		public to1_btn:Laya.Box;
		public to_lately_btn:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":640,"height":1136,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"map/bg.png"}},{"type":"Box","props":{"width":310,"var":"to1_btn","top":320,"height":100,"centerX":0,"anchorX":0.5},"child":[{"type":"Label","props":{"y":776,"x":75,"text":"第1关","fontSize":40,"font":"Arial","color":"#f4f400","centerX":0,"bottom":0}}]},{"type":"Box","props":{"width":310,"var":"to_lately_btn","top":460,"height":100,"centerX":0,"anchorX":0.5},"child":[{"type":"Label","props":{"y":636,"x":-144,"text":"第10关","fontSize":40,"font":"Arial","color":"#f4f400","centerX":0,"bottom":0}}]},{"type":"Label","props":{"top":144,"text":"回到过去","fontSize":80,"font":"Arial","color":"#17d955","centerX":0,"bold":true,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.GameOverChangeLevelUI.uiView);
        }
    }
}

module ui.game {
    export class GeneralInfoUI extends View {
		public gname:laya.display.Text;
		public level:laya.display.Text;
		public desc:laya.display.Text;
		public icon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"width":640,"height":1136},"child":[{"type":"Box","props":{"width":450,"renderType":"render","centerX":0,"bottom":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":450,"skin":"map/btn.png","sizeGrid":"10,14,19,17","height":150}},{"type":"Box","props":{"top":20,"left":120},"child":[{"type":"Text","props":{"width":61,"text":"名称:","height":25,"fontSize":24,"font":"SimHei","color":"#d9ca1f"}},{"type":"Text","props":{"y":0,"x":60,"var":"gname","text":"英雄1","fontSize":24,"font":"Helvetica","color":"#20d710"}}]},{"type":"Box","props":{"top":20,"right":20},"child":[{"type":"Text","props":{"width":61,"text":"等级:","height":25,"fontSize":24,"font":"SimHei","color":"#FFFFFF"}},{"type":"Text","props":{"y":0,"x":60,"var":"level","text":"11","fontSize":24,"font":"Helvetica","color":"#FFFFFF"}}]},{"type":"Box","props":{"top":60,"left":120},"child":[{"type":"Text","props":{"width":61,"text":"描述:","height":25,"fontSize":24,"font":"SimHei"}},{"type":"Text","props":{"y":0,"x":60,"wordWrap":true,"width":198,"var":"desc","text":"单体攻击很牛逼","height":32,"fontSize":24,"font":"Helvetica"}}]},{"type":"Image","props":{"x":50,"var":"icon","top":20,"skin":"icon/general1_0.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.game.GeneralInfoUI.uiView);

        }

    }
}

module ui.game {
    export class MapUI extends View {
		public bg:Laya.Image;
		public game_map:Laya.Box;
		public stone1:ui.game.StoneUI;
		public stone2:ui.game.StoneUI;
		public stone3:ui.game.StoneUI;
		public stone4:ui.game.StoneUI;
		public stone5:ui.game.StoneUI;
		public stone6:ui.game.StoneUI;
		public stone7:ui.game.StoneUI;
		public stone8:ui.game.StoneUI;
		public stone9:ui.game.StoneUI;
		public pos1:ui.game.PosUI;
		public pos2:ui.game.PosUI;
		public pos3:ui.game.PosUI;
		public pos4:ui.game.PosUI;
		public pos5:ui.game.PosUI;
		public pos6:ui.game.PosUI;
		public pos7:ui.game.PosUI;
		public pos8:ui.game.PosUI;
		public pos9:ui.game.PosUI;
		public game_ui:Laya.Box;
		public info_btn:Laya.Image;
		public edit_btn:Laya.Image;
		public map_level_lab:Laya.Label;
		public skill6_btn:Laya.Image;
		public skill6_msg:Laya.Label;
		public skill5_btn:Laya.Image;
		public skill5_msg:Laya.Label;
		public skill4_btn:Laya.Image;
		public skill4_msg:Laya.Label;
		public cler_btn:Laya.Image;
		public recruit_btn:Laya.Image;
		public money2:Laya.Label;
		public money1:Laya.Label;
		public money3:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"map/bg.png"}},{"type":"Box","props":{"y":0,"x":0,"width":640,"var":"game_map","mouseThrough":true,"mouseEnabled":true,"height":1136},"child":[{"type":"Stone","props":{"y":395,"x":240,"var":"stone1","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":395,"x":380,"var":"stone2","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":395,"x":520,"var":"stone3","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":100,"var":"stone4","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":240,"var":"stone5","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":380,"var":"stone6","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":240,"var":"stone7","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":380,"var":"stone8","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":520,"var":"stone9","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Pos","props":{"y":395,"x":170,"var":"pos1","runtime":"ui.game.PosUI"}},{"type":"Pos","props":{"y":395,"x":310,"var":"pos2","runtime":"ui.game.PosUI"}},{"type":"Pos","props":{"y":395,"x":450,"var":"pos3","runtime":"ui.game.PosUI"}},{"type":"Pos","props":{"y":575,"x":170,"var":"pos4","runtime":"ui.game.PosUI"}},{"type":"Pos","props":{"y":575,"x":310,"var":"pos5","runtime":"ui.game.PosUI"}},{"type":"Pos","props":{"y":575,"x":450,"var":"pos6","runtime":"ui.game.PosUI"}},{"type":"Pos","props":{"y":755,"x":170,"var":"pos7","runtime":"ui.game.PosUI"}},{"type":"Pos","props":{"y":755,"x":310,"var":"pos8","runtime":"ui.game.PosUI"}},{"type":"Pos","props":{"y":755,"x":450,"var":"pos9","runtime":"ui.game.PosUI"}}]},{"type":"Box","props":{"x":0,"width":640,"var":"game_ui","mouseThrough":true,"height":1136},"child":[{"type":"Image","props":{"width":100,"var":"info_btn","skin":"map/btn.png","left":10,"bottom":10,"anchorY":1,"anchorX":0},"child":[{"type":"Label","props":{"y":22,"x":15,"text":"信息","fontSize":32,"font":"Helvetica","bold":true}}]},{"type":"Image","props":{"width":100,"var":"edit_btn","skin":"map/btn.png","right":10,"bottom":10,"anchorY":1,"anchorX":1},"child":[{"type":"Label","props":{"y":22,"x":15,"text":"编辑","fontSize":32,"font":"Helvetica","color":"#20e8df","bold":true}}]},{"type":"Label","props":{"top":30,"text":"关卡","right":80,"fontSize":32,"font":"Helvetica","color":"#e8fb0f","bold":true,"anchorY":0,"anchorX":1},"child":[{"type":"Label","props":{"x":80,"var":"map_level_lab","text":"11","fontSize":32,"font":"Helvetica","color":"#e8fb0f","bold":false}}]},{"type":"Image","props":{"width":80,"var":"skill6_btn","skin":"skill/skill6.png","height":80,"centerX":100,"bottom":10,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":0,"visible":false,"var":"skill6_msg","text":"60s","fontSize":24,"font":"Helvetica","color":"#ffffff","centerX":0,"anchorY":1,"anchorX":0.5}}]},{"type":"Image","props":{"width":80,"var":"skill5_btn","skin":"skill/skill5.png","height":80,"centerX":0,"bottom":10,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":0,"visible":false,"var":"skill5_msg","text":"60s","fontSize":24,"font":"Helvetica","color":"#ffffff","centerX":0,"anchorY":1,"anchorX":0.5}}]},{"type":"Image","props":{"width":80,"var":"skill4_btn","skin":"skill/skill4.png","height":80,"centerX":-100,"bottom":10,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":0,"visible":false,"var":"skill4_msg","text":"60s","fontSize":24,"font":"Helvetica","color":"#ffffff","centerX":0,"anchorY":1,"anchorX":0.5}}]},{"type":"Image","props":{"top":935,"skin":"map/bx.png","centerX":-5,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"width":180,"var":"cler_btn","top":100,"skin":"map/btn.png","skewY":0,"skewX":0,"right":0,"height":64,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":32,"x":90,"text":" 清理缓存","height":32,"fontSize":32,"font":"Helvetica","color":"#000000","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"width":150,"var":"recruit_btn","top":100,"skin":"map/btn.png","left":0,"height":56},"child":[{"type":"Image","props":{"skin":"map/m21.png","left":20,"centerY":0}},{"type":"Label","props":{"var":"money2","text":"9999","left":60,"fontSize":32,"font":"Helvetica","color":"#51f106","centerY":0}}]},{"type":"Image","props":{"top":60,"skin":"map/m11.png","left":10},"child":[{"type":"Label","props":{"y":0,"x":40,"var":"money1","text":"9999","fontSize":32,"font":"Helvetica","color":"#FFFFFF"}}]},{"type":"Image","props":{"top":20,"skin":"map/m31.png","left":10},"child":[{"type":"Label","props":{"y":0,"x":40,"var":"money3","text":"9999","fontSize":32,"font":"Helvetica","color":"#FFFF00"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.game.StoneUI",ui.game.StoneUI);
			View.regComponent("ui.game.PosUI",ui.game.PosUI);

            super.createChildren();
            this.createView(ui.game.MapUI.uiView);

        }

    }
}

module ui.game {
    export class MapChanegeUI extends View {
		public map:Laya.Image;
		public stone1:ui.game.StoneUI;
		public stone2:ui.game.StoneUI;
		public stone3:ui.game.StoneUI;
		public stone4:ui.game.StoneUI;
		public stone5:ui.game.StoneUI;
		public stone6:ui.game.StoneUI;
		public stone7:ui.game.StoneUI;
		public stone8:ui.game.StoneUI;
		public stone9:ui.game.StoneUI;
		public pos1:ui.game.PosChangeUI;
		public pos2:ui.game.PosChangeUI;
		public pos3:ui.game.PosChangeUI;
		public pos4:ui.game.PosChangeUI;
		public pos5:ui.game.PosChangeUI;
		public pos6:ui.game.PosChangeUI;
		public pos7:ui.game.PosChangeUI;
		public pos8:ui.game.PosChangeUI;
		public pos9:ui.game.PosChangeUI;
		public recruit_btn:Laya.Box;
		public money2:Laya.Label;
		public no_qr_btn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":640,"name":"stone","height":1136},"child":[{"type":"Image","props":{"var":"map","skin":"map/bg.png"}},{"type":"Box","props":{"y":0,"x":0,"width":640,"name":"game_stone","height":1136},"child":[{"type":"Stone","props":{"y":395,"x":240,"var":"stone1","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":395,"x":380,"width":70,"var":"stone2","height":70,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":395,"x":520,"var":"stone3","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":100,"width":70,"var":"stone4","height":70,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":240,"var":"stone5","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":380,"var":"stone6","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":240,"var":"stone7","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":380,"var":"stone8","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":520,"var":"stone9","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"PosChange","props":{"y":395,"x":170,"var":"pos1","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}},{"type":"PosChange","props":{"y":395,"x":310,"var":"pos2","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}},{"type":"PosChange","props":{"y":395,"x":450,"var":"pos3","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}},{"type":"PosChange","props":{"y":575,"x":170,"var":"pos4","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}},{"type":"PosChange","props":{"y":575,"x":310,"var":"pos5","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}},{"type":"PosChange","props":{"y":575,"x":450,"var":"pos6","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}},{"type":"PosChange","props":{"y":755,"x":170,"var":"pos7","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}},{"type":"PosChange","props":{"y":755,"x":310,"var":"pos8","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}},{"type":"PosChange","props":{"y":755,"x":450,"var":"pos9","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosChangeUI"}}]},{"type":"Box","props":{"y":0,"x":0,"width":640,"name":"game_ui","mouseThrough":true,"height":1136},"child":[{"type":"Box","props":{"width":150,"var":"recruit_btn","top":120,"left":0,"height":56},"child":[{"type":"Image","props":{"y":0,"x":0,"width":150,"skin":"map/btn.png","height":56}},{"type":"Image","props":{"skin":"map/m21.png","left":10,"centerY":0}},{"type":"Label","props":{"var":"money2","text":"9999","left":45,"fontSize":32,"font":"Helvetica","color":"#51f106","centerY":0}}]},{"type":"Image","props":{"width":100,"var":"no_qr_btn","skin":"map/btn.png","sizeGrid":"0,0,0,0","height":64,"centerX":0,"bottom":100,"anchorY":1,"anchorX":0.5},"child":[{"type":"Label","props":{"y":32,"x":50,"text":"确认","fontSize":32,"font":"Helvetica","color":"#f9f00d","bold":true,"anchorY":0.5,"anchorX":0.5}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.game.StoneUI",ui.game.StoneUI);
			View.regComponent("ui.game.PosChangeUI",ui.game.PosChangeUI);

            super.createChildren();
            this.createView(ui.game.MapChanegeUI.uiView);

        }

    }
}

module ui.game {
    export class MapLevelUpUI extends View {
		public map:Laya.Image;
		public stone1:ui.game.StoneUI;
		public stone2:ui.game.StoneUI;
		public stone3:ui.game.StoneUI;
		public stone4:ui.game.StoneUI;
		public stone5:ui.game.StoneUI;
		public stone6:ui.game.StoneUI;
		public stone7:ui.game.StoneUI;
		public stone8:ui.game.StoneUI;
		public stone9:ui.game.StoneUI;
		public pos9:ui.game.PosLevelUI;
		public pos8:ui.game.PosLevelUI;
		public pos7:ui.game.PosLevelUI;
		public pos6:ui.game.PosLevelUI;
		public pos5:ui.game.PosLevelUI;
		public pos4:ui.game.PosLevelUI;
		public pos3:ui.game.PosLevelUI;
		public pos2:ui.game.PosLevelUI;
		public pos1:ui.game.PosLevelUI;
		public edit_ext_btn:Laya.Image;
		public money3:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"width":640,"var":"map","skin":"map/bg.png","height":1136}},{"type":"Box","props":{"y":0,"x":0,"width":640,"name":"game_stone","height":1136},"child":[{"type":"Stone","props":{"y":395,"x":240,"var":"stone1","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":395,"x":380,"var":"stone2","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":395,"x":520,"var":"stone3","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":100,"var":"stone4","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":240,"var":"stone5","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":575,"x":380,"var":"stone6","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":240,"var":"stone7","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":380,"var":"stone8","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"Stone","props":{"y":755,"x":520,"var":"stone9","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.StoneUI"}},{"type":"PosLevel","props":{"y":755,"x":450,"var":"pos9","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}},{"type":"PosLevel","props":{"y":755,"x":310,"var":"pos8","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}},{"type":"PosLevel","props":{"y":755,"x":170,"var":"pos7","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}},{"type":"PosLevel","props":{"y":575,"x":450,"var":"pos6","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}},{"type":"PosLevel","props":{"y":575,"x":310,"var":"pos5","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}},{"type":"PosLevel","props":{"y":575,"x":170,"var":"pos4","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}},{"type":"PosLevel","props":{"y":395,"x":450,"var":"pos3","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}},{"type":"PosLevel","props":{"y":395,"x":310,"var":"pos2","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}},{"type":"PosLevel","props":{"y":395,"x":170,"var":"pos1","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.PosLevelUI"}}]},{"type":"Box","props":{"y":0,"x":0,"width":640,"name":"game_ui","mouseThrough":true,"height":1136},"child":[{"type":"Label","props":{"text":"编辑模式","fontSize":48,"font":"Helvetica","color":"#20e8df","centerX":0,"bottom":100,"bold":true}},{"type":"Image","props":{"var":"edit_ext_btn","skin":"map/closeB1.png","scaleY":1.5,"scaleX":1.5,"right":20,"bottom":10}},{"type":"Box","props":{"top":50,"left":20},"child":[{"type":"Image","props":{"skin":"map/m31.png"}},{"type":"Label","props":{"y":0,"x":40,"var":"money3","text":"9999","fontSize":32,"font":"Helvetica","color":"#FFFF00"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.game.StoneUI",ui.game.StoneUI);
			View.regComponent("ui.game.PosLevelUI",ui.game.PosLevelUI);

            super.createChildren();
            this.createView(ui.game.MapLevelUpUI.uiView);

        }

    }
}

module ui.game {
    export class NextLevelUI extends View {
		public txt:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"y":50,"x":150,"width":300,"height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"y":50,"x":150,"width":300,"height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Text","props":{"y":25,"x":93,"var":"txt","text":"第1关","fontSize":40,"font":"Arial","color":"#f4f400"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.game.NextLevelUI.uiView);
        }
    }
}

module ui.game {
    export class PosUI extends View {
		public msg_btn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":35,"x":35,"width":70,"height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":70,"var":"msg_btn","skin":"map/buildarea-sheet0.png","height":70}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.PosUI.uiView);
        }
    }
}

module ui.game {
    export class PosChangeUI extends View {
		public msg_btn:Laya.Image;
		public gh_btn:Laya.Image;
		public yc_btn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":85,"x":35,"width":70,"height":170,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":85,"x":35,"width":70,"var":"msg_btn","skin":"map/buildarea-sheet0.png","height":70,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"width":70,"var":"gh_btn","top":0,"skin":"map/btn.png","sizeGrid":"5,5,5,5","height":40,"centerX":0},"child":[{"type":"Label","props":{"text":"更换","fontSize":24,"font":"Helvetica","color":"#3df60e","centerY":0,"centerX":0,"bold":true}}]},{"type":"Image","props":{"width":70,"var":"yc_btn","skin":"map/btn.png","sizeGrid":"5,5,5,5","height":40,"centerX":0,"bottom":0},"child":[{"type":"Label","props":{"text":"移除","fontSize":24,"font":"Helvetica","color":"#FFFFFF","centerY":0,"centerX":0,"bold":true}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.PosChangeUI.uiView);
        }
    }
}

module ui.game {
    export class PosLevelUI extends View {
		public msg_btn:Laya.Image;
		public levelup_btn:Laya.Image;
		public levelup_money2:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":85,"x":35,"width":70,"height":170,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"width":70,"var":"msg_btn","skin":"map/buildarea-sheet0.png","height":70,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"width":70,"visible":false,"var":"levelup_btn","skin":"map/btn.png","sizeGrid":"5,5,5,5","height":40,"centerX":0,"bottom":15},"child":[{"type":"Label","props":{"var":"levelup_money2","text":"10","fontSize":24,"font":"Helvetica","color":"#FFFFFF","centerY":0,"centerX":0,"bold":true}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.PosLevelUI.uiView);
        }
    }
}

module ui.game {
    export class RecruitUI extends View {
		public btn1:Laya.Box;
		public bg1:Laya.Image;
		public btn2:Laya.Box;
		public bg2:Laya.Image;
		public btn3:Laya.Box;
		public bg3:Laya.Image;
		public money1:Laya.Label;
		public money2:Laya.Label;
		public close_btn:Laya.Image;
		public bg:Laya.Image;
		public _name:Laya.Label;
		public _ani:Laya.Animation;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"map/btn.png","sizeGrid":"27,135,41,130","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"width":200,"var":"btn1","height":200,"centerX":-200,"bottom":10,"anchorX":0.5},"child":[{"type":"Image","props":{"width":200,"skin":"map/btn.png","sizeGrid":"30,17,30,17","height":200}},{"type":"Label","props":{"y":30,"x":100,"text":"普通或以上","fontSize":32,"font":"Helvetica","color":"#0925f4","anchorY":0,"anchorX":0.5}},{"type":"Image","props":{"y":120,"x":100,"var":"bg1","skin":"map/btn.png","scaleY":0.6,"scaleX":0.6,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":120,"x":100,"width":75.59375,"height":32,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"map/m21.png"}},{"type":"Label","props":{"y":0,"x":40,"text":"10","fontSize":32,"font":"Helvetica","color":"#51f106"}}]}]},{"type":"Box","props":{"width":200,"var":"btn2","height":200,"centerX":0,"bottom":10,"anchorX":0.5},"child":[{"type":"Image","props":{"width":200,"skin":"map/btn.png","sizeGrid":"30,17,30,17","height":200}},{"type":"Image","props":{"y":120,"x":100,"var":"bg2","skin":"map/btn.png","scaleY":0.6,"scaleX":0.6,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":30,"x":100,"text":"精英或以上","fontSize":32,"font":"Helvetica","color":"#0925f4","anchorY":0,"anchorX":0.5}},{"type":"Box","props":{"y":120,"x":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"map/m21.png"}},{"type":"Label","props":{"y":0,"x":40,"text":"30","fontSize":32,"font":"Helvetica","color":"#51f106"}}]}]},{"type":"Box","props":{"width":200,"var":"btn3","height":200,"centerX":200,"bottom":10,"anchorX":0.5},"child":[{"type":"Image","props":{"width":200,"skin":"map/btn.png","sizeGrid":"30,17,30,17","height":200}},{"type":"Label","props":{"y":30,"x":100,"text":"精英或以上","fontSize":32,"font":"Helvetica","color":"#0925f4","anchorY":0,"anchorX":0.5}},{"type":"Image","props":{"y":120,"x":100,"var":"bg3","skin":"map/btn.png","scaleY":0.6,"scaleX":0.6,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":120,"x":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"map/m11.png"}},{"type":"Label","props":{"y":0,"x":40,"text":"60","fontSize":32,"font":"Helvetica","color":"#FFFFFF"}}]}]},{"type":"Box","props":{"top":100,"left":10},"child":[{"type":"Image","props":{"skin":"map/m11.png","centerY":0}},{"type":"Label","props":{"var":"money1","text":"9999","left":50,"fontSize":32,"font":"Helvetica","color":"#FFFFFF","centerY":0}}]},{"type":"Box","props":{"width":150,"top":150,"left":0,"height":56},"child":[{"type":"Image","props":{"width":150,"skin":"map/btn.png","height":56,"centerY":0,"centerX":0}},{"type":"Image","props":{"skin":"map/m21.png","left":20,"centerY":0}},{"type":"Label","props":{"var":"money2","text":"9999","left":60,"fontSize":32,"font":"Helvetica","color":"#51f106","centerY":0}}]},{"type":"Image","props":{"top":0,"skin":"map/btn.png","sizeGrid":"30,17,30,17","right":0,"name":"top","left":0,"height":100},"child":[{"type":"Label","props":{"text":"召唤者的祭坛","fontSize":64,"font":"Helvetica","color":"#0925f4","centerY":0,"centerX":0,"bold":true,"anchorY":0,"anchorX":0.5}},{"type":"Image","props":{"width":50,"var":"close_btn","top":0,"skin":"map/closeB1.png","left":20,"height":68,"anchorY":0}}]},{"type":"Image","props":{"y":568,"x":320,"width":300,"var":"bg","skin":"map/btn.png","sizeGrid":"27,135,41,130","height":300,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"visible":false,"var":"_name","text":"名称","fontSize":40,"font":"Helvetica","color":"#FFFFFF","centerX":0,"bottom":0,"bold":true,"anchorY":0,"anchorX":0.5}},{"type":"Animation","props":{"y":260,"x":150,"visible":false,"var":"_ani","source":"ani/general/1.ani","scaleY":3,"scaleX":3}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.RecruitUI.uiView);

        }

    }
}

module ui.game {
    export class StoneUI extends View {
		public hp:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":70,"height":70},"child":[{"type":"Image","props":{"y":35,"x":35,"width":70,"skin":"map/strick.png","height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":25,"x":35,"var":"hp","text":"1000","fontSize":24,"color":"#eff812","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.StoneUI.uiView);
        }
    }
}

module ui.game {
    export class TipsMsgUI extends View {
		public msg_lab:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":1,"x":1,"width":2,"height":2,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":0,"x":0,"var":"msg_lab","text":"消息消息消息消息消息消息消息消息消息消息","fontSize":48,"font":"Helvetica","color":"#d71030","bold":false,"anchorY":0,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.TipsMsgUI.uiView);
        }
    }
}

module ui.game {
    export class WayUI extends View {

        public static  uiView:any ={"type":"View","props":{"y":35,"x":35,"width":70,"height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":35,"x":35,"width":70,"skin":"map/way.png","height":70,"anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.WayUI.uiView);
        }
    }
}

module ui.info {
    export class DownUI extends View {
		public skill_btn:Laya.Image;
		public general_btn:Laya.Image;
		public shop_btn:Laya.Image;
		public close_btn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"map/btn.png","sizeGrid":"30,17,30,17","pivotX":1,"name":"left","height":100,"anchorY":0},"child":[{"type":"Image","props":{"width":120,"var":"skill_btn","skin":"map/btn.png","scaleY":1,"scaleX":1,"left":100,"height":64,"centerY":0,"anchorX":1},"child":[{"type":"Label","props":{"y":16,"x":23,"text":"技能","fontSize":32,"font":"Helvetica","color":"#7aec11","bold":true}}]},{"type":"Image","props":{"width":120,"var":"general_btn","skin":"map/btn.png","left":240,"height":64,"centerY":0,"anchorX":1},"child":[{"type":"Label","props":{"y":16,"x":23,"text":"英雄","fontSize":32,"font":"Helvetica","color":"#7aec11","bold":true}}]},{"type":"Image","props":{"width":120,"var":"shop_btn","skin":"map/btn.png","left":380,"height":64,"centerY":0,"anchorX":1},"child":[{"type":"Label","props":{"y":16,"x":23,"text":"商店","fontSize":32,"font":"Helvetica","color":"#7aec11","bold":true}}]},{"type":"Image","props":{"width":52,"var":"close_btn","skin":"map/closeB1.png","scaleY":1.2,"scaleX":1.2,"left":10,"height":68,"bottom":0}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.info.DownUI.uiView);
        }
    }
}

module ui.info {
    export class GeneralIconUI extends View {
		public icon_img:Laya.Image;
		public star1:Laya.Box;
		public star2:Laya.Box;
		public star3:Laya.Box;
		public blevel:Laya.Box;
		public level:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":210,"height":200},"child":[{"type":"Image","props":{"y":10,"x":15,"top":0,"skin":"map/btn.png","sizeGrid":"30,17,30,17","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Box","props":{"width":90,"scaleY":2,"scaleX":2,"renderType":"render","height":90,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"var":"icon_img","skin":"icon/general1_0.png","scaleY":1,"scaleX":1,"centerY":0,"centerX":0,"anchorX":0.5}},{"type":"Box","props":{"width":20,"visible":false,"var":"star1","height":15,"centerX":0,"bottom":0},"child":[{"type":"Image","props":{"y":8,"x":10,"width":20,"skin":"general/star1.png","height":15,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"visible":false,"var":"star2","height":15,"centerX":0,"bottom":0},"child":[{"type":"Image","props":{"y":8,"x":20,"width":20,"skin":"general/star1.png","height":15,"anchorY":0.5,"anchorX":1}},{"type":"Image","props":{"y":8,"x":20,"width":20,"skin":"general/star1.png","height":15,"anchorY":0.5,"anchorX":0}}]},{"type":"Box","props":{"width":20,"visible":false,"var":"star3","height":15,"centerX":0,"bottom":0},"child":[{"type":"Image","props":{"y":8,"x":10,"width":20,"skin":"general/star3.png","height":15,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":2,"x":2,"width":28,"var":"blevel","height":28},"child":[{"type":"Label","props":{"var":"level","top":2,"text":"100","fontSize":16,"font":"Helvetica","color":"#FFFFFF","centerX":0,"bold":true,"align":"left"}},{"type":"Label","props":{"top":16,"text":"等级","fontSize":12,"font":"Helvetica","color":"#FFFFFF","centerX":0}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.info.GeneralIconUI.uiView);

        }

    }
}

module ui.info {
    export class GeneralListUI extends View {
		public general_panel:Laya.Panel;
		public down_view:DownView;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":640,"height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"map/bg.png","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Top","props":{"y":0,"x":0,"runtime":"TopView","name":"top"}},{"type":"Image","props":{"width":640,"top":50,"skin":"map/btn.png","sizeGrid":"30,17,30,17","name":"top","height":100,"centerX":0,"anchorY":0,"anchorX":0.5},"child":[{"type":"Label","props":{"text":"英雄","fontSize":48,"font":"Helvetica","color":"#f3ce0c","centerY":0,"centerX":0,"bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Panel","props":{"visible":true,"var":"general_panel","top":150,"right":0,"left":0,"height":886}},{"type":"Down","props":{"var":"down_view","runtime":"DownView","centerX":0,"bottom":0}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("TopView",TopView);
			View.regComponent("DownView",DownView);

            super.createChildren();
            this.createView(ui.info.GeneralListUI.uiView);

        }

    }
}

module ui.info {
    export class GeneralListColorUI extends View {
		public title_lab:Laya.Label;
		public icon_list:Laya.List;
		public view:ui.info.GeneralIconUI;

        public static  uiView:any ={"type":"View","props":{"width":640,"runtime":"GeneralListColorView","mouseThrough":true,"height":280},"child":[{"type":"Box","props":{"y":0,"x":0,"width":640,"height":280},"child":[{"type":"Image","props":{"width":640,"top":0,"skin":"map/btn.png","sizeGrid":"30,17,30,17","right":0,"left":0,"height":280,"bottom":0}},{"type":"Image","props":{"x":0,"width":640,"skin":"map/btn.png","sizeGrid":"30,17,30,17","height":64,"anchorY":0,"anchorX":0},"child":[{"type":"Label","props":{"y":32,"x":320,"var":"title_lab","text":"普通","fontSize":32,"font":"Helvetica","color":"#00FF00","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"List","props":{"y":70,"x":0,"width":640,"var":"icon_list","repeatX":3,"mouseThrough":true,"anchorY":0},"child":[{"type":"GeneralIcon","props":{"y":0,"x":10,"var":"view","renderType":"render","runtime":"ui.info.GeneralIconUI"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("GeneralListColorView",GeneralListColorView);
			View.regComponent("ui.info.GeneralIconUI",ui.info.GeneralIconUI);

            super.createChildren();
            this.createView(ui.info.GeneralListColorUI.uiView);

        }

    }
}

module ui.info {
    export class LeftUI extends View {
		public skill_btn:Laya.Image;
		public general_btn:Laya.Image;
		public shop_btn:Laya.Image;
		public close_btn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"map/btn.png","sizeGrid":"30,17,30,17","pivotX":1,"name":"left","height":100,"anchorY":0},"child":[{"type":"Image","props":{"width":120,"var":"skill_btn","skin":"map/btn.png","scaleY":1,"scaleX":1,"left":100,"height":64,"centerY":0,"anchorX":1},"child":[{"type":"Label","props":{"y":16,"x":23,"text":"技能","fontSize":32,"font":"Helvetica","color":"#7aec11","bold":true}}]},{"type":"Image","props":{"width":120,"var":"general_btn","skin":"map/btn.png","left":240,"height":64,"centerY":0,"anchorX":1},"child":[{"type":"Label","props":{"y":16,"x":23,"text":"英雄","fontSize":32,"font":"Helvetica","color":"#7aec11","bold":true}}]},{"type":"Image","props":{"width":120,"var":"shop_btn","skin":"map/btn.png","left":380,"height":64,"centerY":0,"anchorX":1},"child":[{"type":"Label","props":{"y":16,"x":23,"text":"商店","fontSize":32,"font":"Helvetica","color":"#7aec11","bold":true}}]},{"type":"Image","props":{"width":52,"var":"close_btn","skin":"map/closeB1.png","scaleY":1.2,"scaleX":1.2,"left":10,"height":68,"bottom":0}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.info.LeftUI.uiView);

        }

    }
}

module ui.info {
    export class ShopListUI extends View {
		public down_view:DownView;
		public shop_money3_btn:Laya.Image;
		public shop_money2_btn:Laya.Image;
		public list:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"map/bg.png","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Top","props":{"top":0,"runtime":"TopView","right":0,"name":"top","left":0}},{"type":"Image","props":{"width":640,"top":50,"skin":"map/btn.png","sizeGrid":"30,17,30,17","height":100,"centerX":0,"anchorY":0,"anchorX":0.5},"child":[{"type":"Label","props":{"text":"商店","fontSize":48,"font":"Helvetica","color":"#0cf3e0","centerY":0,"centerX":0,"bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Down","props":{"y":1136,"x":0,"var":"down_view","runtime":"DownView","centerX":0,"bottom":0,"anchorY":1}},{"type":"Box","props":{"x":0,"top":150,"right":0,"left":0,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"map/btn.png","sizeGrid":"30,17,30,17","name":"bg","height":100}},{"type":"Image","props":{"y":436,"width":64,"skin":"map/m31.png","name":"icon","left":60,"height":64,"centerY":0},"child":[{"type":"Label","props":{"y":8,"text":"200","left":64,"fontSize":48,"font":"Helvetica","color":"#FFFFFF","centerY":0,"bold":true}}]},{"type":"Image","props":{"width":120,"var":"shop_money3_btn","skin":"map/btn.png","right":120,"height":50,"centerY":0},"child":[{"type":"Image","props":{"skin":"map/m11.png","name":"money_icon","left":10,"centerY":0}},{"type":"Label","props":{"text":"10","name":"money","left":50,"fontSize":24,"font":"Helvetica","color":"#ffffff","centerY":0,"bold":false}}]}]},{"type":"Box","props":{"x":0,"top":250,"right":0,"left":0,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"map/btn.png","sizeGrid":"30,17,30,17","name":"bg","height":100}},{"type":"Image","props":{"y":436,"width":44,"skin":"map/m21.png","name":"icon","left":60,"height":64,"centerY":0},"child":[{"type":"Label","props":{"y":8,"text":"10","left":64,"fontSize":48,"font":"Helvetica","color":"#FFFFFF","centerY":0,"bold":true}}]},{"type":"Image","props":{"width":120,"var":"shop_money2_btn","skin":"map/btn.png","right":120,"height":50,"centerY":0},"child":[{"type":"Image","props":{"skin":"map/m31.png","name":"money_icon","left":10,"centerY":0}},{"type":"Label","props":{"text":"300","name":"money","left":50,"fontSize":24,"font":"Helvetica","color":"#ffffff","centerY":0,"bold":false}}]}]},{"type":"List","props":{"x":0,"width":640,"var":"list","top":350,"repeatX":1,"bottom":100},"child":[{"type":"Box","props":{"y":0,"x":0,"width":640,"renderType":"render","height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"map/btn.png","sizeGrid":"30,17,30,17","name":"bg","height":100}},{"type":"Image","props":{"y":436,"x":0,"width":64,"skin":"map/m11.png","name":"icon","left":60,"height":64,"centerY":0},"child":[{"type":"Label","props":{"y":8,"text":"60","name":"money1","left":64,"fontSize":48,"font":"Helvetica","color":"#FFFFFF","centerY":0,"bold":true}}]},{"type":"Image","props":{"y":0,"x":0,"width":120,"skin":"map/btn.png","right":120,"name":"shop_money_btn","height":50,"centerY":0},"child":[{"type":"Label","props":{"text":"1元","name":"money","fontSize":32,"font":"Helvetica","color":"#ffffff","centerY":0,"centerX":0,"bold":false,"anchorY":0.5,"anchorX":0.5}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("TopView",TopView);
			View.regComponent("DownView",DownView);

            super.createChildren();
            this.createView(ui.info.ShopListUI.uiView);

        }

    }
}

module ui.info {
    export class SkillListUI extends View {
		public list:Laya.List;
		public down_view:DownView;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"top":0,"skin":"map/bg.png","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Top","props":{"y":0,"x":0,"runtime":"TopView","name":"top"}},{"type":"Image","props":{"width":640,"top":50,"skin":"map/btn.png","sizeGrid":"30,17,30,17","height":100,"centerX":0,"anchorY":0,"anchorX":0.5},"child":[{"type":"Label","props":{"text":"技能","fontSize":48,"font":"Helvetica","color":"#0cf3e0","centerY":0,"centerX":0,"bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"List","props":{"x":0,"width":640,"var":"list","top":150,"repeatX":1,"centerX":0,"bottom":100},"child":[{"type":"Box","props":{"y":0,"x":0,"width":640,"renderType":"render","height":119},"child":[{"type":"Image","props":{"top":0,"skin":"map/btn.png","sizeGrid":"30,17,30,17","right":0,"name":"bg","left":0,"bottom":0}},{"type":"Image","props":{"skin":"skill/skill2.png","scaleY":1.2,"scaleX":1.2,"name":"icon","left":30,"centerY":0}},{"type":"Text","props":{"y":17,"x":124,"text":"英雄攻击力2倍","name":"skillname","fontSize":24,"font":"Helvetica","color":"#15f3cf"}},{"type":"Box","props":{"y":17,"x":304,"name":"blevel"},"child":[{"type":"Label","props":{"y":0,"x":60,"text":"11","name":"level","fontSize":24,"font":"Helvetica","color":"#FFFFFF","bold":false},"child":[{"type":"Label","props":{"text":"等级:","left":-60,"fontSize":24,"font":"Helvetica","color":"#FFFFFF"}}]}]},{"type":"Text","props":{"y":53,"x":124,"wordWrap":true,"width":324,"text":"造成无视防御力的范围伤害 攻击力:1500","name":"desc","height":55,"fontSize":24,"font":"Helvetica","color":"#FFFFFF"}},{"type":"Box","props":{"right":50,"name":"block","height":100,"centerY":0},"child":[{"type":"Image","props":{"width":120,"skin":"map/btn.png","name":"skill_btn","height":47,"centerY":10,"centerX":0},"child":[{"type":"Image","props":{"skin":"map/m11.png","name":"money_icon","left":10,"centerY":0}},{"type":"Label","props":{"text":"100","name":"money","left":50,"fontSize":24,"font":"Helvetica","color":"#ffffff","centerY":0,"bold":false}}]},{"type":"Label","props":{"top":10,"text":"解锁","name":"title","fontSize":24,"font":"Helvetica","color":"#b5e51d","centerX":0,"bold":true}}]},{"type":"Box","props":{"width":80,"right":70,"name":"bmap","centerY":0},"child":[{"type":"Label","props":{"y":0,"x":40,"text":"第11","name":"maplevel","fontSize":24,"font":"Helvetica","color":"#FFFFFF","bold":false,"anchorY":0,"anchorX":0.5}},{"type":"Label","props":{"y":50,"x":40,"text":"关解锁","fontSize":24,"font":"Helvetica","color":"#FFFFFF","bold":false,"anchorY":1,"anchorX":0.5}}]},{"type":"Box","props":{"y":10,"x":10,"right":50,"name":"bmax","height":100,"centerY":0},"child":[{"type":"Image","props":{"width":120,"skin":"map/btn.png","name":"skill_btn","height":47,"centerY":10,"centerX":0},"child":[{"type":"Label","props":{"text":"max","name":"money","fontSize":24,"font":"Helvetica","color":"#ffffff","centerY":0,"centerX":0,"bold":false}}]}]}]}]},{"type":"Down","props":{"y":1136,"x":0,"var":"down_view","runtime":"DownView","centerX":0,"bottom":0,"anchorY":1}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("TopView",TopView);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("DownView",DownView);

            super.createChildren();
            this.createView(ui.info.SkillListUI.uiView);

        }

    }
}

module ui.info {
    export class TopUI extends View {
		public money1:Laya.Label;
		public money2:Laya.Label;
		public money3:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":50},"child":[{"type":"Image","props":{"top":0,"skin":"map/btn.png","sizeGrid":"30,17,30,17","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"x":50,"skin":"map/m11.png","left":50,"centerY":0,"anchorY":0,"anchorX":0},"child":[{"type":"Label","props":{"y":0,"x":40,"var":"money1","text":"9999","fontSize":32,"font":"Helvetica","color":"#FFFFFF"}}]},{"type":"Image","props":{"skin":"map/m21.png","left":200,"centerY":0,"anchorY":0,"anchorX":0.5},"child":[{"type":"Label","props":{"y":0,"x":40,"var":"money2","text":"9999","fontSize":32,"font":"Helvetica","color":"#FFFF00"}}]},{"type":"Image","props":{"skin":"map/m31.png","left":350,"centerY":0,"anchorY":0,"anchorX":0.5},"child":[{"type":"Label","props":{"y":0,"x":40,"var":"money3","text":"9999","fontSize":32,"font":"Helvetica","color":"#FFFF00"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.info.TopUI.uiView);

        }

    }
}
