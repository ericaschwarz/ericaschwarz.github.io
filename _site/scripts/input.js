// input.js
import { TILE_SIZE } from './config.js';

let currentTouch = null;
let activeKeys = new Set();

/**
 * Sets up input listeners for buttons, keyboard, and touch controls.
 */
export function setupInputHandlers(startMove, stopMove, player, camera, maze, winObjects, checkWin, isGameFrozen) {
  const dirs = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0]
  };

  // === BUTTON CONTROLS ===
  document.querySelectorAll("#controls button").forEach(btn => {
    const dir = btn.dataset.dir;
    const [dx, dy] = dirs[dir];

    btn.addEventListener("pointerdown", e => {
      if (isGameFrozen()) return;
      startMove(dx, dy, e, player, maze, winObjects, checkWin);
    });

    btn.addEventListener("pointerup", () => stopMove(player));
    btn.addEventListener("pointerleave", () => stopMove(player));
  });

  // === KEYBOARD CONTROLS ===
  document.addEventListener("keydown", e => {
    if (isGameFrozen()) return;

    const key = e.key.toLowerCase();
    if (activeKeys.has(key)) return;
    activeKeys.add(key);

    let dx = 0, dy = 0;
    switch (key) {
      case "arrowup": case "w": dy = -1; break;
      case "arrowdown": case "s": dy = 1; break;
      case "arrowleft": case "a": dx = -1; break;
      case "arrowright": case "d": dx = 1; break;
      default: return;
    }

    e.preventDefault();
    startMove(dx, dy, e, player, maze, winObjects, checkWin);
  });

  document.addEventListener("keyup", e => {
    const key = e.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
      activeKeys.delete(key);
      stopMove(player);
    }
  });

  // === TOUCH / TAP CONTROLS ===
  document.addEventListener("pointerdown", e => {
    handlePageTouchStart(e, isGameFrozen, player, camera, maze, winObjects, checkWin, startMove, stopMove);
  });

  document.addEventListener("pointerup", () => handlePageTouchEnd(player, stopMove));
  document.addEventListener("pointercancel", () => handlePageTouchEnd(player, stopMove));

  document.addEventListener("pointermove", e => {
    handlePointerMove(e, player, camera, maze, winObjects, checkWin, startMove, stopMove);
  });
}

// === TOUCH HELPERS ===
let activeTouchDir = null;

function handlePageTouchStart(e, isGameFrozen, player, camera, maze, winObjects, checkWin, startMove, stopMove) {
  if (isGameFrozen()) return;
  const target = e.target;
  if (target.closest("button") || target.closest("a") || target.closest("#dialogueBox")) return;

  e.preventDefault();

  const rect = document.getElementById("mazeCanvas").getBoundingClientRect();
  const touchX = e.clientX - rect.left;
  const touchY = e.clientY - rect.top;
  if (touchX < 0 || touchY < 0 || touchX > rect.width || touchY > rect.height) return;

  currentTouch = { x: touchX, y: touchY };
  activeTouchDir = null;
  updateDirectionFromTouch(touchX, touchY, e, player, camera, maze, winObjects, checkWin, startMove, stopMove);
}

function handlePointerMove(e, player, camera, maze, winObjects, checkWin, startMove, stopMove) {
  if (!currentTouch) return;

  const rect = document.getElementById("mazeCanvas").getBoundingClientRect();
  currentTouch.x = e.clientX - rect.left;
  currentTouch.y = e.clientY - rect.top;

  updateDirectionFromTouch(currentTouch.x, currentTouch.y, e, player, camera, maze, winObjects, checkWin, startMove, stopMove);
}

function handlePageTouchEnd(player, stopMove) {
  currentTouch = null;
  activeTouchDir = null;
  stopMove(player);
}

function updateDirectionFromTouch(clickX, clickY, e, player, camera, maze, winObjects, checkWin, startMove, stopMove) {
  const playerCenterX = (player.x - camera.x) + TILE_SIZE / 2;
  const playerCenterY = (player.y - camera.y) + TILE_SIZE / 2;

  const dx = clickX - playerCenterX;
  const dy = clickY - playerCenterY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (absDx < 20 && absDy < 20) return; // dead zone

  let moveX = 0, moveY = 0;
  if (absDx > absDy) moveX = dx > 0 ? 1 : -1;
  else moveY = dy > 0 ? 1 : -1;

  const dirKey = `${moveX},${moveY}`;

  if (dirKey !== activeTouchDir) {
    activeTouchDir = dirKey;
    startMove(moveX, moveY, e, player, maze, winObjects, checkWin);
  }
}
