import { runInThisContext } from "vm";

export default class Player {
    // Hay un par de variables para jugar mas adelante
    constructor(position = {x: 0, y: 0}, stats = {}) {
        this.stats = {
            health: 100,
            maxHealth: 100,
            attackCD: 0,
        };
        this.controls = {
            movement: {
                horizontal: 0,
                vertical: 0
            },
            lookingAt: {
                horizontal: 0,
                vertical: 0,
            },
            attack: false,
            spAttack: false,
        }
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["player_body"].texture);
        this.healtBar = new PIXI.Sprite(PIXI.loader.resources["player_health_bar"].texture);
        this.lookingAtIndicator = new PIXI.Sprite(PIXI.loader.resources["player_looking_at_indicator"].texture);
        this.position = {
            x: position.x,
            y: position.y
        };

        this.healtBar.position.x = window.innerWidth / 3 * 2 / 2 - this.healtBar.width / 2;
        this.healtBar.position.y = window.innerHeight / 3 * 2 - this.healtBar.height * 2;

        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;        
    }

    setup (app) {
        app.stage.addChild(this.sprite);
        app.stage.addChild(this.healtBar);
        app.stage.addChild(this.lookingAtIndicator);
    }

    updateControls() {
        // Probablemente querramos agregar keyboard support asique dejo esta funcion para future proofing
        let gamepads = navigator.getGamepads();
        let attackStickTreshold = .9;
        let controls = {
            movement: {
                horizontal: 0,
                vertical: 0
            },
            lookingAt: {
                horizontal: 0,
                vertical: 0,
            },
            attack: false,
            spAttack: false,
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
                },
                attack: gamepads[0]['buttons'][7].pressed,
                spAttack: gamepads[0]['buttons'][6].pressed,
            }
        } // else { controls.movement = keyboard support }

        return controls;
    }

    lookAt() {
        console.log(this.position.y)
    }

    move() {
        this.updatePosition();
    }

    attack () {
        if(this.controls.attack && this.stats.attackCD === 0){
            console.log('attack');
            this.stats.health -= 1;
            this.stats.attackCD = 10;
        }

        this.stats.attackCD -= 1;

        if(this.stats.attackCD < 0){
            this.stats.attackCD = 0;
        }
    }

    spAttack () {
        if(this.controls.spAttack){
            console.log('spAttack')
            this.stats.health -= 1;
        }
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
        this.sprite.x = this.position.x - this.sprite.width / 2;
        this.sprite.y = this.position.y - this.sprite.height / 2;

        this.healtBar.width = this.healtBar.width * this.stats.health / this.healtBar.width
        
        this.lookingAtIndicator.position.x = this.position.x - this.lookingAtIndicator.width / 2 + this.controls.lookingAt.horizontal * 16;
        this.lookingAtIndicator.position.y = this.position.y - this.lookingAtIndicator.height / 2 +  this.controls.lookingAt.vertical * 16;
    }
    
    update (delta) { 
        this.controls = this.updateControls();
        this.lookAt();
        this.move();
        this.attack();
        this.spAttack();
        this.render();
    }

}