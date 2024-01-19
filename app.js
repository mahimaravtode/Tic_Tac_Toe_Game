let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgCon = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBoxes();
  msgCon.classList.add("hide");
};

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();

      checkWinner();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgCon.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerHTML = `Congratulation, winner is ${winner}`;
  msgCon.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
