import {
  getPreviousValue,
  parseFormula,
  detectLastOperatorIndex,
  lastCharacterIsOperator,
} from "../utils/utils.js";

export const initialState = {
  screenValue: "0",
  previousValue: "",
};

export const calculatorReducer = (state, action) => {
  const { value } = action;

  switch (action.type) {
    case "NUMBER_INPUT":
      return handleNumberInput(state, value);

    case "OPERATOR_INPUT":
      return handleOperatorInput(state, value);

    case "OTHER_INPUT":
      return handleOtherInput(state, value);

    case "DELETE_LAST":
      return handleDeletePrevious(state);

    case "CLEAR_ALL":
      return { ...state, screenValue: "0" };

    case "EQUALS":
      return handleCalculateResult(state);

    default:
      return state;
  }
};

const handleNumberInput = (state, value) => {
  const { screenValue, previousValue } = state;
  if (screenValue === "0" && value !== ".") {
    return {
      ...state,
      previousValue: getPreviousValue(value),
      screenValue: value,
    };
  } else if (previousValue.endsWith("%")) {
    return state;
  } else {
    return {
      ...state,
      previousValue: getPreviousValue(screenValue + value),
      screenValue: screenValue + value,
    };
  }
};

const handleOperatorInput = (state, value) => {
  const { screenValue, previousValue } = state;
  const newScreenValue = lastCharacterIsOperator(previousValue)
    ? screenValue.slice(0, -1) + value
    : screenValue + value;
  return {
    ...state,
    previousValue: getPreviousValue(newScreenValue),
    screenValue: newScreenValue,
  };
};

const handleOtherInput = (state, value) => {
  const { screenValue, previousValue } = state;

  if (lastCharacterIsOperator(previousValue)) {
    return {
      ...state,
      previousValue: getPreviousValue(screenValue),
      screenValue: screenValue + "0" + value,
    };
  } else if (hasMultipleDecimals(screenValue) && value === ".") {
    return state;
  } else if (previousValue.endsWith("%") || previousValue.endsWith(".")) {
    const newValue = screenValue.slice(0, -1) + value;
    return {
      ...state,
      previousValue: getPreviousValue(newValue),
      screenValue: newValue,
    };
  } else if (value === "%") {
    const newValue = screenValue + "%";
    return {
      ...state,
      previousValue: getPreviousValue(newValue),
      screenValue: newValue,
    };
  } else if (value === ".") {
    const newValue = screenValue + ".";
    return {
      ...state,
      previousValue: getPreviousValue(newValue),
      screenValue: newValue,
    };
  }

  return state;
};

const handleDeletePrevious = (state) => {
  const { screenValue } = state;
  const newScreenValue =
    screenValue.length > 1 ? screenValue.slice(0, -1) : "0";
  return { ...state, previousValue: screenValue, screenValue: newScreenValue };
};

const handleCalculateResult = (state) => {
  const { screenValue } = state;
  const result = calculateResult(screenValue);
  return {
    ...state,
    previousValue: screenValue,
    screenValue: result.toString(),
  };
};

const hasMultipleDecimals = (screenValue) => {
  const index = detectLastOperatorIndex(screenValue);
  const value = screenValue.substring(index + 1).trim();
  return value.includes(".");
};

const calculateResult = (value) => {
  const { numbers, operators } = parseFormula(value);
  let total = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = numbers[i + 1];
    switch (operator) {
      case "+":
        total += nextNumber;
        break;
      case "-":
        total -= nextNumber;
        break;
      case "*":
        total *= nextNumber;
        break;
      case "/":
        total /= nextNumber;
        break;
    }
  }
  return total;
};
