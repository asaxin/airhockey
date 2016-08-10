/**
 * GameHelper
 */
class GameHelper {

    player1_score: number;
    player2_score: number;

    startTime: number;

    time: Timer;

    constructor() {
        
        this.player1_score = 0;
        this.player2_score = 0;
        this.time = new Timer();
        this.startTime = this.time.currTimer;
    }

    scoreJudge(ball: Ball): string {

        if(ball.body.position.y<0){
            this.player1_score += 1;
            return 'player1';
        }
        if(ball.body.position.y>Game.stageHeight){
            this.player2_score += 1;
            return 'player2';
        }
        return null;
    }

    gameReset(player1: Player,player2: Player,ball: Ball, winner: string): void {

        Game.Matter.Composite.remove(Game.engine.world, player1.mouseConstraint);
        Game.Matter.Composite.remove(Game.engine.world, player1.body);
        Game.Matter.Composite.remove(Game.engine.world, player2.mouseConstraint);
        Game.Matter.Composite.remove(Game.engine.world, player2.body);
        Game.Matter.Composite.remove(Game.engine.world, ball.body);

        player1.new(Game.engine.world, {x: Game.stageWidth/2, y: Game.stageHeight-100});
        player2.new(Game.engine.world, {x: Game.stageWidth/2, y: 100});
        if(winner=='player1'){
            ball.pos(Game.stageWidth/2, Game.stageHeight/2 - 100);
        }
        else if(winner=='player2'){
            ball.pos(Game.stageWidth/2, Game.stageHeight/2 + 100);
        }
        ball.initBody();
        Game.Matter.Composite.add(Game.engine.world, ball.body);
    }

    gameOver(): boolean {
        if(this.time.currTimer - this.startTime>180000){
            return true;
        }
        else return false;
    }
}