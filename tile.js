export class Tile {
  constructor(gridElement) {
    this.tileElement = document.createElement("div");
    this.tileElement.classList.add("tile");
    /*if the random number is lower than 0.5 the value of the tile will be 2, otherwise it will be 4*/

    this.setValue(Math.random() > 0.5 ? 2 : 4);
    gridElement.append(this.tileElement);
  }

  /*update the value of x and y and also set the css values*/
  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.tileElement.style.setProperty("--x", x);
    this.tileElement.style.setProperty("--y", y);
  }

  /*set the clors*/
  setValue(value) {
    this.value = value;
    this.tileElement.textContent = this.value;
    const bgLightness = 100 - Math.log2(value) * 9;
    this.tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
    this.tileElement.style.setProperty(
      "--text-lightness",
      `${bgLightness < 50 ? 90 : 10}%`
    );
  }

  removeFromDOM() {
    this.tileElement.remove();
  }

  waitForTransition() {
    return new Promise((resolve) => {
      /*once the animation is done resolve is called*/
      this.tileElement.addEventListener("animationend", resolve, {
        once: true,
      });
    });
  }
}
