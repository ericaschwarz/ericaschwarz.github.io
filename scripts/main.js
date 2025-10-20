// main.js
import { generateMaze } from './maze.js';
import { loadImages } from './sprites.js';
import { Player } from './player.js';
import { Camera } from './camera.js';
import { startGameLoop } from './gameLoop.js';
import { TILE_SIZE } from './config.js';
import { setupInputHandlers } from './input.js';
import { typeDialogue, checkWin } from './ui.js';

const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const { maze, start } = generateMaze(31, 31);
const player = new Player(start.x, start.y);
const camera = new Camera(start.x, start.y);

loadImages(() => {
  // Initialize sprites, animations, etc.
  setupInputHandlers(startMove, stopMove, updateDirectionFromTouch);

  startGameLoop(() => {
    player.updatePosition();
    camera.update(player.x, player.y, canvas.width, canvas.height, maze[0].length, maze.length, TILE_SIZE);
  }, () => {
    drawMaze(ctx, maze, camera);
    player.draw(ctx, camera);
  });
});
