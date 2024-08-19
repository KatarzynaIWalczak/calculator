import { BUTTONS } from "../data/constants.js";

export class Calculator {
  constructor(screenSelector, buttonsContainerSelector) {
    this.screen = document.querySelector(screenSelector);
    this.buttonsContainer = document.querySelector(buttonsContainerSelector);
    this.init();
  }

  init() {
    this.addButtons();
  }

  addButtons() {
    this.buttonsContainer.innerHTML = BUTTONS.map(
      (button) =>
        `<button class="${button.class}" data-action="${button.action}">${button.value}</button>`
    ).join("");
  }
}