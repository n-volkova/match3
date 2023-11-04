import { Container, Sprite, Texture } from 'pixi.js';

import Config from '../Config';
import Field from './Field';
import { App } from '@/core/Facade';

export default class Game extends Container {
  constructor(levelCID) {
    super();
    this.obj = Config.content[7];

    this._bgSprite = new Sprite(Texture.from(this.obj.icon));

    // 5x5
    // this._bgSprite.scale.set(.6, .6)
        
    this._bgSprite.scale.set(.5, .5);
    this._bgSprite.position.set(35, 30);
    this.addChild(this._bgSprite);
        
    // creating field for playing
    this._field = new Field(levelCID);
    this.addChild(this._field);
  }

  destroy() {
    super.destroy();
  }
}