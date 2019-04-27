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
        // Probablemente querramos agregar keyboard support asique dejo esta funcion para future proofing
        let gamepads = navigator.getGamepads();
        let controls = {
            movement: {
                horizontal: 0,
                vertical: 0
            }
        }

        if(gamepads[0]) {
            controls.movement = {
                ... controls.movement,
                horizontal: gamepads[0]['axes'][0],
                vertical: gamepads[0]['axes'][1]
            }
        } // else { keyboard support }

        console.log(controls)

        return controls;
    }
    
    update (delta) { 
        this.controls = this.updateControls();
        if(this.controls){
            this.sprite.x += Math.abs(this.controls.movement.horizontal) > 0.2 ? this.controls.movement.horizontal * 10 : 0;
            this.sprite.y += Math.abs(this.controls.movement.vertical) > 0.2 ? this.controls.movement.vertical * 10 : 0;
        }
    }

}