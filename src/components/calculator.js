import { BUTTONS } from "../data/constants.js";
import {
  calculatorReducer,
  initialState,
} from "../reducers/calculatorReducer.js";

export class Calculator {
  constructor(screenSelector, buttonsContainerSelector) {
    this.screen = document.querySelector(screenSelector);
    this.buttonsContainer = document.querySelector(buttonsContainerSelector);
    this.state = initialState;
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

    let actionType;
    switch (selectedAction) {
      case "number":
        actionType = "NUMBER_INPUT";
        break;
      case "operator":
        actionType = "OPERATOR_INPUT";
        break;
      case "other":
        actionType = "OTHER_INPUT";
        break;
      case "delete-last":
        actionType = "DELETE_LAST";
        break;
      case "clear-all":
        actionType = "CLEAR_ALL";
        break;
      case "equals":
        actionType = "EQUALS";
        break;
      default:
        actionType = "UNKNOWN";
    }

    const action = { type: actionType, value: selectedValue };
    this.state = calculatorReducer(this.state, action);
    this.updateScreenValue(this.state.screenValue);
  }

  updateScreenValue(result) {
    this.screen.value = result || "0";
  }
}
