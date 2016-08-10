/**
 * Game
 */
var Sprite = laya.display.Sprite;
var Stage = laya.display.Stage;
var Stat = laya.utils.Stat;
var Browser = laya.utils.Browser;
var WebGL = laya.webgl.WebGL;
var Timer = laya.utils.Timer;
var Evt = laya.events.Event;
var MouseManager = laya.events.MouseManager;
var Ui = laya.ui;
var Game = (function () {
    function Game() {
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
    Game.prototype.pause = function () {
        Laya.timer.clear(this, this.onLoop);
        this.player1.offAll();
        this.player2.offAll();
    };
    Game.prototype.resume = function () {
        Laya.timer.frameLoop(1, this, this.onLoop);
        this.player1.mouseDownListen();
    };
    Game.prototype.init = function () {
        this.gameHelper = new GameHelper();
        this.background = new Sprite();
        this.background.loadImage('images/court.png');
        Laya.stage.addChild(this.background);
        this.player1 = new Player(Game.stageWidth / 2, Game.stageHeight - 100);
        this.background.addChild(this.player1);
        this.player1.mouseListen(this.background);
        this.player2 = new Player(Game.stageWidth / 2, 100);
        this.background.addChild(this.player2);
        this.player2.mouseListen(this.background);
        this.ball = new Ball();
        this.background.addChild(this.ball);
    };
    Game.prototype.initUI = function () {
        this.gameInfo = new GameInfo();
        Laya.stage.addChild(this.gameInfo);
    };
    Game.prototype.initMatter = function () {
        Game.engine = Game.Matter.Engine.create({
            enableSleeping: true,
        });
    };
    Game.prototype.initWorld = function () {
        Game.engine.world = Game.Matter.World.create({
            gravity: {
                x: 0,
                y: 0,
            }
        });
        var edge_bl = Game.Matter.Bodies.rectangle(Game.stageWidth / 8, Game.stageHeight + 100, Game.stageWidth / 3, 200, {
            isStatic: true,
            restitution: 0.8,
        });
        var edge_br = Game.Matter.Bodies.rectangle(Game.stageWidth * 7 / 8, Game.stageHeight + 100, Game.stageWidth / 3, 200, {
            isStatic: true,
            restitution: 0.8,
        });
        var edge_l = Game.Matter.Bodies.rectangle(-100, Game.stageHeight / 2, 200, Game.stageHeight + 200, {
            isStatic: true,
            restitution: 0.8,
        });
        var edge_r = Game.Matter.Bodies.rectangle(Game.stageWidth + 100, Game.stageHeight / 2, 200, Game.stageHeight + 200, {
            isStatic: true,
            restitution: 0.8,
        });
        var edge_tl = Game.Matter.Bodies.rectangle(Game.stageWidth / 8, -100, Game.stageWidth / 3, 200, {
            isStatic: true,
            restitution: 0.8,
        });
        var edge_tr = Game.Matter.Bodies.rectangle(Game.stageWidth * 7 / 8, -100, Game.stageWidth / 3, 200, {
            isStatic: true,
            restitution: 0.8,
        });
        Game.Matter.World.add(Game.engine.world, [edge_bl, edge_br, edge_l, edge_r, edge_tl, edge_tr]);
        Game.Matter.World.add(Game.engine.world, [this.player1.body, this.player1.mouseConstraint, this.player2.body, this.player2.mouseConstraint, this.ball.body]);
        Game.Matter.Engine.run(Game.engine);
    };
    Game.prototype.onLoop = function () {
        this.ball.loop();
        this.player1.loop();
        this.player1.restrict('bottom');
        this.player2.loop();
        this.player2.restrict('top');
        var winner = null;
        if ((winner = this.gameHelper.scoreJudge(this.ball)) != null) {
            this.gameInfo.setplayer1_score("" + this.gameHelper.player1_score);
            this.gameInfo.setplayer2_score("" + this.gameHelper.player2_score);
            this.gameHelper.gameReset(this.player1, this.player2, this.ball, winner);
        }
        // if(this.gameHelper.gameOver()){
        //     this.pause();
        // }
    };
    Game.stageWidth = 768;
    Game.stageHeight = 1024;
    Game.Matter = Browser.window.Matter;
    return Game;
}());
//# sourceMappingURL=Game.js.map