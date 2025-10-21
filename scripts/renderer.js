// renderer.js
import { TILE_SIZE } from './config.js';
import { images } from './sprites.js';

/**
 * Depth-sorted renderer without player shadow.
 * - Floors always under player
 * - Buildings render with top behind player
 * - Goal overlays render in front of player
 */
export function drawScene(ctx, maze, camera, wallSprites, winObjects, player) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const tileSize = TILE_SIZE;
  const viewW = ctx.canvas.width;
  const viewH = ctx.canvas.height;

  const startCol = Math.floor(camera.x / tileSize);
  const endCol   = Math.ceil((camera.x + viewW) / tileSize);
  const startRow = Math.floor(camera.y / tileSize);
  const endRow   = Math.ceil((camera.y + viewH) / tileSize);

  const drawables = [];

  // --- TERRAIN ---
  for (let y = startRow; y < endRow; y++) {
    for (let x = startCol; x < endCol; x++) {
      const key = wallSprites[y]?.[x];
      const img = key && images[key];
      if (!img) continue;

      const dx = x * tileSize - camera.x;
      const dy = y * tileSize - camera.y;
      const isFloor = key.startsWith("floor");

      drawables.push({
        type: isFloor ? "floor" : "wall",
        img,
        x: dx,
        y: dy,
        w: tileSize,
        h: tileSize,
        // Floors always drawn first
        renderY: isFloor ? (y + 0.1) * tileSize : (y + 1) * tileSize
      });
    }
  }

  // --- BUILDINGS ---
  for (const obj of winObjects) {
    const sprite = images[`goal_${obj.name}`];
    if (!sprite) continue;

    // infer dimensions from sprite size
    const tilesWide = (sprite.width  / 64) || 1;
    const tilesHigh = (sprite.height / 64) || 1;

    const renderW = tilesWide * tileSize;
    const renderH = tilesHigh * tileSize;

    const dx = obj.x * tileSize - camera.x - (renderW / 2) + (tileSize / 2);
    const dy = obj.y * tileSize - camera.y - (renderH - tileSize);

    drawables.push({
      type: 'building',
      img: sprite,
      x: dx,
      y: dy,
      w: renderW,
      h: renderH,
      renderY: (obj.y + 1) * tileSize // base (door row)
    });
  }

  // --- PLAYER ---
  const feetY = player.y + tileSize;
  const animKey = player.moving
    ? `walk${capitalize(player.direction)}`
    : `idle${capitalize(player.direction)}`;
  const frames = player.animations[animKey];
  if (frames && frames.length > 0) {
    const frame = frames[player.frame % frames.length];
    drawables.push({
      type: 'player',
      img: frame,
      x: player.x - camera.x,
      y: player.y - camera.y,
      w: tileSize,
      h: tileSize,
      renderY: feetY
    });
  }

  // --- GOAL OVERLAY ---
  const goalOverlay = images['goal'];
  if (goalOverlay) {
    for (const obj of winObjects) {
      const dx = obj.x * tileSize - camera.x;
      const dy = obj.y * tileSize - camera.y;
      drawables.push({
        type: 'goalOverlay',
        img: goalOverlay,
        x: dx,
        y: dy,
        w: tileSize,
        h: tileSize,
        renderY: (obj.y + 1) * tileSize + 2 // slightly after player
      });
    }
  }

  // --- SORT & DRAW ---
  drawables.sort((a, b) => a.renderY - b.renderY);
  for (const d of drawables) {
    ctx.drawImage(d.img, d.x, d.y, d.w, d.h);
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
