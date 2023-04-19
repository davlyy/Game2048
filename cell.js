export class Cell {
  /*create a new cell*/
  constructor(gridElement, x, y) {
    //an empty div element
    const cell = document.createElement("div");

    //add to the div element the class Name cell
    cell.classList.add("cell");

    //add the newly created div elem to the gridEl (gameBoard)
    gridElement.append(cell);

    /*x and y values are set in a range from 0 to 3*/
    this.x = x;
    this.y = y;
  }

  /*this method will save a tile inside a cell*/
  linkTile(tile) {
    /*coords of the tile are the same as of the cell*/
    /*in other words, the coords for the tile a being taken from the cell*/
    tile.setXY(this.x, this.y);
    /*linkedTile proprety is created*/
    this.linkedTile = tile;
  }

  unlinkTile() {
    /*override the link to linkedTile to null*/
    this.linkedTile = null;
  }

  /*will return false or true when a cell has or doesn't have a linked tile*/
  isEmpty() {
    return !this.linkedTile;
  }

  linkTileForMerge(tile) {
    tile.setXY(this.x, this.y);
    this.linkedTileForMerge = tile;
  }

  unlinkTileForMerge() {
    this.linkedTileForMerge = null;
  }

  hasTileForMerge() {
    return !!this.linkedTileForMerge;
  }

  canAccept(newTile) {
    return (
      this.isEmpty() ||
      (!this.hasTileForMerge() && this.linkedTile.value === newTile.value)
    );
  }

  mergeTiles() {
    this.linkedTile.setValue(
      this.linkedTile.value + this.linkedTileForMerge.value
    );
    this.linkedTileForMerge.removeFromDOM();
    this.unlinkTileForMerge();
  }
}
