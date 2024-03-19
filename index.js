const grid = document.querySelector(".grid");
const colorInput = document.querySelector("input[type=color]");
const buttons = document.querySelectorAll("button");

// Create elements inside grid
let createdEl;
for (let i = 0; i <= 80; i++) {
  createdEl = document.createElement("div");
  createdEl.classList.add("box");
  createdEl.style.minWidth = "40px";
  createdEl.style.minHeight = "40px";
  grid.appendChild(createdEl);
}

// Get individual grid elements
const boxes = document.querySelectorAll(".box");

// coloring modes
let mode = "default";

// Change modes depending on which button is clicked
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

// Get slider value
let inputVal;
colorInput.addEventListener("input", (e) => {
  inputVal = colorInput.value;
  mode = "color";
});

// Set grid element's background depending on mode
boxes.forEach((box) => {
  box.addEventListener("mouseover", (e) => {
    if (mode === "default") {
      box.style.backgroundColor = "#333";
    } else if (mode === "random") {
      box.style.backgroundColor = `rgb(${randomRgb().join(",")})`;
    } else if (mode === "eraser") {
      box.style.backgroundColor = "#fff";
    }
  });
});

// Generate a random color to use as grid element background
function randomInteger(num) {
  return Math.floor(Math.random() * num);
}

function randomRgb() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return [r, g, b];
}

// Reset grid element background
function resetBoxBg() {
  boxes.forEach((box) => (box.style.backgroundColor = "transparent"));
}
