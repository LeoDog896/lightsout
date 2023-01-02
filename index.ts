const game = document.querySelector<HTMLDivElement>("#game")!;
const newGameButton = document.querySelector<HTMLButtonElement>("#new")!;

interface Dimension {
  width: number;
  height: number;
}

const dimensions: Dimension = { width: 5, height: 5 };

const gameboardElements: HTMLDivElement[] = [];

const randomBoolean = (): boolean => Math.random() >= 0.5;

function renderNewGameboard() {
  // clean up the gameboard
  for (const element of gameboardElements) {
    element.remove();
  }
  gameboardElements.length = 0;
  game.innerHTML = "";

  // render the new gameboard
  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    if (i % dimensions.width === 0) {
      const newLineBreak = document.createElement("br");
      game.appendChild(newLineBreak);
    }
    const newDiv = document.createElement("div");
    newDiv.classList.add("gameboard-tile");
    if (randomBoolean()) {
      newDiv.classList.add("gameboard-tile--active");
    }
    newDiv.addEventListener("click", () => {
      // get indexes for all neighbors and self
      const indexes = [
        i - dimensions.width,
        i + dimensions.width,
        ...(i % dimensions.width !== 0 ? [i - 1] : []),
        ...(i % dimensions.width !== dimensions.width - 1 ? [i + 1] : []),
        i,
      ];

      // filter out indexes that are out of bounds
      const filteredIndexes = indexes.filter(
        (index) => index >= 0 && index < dimensions.width * dimensions.height
      );

      for (const index of filteredIndexes) {
        gameboardElements[index].classList.toggle("gameboard-tile--active");
      }
    });
    gameboardElements.push(newDiv);
    game.appendChild(newDiv);
  }
}

renderNewGameboard();

newGameButton.addEventListener("click", () => {
  renderNewGameboard();
});
