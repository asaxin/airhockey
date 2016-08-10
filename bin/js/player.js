var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Player
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        _super.call(this);
        this.init();
        this.x = x;
        this.y = y;
        this.isMouseDown = false;
        this.initBody();
        this.initMouseConstraint();
    }
    Player.prototype.new = function (world, position) {
        if (this.body != null) {
            this.pos(position.x, position.y);
            this.initBody();
            this.initMouseConstraint();
            Game.Matter.World.add(world, [this.body, this.mouseConstraint]);
        }
    };
    Player.prototype.restrict = function (where) {
        switch (where) {
            case 'top':
                if (this.mouseConstraint.pointA.y > Game.stageHeight / 2 - this.radius) {
                    this.mouseConstraint.pointA.y = Game.stageHeight / 2 - this.radius;
                }
                if (this.y < 0) {
                    this.mouseConstraint.pointA.y = 0;
                }
                break;
            case 'bottom':
                if (this.mouseConstraint.pointA.y < Game.stageHeight / 2 + this.radius)
                    this.mouseConstraint.pointA.y = Game.stageHeight / 2 + this.radius;
                if (this.y > Game.stageHeight) {
                    this.mouseConstraint.pointA.y = Game.stageHeight;
                }
                break;
        }
    };
    Player.prototype.initMouseConstraint = function () {
        this.mouseConstraint = Game.Matter.Constraint.create({
            id: 'playerConstrain',
            pointA: { x: this.body.position.x, y: this.body.position.y },
            bodyB: this.body,
            porintB: { x: 0, y: 0 },
            stiffness: 1,
            length: 0.1,
        });
    };
    Player.prototype.initBody = function () {
        this.body = Game.Matter.Bodies.circle(this.x, this.y, this.radius, {
            isStatic: false,
            density: 1,
            restitution: 0.2,
            friction: 0.3,
            frictionStatic: 0.3,
        });
    };
    Player.prototype.init = function () {
        this.radius = 60;
        this.pivot(this.radius, this.radius);
        this.loadImage('images/player.png');
        this.mouseDownListen();
    };
    Player.prototype.mouseDownListen = function () {
        this.on('mousedown', this, this.onMouseDown);
    };
    Player.prototype.mouseListen = function (s) {
        s.on('mouseup', this, this.onMouseUp);
    };
    Player.prototype.onMouseDown = function (event) {
        this.isMouseDown = true;
    };
    Player.prototype.onMouseUp = function (event) {
        this.isMouseDown = false;
    };
    Player.prototype.loop = function () {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
        if (this.isMouseDown) {
            this.mouseConstraint.pointA =
                {
                    x: Laya.stage.mouseX,
                    y: Laya.stage.mouseY,
                };
        }
        else {
            this.mouseConstraint.pointA =
                {
                    x: this.body.position.x,
                    y: this.body.position.y,
                };
        }
    };
    return Player;
}(Sprite));
//# sourceMappingURL=player.js.map