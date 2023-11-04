import { TimelineLite, Power0 } from 'gsap';
import { Sprite, Texture } from 'pixi.js';

let Hinter = {};

Hinter.rotated = function (app, x, y, icon) {
  let score = new Sprite(Texture.from(icon));
  score.scale.set(.4, .4);

  score.alignAnchor();
  score.position.set(x, y);
  score.rotation = .1;
  app.stage.addChild(score);
		
  let velocity = 200; //px per second
  let distance = score.y + score.height;

  let tl = new TimelineLite();

  tl.to(score, distance / velocity, 
    { 
      y: 0 - score.height,
      rotation: -.05,
      ease: Power0.easeNone,
      onComplete: remove 
    })
    .to(score, .3, { alpha: 0 }, '-=.8');

  function remove() {
    score.removeFromParent(true);
  }
};

export default Hinter;