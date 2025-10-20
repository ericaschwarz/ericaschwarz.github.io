// maze.js
import { BUILDING_WIDTH, BUILDING_HEIGHT } from './config.js';

export function generateMaze(rows, cols) {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  function carve(x, y) {
    const dirs = [[0, -2], [2, 0], [0, 2], [-2, 0]];
    dirs.sort(() => Math.random() - 0.5);
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (ny > 0 && ny < rows - 1 && nx > 0 && nx < cols - 1 && maze[ny][nx] === 1) {
        maze[y + dy / 2][x + dx / 2] = 0;
        maze[ny][nx] = 0;
        carve(nx, ny);
      }
    }
  }

  const start = { x: randOdd(cols - 2), y: randOdd(rows - 2) };
  maze[start.y][start.x] = 0;
  carve(start.x, start.y);

  // solid borders
  for (let i = 0; i < rows; i++) maze[i][0] = maze[i][cols - 1] = 1;
  for (let j = 0; j < cols; j++) maze[0][j] = maze[rows - 1][j] = 1;

  return { maze, start };
}

// --- Building placement helpers ---
function canPlaceBuilding(maze, x, y, width, height, winObjects = []) {
  const rows = maze.length;
  const cols = maze[0].length;

  // Compute door (bottom-center)
  const doorX = x + Math.floor(width / 2);
  const doorY = y + height - 1;

  // Door must be on open path
  if (!maze[doorY] || maze[doorY][doorX] !== 0) return false;

  // Plaza area must stay inside maze bounds (not touch solid border)
  if (x - 1 < 1 || y - 1 < 1 || x + width >= cols - 1 || y + height >= rows - 1) return false;

  for (const obj of winObjects) {
  // Define the occupied area of this candidate (including 1-tile border)
  const ax1 = x - 1;
  const ay1 = y - 1;
  const ax2 = x + width;
  const ay2 = y + height;

  // Define the occupied area of the existing building (including its own plaza)
  const bx1 = obj.x - width - 1;   // approximate: 1 tile buffer around door position
  const by1 = obj.y - height - 2;  // one above building top (door is bottom-center)
  const bx2 = obj.x + width;       // right edge
  const by2 = obj.y + 1;           // bottom edge (door row)

  const overlap = !(ax2 < bx1 || ax1 > bx2 || ay2 < by1 || ay1 > by2);
  if (overlap) return false;
}


  return true;
}

function placeBuilding(maze, x, y) {
  const width = BUILDING_WIDTH;
  const height = BUILDING_HEIGHT;


  //Clear the plaza (1-tile border around building)
  for (let j = -1; j <= height; j++) {
    for (let i = -1; i <= width; i++) {
      maze[y + j][x + i] = 0;
    }
  }

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      maze[y + j][x + i] = 2;
    }
  }

  //Door (bottom-center tile)
  const doorX = x + Math.floor(width / 2);
  const doorY = y + height - 1; // bottom row of building
  maze[doorY][doorX] = 0;

  return { x: doorX, y: doorY };
}