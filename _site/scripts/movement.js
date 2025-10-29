// movement.js
import { MOVE_INTERVAL } from './config.js';
import { typeDialogue } from './ui.js';

let moveInterval = null;
let currentDir = null;
let nextDir = null;

export function startMove(dx, dy, event, player, maze, winObjects, onWinCheck) {
  if (event) event.preventDefault();

  if (moveInterval) clearInterval(moveInterval);
  player.moving = true;

  // Move once immediately
  movePlayer(dx, dy, player, maze, winObjects, onWinCheck);

  // Keep moving at intervals
  moveInterval = setInterval(() => movePlayer(dx, dy, player, maze, winObjects, onWinCheck), MOVE_INTERVAL);
}

export function stopMove(player) {
  if (moveInterval) clearInterval(moveInterval);
  moveInterval = null;
  currentDir = null;
  nextDir = null;

  // Stop the walking animation
  if (player) player.moving = false;
}



function movePlayer(dx, dy, player, maze, winObjects, onWinCheck) {
  const newX = player.gridX + dx;
  const newY = player.gridY + dy;

  player.direction =
    dx > 0 ? "right" :
    dx < 0 ? "left" :
    dy > 0 ? "down" :
    "up";

  if (maze[newY] && maze[newY][newX] === 0) {
    player.gridX = newX;
    player.gridY = newY;
  } else {
    // stop movement immediately if blocked
    stopMove(player);
  }

  if (onWinCheck) onWinCheck(player, winObjects);
}