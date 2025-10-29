// camera.js
import { CAMERA_LERP } from './config.js';
import { lerp } from './utils.js';

export class Camera {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(targetX, targetY, viewWidth, viewHeight, cols, rows, tileSize) {
    const maxX = cols * tileSize - viewWidth;
    const maxY = rows * tileSize - viewHeight;
    const targetCamX = targetX + tileSize / 2 - viewWidth / 2;
    const targetCamY = targetY + tileSize / 2 - viewHeight / 2;

    this.x = lerp(this.x, Math.max(0, Math.min(targetCamX, maxX)), CAMERA_LERP);
    this.y = lerp(this.y, Math.max(0, Math.min(targetCamY, maxY)), CAMERA_LERP);
  }
}
