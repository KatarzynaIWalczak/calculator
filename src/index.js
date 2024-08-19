import { Calculator } from "./components/calculator.js";

document.removeEventListener("DOMContentLoaded", () => {
  new Calculator(".screen", ".buttons");
});

document.addEventListener("DOMContentLoaded", () => {
  new Calculator(".screen", ".buttons");
});
