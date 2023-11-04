import { App } from '@/core/Facade';
import Config from '@/core/Config';
import Hinter from '@/core/Lib/Hinter';
import Emitter from '@/core/Lib/Emitter.js';

export default class Score {
  constructor(field) {
    this._field = field;
    this._score = 0;
  }

  addMatch(match, combo) {
    let extraScore, comboScore = match.pattern.score;
    let extraIndex = (match.match.length - match.pattern.minMatch) - 1; //which index of extra score in array of all extra scores
        
    if (combo) {
      if (combo.vertical === 3 && combo.horizontal === 3) {
        extraScore = 400;
      } else {
        extraScore = 900;
      }

      //if there is no extra scores or we matched not enough pieces then we get 0
    } else if (!match.pattern.extraScore || extraIndex < 0) {
      extraScore = 0;

      //if extra score exists but we match more pieces than elements in array, then take the last one
    } else if (extraIndex >= match.pattern.extraScore.length) {
      extraScore = match.pattern.extraScore[match.pattern.extraScore.length - 1];

      //if all is fine, just take needed extra score
    } else {
      extraScore = match.pattern.extraScore[extraIndex];
    }
    this._score += comboScore + extraScore;
    Emitter.emit('score', this._score);
    //finding average coordinates to show hint
    let g, xs = [], ys = [];
        
    for (let i = 0; i < match.match.length; i++) {
      g = match.match[i].toGlobal(App.stage);
      xs.push(g.x);
      ys.push(g.y);
    }

    xs = xs.reduce((total, item) => total + item) / xs.length;
    ys = ys.reduce((total, item) => total + item) / ys.length - 20;

    if (window.ratio < 1) {
      xs = xs / window.ratio;
      ys = ys / window.ratio;
    }
    //show message about newly got score
    if (extraScore) {
      if (extraScore === 900) {
        Hinter.rotated(App, xs + 25, ys - 25, Config.content[8].score1000);
      } else {
        Hinter.rotated(App, xs + 25, ys - 25, match.match[0].obj[`score${comboScore + extraScore}`]);
      }
    } else {
      Hinter.rotated(App, xs, ys, match.match[0].obj[`score${comboScore}`]);
    }
  }
}