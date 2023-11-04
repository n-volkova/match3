import { Container, Sprite, Texture } from 'pixi.js';

import Config from '@/core/Config';

export default class Tile extends Container {
  constructor(cid, col, row) {
    super();
    this.col = col;
    this.row = row;
    this.obj = Config.content[cid];
        
    this._bg = new Sprite(Texture.from(this.obj.icon));
    this._bg.anchor.set(.5, .5);
    this._bg.angle = -45;

    // 5x5
    // this._bg.width = 100
    // this._bg.height = 170

    // 6x6
    this._bg.width = 80;
    this._bg.height = 150;

    if (cid === 5) {
      this._bg.position.y += 8;
    }
        
    this.addChild(this._bg);
  }

  /** Shows appearing animation */
  appear(delay, onComplete) {
    this.alpha = 0;
    this._tweenAppearing = TweenLite.to(this, 0.3, 
      { 
        delay: delay, 
        alpha: 1, 
        onComplete: onComplete,
        onCompleteParams: [this] 
      });
  }
    
  /** Makes selected appearance */
  select(value) {
    if (this.isSelected === value) return;
    this.isSelected = value;
        
    if (value === true) {
      this._bg.texture = Texture.from(this.obj.iconSelected);
    } else {
      this._bg.texture = Texture.from(this.obj.icon);
    }
  }
    
  /** Shows removing animation */
  remove(onComplete) {
    this._tweenRemoving = TweenLite.to(this, 0.3, 
      { 
        alpha: 0, 
        onComplete: () => {
          if (onComplete) onComplete(this);
          this.removeFromParent(true);
        }
      });
  }
}