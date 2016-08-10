/**
 * Player
 */
class Player extends Sprite {

    body: any;
    private radius: number;
    private originPos: { x:number,y:number};
    mouseConstraint: any;
    
    private isMouseDown: boolean;

    constructor(x:number,y:number) {
        super();
        this.init();
        this.x = x;
        this.y = y;
        this.isMouseDown = false;
        this.initBody();
        this.initMouseConstraint();
    }

    new(world, position): void {
        if(this.body!=null) {
            this.pos(position.x,position.y);
            this.initBody();
            this.initMouseConstraint();
            Game.Matter.World.add(world, [this.body, this.mouseConstraint]);
        }
    }

    restrict(where: string): void {
        switch(where){
            case 'top':
                if(this.mouseConstraint.pointA.y>Game.stageHeight/2-this.radius){
                    this.mouseConstraint.pointA.y = Game.stageHeight/2-this.radius;
                }
                if(this.y<0){
                    this.mouseConstraint.pointA.y = 0;
                }
                break;
            case 'bottom':
                if(this.mouseConstraint.pointA.y<Game.stageHeight/2+this.radius)
                    this.mouseConstraint.pointA.y = Game.stageHeight/2+this.radius;
                if(this.y>Game.stageHeight){
                    this.mouseConstraint.pointA.y = Game.stageHeight;
                }
                break;
        }
    }

    private initMouseConstraint(): void {
        
        this.mouseConstraint = Game.Matter.Constraint.create(
        {
            id: 'playerConstrain',
            pointA: { x:this.body.position.x,y:this.body.position.y},
            bodyB: this.body,
            porintB: {x:0,y:0},
            stiffness: 1,
            length: 0.1,
        });
    }

    private initBody(): void {
        this.body = Game.Matter.Bodies.circle(this.x, this.y, this.radius,
        {
            isStatic: false,
            density:1,
            restitution: 0.2,
            friction: 0.3,
            frictionStatic: 0.3,
        });
    }

    private init(): void {
        this.radius = 60;
        this.pivot(this.radius, this.radius);
        this.loadImage('images/player.png');
        this.mouseDownListen();
    }

    mouseDownListen(): void {
        this.on('mousedown', this, this.onMouseDown);
    }

    mouseListen(s: Sprite): void {
        s.on('mouseup', this, this.onMouseUp);
    }

    private onMouseDown(event): void {
        this.isMouseDown = true;
    }

    private onMouseUp(event): void {
        this.isMouseDown = false;
    }

    loop(): void{
        this.x = this.body.position.x;
        this.y = this.body.position.y;
        if(this.isMouseDown){
            this.mouseConstraint.pointA =
            {
                x: Laya.stage.mouseX,
                y: Laya.stage.mouseY,
            };
        }
        else{
            this.mouseConstraint.pointA =
            {
                x: this.body.position.x,
                y: this.body.position.y,
            };
        }
    }
}