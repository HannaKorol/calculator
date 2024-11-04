/* 1) Arithmetic functions in object "operations" */ //!Arithmetic functions
const operations = {
  "+": (n1, n2) => n1 + n2,
  "-": (n1, n2) => n1 - n2,
  "*": (n1, n2) => parseFloat((n1 * n2).toFixed(5)) /* parseFloat - take only numbers and .toFixed(10) will take 10 numbers after . */,
  "÷": (n1, n2) => (n2 === 0 ? "ERROR" : parseFloat((n1 / n2).toFixed(5))) /* parseFloat - take only numbers and .toFixed(10) will take 10 bumbers after . */,
  "/": (n1, n2) => (n2 === 0 ? "ERROR" : n1 / n2),
  "%": (n1, n2) => (n2 === 0 ? "ERROR" : n1 % n2),
};

//*--------------------------------------------------------------------------------------------------------------------

// Elements DOM
const equation = document.querySelector(".equation");
const result = document.querySelector(".result");
const ce = document.querySelector(".ce");
const c = document.querySelector(".c");
const equal = document.querySelector(".equal");

//*--------------------------------------------------------------------------------------------------------------------

//! Variables for data storage
let storedValue; // shows the calculation result
let input = "";
let signThen; //key to obj that contains an operation sign, e.g. “+”, “-”, “*”, “/”.
let calculationComplete = false; // New flag for completed calculation
let resultDisplayed = false; // флаг для проверки, отображается ли результат

//*------------------------------------------

// Handlers for inputting "numbers" and "operators"                                                                          //!Number and operator buttons
document
  .querySelectorAll(".number")
  .forEach((button) =>
    button.addEventListener("click", () => handleInput(button.textContent))
  );
document
  .querySelectorAll(".operator")
  .forEach((button) =>
    button.addEventListener("click", () => processOperator(button.textContent))
  );

//*--------------------------------------------------------------------------------------------------------------------
// Handle number input
function handleInput(character) {
  // If result is displayed, clear the input
  if (resultDisplayed) {
    input = ""; // Clear current value
    result.textContent = ""; // Clear result
    resultDisplayed = false; // Reset flag
  }

  // If there's a previous calculation or an error, reset
  if (calculationComplete || result.textContent === "ERROR") {
    input = ""; // Reset input
    calculationComplete = false; // Reset completion flag
  }

  // Clear screen if there's an error
  if (result.textContent === "ERROR") {
    result.textContent = "";
    equation.textContent = ""; // Clear the upper screen on error
  }

  // Limit input length
  if (input.length >= 12) return;

  // Check for decimal point
  if (character === ".") {
    if (input.includes(".")) return; // Prevent multiple decimal points
    if (!input) input = "0"; // Add '0' before point if beginning input
  }

  input += character; // Add symbol to the string
  updateDisplay(); // Update screen
}

//*--------------------------------------------------------------------------------------------------------------------

// Handle operator input
function processOperator(operator) {
  // Prevent operator input if last result was an error
  if (result.textContent === "ERROR") return;

  // Use saved result if calculation is complete
  if (calculationComplete) {
    calculationComplete = false; // Reset completion flag
    storedValue = parseFloat(result.textContent); // Use saved result
    input = ""; // Clear current value
    result.textContent = ""; // Clear lower display before new operation
  }

  // Calculate result if previous number and operator exist
  if (storedValue !== undefined && input) {
    calculateResult(); // Perform calculation
  } else if (input) {
    storedValue = parseFloat(input); // Save current input
  }
  input = ""; // Clear input for next number
  signThen = operator; // Remember operator
  updateDisplay(); // Update screen
}

//*--------------------------------------------------------------------------------------------------------------------

// Keyboard event handler                                                                                   //!Keystroke handling
window.addEventListener("keydown", (event) => {
  // event.preventDefault()
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    handleInput(key); // Input numbers and point
  } else if (["+", "-", "*", "/", "÷", "%"].includes(key)) {
    processOperator(key); // Input operators
  } else if (key === "Enter" || key === "=") {
    event.preventDefault(); // Prevent default Enter behavior
    calculateResult(); // Perform calculation
  } else if (key === "Backspace") {
    clearEntry(); // Clear last input (CE)
  } else if (key === "Escape") {
    clearAll(); // Full clear (C)
  }
});

//*--------------------------------------------------------------------------------------------------------------------

// CE and C button                                                                                                        //!DELETE buttons
ce.addEventListener("click", clearEntry);
c.addEventListener("click", clearAll);

// Clearing the last input (CE)                                                                                           //!Clear functions
function clearEntry() {
  input = ""; // Clear current value
  updateDisplay(); // Update screen
}

// Full clear (C)
function clearAll() {
  input = ""; // Clear current value
  storedValue = undefined; // Reset stored value
  signThen = undefined; // Reset operator
  result.textContent = ""; // Clear result
  equation.textContent = ""; // Clear equation
  calculationComplete = false; // Reset completion flag
  resultDisplayed = false; // Reset result display flag
  updateDisplay(); // Update screen
}

//*--------------------------------------------------------------------------------------------------------------------

// Processing of the “=” button for calculation
equal.addEventListener("click", calculateResult); // "=" button                                               //! "=" button

// Perform calculation and update the result
function calculateResult() {
  console.log("calculateResult called");
  console.log("storedValue:", storedValue);
  console.log("input:", input);
  console.log("signThen:", signThen);

  // Perform calculation only if operator and numbers are defined
  if (signThen && storedValue !== undefined && input) {
    storedValue = operations[signThen](storedValue, parseFloat(input));

    if (storedValue === "ERROR") {
      result.textContent = "ERROR"; // Show error
      equation.textContent = ""; //!Clearing the upper display in case of an error
      storedValue = undefined; //! Reset variables
      signThen = undefined; //! Reset variables
      input = ""; //! Reset variables
      calculationComplete = true; // Set completion flag
      resultDisplayed = true; // Set result display flag
    } else {
      result.textContent = storedValue; // Show result
      calculationComplete = true; // Set completion flag
      resultDisplayed = true; // Set result display flag
    }

    input = ""; // Clear input
    signThen = undefined; // Reset operator
  }
  updateDisplay(); // Update display
}

//*--------------------------------------------------------------------------------------------------------------------

// Display update function
function updateDisplay() {
  equation.textContent = `${storedValue || ""} ${signThen || ""}   ${
    input || ""
  }`; // Update equation display
}

//*--------------------------------------------------------------------------------------------------------------------
