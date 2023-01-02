const game = document.querySelector<HTMLDivElement>("#game")!;

interface Dimension {
  width: number;
  height: number;
}

const dimensions: Dimension = { width: 5, height: 5 };

const gameboardElements: HTMLDivElement[] = [];

function renderNewGameboard() {
  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    if (i % dimensions.width === 0) {
      const newLineBreak = document.createElement("br");
      game.appendChild(newLineBreak);
    }
    const newDiv = document.createElement("div");
    newDiv.classList.add("gameboard-tile");
    newDiv.addEventListener("click", () => {
      // get indexes for all neighbors and self
      const indexes = [
        i - dimensions.width,
        i + dimensions.width,
        ...i % dimensions.width !== 0 ? [i - 1] : [],
        ...i % dimensions.width !== dimensions.width - 1 ? [i + 1] : [],
        i
      ]

      // filter out indexes that are out of bounds
      const filteredIndexes = indexes.filter(index => index >= 0 && index < dimensions.width * dimensions.height)

      for (const index of filteredIndexes) {
        gameboardElements[index].classList.toggle("gameboard-tile--active");
      }
    })
    gameboardElements.push(newDiv);
    game.appendChild(newDiv);
  }
}

renderNewGameboard();
