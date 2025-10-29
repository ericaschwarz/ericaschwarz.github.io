// main.js
import { generateMazeWithBuildings  } from './maze.js';
import { loadImages, buildWallSprites, images } from './sprites.js';
import { Player } from './player.js';
import { Camera } from './camera.js';
import { startGameLoop } from './gameLoop.js';
import { TILE_SIZE } from './config.js';
import { setupInputHandlers } from './input.js';
import { typeDialogue, checkWin } from './ui.js';
import { startMove, stopMove } from './movement.js';
import { drawScene } from './renderer.js';


let gameFrozen = false;
let hasWon = false;

const isGameFrozen = () => gameFrozen;
const setGameFrozen = val => gameFrozen = val;

const getHasWon = () => hasWon;
const setHasWon = val => hasWon = val;


const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');


// === Site pages that become in-game goals ===
const sitePages = [
  { name: "solver",       url: "/research/solver",       dialogue: "You discovered the Solver Room!" },
  { name: "translation",  url: "/research/translation",  dialogue: "You found the Translation Chamber!" },
  { name: "multiscale",   url: "/research/multiscale",   dialogue: "You uncovered the Multiscale Archive!" },
  { name: "publications", url: "/publications",          dialogue: "A library of knowledge stands before you!" },
  { name: "vision",       url: "/vision",                dialogue: "You gaze into the Vision Hall." },
  { name: "teaching",     url: "/teaching",              dialogue: "You step into the Teaching Garden." },
  { name: "cv",           url: "/cv",                    dialogue: "You uncover the Scholar’s Record." },
  { name: "contact",      url: "/contact",               dialogue: "You arrive at the Communication Gate!" }
];

const { maze, start, winObjects } = generateMazeWithBuildings(31, 31, sitePages);

// === Generate buildings ===
const wallSprites = buildWallSprites(maze);
const player = new Player(start.x, start.y);
const camera = new Camera(start.x, start.y);

// Initialize inputs
setupInputHandlers(
  startMove,
  stopMove,
  player,
  camera,
  maze,
  winObjects,
  (player, winObjects) =>
    checkWin(player, winObjects, setGameFrozen, setHasWon, isGameFrozen, getHasWon),
  isGameFrozen
);
loadImages(() => {
  const directions = ["up", "down", "left", "right"];
  const actions = ["idle", "walk"];
  const frameCount = 4;

  for (const action of actions) {
    for (const dir of directions) {
      const key = `${action}${dir.charAt(0).toUpperCase() + dir.slice(1)}`;
      player.animations[key] = [];
      for (let i = 0; i < frameCount; i++) {
        const name = `player_${action}_${dir}_${i}`;
        player.animations[key].push(images[name]);
      }
    }
  }

  // Start drawing once animations are loaded
  startGameLoop(() => {
    player.updatePosition();
    camera.update(player.x, player.y, canvas.width, canvas.height, maze[0].length, maze.length, TILE_SIZE);
  }, () => {
    player.animate();
    drawScene(ctx, maze, camera, wallSprites, winObjects, player);
  });
});
