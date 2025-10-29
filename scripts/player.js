// player.js
import { TILE_SIZE, MOVE_LERP } from './config.js';
import { lerp, capitalize } from './utils.js';

export class Player {
  constructor(startX, startY) {
    this.gridX = startX;
    this.gridY = startY;
    this.x = startX * TILE_SIZE;
    this.y = startY * TILE_SIZE;
    this.direction = 'down';
    this.moving = false;
    this.frame = 0;
    this.frameTimer = 0;
    this.frameInterval = 3;
    this.animations = {};
  }

  updatePosition() {
    const targetPX = this.gridX * TILE_SIZE;
    const targetPY = this.gridY * TILE_SIZE;
    this.x = lerp(this.x, targetPX, MOVE_LERP);
    this.y = lerp(this.y, targetPY, MOVE_LERP);
  }

  animate() {
    this.frameTimer++;
    if (this.frameTimer >= this.frameInterval) {
      this.frameTimer = 0;
      const animKey = this.moving
        ? `walk${capitalize(this.direction)}`
        : `idle${capitalize(this.direction)}`;
      const frames = this.animations[animKey];
      if (frames) this.frame = (this.frame + 1) % frames.length;
    }
  }

  draw(ctx, camera) {
    const animKey = this.moving
      ? `walk${capitalize(this.direction)}`
      : `idle${capitalize(this.direction)}`;
    const frames = this.animations[animKey];
    if (!frames) return;

    const frameIndex = this.frame % frames.length;
    const frame = frames[frameIndex];

    // use "this", not "player"
    const drawX = this.x - camera.x;
    const drawY = this.y - camera.y;
    ctx.drawImage(frame, drawX, drawY, TILE_SIZE, TILE_SIZE);
  }
}
