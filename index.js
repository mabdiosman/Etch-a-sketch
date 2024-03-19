const grid = document.querySelector(".grid");
const colorInput = document.querySelector("input[type=color]");
const buttons = document.querySelectorAll("button");

let createdEl;
for (let i = 0; i <= 80; i++) {
  createdEl = document.createElement("div");
  createdEl.classList.add("box");
  createdEl.style.minWidth = "40px";
  createdEl.style.minHeight = "40px";
  grid.appendChild(createdEl);
}

let mode = "default";

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
  boxes.forEach((box) => (box.style.backgroundColor = "transparent"));
}
