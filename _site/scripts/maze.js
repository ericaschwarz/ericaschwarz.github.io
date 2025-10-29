// maze.js
import { BUILDING_WIDTH, BUILDING_HEIGHT } from './config.js';
import { randOdd } from './utils.js';

// Tunables
const PLAZA_BUFFER = 1;   // extra open tiles around the footprint
const MIN_GAP      = 0;   // extra spacing between plazas (beyond buffer)
const NEAR_RADIUS  = 6;   // radius to search for nearest corridor

export function generateMazeWithBuildings(
  rows, cols, sitePages,
  buildingWidth = BUILDING_WIDTH,
  buildingHeight = BUILDING_HEIGHT
) {
  const { maze, start } = generateMaze(rows, cols);
  const winObjects = [];

  // Track reserved rectangles (including plaza buffer) to prevent overlap.
  // Each rect: {x, y, w, h}
  const reserved = [];

  // Divide the maze into regions for even spacing
  const rRows = Math.floor(Math.sqrt(sitePages.length));
  const rCols = Math.ceil(sitePages.length / rRows);
  const regionH = Math.floor(rows / rRows);
  const regionW = Math.floor(cols / rCols);

  for (let i = 0; i < sitePages.length; i++) {
    const page = sitePages[i];
    const rr = Math.floor(i / rCols);
    const rc = i % rCols;

    // Region bounds (avoid borders a bit)
    const baseMinX = rc * regionW + 2;
    const baseMinY = rr * regionH + 2;
    const baseMaxX = Math.min((rc + 1) * regionW - buildingWidth - 3, cols - buildingWidth - 3);
    const baseMaxY = Math.min((rr + 1) * regionH - buildingHeight - 3, rows - buildingHeight - 3);

    let placed = false;
    let tries = 0;

    // Expand search window gradually if we fail in the tight region
    while (!placed && tries < 200) {
      const pad = Math.floor(tries / 30); // widen every 30 tries
      const minX = Math.max(2, baseMinX - pad);
      const minY = Math.max(2, baseMinY - pad);
      const maxX = Math.min(cols - buildingWidth - 3, baseMaxX + pad);
      const maxY = Math.min(rows - buildingHeight - 3, baseMaxY + pad);

      // Pick odd-ish positions to vary look; ok if not perfectly odd
      const bx = clampOdd(randomInRange(minX, maxX), 1, cols - 2);
      const by = clampOdd(randomInRange(minY, maxY), 1, rows - 2);

      if (canPlaceBuilding(maze, bx, by, buildingWidth, buildingHeight, reserved)) {
        const door = placeBuilding(maze, bx, by, buildingWidth, buildingHeight);
        // Reserve the buffered rectangle so later buildings don’t overlap
        reserved.push(bufferedRect(bx, by, buildingWidth, buildingHeight, PLAZA_BUFFER + MIN_GAP));

        winObjects.push({
          x: door.x,
          y: door.y,
          name: page.name,
          targetURL: page.url,
          dialogue: page.dialogue
        });

        placed = true;
      }

      tries++;
    }

    if (!placed) {
      console.warn(`Could not place building for ${page.name}`);
    }
  }

  const validStart = findValidStart(maze, start, winObjects);
  return { maze, start: validStart, winObjects };
}

export function generateMaze(rows, cols) {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  function carve(x, y) {
    const dirs = [[0,-2],[2,0],[0,2],[-2,0]];
    dirs.sort(() => Math.random() - 0.5);
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (ny > 0 && ny < rows - 1 && nx > 0 && nx < cols - 1 && maze[ny][nx] === 1) {
        maze[y + dy/2][x + dx/2] = 0;
        maze[ny][nx] = 0;
        carve(nx, ny);
      }
    }
  }

  const start = { x: randOdd(1, cols - 2), y: randOdd(1, rows - 2) };
  maze[start.y][start.x] = 0;
  carve(start.x, start.y);

  // borders
  for (let i = 0; i < rows; i++) maze[i][0] = maze[i][cols-1] = 1;
  for (let j = 0; j < cols; j++) maze[0][j] = maze[rows-1][j] = 1;

  return { maze, start };
}

