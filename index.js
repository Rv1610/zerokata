let boxex = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetButton");
let newButton = document.querySelector("#newGame-button");
let msgContainer = document.querySelector(".winner-msg");
let winnerMsg = document.querySelector(".winner");
let paraMsg = document.querySelector(".autoPara");

let turnO = true; //Player O
let count = 0; // to check draw condition
let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

boxex.forEach((box) => {
  box.addEventListener("click", () => {
    // alert("button clicked!");
    resetButton.innerHTML = "Reset Button";
    if (turnO) {
      box.innerText = "X";
      box.classList.add('boxX');
      box.classList.remove('boxO');
      turnO = false;
    } else {
      box.innerText = "O";
      box.classList.add("boxO");
      box.classList.remove("boxX");
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if(count === 9 && !isWinner){
        gameDraw();
    }
  });
});

const resetGame = () => {
  turnO = true;
  count = 0;
  enaableBoxex();
  msgContainer.classList.add("hide");
  for(let boxs of boxex){
    boxs.classList.add("box");
    boxs.classList.remove("boxX");
    boxs.classList.remove("boxO");
  }
};

const disableBoxex = () => {
  for (let box of boxex) {
    box.disabled = true;
  }
};

const enaableBoxex = () => {
  for (let box of boxex) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

const showWinner = (winner) => {
  winnerMsg.innerHTML = `Hurray!! Winner is ${winner}`;
  paraMsg.innerHTML = "Click on New Game button to start a new game!";

  msgContainer.classList.remove("hide");
  disableBoxex();
  resetButton.innerHTML = "New Game";
};

const gameDraw = () => {
  winnerMsg.innerHTML = "Game is Draw! Both are well played!";
  msgContainer.classList.remove("hide");
  disableBoxex();
  resetButton.innerHTML = "New Game";
};

const checkWinner = () => {
  for (let patterns of winPatterns) {
    let posVal1 = boxex[patterns[0]].innerText;
    let posVal2 = boxex[patterns[1]].innerText;
    let posVal3 = boxex[patterns[2]].innerText;

    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        showWinner(posVal1);
        return true;
      }
    } 
  }
};





resetButton.addEventListener("click", () => {
  let second = 10;
  const time = setInterval(() => {
    paraMsg.innerHTML = `New Game start in ${second}s`;
    second--;
    if (second <= 0) {
      clearInterval(time);
      resetGame();
    }
  }, 1000);
});

