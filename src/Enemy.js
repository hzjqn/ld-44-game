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
    
    update (delta) { 
        this.updatePosition(delta);
    }
    
    updatePosition(delta) {
        this.position.y += 1;
        this.sprite.y = this.position.y;
    }
}