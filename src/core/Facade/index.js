import { Container } from 'pixi.js';

import App from './App';
import Preloader from './Preloader';
import Game from '../Game';

const WIDTH = 888;
const HEIGHT = 563;

window.ratio = 1;

export default class Facade {
  constructor() {
    let app = document.querySelector('.game-container');
    let score = document.getElementById('score');

    app.insertBefore(App.view, score);

    this._preloader = new Preloader();
    this._preloader.loadContent().then(() => this.onLoaded());
        

    App.stage.addChild(this._preloader);
  }

  /** Is invoked when all resources are loaded */
  onLoaded() {
    this._preloader.removeFromParent(true);
    let game = new Game(6, 6);
        
    let container = new Container();
    container.skew.y = -.25;
    container.skew.x = -.25;
    container.angle = 45;
    container.position.set(WIDTH / 2 - 5, 0);

    App.stage.addChild(container);

    container.addChild(game);
        
    this.resize(this);

    window.addEventListener('resize', this.resize());
  }
    
  resize() {
    let W = window.innerWidth;
    let ratio = W / WIDTH;
    let H = HEIGHT * ratio;

    if (W < WIDTH) {
      App.renderer.resize(W, H);
      App.stage.scale.x = App.stage.scale.y = ratio;
    }
  }
}

export { App };