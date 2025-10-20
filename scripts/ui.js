// ui.js
function typeDialogue(text, callback) {
  const msg = document.getElementById('winMessage');
  const choiceBox = document.getElementById('dialogueChoices');

  msg.textContent = "";
  msg.classList.add("typing");
  choiceBox.innerHTML = "";

  let i = 0;
  const speed = 35; // milliseconds per character

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


function checkWin() {
  const msg = document.getElementById('winMessage');
  const choiceBox = document.getElementById('dialogueChoices');

  if (hasWon || gameFrozen) return;

  // Check if player stands on any goal
  const found = winObjects.find(obj =>
    player.gridX === obj.x && player.gridY === obj.y
  );

  if (found) {
    hasWon = true;
    gameFrozen = true;

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
          gameFrozen = false;
          hasWon = false;
        });
      };
    });
  } else {
    // Normal message when wandering
    msg.textContent =
      "Explore my website. Each waypoint will take you to a new page. The maze is procedurally generated and will change each time you visit. Enjoy!";
    choiceBox.innerHTML = "";
  }
}
