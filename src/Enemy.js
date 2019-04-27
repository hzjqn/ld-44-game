export default class Enemy {
    // Hay un par de variables para jugar mas adelante
    constructor(position = {x: 0, y: 0}, stats = {}) {
        this.controls = navigator.getGamepads();
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["enemy_body"].texture);
        this.sprite.filters
        this.position = {
            x: position.x,
            y: position.y
        };
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;        
    }

    setup (app) {
        app.stage.addChild(this.sprite);
    }
    
    update () {
        this.move();
        this.attack();
        this.spAttack();
    }
    
    move () {
        this.updatePosition();
    }

    attack () {

    }

    spAttack () {

    }

    updatePosition() {
        if(this.position.y > 200){
            this.position.y = 0
        }
        this.position.y += 1;
        this.sprite.y = this.position.y;
    }
}