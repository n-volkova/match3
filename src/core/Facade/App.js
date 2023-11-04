import { Application } from 'pixi.js';

const WIDTH = 888;
const HEIGHT = 563;

let instance = new Application({
  width: WIDTH,
  height: HEIGHT,
  transparent: false,
  resolution: 2,
  autoResize: true,
  autoDensity: true
});

instance.data = {
  W: window.innerWidth,
  H: window.innerHeight
};

export default instance;