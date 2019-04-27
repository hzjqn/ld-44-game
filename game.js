import 'pixi.js';
import Player from './src/Player';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
PIXI.utils.skipHello();
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);


let player;
PIXI.loader.add('player_body','./assets/img/player_body.png').load(setup);

function setup() {
    player = new Player({x: 0, y: 0}, {});
    player.setup(app);
    app.ticker.add(delta => update(delta));
}

function update (delta) {
    player.update(delta);
}