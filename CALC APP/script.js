"use strict";

// Selecting elements
const historyValue = document.querySelector("#history-value");
const outputValue = document.querySelector("#output-value");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

//initial variable

let output = "";

// Helper functions

// getFormattedNumber: '9999' -> '9,999'
function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  return new Intl.NumberFormat("en-US").format(num);
}
// reverseNumberFormat: '9,999' -> '9999'
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}
//display num on UI
const displayNum = function (num) {
  // only allow one '.'
  if (output.includes(".") && num == ".") return;
  outputValue.textContent.length < 15 ? (output += num) : null;
  // check if last display input is '.' if yes display it, if No pass output into getFormatted and display it
  output.split("").pop() == "."
    ? (outputValue.textContent = output)
    : (outputValue.textContent = getFormattedNumber(output));
};
// set the current screen back to empty
const clear = function () {
  outputValue.textContent = "";
  historyValue.textContent = "";
};
// Delete function of the Delete button
const backsapce = function () {
  output = reverseNumberFormat(outputValue.innerHTML) + "";
  if (output) {
    output = output.slice(0, -1);
    outputValue.textContent = getFormattedNumber(output);
  }
};
// concat the value in the history screen and curr value on screen and evaluate then display
const evalDisplay = function () {
  // select the history and current screen content
  let history = historyValue.innerHTML;
  let outputCur = outputValue.innerHTML;
  if (outputCur != "" || history != "") {
    outputCur = outputCur == "" ? outputCur : reverseNumberFormat(outputCur);
    history = history + outputCur;
    const result = eval(history);
    outputValue.textContent = getFormattedNumber(result);
    historyValue.textContent = "";
    output = "";
  }
};
//add sysmbol to the curr screen content and display in history
const symbol = function (val) {
  if (!outputValue.innerHTML) {
    return;
  } else {
    historyValue.textContent = outputValue.innerHTML.replace(/,/g, "") + val;
    output += val;
    output = "";
  }
};

const percentage = function () {
  if (!outputValue.innerHTML) {
    return;
  } else {
    let toPerc = parseFloat(outputValue.innerHTML);
    const computation = toPerc / 100;
    outputValue.textContent = computation;
  }
};

// add event handlers
// Operations by mouse clicks
for (const num of numbers) {
  num.addEventListener("click", function () {
    displayNum(num.value);
  });
}

for (const op of operators) {
  op.addEventListener("click", function (e) {
    e.preventDefault();
    // add operator sysmbol to the current text value and display in history
    if (op.value !== "backspace" && op.value !== "clear" && op.value !== "=") {
      symbol(op.value);
    }
    output = "";

    if (this.value == "clear") {
      clear();
    }

    if (this.value == "backspace" && outputValue.innerHTML) {
      backsapce();
    }

    if (this.value == "=") {
      evalDisplay();
    }

    if (this.value == "%") {
      percentage();
    }
  });
}

// Operations by pressing key press

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  // check if pressed key is a number and display on current screen
  const num1to9 = "0123456789.".split("");
  if (num1to9.includes(e.key)) {
    displayNum(e.key);
  }

  if (e.key === "-" || e.key === "+" || e.key === "/" || e.key === "*") {
    symbol(e.key);
  }

  if (e.key == "%") {
    percentage();
    output = "";
  }

  if (e.key == "Escape") {
    clear();
  }
  if (e.key == "Backspace") {
    backsapce();
  }

  if (e.key === "Enter") {
    evalDisplay();
  }
});
