/* //// 1) Create function add, subtract, multiply and divide;                   // add objects with functions
             1.1) Test this function in console;

  // 2) Calculation consists:                                              
   ////  a number,                                                                   //add className="number"
    ///// an operator,                                                                //add className="operator"
     ///// and another number;                     
      
   3) Create three variables for each of the parts of a calculator operation.
   4)Create a new function "operate" that takes "an operator" and "2 numbers" and then calls one of the above functions on the numbers. 
      /////  5)Create a basic HTML calculator with "buttons for each digit", each of the above functions and an “Equals” key.
        /////5.1)There should also be a display for the calculator.
       ///// 5.2)Add a “clear” button
      /////  6)Create the functions that populate the display when you click the number buttons. 
   6.1) You should be storing the ‘display value’ in a variable somewhere for use in the next step.
   7)You’ll need to store the first number and second number that are input into the calculator, utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key. 
   7.1)You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
  // 7.2)Store all the values and call the operate function with them. 
   //8)Round answers with long decimals so that they don’t overflow the screen.
  // 9)Pressing = before entering all of the numbers or an operator could cause problems!
   //10) Pressing “clear” should wipe out any existing data.
  // 11) Display an error message if the user tries to divide by 0
   //12) 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
 ////  13) Add a “backspace” button, so the user can undo if they click the wrong number.
   14) Add keyboard support!
   
   */

//*--------------------------------------------------------------------------------------------------------------------

/* 2) Calculation consists:
     a number,                                                                   //add className="number"
     an operator,                                                                //add className="operator"
      and another number;  
 8)Round answers with long decimals so that they don’t overflow the screen.
11)Display an error message if the user tries to divide by 0 
12) 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display) */

/* 1) Arithmetic functions in object "operations" */ //!Arithmetic functions
const operations = {
  "+": (n1, n2) => n1 + n2,
  "-": (n1, n2) => n1 - n2,
  "*": (n1, n2) =>
    parseFloat(
      (n1 * n2).toFixed(5)
    ) /* parseFloat - take only numbers and .toFixed(10) will take 10 numbers after . */,
  "÷": (n1, n2) =>
    n2 === 0
      ? "ERROR"
      : parseFloat(
          (n1 / n2).toFixed(5)
        ) /* parseFloat - take only numbers and .toFixed(10) will take 10 bumbers after . */,
  "/": (n1, n2) => (n2 === 0 ? "ERROR" : n1 / n2),
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

//! Variables for data storage
let storedValue; // shows the calculation result
let input = "";
let signThen; //key to obj that contains an operation sign, e.g. “+”, “-”, “*”, “/”.
let calculationComplete = false; // New flag for completed calculation

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
// Если была ошибка или завершенное вычисление, начинаем новый ввод
function handleInput(character) {
  if (calculationComplete || result.textContent === "ERROR") {
    input = "";
    calculationComplete = false;
  }

  // Очищаем экран только если это была ошибка, иначе результат остаётся
  if (result.textContent === "ERROR") {
    result.textContent = "";
    equation.textContent = ""; // Сбрасываем верхний экран при ошибке
  }

  // Блокируем ввод, если превышена длина
  if (input.length >= 12) return;

  // Проверяем ввод десятичной точки
  if (character === ".") {
    if (input.includes(".")) return;
    if (!input) input = "0"; // Добавляем '0' перед точкой, если начало ввода
  }

  input += character; // Добавляем символ в строку
  updateDisplay(); // Обновляем экран
}

//*--------------------------------------------------------------------------------------------------------------------

function processOperator(operator) {
  // Проверяем, если последний результат был ошибкой, блокируем ввод оператора
  if (result.textContent === "ERROR") return;

  // Если ввод был завершен (напр. после `=`), используем сохраненный результат
  if (calculationComplete) {
    calculationComplete = false; // Сбрасываем флаг завершения вычисления
    storedValue = parseFloat(result.textContent); // Используем сохраненный результат
    input = ""; // Сбрасываем текущее значение
    result.textContent = ""; // Очищаем нижний дисплей перед началом новой операции
  }

  // Если введено предыдущее число и оператор, выполняем вычисление
  if (storedValue !== undefined && input) {
    calculateResult();
  } else if (input) {
    // Сохраняем текущее введенное число в `storedValue`
    storedValue = parseFloat(input);
  }
  input = ""; // Очищаем ввод для следующего числа
  signThen = operator; // Запоминаем оператор
  updateDisplay(); // Обновляем экран
}

//*--------------------------------------------------------------------------------------------------------------------

// Обработчик событий клавиатуры                                                                                      //!Keystroke handling
window.addEventListener("keydown", (event) => {
  // event.preventDefault()
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    handleInput(key); // Ввод чисел и точки
  } else if (["+", "-", "*", "/", "÷", "%"].includes(key)) {
    processOperator(key); // Ввод операторов
  } else if (key === "Enter" || key === "=") {
    event.preventDefault(); // Предотвращаем стандартное поведение Enter
    calculateResult(); // Выполняем расчет
  } else if (key === "Backspace") {
    clearEntry(); // Очистка последнего ввода (CE)
  } else if (key === "Escape") {
    clearAll(); // Полная очистка (C)
  }
});

//*--------------------------------------------------------------------------------------------------------------------
// 13) Add a “backspace” button, so the user can undo if they click the wrong number.

// CE and C button                                                                                                        //!DELETE buttons
ce.addEventListener("click", clearEntry);
c.addEventListener("click", clearAll);

// Clearing the last input (CE)                                                                                           //!Clear functions
function clearEntry() {
  input = "";
  updateDisplay();
}

function clearAll() {
  input = "";
  storedValue = undefined;
  signThen = undefined;
  result.textContent = "";
  equation.textContent = "";
  calculationComplete = false;
  updateDisplay();
}

//*--------------------------------------------------------------------------------------------------------------------
//  9)Pressing = before entering all of the numbers or an operator could cause problems!

// Processing of the “=” button for calculation
equal.addEventListener("click", calculateResult); // Added for the “=” button                                                 //! "=" button

// Perform calculation of numbers provided  and update the result of the culculation
function calculateResult() {
  console.log("calculateResult called");
  console.log("storedValue:", storedValue);
  console.log("input:", input);
  console.log("signThen:", signThen);

  // Выполняем вычисление только если оператор и числа определены
  if (signThen && storedValue !== undefined && input) {
    storedValue = operations[signThen](storedValue, parseFloat(input));

    if (storedValue === "ERROR") {
      result.textContent = "ERROR"; // Показываем ошибку
      equation.textContent = ""; //!Clearing the upper display in case of an error
      storedValue = undefined; //! Reset variables
      signThen = undefined; //! Reset variables
      input = ""; //! Reset variables
      calculationComplete = true;
    } else {
      result.textContent = storedValue;
      calculationComplete = true;
    }

    input = "";
    signThen = undefined;

  }
  updateDisplay();
}

//*--------------------------------------------------------------------------------------------------------------------

// Display "equation" Update function
function updateDisplay() {
  equation.textContent = `${storedValue || ""} ${signThen || ""}   ${
    input || ""
  }`;
}

//*--------------------------------------------------------------------------------------------------------------------
