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
    this.frameInterval = 4;
    this.animations = {};
  }

  animatePlayer() {
    player.frameTimer++;
    if (player.frameTimer >= player.frameInterval) {
      player.frameTimer = 0;
      const animKey = player.moving
        ? 'walk' + capitalize(player.direction)
        : 'idle' + capitalize(player.direction);
      const frames = player.animations[animKey];
      if (frames) player.frame = (player.frame + 1) % frames.length;
    }
  }


  draw(ctx, camera) {
  const animKey = player.moving
    ? 'walk' + capitalize(player.direction)
    : 'idle' + capitalize(player.direction);
  const frames = player.animations[animKey];
  if (!frames) return;

  const frameIndex = player.frame % frames.length;
  const frame = frames[frameIndex];

  const drawX = player.x - camera.x;
  const drawY = player.y - camera.y;
  ctx.drawImage(frame, drawX, drawY, tileSize, tileSize);
}

  updatePosition() {
    const targetPX = this.gridX * TILE_SIZE;
    const targetPY = this.gridY * TILE_SIZE;
    this.x = lerp(this.x, targetPX, MOVE_LERP);
    this.y = lerp(this.y, targetPY, MOVE_LERP);
  }
}
