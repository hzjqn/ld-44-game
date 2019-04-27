export default class Player {
    // Hay un par de variables para jugar mas adelante
    constructor(position = {x: 0, y: 0}, stats = {}) {
        this.controls = navigator.getGamepads();
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["player_body"].texture);
        this.lookingAtIndicator = new PIXI.Sprite(PIXI.loader.resources["player_looking_at_indicator"].texture);
        this.position = {
            x: position.x,
            y: position.y
        };
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;        
    }

    setup (app) {
        app.stage.addChild(this.sprite);
        app.stage.addChild(this.lookingAtIndicator);
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
            controls = {
                movement: {
                ... controls.movement,
                horizontal: gamepads[0]['axes'][0],
                vertical: gamepads[0]['axes'][1]
                },
                lookingAt: {
                    ... controls.lookingAt,
                    horizontal: gamepads[0]['axes'][2],
                    vertical: gamepads[0]['axes'][3]
                }
            }
        } // else { controls.movement = keyboard support }

        return controls;
    }

    lookAt() {
        
        if (Math.abs(this.controls.lookingAt.horizontal) > 0.2) {
            this.lookingAtIndicator.x = this.position.x + (8 * Math.abs(this.controls.lookingAt.horizontal) / this.controls.lookingAt.horizontal) + this.controls.lookingAt.horizontal * 8;
        } else {                
            this.lookingAtIndicator.x = this.position.x + (8 * Math.abs(this.controls.lookingAt.horizontal) / this.controls.lookingAt.horizontal);
        }
        
        if (Math.abs(this.controls.lookingAt.vertical) > 0.2) {
            this.lookingAtIndicator.y  = this.position.y + (8 * Math.abs(this.controls.lookingAt.vertical) / this.controls.lookingAt.vertical) + this.controls.lookingAt.vertical * 8;
        } else {                
            this.lookingAtIndicator.y = this.position.y + (8 * Math.abs(this.controls.lookingAt.vertical) / this.controls.lookingAt.vertical);
        }
    }

    move() {
        this.updatePosition();
    }

    attack () {

    }

    spAttack () {

    }

    takeDamage () {

    }

    updatePosition() {
        if(this.controls){
            // le pongo un minimo de 0.2 porque si no el control tiene como saltitos, porque mueve 0.1 el stick por el mismo peso del mecanismo. 
            this.position.x += Math.abs(this.controls.movement.horizontal) > 0.2 ? this.controls.movement.horizontal * 10 : 0;
            this.position.y += Math.abs(this.controls.movement.vertical) > 0.2 ? this.controls.movement.vertical * 10 : 0;
        }
    }

    render () {
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
    }
    
    update (delta) { 
        this.controls = this.updateControls();
        this.lookAt();
        this.move();
        this.render();
    }

}