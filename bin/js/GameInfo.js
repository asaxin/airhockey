var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * GameInfo
 */
var GameInfo = (function (_super) {
    __extends(GameInfo, _super);
    function GameInfo() {
        _super.call(this);
        this.uiReset();
    }
    GameInfo.prototype.setplayer1_score = function (score) {
        this.player1_score_label.text = score;
    };
    GameInfo.prototype.setplayer2_score = function (score) {
        this.player2_score_label.text = score;
    };
    GameInfo.prototype.setresult = function (result) {
        this.win_label.text = result;
    };
    GameInfo.prototype.uiReset = function () {
        this.player1_score_label.text = '0';
        this.player2_score_label.text = '0';
        this.win_label.text = "";
    };
    return GameInfo;
}(ui.GameInfoUI));
//# sourceMappingURL=GameInfo.js.map