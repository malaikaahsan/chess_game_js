import Board from "./board.js";
let container = document.getElementById("chessboard");
let chessBoard = new Board(container);
chessBoard.createBoard();