/**
 * New canPlace: only checks bounds + overlap with reserved rectangles.
 * It no longer requires the area to already be open path (we will clear it).
 */
export function canPlaceBuilding(maze, x, y, w, h, reservedRects = []) {
  const rows = maze.length, cols = maze[0].length;

  // Entire plaza buffer must fit inside bounds
  const R = bufferedRect(x, y, w, h, PLAZA_BUFFER);
  if (R.x < 1 || R.y < 1 || R.x + R.w >= cols - 1 || R.y + R.h >= rows - 1) return false;

  // No overlap with previously placed buffered areas (plus minimum gap)
  const R2 = bufferedRect(x, y, w, h, PLAZA_BUFFER + MIN_GAP);
  for (const o of reservedRects) {
    if (rectsOverlap(R2, o)) return false;
  }

  return true;
}

export function placeBuilding(maze, x, y, width = BUILDING_WIDTH, height = BUILDING_HEIGHT) {
  // 1) Clear the plaza
  for (let j = -PLAZA_BUFFER; j < height + PLAZA_BUFFER; j++) {
    for (let i = -PLAZA_BUFFER; i < width + PLAZA_BUFFER; i++) {
      if (maze[y + j]?.[x + i] !== undefined) maze[y + j][x + i] = 0;
    }
  }

  // 2) Lay down the building footprint
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      maze[y + j][x + i] = 1;
    }
  }

  // 3) Door at bottom-center (change if you prefer another side)
  const doorX = x + Math.floor(width / 2);
  const doorY = y + height - 1;
  maze[doorY][doorX] = 0;

  // 4) Ensure connectivity to the nearest corridor
  connectDoorToPath(maze, doorX, doorY, NEAR_RADIUS);

  return { x: doorX, y: doorY };
}

/* ---------- helpers ---------- */

function connectDoorToPath(maze, doorX, doorY, radius) {
  let nearest = null, minD = Infinity;

  for (let yy = doorY - radius; yy <= doorY + radius; yy++) {
    for (let xx = doorX - radius; xx <= doorX + radius; xx++) {
      if (maze[yy]?.[xx] === 0) {
        const d = Math.abs(xx - doorX) + Math.abs(yy - doorY);
        if (d < minD) { minD = d; nearest = { x: xx, y: yy }; }
      }
    }
  }

  if (!nearest) return;

  let cx = doorX, cy = doorY;
  while (cx !== nearest.x || cy !== nearest.y) {
    if (cx < nearest.x) cx++;
    else if (cx > nearest.x) cx--;
    else if (cy < nearest.y) cy++;
    else if (cy > nearest.y) cy--;
    maze[cy][cx] = 0;
  }
}

function bufferedRect(x, y, w, h, buf) {
  return { x: x - buf, y: y - buf, w: w + 2*buf, h: h + 2*buf };
}

function rectsOverlap(a, b) {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}

function randomInRange(min, max) {
  if (max < min) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clampOdd(n, lo, hi) {
  let v = Math.max(lo, Math.min(hi, n));
  if (v % 2 === 0) v += (v + 1 <= hi ? 1 : -1);
  return v;
}

function findValidStart(maze, start, winObjects) {
  if (maze[start.y][start.x] === 0) return start; // already valid

  // Breadth-first search (BFS) for the nearest open tile
  const queue = [{ x: start.x, y: start.y }];
  const visited = new Set([`${start.x},${start.y}`]);
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

  while (queue.length) {
    const { x, y } = queue.shift();

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      const key = `${nx},${ny}`;
      if (visited.has(key)) continue;
      visited.add(key);

      // Skip out-of-bounds
      if (!maze[ny] || maze[ny][nx] === undefined) continue;

      // Only accept open path tiles (0)
      if (maze[ny][nx] === 0) {
        return { x: nx, y: ny };
      }

      // Keep searching nearby area
      queue.push({ x: nx, y: ny });
    }
  }

  console.warn("Could not find valid start tile!");
  return start;
}