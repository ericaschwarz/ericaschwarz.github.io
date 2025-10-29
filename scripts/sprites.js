// sprites.js
import { capitalize } from './utils.js';

export const images = {};

export function loadImages(callback) {
  // === Programatically add filenames ===
  const baseTypes = ['tree', 'rock', 'floor'];
  const shapes = [
    'isolated',
    'end_up', 'end_right', 'end_down', 'end_left',
    'corner_ur', 'corner_rd', 'corner_dl', 'corner_lu',
    'vertical', 'horizontal',
    't_leftopen', 't_upopen', 't_rightopen', 't_downopen',
    'cross', 'full'
  ];

  // === Player sprites ===
  const actions = ['idle', 'walk'];
  const directions = ['up', 'down', 'left', 'right'];
  const frameCount = 4; // 0–3

  // === Site-specific goals ===
  // Uses same order as sitePages (define sitePages before this)
  const goalNames = [
    'solver',
    'translation',
    'multiscale',
    'publications',
    'vision',
    'teaching',
    'cv',
    'contact'
  ];

  // === Collect all file paths ===
  const allPaths = [];

  // Environment
  for (const type of baseTypes) {
    for (const shape of shapes) {
      allPaths.push(`${type}_${shape}.png`);
    }
  }

  // Player
  for (const action of actions) {
    for (const dir of directions) {
      for (let i = 0; i < frameCount; i++) {
        allPaths.push(`player_${action}_${dir}_${i}.png`);
      }
    }
  }

  // Generic goal + page-specific goals
  for (const name of goalNames) {
    allPaths.push(`goal_${name}.png`);
  }

  let loaded = 0;
  allPaths.forEach(filename => {
    const img = new Image();
    img.src = `/images/${filename}`;
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === allPaths.length) callback();
    };
    images[filename.replace(/\.(svg|png)$/i, '')] = img;
  });
}

// --- Bitmask-based tile selection ---
function getEnvironmentSprite(x, y, maze , isFloor = true) {
  const dirs = [
    { dx: 0, dy: -1, bit: 1 }, // up
    { dx: 1, dy: 0, bit: 2 },  // right
    { dx: 0, dy: 1, bit: 4 },  // down
    { dx: -1, dy: 0, bit: 8 }  // left
  ];

  let mask = 0;
  for (let { dx, dy, bit } of dirs) {
    const nx = x + dx, ny = y + dy;
    const neighborIsWall = maze[ny] && maze[ny][nx] > 0;

    // If it's a floor tile, invert the logic
    if (isFloor ? !neighborIsWall : neighborIsWall) {
      mask |= bit;
    }
  }

  const mapping = {
    0:  'isolated',
    1:  'end_down',
    2:  'end_left',
    4:  'end_up',
    8:  'end_right',
    3:  'corner_ur',
    6:  'corner_rd',
    12: 'corner_dl',
    9:  'corner_lu',
    5:  'vertical',
    10: 'horizontal',
    7:  't_leftopen',
    11: 't_upopen',
    13: 't_rightopen',
    14: 't_downopen',
    15: 'cross'
  };
  return mapping[mask] || 'isolated';
}

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateCamera();

  const startCol = Math.floor(camera.x / tileSize);
  const endCol = Math.ceil((camera.x + viewWidth) / tileSize);
  const startRow = Math.floor(camera.y / tileSize);
  const endRow = Math.ceil((camera.y + viewHeight) / tileSize);
  const offsetX = -camera.x + startCol * tileSize;
  const offsetY = -camera.y + startRow * tileSize;

  // Draw terrain
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

  // --- Draw buildings ---
  for (const obj of winObjects) {
    const buildingSprite = images[`goal_${obj.name}`];
    if (!buildingSprite) continue;

    const buildingWidth = tileSize * BUILDING_WIDTH;   // building spans 2 tiles horizontally
    const buildingHeight = tileSize * BUILDING_HEIGHT;  // and 3 vertically

    // Align bottom-center of sprite with the door tile (obj.x, obj.y)
    const drawX = obj.x * tileSize - camera.x - (buildingWidth / 2) + (tileSize / 2);
    const drawY = obj.y * tileSize - camera.y - (buildingHeight - tileSize);

    ctx.drawImage(buildingSprite, drawX, drawY, buildingWidth, buildingHeight);
  }
}

// Builds a sprite-key map for the maze
export function buildWallSprites(maze) {
  const rows = maze.length;
  const cols = maze[0].length;
  const wallSprites = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => '')
  );

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === 1 || maze[y][x] === 2) {
        const baseType = maze[y][x] === 1 ? 'tree' : 'rock';
        const shape = getEnvironmentSprite(x, y, maze, true);
        wallSprites[y][x] = `${baseType}_${shape}`;
      } else if (maze[y][x] === 0) {
        const shape = getEnvironmentSprite(x, y, maze, false);
        wallSprites[y][x] = `floor_${shape}`;
      }
    }
  }

  return wallSprites;
}