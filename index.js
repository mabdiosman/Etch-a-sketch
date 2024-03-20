const grid = document.querySelector(".grid-container");
const colorInput = document.querySelector("input[type=color]");
const buttons = document.querySelectorAll("button");
let gridNumber = 16;
let row;
function createGrid(size) {
  grid.innerHTML = "";
  for (let i = 0; i < size; i++) {
    row = document.createElement("div");
    row.classList.add("row");
    row.setAttribute("draggable", "false");
    grid.appendChild(row);
    for (let j = 0; j < size; j++) {
      box = document.createElement("div");
      box.classList.add("box");
      box.setAttribute("draggable", "false");
      row.appendChild(box);
    }
  }

  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.addEventListener("mouseover", (e) => {
      if (mode === "default") {
        box.style.backgroundColor = "#333";
      } else if (mode === "random") {
        box.style.backgroundColor = `rgb(${randomRgb().join(",")})`;
      } else if (mode === "eraser") {
        box.style.backgroundColor = "#fff";
      } else if (mode === "color") {
        box.style.backgroundColor = inputVal;
      }
    });
  });
}

createGrid(gridNumber);

// Resize grid
const sizeInput = document.querySelector("input[type=range]");
const sizeInputLabel = document.querySelector("label");
sizeInput.value = size;
sizeInput.addEventListener("input", () => {
  sizeInputLabel.textContent = `${sizeInput.value}x${sizeInput.value}`;
});

sizeInput.addEventListener("change", () => {
  createGrid(sizeInput.value);
});

let mode = "default";
let mouseDown;
grid.addEventListener("mousedown", () => {
  mouseDown = true;
});

grid.addEventListener("mouseup", () => {
  mouseDown = false;
});
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const activeButton = document.querySelector("button#active");
    if (activeButton) {
      activeButton.removeAttribute("id");
    }
    if (e.target.classList.contains("default")) {
      mode = "default";
    } else if (e.target.classList.contains("random")) {
      mode = "random";
    } else if (e.target.classList.contains("eraser")) {
      mode = "eraser";
    } else if (e.target.classList.contains("reset")) {
      resetBoxBg();
    }
  });
});

let inputVal;
colorInput.addEventListener("input", (e) => {
  inputVal = colorInput.value;
  mode = "color";
});

function randomInteger(num) {
  return Math.floor(Math.random() * num);
}

function randomRgb() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return [r, g, b];
}

function resetBoxBg() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => (box.style.backgroundColor = ""));
}
