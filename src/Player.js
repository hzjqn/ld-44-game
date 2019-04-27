import 'pixi.js';

export default class Player {
    constructor(position = {x: 0, y: 0}, stats = {}) {
        this.controls = navigator.getGamepads();
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["player_body"].texture);
        this.position = {
            x: position.x,
            y: position.y
       };        
    }

    setup (app) {
        app.stage.addChild(this.sprite);
    }

    updateControls() {
        this.controls = navigator.getGamepads();
    }
    
    update (delta) { 
        this.updateControls();

        if(this.controls[0]){
            this.sprite.x += Math.abs(this.controls[0]['axes'][0]) > 0.2 ? this.controls[0]['axes'][0] * 10 : 0;
            this.sprite.y += Math.abs(this.controls[0]['axes'][1]) > 0.2 ? this.controls[0]['axes'][1] * 10 : 0;
        }
    }

}