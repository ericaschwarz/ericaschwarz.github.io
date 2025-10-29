// gameLoop.js
import { FRAME_INTERVAL } from './config.js';

export function startGameLoop(update, render) {
  let lastFrameTime = 0;
  function loop(timestamp) {
    if (timestamp - lastFrameTime >= FRAME_INTERVAL) {
      lastFrameTime = timestamp;
      update();
      render();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
