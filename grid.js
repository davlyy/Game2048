import { Cell } from "./cell.js";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  constructor(gridElement) {
    this.cells = [];

    /*create the grid*/
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push(
        /*15 new Cells are created*/
        new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
      );
    }

    this.cellsGroupedByColumn = this.groupCellsByColumn();
    this.cellsGroupedByReversedColumn = this.cellsGroupedByColumn.map(
      (column) => [...column].reverse()
    );
    this.cellsGroupedByRow = this.groupCellsByRow();
    this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map((row) =>
      [...row].reverse()
    );
  }

  /*look for all empty cells*/
  getRandomEmptyCell() {
    /*filter out the full cells*/
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());

    /*get a random index from the empty cells*/
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  /*group the cells in cloumns => 4 arrays with 4 elements*/
  groupCellsByColumn() {
    return this.cells.reduce((groupedCells, cell) => {
      /*only in case there's no column a new one is created*/
      groupedCells[cell.x] = groupedCells[cell.x] || [];
      /*a cell is added to the array*/
      groupedCells[cell.x][cell.y] = cell;
      return groupedCells;
    }, []);
  }
  groupCellsByRow() {
    return this.cells.reduce((groupedCells, cell) => {
      /*only in case there's no column a new one is created*/
      groupedCells[cell.y] = groupedCells[cell.y] || [];
      /*a cell is added to the array*/
      groupedCells[cell.y][cell.x] = cell;
      return groupedCells;
    }, []);
  }
}
