import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

/*PART1: Create the playground*/
const gameBoard = document.getElementById("game-board");

/*creates the grid with 16 empty cells*/
const grid = new Grid(gameBoard);

/*creates a random tile on a random cell on the grid*/
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));

/*PART2: Add the moving functionality*/
setupInputOnce();
/*listen for the event only once then do the logics then listen again*/
function setupInputOnce() {
  window.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(event) {
  switch (event.key) {
    case "ArrowUp":
      await moveUp();
      break;
    case "ArrowDown":
      await moveDown();
      break;
    case "ArrowLeft":
      await moveLeft();
      break;
    case "ArrowRight":
      await moveRight();
      break;

    default: /*since we want to again handle the key press*/
      setupInputOnce();
      return; /*since we don't want to react to any other keys*/
  }

  const newTile = newTile(gameBoard);
  grid.getRandomEmptyCell().linkTile(newTile);
  /*call the function so that the event gets triggered again*/
  setupInputOnce();
}

async function moveUp() {
  await slideTiles(grid.cellsGroupedByColumn);
}

async function moveDown() {
  await slideTiles(grid.cellsGroupedByReversedColumn);
}

async function moveLeft() {
  await slideTiles(grid.cellsGroupedByRow);
}
async function moveRight() {
  await slideTiles(grid.cellsGroupedByReversedRow);
}

async function slideTiles(groupedCells) {
  const promises = [];
  /*slideTilesInGroup will be called for each array with cells*/
  groupedCells.forEach((group) => slideTilesInGroup(group, promises));

  await Promise.all(promises);
  grid.cells.forEach((cell) => {
    cell.hasTileForMerge() && cell.mergeTiles();
  });
}

function slideTilesInGroup(group, promises) {
  /*group here is a column of 4*/
  /*begin with i=1 one since the upper row is not moveable upwards*/
  for (let i = 1; i < group.length; i++) {
    /*we only move tiles hence we check if the cell is empty*/
    if (group[i].isEmpty()) continue;
    const cellWithTile = group[i];

    /*find a cell where we can move our tile*/
    let targetCell;
    /*one cell above us*/
    let j = i - 1;

    /*while we're not at the top and the cell above cell can accept our tile => is empty or has the same number*/
    while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
      /*save target cell and decrease j for the next iteration*/
      targetCell = group[j];
      j--;
    }
    if (!targetCell) {
      continue;
    }
    promises.push(cellWithTile.linkedTile.waitForTransition());

    if (targetCell.isEmpty()) {
      /*link the tile to the free cell => cellWithTile.linkedTile is our Tile here*/
      targetCell.linkTile(cellWithTile.linkedTile);
    } else {
      /*add two cells with the same number*/
      targetCell.linkTileForMerge(cellWithTile.linkedTile);
    }

    /*delete the current cell content*/
    cellWithTile.unlinkTile();
  }
}
