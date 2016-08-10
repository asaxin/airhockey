var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Ball
 */
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        _super.call(this);
        this.init();
        this.initBody();
    }
    Ball.prototype.init = function () {
        this.radius = 40;
        this.pivot(this.radius, this.radius);
        this.loadImage('images/puck.png');
        this.pos(Game.stageWidth / 2, Game.stageHeight / 2);
    };
    Ball.prototype.initBody = function () {
        this.body = Game.Matter.Bodies.circle(this.x, this.y, this.radius, {
            isStatic: false,
            restitution: 0.8,
            density: 4,
        });
    };
    Ball.prototype.loop = function () {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
    };
    return Ball;
}(Sprite));
//# sourceMappingURL=Ball.js.map