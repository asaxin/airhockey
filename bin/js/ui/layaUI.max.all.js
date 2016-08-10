var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameInfoUI = (function (_super) {
        __extends(GameInfoUI, _super);
        function GameInfoUI() {
            _super.call(this);
        }
        GameInfoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameInfoUI.uiView);
        };
        GameInfoUI.uiView = { "type": "View", "child": [{ "props": { "x": 29, "y": 25, "text": "0", "width": 60, "height": 53, "color": "#343434", "fontSize": 50, "alpha": 0.8, "var": "player2_score_label" }, "type": "Label" }, { "props": { "x": 707, "y": 953, "text": "0", "width": 60, "height": 53, "color": "#343434", "fontSize": 50, "alpha": 0.8, "var": "player1_score_label" }, "type": "Label" }, { "props": { "x": 263, "y": 445, "width": 229, "height": 123, "var": "win_label", "font": "Microsoft YaHei", "fontSize": 100, "strokeColor": "#00ffff", "stroke": 3 }, "type": "Label" }], "props": { "width": 768, "height": 1024 } };
        return GameInfoUI;
    }(View));
    ui.GameInfoUI = GameInfoUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map