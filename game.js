import 'pixi.js';
import Player from './src/Player';
import Enemy from './src/Enemy';

window.__CONTROLLER_ENABLED__ = false;

const navbar = document.createElement('nav');
const controller_indicator = document.createElement('span');
controller_indicator.html = window.__CONTROLLER_ENABLED__? 'controller enabled' : 'controller disabled'
const controller_button = document.createElement('button');
navbar.append(controller_button);
navbar.append(controller_indicator);
document.body.append(navbar);


controller_button.addEventListener('click', () => {
    if (window.__CONTROLLER_ENABLED__) {
        window.__CONTROLLER_ENABLED__ = false;
    } else {
        window.__CONTROLLER_ENABLED__ = true;
    }
})

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
PIXI.utils.skipHello();

const app = new PIXI.Application({
    width: window.innerWidth / 3 * 2,
    height: window.innerHeight / 3 * 2
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);


let player;
let enemies;

PIXI.loader
    .add('player_body','./assets/img/player_body.png')
    .add('player_health_bar', './assets/img/player_health_bar.png')
    .add('enemy_body', './assets/img/enemy_body.png')
    .add('player_looking_at_indicator', './assets/img/player_looking_at_indicator.png')
    .load(setup);

function setup() {
    player = new Player({x: 0, y: 0}, {});
    player.setup(app);
    enemies = [
        new Enemy({x: 300, y: 300}, {})
    ]
    for(let  i = 0; i < enemies.length; i++ ){
        let enemy = enemies[i];
        enemy.setup(app);
    }
    app.ticker.add(delta => update(delta));
}

function update (delta) {
    player.update(delta);
    for(let  i = 0; i < enemies.length; i++ ){
        let enemy = enemies[i];
        enemy.update();
    }
}