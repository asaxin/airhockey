/**
 * Ball
 */
class Ball extends Sprite {

    body: any;
    private radius: number;

    constructor() {
        super();
        this.init();
        this.initBody();
    }

    private init(): void {
        this.radius = 40;
        this.pivot(this.radius, this.radius);
        this.loadImage('images/puck.png');
        this.pos(Game.stageWidth/2, Game.stageHeight/2);
    }

    initBody(): void {

        this.body = Game.Matter.Bodies.circle(this.x, this.y, this.radius, 
            {
                isStatic: false,
                restitution: 0.8,
                density: 4,
            }
        );
    }

    loop(): void {
        this.x = this.body.position.x;
        this.y = this.body.position.y;
    }
}