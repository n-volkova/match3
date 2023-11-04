import { Container } from 'pixi.js';
import { TweenLite, Linear } from 'gsap';

import Config from '@/core/Config';
import Resolver from './Resolver';
import Swapper from './Swapper';
import Score from './Score';
import Tile from './Tiles/Tile';

export default class Field extends Container {
  constructor(levelCID) {
    super();
    this.levelObj = Config.content[levelCID];
    this.score = new Score(this);
    this.resolver = new Resolver(this); // util that helps to watch out for field filling
    this.swapper = new Swapper(this); // util that helps to swap front tiles

    this.cont = new Container();

    this.addChild(this.cont);

    this.fillFrontTiles(); // initializing front tiles array

    this.interactive = true;
    this.on('pointerdown', this.onStartClick = this.onStartClick.bind(this));
  }

  /** Is invoked when a player clicked on a tile */
  onStartClick(e) {
    if (this.isFieldBlocked()) return;
    let coords = e.data.getLocalPosition(this);
    let pos = this.getPosByCoords(coords.x, coords.y);
    this.swapper.pick(pos[0], pos[1]);
  }

  isFieldBlocked() {
    return this.swapper.isSwapping === true || this.resolver.isMatching === true || this.resolver.isSupplementing === true || this.resolver.isShuffling === true;
  }

  /** Creates a new front tile with specified cid in specified col and row.
		If fromCol and fromRow are passed then the tile will be going
		from (fromCol, fromRow) to (col, row) by tweening */
  createFrontTile(cid, col, row, fromCol, fromRow, onComplete, appearanceDelay) {
    let tile = new Tile(cid, col, row);
    this.frontTiles[col][row] = tile;
    this.cont.addChild(tile);

    if (fromCol !== undefined && fromRow !== undefined) {
      tile.position.set.apply(tile.position, this.getCoordsByPos(fromCol, fromRow));
      let newCoords = this.getCoordsByPos(col, row);
      this.tweenFrontTile(tile, newCoords[0], newCoords[1], onComplete, appearanceDelay);
    } else {
      tile.position.set.apply(tile.position, this.getCoordsByPos(col, row));
      if (onComplete) onComplete(tile);
    }
    return tile;
  }

  /** Moves the tile to specified pos */
  moveFrontTile(tile, col, row, onComplete) {
    this.frontTiles[tile.col][tile.row] = null;
    this.frontTiles[col][row] = tile;
    tile.col = col;
    tile.row = row;
    let coords = this.getCoordsByPos(col, row);
    this.tweenFrontTile(tile, coords[0], coords[1], onComplete);
    return tile;
  }

  /** Moves sprite to specified coords with calculating correct time */
  tweenFrontTile(tile, toX, toY, onComplete, appearanceDelay) {
    TweenLite.to(tile, this.getTimeByCoords(toY, tile.y), 
      { 
        delay: appearanceDelay, 
        x: toX, 
        y: toY, 
        ease: Linear.easeNone, 
        onComplete: onComplete, 
        onCompleteParams: [tile] 
      });
  }

  /** Creates frontTiles array and fills it Can be called only once */
  fillFrontTiles() {
    if (this._isFrontTilesFilled === true) return;
    this.frontTiles = [];
    this.resolver.generate();
    this._isFrontTilesFilled = true; // flag for knowing, whether we initialized front tiles
  }

  /** Returns x and y (as array with 2 elements: 0 - x, 1 - y) of any tile with specified col and row (col and row >= 0).
		Returned coordinates means center of tile, not his top-left anchor */
  getCoordsByPos(col, row) {
    let width = Config.field.frontTileWidth;
    let height = Config.field.frontTileHeight;
    return [width * 0.5 + width * col, height * 0.5 + height * row];
  }

  /** Returns col and row (as array with 2 elements: 0 - col, 1 - row) of specified x and y of field. */
  getPosByCoords(x, y) {
    let width = Config.field.frontTileWidth;
    let height = Config.field.frontTileHeight;
    return [Math.floor(x / width), Math.floor(y / height)];
  }

  /** Returns seconds by distance for moving front tiles */
  getTimeByCoords(fromCoord, toCoord) {
    return Math.abs(fromCoord - toCoord) / Config.field.frontTileSpeed;
  }

  /** Returns seconds by count of passed cells */
  getTimeByCells(cells) {
    return this.getTimeByCoords(this.getCoordsByPos(0, 0)[1], this.getCoordsByPos(0, cells)[1]);
  }

  destroy() {
    // removing all tweens of tiles if they exist
    for (let i = 0; i < this.frontTiles.length; i++) {
      for (let j = 0; j < this.frontTiles[i].length; j++) {
        if (this.frontTiles[i][j]) TweenLite.killTweensOf(this.frontTiles[i][j]);
      }
    }
    this.resolver.destroy();
    this.swapper.destroy();
    super.destroy();
  }
}