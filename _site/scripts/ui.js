// ui.js

export function typeDialogue(text, callback) {
  const msg = document.getElementById('winMessage');
  const choiceBox = document.getElementById('dialogueChoices');

  msg.textContent = "";
  msg.classList.add("typing");
  choiceBox.innerHTML = "";

  let i = 0;
  const speed = 35;

  function typeNext() {
    if (i < text.length) {
      msg.textContent += text.charAt(i);
      i++;
      setTimeout(typeNext, speed);
    } else {
      msg.classList.remove("typing");
      if (callback) callback();
    }
  }

  typeNext();
}

/**
 * Checks for win condition and handles dialogue.
 * Receives game state via callbacks to avoid globals.
 */
export function checkWin(player, winObjects, setGameFrozen, setHasWon, isGameFrozen, hasWon) {
  const msg = document.getElementById('winMessage');
  const choiceBox = document.getElementById('dialogueChoices');

  if (isGameFrozen() || hasWon()) return;

  const found = winObjects.find(obj =>
    player.gridX === obj.x && player.gridY === obj.y
  );

  if (found) {
    setGameFrozen(true);
    setHasWon(true);

    typeDialogue(`${found.dialogue}\nWould you like to enter?`, () => {
      choiceBox.innerHTML = `
        <button class="dialogue-btn" id="yesBtn">Yes</button>
        <button class="dialogue-btn" id="noBtn">No</button>
      `;

      const yesBtn = document.getElementById("yesBtn");
      const noBtn = document.getElementById("noBtn");

      yesBtn.onclick = () => {
        window.location.href = found.targetURL;
      };

      noBtn.onclick = () => {
        typeDialogue("You decide to keep exploring the maze.", () => {
          choiceBox.innerHTML = "";
          setGameFrozen(false);
          setHasWon(false);
        });
      };
    });
  } else {
    msg.textContent =
      "Explore my website. Each waypoint will take you to a new page. The maze is procedurally generated and will change each time you visit. Enjoy!";
    choiceBox.innerHTML = "";
  }
}
