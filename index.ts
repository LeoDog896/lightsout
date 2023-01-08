const game = document.querySelector<HTMLDivElement>("#game")!;
const newGameButton = document.querySelector<HTMLButtonElement>("#new")!;

const moves = document.querySelector<HTMLParagraphElement>("#moveContent")!;

const xSizeInput = document.querySelector<HTMLInputElement>("#x-size")!;
const ySizeInput = document.querySelector<HTMLInputElement>("#y-size")!;

interface Dimension {
  width: number;
  height: number;
}

const getDimensions = (): Dimension => ({
  width: parseInt(xSizeInput.value),
  height: parseInt(ySizeInput.value),
});

function generateRandomGameboard(): boolean[] {
  // generate a random gameboard that simulates random clicks on a 2d boolean area
  const dimensions = getDimensions();
  const gameboard: boolean[] = Array(dimensions.width * dimensions.height).fill(true);
  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    if (randomBoolean()) {
      const neighborIndexes = [
        i - dimensions.width,
        i + dimensions.width,
        i % dimensions.width !== 0 ? i - 1 : null,
        i % dimensions.width !== dimensions.width - 1 ? i + 1 : null,
        i,
      ];
      for (const index of neighborIndexes) {
        if (index != null && index >= 0 && index < dimensions.width * dimensions.height) {
          gameboard[index] = !gameboard[index];
        }
      }
    }
  }
  return gameboard;

}

const gameboardElements: HTMLButtonElement[] = [];

const randomBoolean = (): boolean => Math.random() >= 0.5;

function renderNewGameboard() {
  // clean up the gameboard
  gameboardElements.forEach((element) => element.remove());
  gameboardElements.length = 0;
  game.innerHTML = "";

  const dimensions = getDimensions();

  moves.innerText = `0`;

  const gameboard = generateRandomGameboard();

  // render the new gameboard
  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    if (i % dimensions.width === 0 && i !== 0) {
      const newLineBreak = document.createElement("br");
      game.appendChild(newLineBreak);
    }
    const newDiv = document.createElement("button");
    newDiv.classList.add("gameboard-tile");
    if (gameboard[i]) {
      newDiv.classList.add("gameboard-tile--active");
    }

    // get indexes for all neighbors and self
    const indexes = [
      i - dimensions.width,
      i + dimensions.width,
      i % dimensions.width !== 0 ? i - 1 : null,
      i % dimensions.width !== dimensions.width - 1 ? i + 1 : null,
      i,
    ];

    // filter out indexes that are out of bounds
    const filteredIndexes = indexes.filter(
      (index) =>
        index != null &&
        index >= 0 &&
        index < dimensions.width * dimensions.height
    ) as number[];

    newDiv.addEventListener("click", () => {
      if (filteredIndexes.length === 0) return;
      moves.innerText = `${parseInt(moves.innerText) + 1}`;
      for (const index of filteredIndexes) {
        gameboardElements[index].classList.toggle("gameboard-tile--active");
      }
    });

    // add arrow navigation
    newDiv.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" && indexes[0]) {
        gameboardElements[indexes[0]].focus();
      } else if (event.key === "ArrowDown" && indexes[1]) {
        gameboardElements[indexes[1]].focus();
      } else if (event.key === "ArrowLeft" && indexes[2]) {
        gameboardElements[indexes[2]].focus();
      } else if (event.key === "ArrowRight" && indexes[3]) {
        gameboardElements[indexes[3]].focus();
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
