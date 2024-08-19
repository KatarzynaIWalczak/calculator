import { OPERATORS } from "../data/constants.js";

export const getPreviousValue = (value) => {
  const parts = value.match(/([-]?\d*\.?\d+|\/|\×|\-|\+|%|\.)/g);
  return parts ? parts[parts.length - 1] : "No value found";
};

export const parseFormula = (formula) => {
  formula = formula.replace(/×/g, "*");
  const regex = /(\d+(\.\d+)?%?|\+|\-|\*|\/)/g;

  const matches = formula.match(regex);

  const numbers = [];
  const operators = [];

  const firstMatchIsMinus = matches[0] === "-";

  matches.forEach((match) => {
    if (isNaN(match.replace("%", ""))) {
      operators.push(match);
    } else {
      if (match.includes("%")) {
        numbers.push(parseFloat(match.replace("%", "")) / 100);
      } else {
        numbers.push(parseFloat(match));
      }
    }
  });

  if (firstMatchIsMinus) {
    numbers[0] = -numbers[0];
    operators.shift();
  }

  return { numbers, operators };
};

export const detectLastOperatorIndex = (value) => {
  let lastIndex = -1;

  OPERATORS.forEach((operator) => {
    const index = value.lastIndexOf(operator);
    if (index > lastIndex) {
      lastIndex = index;
    }
  });

  return lastIndex;
};

export const lastCharacterIsOperator = (previousValue) => {
  return OPERATORS.some((val) => previousValue === val);
};
