
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameInfoUI extends View {
		public player2_score_label:Laya.Label;
		public player1_score_label:Laya.Label;
		public win_label:Laya.Label;

        public static  uiView:any ={"type":"View","child":[{"props":{"x":29,"y":25,"text":"0","width":60,"height":53,"color":"#343434","fontSize":50,"alpha":0.8,"var":"player2_score_label"},"type":"Label"},{"props":{"x":707,"y":953,"text":"0","width":60,"height":53,"color":"#343434","fontSize":50,"alpha":0.8,"var":"player1_score_label"},"type":"Label"},{"props":{"x":263,"y":445,"width":229,"height":123,"var":"win_label","font":"Microsoft YaHei","fontSize":100,"strokeColor":"#00ffff","stroke":3},"type":"Label"}],"props":{"width":768,"height":1024}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);
        }
    }
}
