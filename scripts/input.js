// input.js
import { dirs } from './main.js';

export function setupInputHandlers(startMove, stopMove, updateDirectionFromTouch) {
  document.querySelectorAll("#controls button").forEach(btn => {
    const dir = btn.dataset.dir;
    const [dx, dy] = dirs[dir];
    btn.addEventListener("pointerdown", e => startMove(dx, dy, e));
    btn.addEventListener("pointerup", stopMove);
    btn.addEventListener("pointerleave", stopMove);
  });

  // --- KEYBOARD CONTROLS ---
  document.addEventListener("keydown", e => {
    if (gameFrozen) return;

    // Ignore repeated keydown events (we manage hold manually)
    if (e.repeat) return;

    let dx = 0, dy = 0;
    switch (e.key.toLowerCase()) {
      case "arrowup": case "w": dy = -1; break;
      case "arrowdown": case "s": dy = 1; break;
      case "arrowleft": case "a": dx = -1; break;
      case "arrowright": case "d": dx = 1; break;
      default: return;
    }

    e.preventDefault();

    // Clear any existing movement to allow instant direction switch
    if (moveInterval) {
      clearInterval(moveInterval);
      moveInterval = null;
    }

    // Move immediately and start continuous movement
    startMove(dx, dy, e);
  });

  document.addEventListener("keyup", e => {
    const keys = ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"];
    if (keys.includes(e.key.toLowerCase())) stopMove();
  });


  // === GLOBAL TOUCH / TAP MOVEMENT ===
  document.addEventListener("pointerdown", handlePageTouchStart);
  document.addEventListener("pointerup", handlePageTouchEnd);
  document.addEventListener("pointercancel", handlePageTouchEnd);
  document.addEventListener("pointermove", handlePointerMove);

  function handlePageTouchStart(e) {
    const target = e.target;
    if (gameFrozen || target.closest("button") || target.closest("a") || target.closest("#dialogueBox")) return;
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const touchX = e.clientX - rect.left;
    const touchY = e.clientY - rect.top;
    if (touchX < 0 || touchY < 0 || touchX > rect.width || touchY > rect.height) return;

    currentTouch = { x: touchX, y: touchY };
    updateDirectionFromTouch(touchX, touchY, e);
  }

  function handlePointerMove(e) {
    if (!currentTouch) return;

    const rect = canvas.getBoundingClientRect();
    const touchX = e.clientX - rect.left;
    const touchY = e.clientY - rect.top;

    currentTouch.x = touchX;
    currentTouch.y = touchY;

    // update intended direction, but don't force immediate turn
    updateDirectionFromTouch(touchX, touchY, e);
  }

  function handlePageTouchEnd(e) {
    currentTouch = null;
    nextDir = null;
    currentDir = null;
    stopMove();
  }

  function updateDirectionFromTouch(clickX, clickY, e) {
    const playerCenterX = (player.x - camera.x) + tileSize / 2;
    const playerCenterY = (player.y - camera.y) + tileSize / 2;

    const dx = clickX - playerCenterX;
    const dy = clickY - playerCenterY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx < 20 && absDy < 20) return; // dead zone

    const moveOptions = absDx > absDy
      ? [[dx > 0 ? 1 : -1, 0], [0, dy > 0 ? 1 : -1]]
      : [[0, dy > 0 ? 1 : -1], [dx > 0 ? 1 : -1, 0]];

    for (let [mx, my] of moveOptions) {
      const newX = player.gridX + mx;
      const newY = player.gridY + my;
      if (maze[newY] && maze[newY][newX] === 0) {
        const dirKey = `${mx},${my}`;
        if (player.moving) {
          if (nextDir !== dirKey && currentDir !== dirKey) {
            nextDir = dirKey;
          }
        } else {
          // --- start movement only if idle
          currentDir = dirKey;
          startMove(mx, my, e);
        }
        return;
      }
    }

    // stop if no open direction
    stopMove();
  }

}