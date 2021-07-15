const btnCompute = document.getElementById("btn-compute");
const result = document.getElementById("result");
const resultBox = document.getElementById("result-box");
const inputValues = document.getElementById("values");
const btnReset = document.getElementById("btn-reset");
const lengthField = document.getElementById("length");
const weightField = document.getElementById("weigth");
const turtlesTable = document.getElementById("table-turtles");

const tableHeaderOrder = [
  "id",
  "turtleLength",
  "weight",
  "result",
  "minWeigth",
  "avgWeigth",
  "maxWeigth",
];

const displayLocalStorage = function () {
  let maxId = window.localStorage.getItem("turtlesMaxId");
  for (let i = 1; i <= maxId; i++) {
    const turtle = window.localStorage.getItem("turtle" + i);
    if (turtle) {
      addRow(JSON.parse(turtle));
    }
  }
};

const calculateIndicators = function (turtleLength) {
  return {
    minWeigth: (turtleLength * 0.9).toFixed(3),
    maxWeigth: (turtleLength * 1.1).toFixed(3),
    avgWeigth: turtleLength.toFixed(3),
  };
};

const computeAction = function (event) {
  event.preventDefault();
  btnCompute.disabled = true;
  const turtleLength = Number(lengthField.value);
  const weight = Number(weightField.value);
  const indicators = calculateIndicators(turtleLength);
  if (turtleLength <= 0 || weight <= 0) {
    result.innerHTML = "Please insert positive numbers!";
  } else if (weight < indicators.minWeigth) {
    result.innerHTML = "Underweight";
    result.classList.add("text-danger");
  } else if (weight > indicators.maxWeigth) {
    result.innerHTML = "Overweight";
    result.classList.add("text-danger");
  } else {
    result.innerHTML = "Optimal weight";
    result.classList.add("text-success");
  }
  inputValues.innerHTML = turtleLength + " (cm) | " + weight + " (g)";
  resultBox.classList.remove("invisible");

  indicators.turtleLength = turtleLength;
  indicators.weight = weight;
  indicators.id = getLastTurtleId() + 1;
  indicators.result = result.innerHTML;

  if (turtleLength > 0 && weight > 0) {
    addRow(indicators);
    saveTurtle(indicators);
  }
};

const getLastTurtleId = function () {
  const id = window.localStorage.getItem("turtlesMaxId");
  return Number(id);
};

const saveTurtle = function (turtleIndicators) {
  window.localStorage.setItem(
    "turtle" + turtleIndicators.id,
    JSON.stringify(turtleIndicators)
  );
  window.localStorage.setItem("turtlesMaxId", turtleIndicators.id);
};

const resetAction = function (event) {
  event.preventDefault();
  btnCompute.disabled = false;
  lengthField.value = "";
  weightField.value = "";
  resultBox.classList.add("invisible");
  result.classList.remove("text-danger", "text-success");
};

const addRow = function (turtleIndicators) {
  let newRow = turtlesTable.insertRow(-1);
  newRow.id = "table-row-" + turtleIndicators.id;
  tableHeaderOrder.map((column) => {
    let newCell = newRow.insertCell(tableHeaderOrder.indexOf(column));
    if (column === "result") {
      if (turtleIndicators.result === "Optimal weight") {
        newCell.classList.add("text-success");
      } else {
        newCell.classList.add("text-danger");
      }
    }
    let newContent = document.createTextNode(turtleIndicators[column]);
    newCell.appendChild(newContent);
  });
  let newCell = newRow.insertCell(turtleIndicators.length);
  let newContent = document.createElement("i");
  newContent.id = "turtle" + turtleIndicators.id;
  newContent.classList.add("bi", "bi-trash", "btn-red");
  newCell.appendChild(newContent);
};

const removeRow = function (event) {
  if (
    !(
      event.target &&
      event.target.classList.contains("bi-trash") &&
      event.target.classList.contains("btn-red")
    )
  ) {
    return;
  }
  const row = event.target.parentNode.parentNode;
  row.parentNode.removeChild(row);
  window.localStorage.removeItem(event.target.id);
};

document.addEventListener("click", removeRow);
btnCompute.addEventListener("click", computeAction);
btnReset.addEventListener("click", resetAction);

displayLocalStorage();
