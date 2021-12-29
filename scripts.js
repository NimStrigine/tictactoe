
// Board
const gameBoard = (() => {
  let board = {
    tl: "x",
    tc: "x",
    tr: "x",
    ml: "x",
    mc: "x",
    mr: "o",
    bl: "o",
    bc: "o",
    br: "o",
  }
  let players = [];
  let activePlayer = null;

  // start game
  const startGame = ((player1, player2) => {
    console.log(player1.getName() + player2.getName());
    player1.setMark("X");
    player2.setMark("O");
    console.log(player1.getMark() + " " + player2.getMark());
    players.push(player1);
    players.push(player2);
    for (let space in board) {
      board[space] = "";
    };
    activePlayer = players[0];
    displayRender.render(board);
  });

  // methods
  const switchActivePlayer = (() => {
    activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
  })

  const placeMark = ((square) => {
    if (board[square] === "") {
      board[square] = activePlayer.getMark();
      displayRender.render(board);
      switchActivePlayer();
    }
  });



  return {
    board,
    placeMark: placeMark,
    startGame: startGame
  }
})();

// Display
const displayRender = (() => {

  // cache DOM
  let spaces = document.querySelectorAll(".space");

  // bind events
  spaces.forEach((square) => {
    square.addEventListener("click", () => {gameBoard.placeMark(square.id)});
  });

  // render
  function render(board) {
    for (let space in board) {
      spaces.forEach((square) => {
        if (space === square.id) {
          square.innerText = board[space];
        }
      });
    }
  }

  return {render};

})();

//Players
const Player = (name) => {
  let player = {};
  
  player.name = name;
  player.mark = "";

  player.getName = function() {return this.name};
  player.getMark = function() {return this.mark};
  player.setMark = function(symbol) {
    this.mark = symbol;
  };

  return player;
};


const p1 = Player("John");
console.log(p1.getMark());
p1.setMark("o");
console.log(p1.getMark());
const p2 = Player("Bob");
console.log(p2.getMark());
gameBoard.startGame(p1, p2);