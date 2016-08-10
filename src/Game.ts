/**
 * Game
 */
import Sprite = laya.display.Sprite;
import Stage = laya.display.Stage;
import Stat = laya.utils.Stat;
import Browser = laya.utils.Browser;
import WebGL = laya.webgl.WebGL;
import Timer = laya.utils.Timer;
import Evt = laya.events.Event
import MouseManager = laya.events.MouseManager;
import Ui = laya.ui;


class Game {

    static stageWidth: number = 768;
    static stageHeight: number = 1024;

    private gameHelper: GameHelper;

    private background: Sprite;
    private player1: Player;
    private player2: Player;
    private ball: Ball;

    gameInfo: GameInfo;

    static Matter = Browser.window.Matter;
    static engine: any;

    constructor() {
        
        Laya.init(Game.stageWidth, Game.stageHeight, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
		Laya.stage.scaleMode = 'showall';
        Stat.show();

        this.init();
        this.initUI();
        this.initMatter();
        this.initWorld();

        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    pause(): void {

        Laya.timer.clear(this, this.onLoop);
        this.player1.offAll();
        this.player2.offAll();
    }

    resume(): void {

        Laya.timer.frameLoop(1, this, this.onLoop);
        this.player1.mouseDownListen();        
    }

    private init(): void {

        this.gameHelper = new GameHelper();

        this.background = new Sprite();
        this.background.loadImage('images/court.png');
        Laya.stage.addChild(this.background);

        this.player1 = new Player(Game.stageWidth/2, Game.stageHeight - 100);
        this.background.addChild(this.player1);
        this.player1.mouseListen(this.background);

        this.player2 = new Player(Game.stageWidth/2, 100);
        this.background.addChild(this.player2);
        this.player2.mouseListen(this.background);

        this.ball = new Ball();
        this.background.addChild(this.ball);
    }

    private initUI(): void {
        this.gameInfo = new GameInfo();
        Laya.stage.addChild(this.gameInfo);
    }

    private initMatter(): void {

        Game.engine = Game.Matter.Engine.create(
            {
                enableSleeping: true,
            }
        );
    }

    private initWorld(): void {

        Game.engine.world = Game.Matter.World.create(
            {
                gravity:
                {
                    x: 0,
                    y: 0,
                }
            }
        );

        let edge_bl = Game.Matter.Bodies.rectangle(Game.stageWidth/8, Game.stageHeight+100, Game.stageWidth/3, 200, 
        {
            isStatic: true,
            restitution: 0.8,
        });
        let edge_br = Game.Matter.Bodies.rectangle(Game.stageWidth*7/8, Game.stageHeight+100, Game.stageWidth/3, 200, 
        {
            isStatic: true,
            restitution: 0.8,
        });
        let edge_l = Game.Matter.Bodies.rectangle(-100, Game.stageHeight/2, 200, Game.stageHeight+200,
        {
            isStatic: true,
            restitution: 0.8,
        });
        let edge_r = Game.Matter.Bodies.rectangle(Game.stageWidth+100, Game.stageHeight/2, 200, Game.stageHeight+200,
        {
            isStatic: true,
            restitution: 0.8,
        });
        let edge_tl = Game.Matter.Bodies.rectangle(Game.stageWidth/8, -100, Game.stageWidth/3, 200,
        {
            isStatic: true,
            restitution: 0.8,
        });
        let edge_tr = Game.Matter.Bodies.rectangle(Game.stageWidth*7/8, -100, Game.stageWidth/3, 200,
        {
            isStatic: true,
            restitution: 0.8,
        });
        Game.Matter.World.add(Game.engine.world, [edge_bl, edge_br, edge_l, edge_r, edge_tl, edge_tr]);
        
        Game.Matter.World.add(Game.engine.world, [this.player1.body, this.player1.mouseConstraint, this.player2.body, this.player2.mouseConstraint, this.ball.body]);
        Game.Matter.Engine.run(Game.engine);
    }

    private onLoop(): void {

        this.ball.loop();
        this.player1.loop();
        this.player1.restrict('bottom');
        this.player2.loop();
        this.player2.restrict('top');
        let winner = null;
        if(( winner = this.gameHelper.scoreJudge(this.ball))!=null){
            this.gameInfo.setplayer1_score(""+this.gameHelper.player1_score);
            this.gameInfo.setplayer2_score(""+this.gameHelper.player2_score);
            this.gameHelper.gameReset(this.player1, this.player2, this.ball, winner);
        }
        // if(this.gameHelper.gameOver()){
        //     this.pause();
        // }
    }
}
