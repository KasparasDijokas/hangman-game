const svgFigures = document.querySelectorAll(".body-part");
const wrongLettersContainer = document.getElementById("wrong-letters");
const wrongSpan = document.getElementById("wrong");
const wordEl = document.getElementById("word");
const modal = document.getElementById("modal");
const message = document.getElementById("message");
const modalText = document.querySelector(".modal-text");
const modalBtn = document.querySelector(".play-again");
let figuresNumber = svgFigures.length;

let wrongLetters = [];
let correctLetters = [];
const words = [
  "programming",
  "laravel",
  "magic",
  "dragon",
  "argentina",
  "javascript",
];
let randomWord = words[Math.floor(Math.random() * words.length)];

function generateWord() {
  // const arr = randomWord.split("");
  // arr.map(letter => {
  //     if (correctLetters.includes(letter)) {
  //         const span = document.createElement('span');
  //         span.innerHTML = `${letter}`;
  //         wordEl.appendChild(span);
  //     } else {
  //         const span = document.createElement('span');
  //         span.innerHTML = '';
  //         wordEl.appendChild(span);
  //     }
  // });

  wordEl.innerHTML = randomWord
    .split("")
    .map(
      (letter) =>
        `<span> ${correctLetters.includes(letter) ? letter : ""} </span>`
    )
    .join("");

  const innerWord = wordEl.innerText.replace(/\s/g, "");
  if (innerWord == randomWord) {
    modalText.innerHTML = "You won!";
    wrongSpan.innerHTML = "";
    svgFigures.forEach((item) => item.classList.remove("show"));
    popup();
  }
}

function updateUI() {
  const span = document.createElement("span");
  span.innerHTML = `${wrongLetters[wrongLetters.length - 1]}`;
  wrongSpan.append(span);

  figuresNumber--;
  svgFigures[wrongLetters.length - 1].classList.add("show");

  console.log(figuresNumber);

  if (figuresNumber == 0) {
    modalText.innerHTML = "You lost!";
    wrongSpan.innerHTML = "";
    svgFigures.forEach((item) => item.classList.remove("show"));
    figuresNumber = svgFigures.length;
    popup();
  }
}

function popup(message) {
  modal.classList.add("show");
}

function bottomMessage() {
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 1500);
}

modalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  randomWord = words[Math.floor(Math.random() * words.length)];
  correctLetters.splice(0);
  wrongLetters.splice(0);
  generateWord();
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (correctLetters.includes(e.key) || wrongLetters.includes(e.key)) {
      bottomMessage();
    } else if (randomWord.includes(e.key)) {
      correctLetters.push(e.key);
      generateWord();
    } else {
      wrongLetters.push(e.key);
      updateUI();
    }
  }
});

generateWord();
