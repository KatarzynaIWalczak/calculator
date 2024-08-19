import { BUTTONS } from "../data/constants.js";

export class Calculator {
  constructor(screenSelector, buttonsContainerSelector) {
    this.screen = document.querySelector(screenSelector);
    this.buttonsContainer = document.querySelector(buttonsContainerSelector);
    this.init();
  }

  init() {
    this.addButtons();
    this.addEventListeners();
  }

  addButtons() {
    this.buttonsContainer.innerHTML = BUTTONS.map(
      (button) =>
        `<button class="${button.class}" data-action="${button.action}">${button.value}</button>`
    ).join("");
  }

  addEventListeners() {
    this.buttonsContainer.removeEventListener("click", (e) =>
      this.handleButtonClick(e)
    );
    this.buttonsContainer.addEventListener("click", (e) =>
      this.handleButtonClick(e)
    );
  }

  handleButtonClick(e) {
    e.preventDefault();
    if (e.target.tagName !== "BUTTON") return;

    const selectedValue = e.target.innerText;
    const selectedAction = e.target.getAttribute("data-action");

    switch (selectedAction) {
      case "delete-last":
        this.deletePreviousValue();
        break;
      case "clear-all":
        this.clearAll();
        break;
      case "equals":
        console.log(selectedValue, selectedAction);
        break;
      default:
        this.screen.value += selectedValue;
        return;
    }
  }

  deletePreviousValue() {
    this.screen.value !== "0" &&
      (this.screen.value = this.screen.value.slice(0, -1));
  }

  clearAll() {
    this.screen.value = "0";
  }
}
