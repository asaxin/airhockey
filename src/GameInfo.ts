/**
 * GameInfo
 */
class GameInfo extends ui.GameInfoUI {
    constructor() {
        super();
        this.uiReset();
    }

    setplayer1_score(score: string): void {
        this.player1_score_label.text = score;
    }

    setplayer2_score(score: string): void {
        this.player2_score_label.text = score;
    }

    setresult(result: string): void {
        this.win_label.text = result;
    }

    uiReset(): void {
        this.player1_score_label.text = '0';
        this.player2_score_label.text = '0';
        this.win_label.text = "";
    }
}