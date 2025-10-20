// renderer.js
import { TILE_SIZE, BUILDING_WIDTH, BUILDING_HEIGHT } from './config.js';
import { images } from './sprites.js';

export function drawMaze(ctx, maze, camera, wallSprites, winObjects) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const tileSize = TILE_SIZE;
  const viewWidth = ctx.canvas.width;
  const viewHeight = ctx.canvas.height;

  const startCol = Math.floor(camera.x / tileSize);
  const endCol = Math.ceil((camera.x + viewWidth) / tileSize);
  const startRow = Math.floor(camera.y / tileSize);
  const endRow = Math.ceil((camera.y + viewHeight) / tileSize);
  const offsetX = -camera.x + startCol * tileSize;
  const offsetY = -camera.y + startRow * tileSize;

  // === Draw terrain tiles ===
  for (let y = startRow; y < endRow; y++) {
    for (let x = startCol; x < endCol; x++) {
      const key = wallSprites[y]?.[x];
      if (key && images[key]) {
        const drawX = (x - startCol) * tileSize + offsetX;
        const drawY = (y - startRow) * tileSize + offsetY;
        ctx.drawImage(images[key], drawX, drawY, tileSize, tileSize);
      }
    }
  }

  // === Draw buildings / goals ===
  for (const obj of winObjects) {
    const sprite = images[`goal_${obj.name}`];
    if (!sprite) continue;

    const buildingWidth = tileSize * BUILDING_WIDTH;
    const buildingHeight = tileSize * BUILDING_HEIGHT;
    const drawX = obj.x * tileSize - camera.x - (buildingWidth / 2) + (tileSize / 2);
    const drawY = obj.y * tileSize - camera.y - (buildingHeight - tileSize);

    ctx.drawImage(sprite, drawX, drawY, buildingWidth, buildingHeight);
  }
}

export function drawPlayer(ctx, player, camera) {
  const animKey = player.moving
    ? `walk${capitalize(player.direction)}`
    : `idle${capitalize(player.direction)}`;
  const frames = player.animations[animKey];
  if (!frames) return;

  const frame = frames[player.frame % frames.length];
  const drawX = player.x - camera.x;
  const drawY = player.y - camera.y;

  ctx.drawImage(frame, drawX, drawY, TILE_SIZE, TILE_SIZE);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
