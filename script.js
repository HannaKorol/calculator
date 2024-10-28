/* //// 1) Create function add, subtract, multiply and divide;                   // add objects with functions
             1.1) Test this function in console;

  // 2) Calculation consists:                                              
   ////  a number,                                                                   //add className="number"
    ///// an operator,                                                                //add className="operator"
     ///// and another number;                     
      
   3) Create three variables for each of the parts of a calculator operation.
   4)Create a new function "operate" that takes "an operator" and "2 numbers" and then calls one of the above functions on the numbers. 
   5)Create a basic HTML calculator with "buttons for each digit", each of the above functions and an “Equals” key.
   5.1)There should also be a display for the calculator.
   5.2)Add a “clear” button
   6)Create the functions that populate the display when you click the number buttons. 
   6.1) You should be storing the ‘display value’ in a variable somewhere for use in the next step.
   7)You’ll need to store the first number and second number that are input into the calculator, utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key. 
   7.1)You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
   7.2)Store all the values and call the operate function with them. 
   //8)Round answers with long decimals so that they don’t overflow the screen.
  // 9)Pressing = before entering all of the numbers or an operator could cause problems!
   //10) Pressing “clear” should wipe out any existing data.
  // 11) Display an error message if the user tries to divide by 0
   //12) 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
 ////  13) Add a “backspace” button, so the user can undo if they click the wrong number.
   14) Add keyboard support!
   
   */

//*--------------------------------------------------------------------------------------------------------------------

/* 1) Arithmetic functions in object "operations" */ //!Arithmetic functions

/* 2) Calculation consists:
     a number,                                                                   //add className="number"
     an operator,                                                                //add className="operator"
      and another number;  
 8)Round answers with long decimals so that they don’t overflow the screen.
11)Display an error message if the user tries to divide by 0 
12) 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display) */

const operations = {
  "+": (n1, n2) => n1 + n2,
  "–": (n1, n2) => n1 - n2,
  x: (n1, n2) =>
    parseFloat(
      (n1 * n2).toFixed(10)
    ) /* parseFloat - take only numbers and .toFixed(10) will take 10 bumbers after . */,
  "÷": (n1, n2) =>
    n2 === 0
      ? "ERROR"
      : parseFloat(
          (n1 / n2).toFixed(10)
        ) /* parseFloat - take only numbers and .toFixed(10) will take 10 bumbers after . */,
  "%": (n1, n2) => (n2 === 0 ? "ERROR" : n1 % n2),
};

//*--------------------------------------------------------------------------------------------------------------------

/*   2) Calculation consists:                                              
     a number,                                                                   //add className="number"
     an operator,                                                                //add className="operator"
      and another number; */

// Elements DOM
const equation = document.querySelector(".equation");
const result = document.querySelector(".result");
const ce = document.querySelector(".ce");
const c = document.querySelector(".c");
const equal = document.querySelector(".equal");

//*--------------------------------------------------------------------------------------------------------------------


// Variables for data storage
let storedValue;                         // shows the calculation result
let input = "";                           
let signThen;                             //key to obj that contains an operation sign, e.g. “+”, “-”, “*”, “/”.

//*--------------------------------------------------------------------------------------------------------------------

// Handlers for inputting "numbers" and "operators"                                                                              //!Number and operator buttons
document
  .querySelectorAll(".number")
  .forEach(
    (button) =>
      button.addEventListener("click", () =>
        addInput(button.textContent)
      ) /* Add the text of the button which was pressed */
  );
document
  .querySelectorAll(".operator")
  .forEach((button) =>
    button.addEventListener("click", () => processOperator(button.textContent))
  );

// Functions for processing input numbers
function addInput(character) {
  if (character === ".") {
    // Если уже есть точка, ничего не делать
    if (input.includes(".")) return;
    // Если это первая точка, добавляем '0' перед ней
    if (!input) input = "0";
  }
  input += character; // Добавляем символ к текущему вводу
  updateDisplay(); // Обновляем дисплей
}

// Functions for processing operator input
function processOperator(operator) {
  if (storedValue !== undefined && input) {
    calculateResult();
  } else if (input) {
    storedValue = parseFloat(input);
  }
  input = "";
  signThen = operator;
  updateDisplay();
}

//*--------------------------------------------------------------------------------------------------------------------
  // 13) Add a “backspace” button, so the user can undo if they click the wrong number.

// CE and C button                                                                                                        //!DELETE buttons
ce.addEventListener("click", clearEntry);
window.addEventListener(
  "keydown",
  (e) => e.key === "Delete" && (clearEntry(), toggleActive(ce, true))
);
window.addEventListener(
  "keyup",
  (e) => e.key === "Delete" && toggleActive(ce, false)
);

//*--------------------------------------------------------------------------------------------------------------------
//  10) Pressing “clear” should wipe out any existing data.

// C button for complete cleaning
c.addEventListener("click", clearAll);

//*--------------------------------------------------------------------------------------------------------------------
 //  9)Pressing = before entering all of the numbers or an operator could cause problems!

// Processing of the “=” button for calculation
equal.addEventListener("click", calculateResult);                                                                            // Added for the “=” button

//*--------------------------------------------------------------------------------------------------------------------

// Perform calculation of numbers provided  and update the result of the culculation 
function calculateResult() {
  console.log("calculateResult called");
  console.log("storedValue:", storedValue);
  console.log("input:", input);
  console.log("signThen:", signThen);

  if (signThen && storedValue !== undefined && input) {
    storedValue = operations[signThen](storedValue, parseFloat(input)); //operations["+" or other](1st argument , 2nd argument)
    result.textContent = storedValue;                                   //display "result" is storedValue
    input = "";
    signThen = undefined;
  }
  updateDisplay(); // Updating the display after a calculation
}

//*--------------------------------------------------------------------------------------------------------------------

// Clearing the last input (CE)
function clearEntry() {
  input = "";
  updateDisplay();
}

// Full cleaning (C)
function clearAll() {
  input = "";
  storedValue = undefined;
  signThen = undefined;
  result.textContent = "";
  updateDisplay();
}

//*--------------------------------------------------------------------------------------------------------------------

// Display "equation" Update function 
function updateDisplay() {
  equation.textContent = `${storedValue || ""} ${signThen || ""} ${
    input || ""
  }`;
}

//*--------------------------------------------------------------------------------------------------------------------

// Adding an active class to a button if active and remove if not
function toggleActive(element, isActive) {
  isActive
    ? element.classList.add("active")
    : element.classList.remove("active");
}
