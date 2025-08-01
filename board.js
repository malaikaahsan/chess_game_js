import Square from "./square.js"
import { initialPosition, isValidMovePawn, isValidMoveRook, isValidMoveKnight, isValidMoveBishop, isValidMoveQueen, isValidMoveKing, checkMate } from "./utils.js";
import Piece from "./piece.js"
class Board {
    container = null;
    selectedSquare = null;
    squares = {};
    currentTurn = 'white';
    isValid = false;

    constructor(container) {
        this.container = container;
    }
    createBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = new Square(i, j);
                let key = `${i},${j}`;
                this.squares[key] = square;
                this.container.appendChild(square.element);
                if (initialPosition[key]) {
                    let { type, color } = initialPosition[key];
                    let piece = new Piece(type, color);
                    square.piece = piece
                    square.element.appendChild(piece.piece);

                }
                square.element.addEventListener("click", () => {
                    this.handleClick(square);
                })
            }
        }
        console.log(this.squares);

    }


    handleClick(clickedsquare) {

        const clickedDOM = clickedsquare.element;
        if (this.selectedSquare === null) {
            if (clickedsquare.piece) {
                if (clickedsquare.piece.color === this.currentTurn) {
                    this.selectedSquare = clickedsquare;
                    clickedDOM.classList.add("selected");
                }
            }
        }

        else {
            let selectedPiece = this.selectedSquare.piece;

            if (clickedsquare.piece) {
                if (clickedsquare.piece.color === selectedPiece.color) {
                    this.selectedSquare.element.classList.remove('selected');
                    this.selectedSquare = clickedsquare;
                    clickedsquare.element.classList.add('selected');
                    return;
                }
            }



            switch (selectedPiece.type) {
                case 'pawn':
                    this.isValid = isValidMovePawn(this.selectedSquare, clickedsquare);
                    break;
                case 'knight':
                    this.isValid = isValidMoveKnight(this.selectedSquare, clickedsquare);
                    break;
                case 'rook':
                    this.isValid = isValidMoveRook(this.selectedSquare, clickedsquare, this.squares);
                    break;
                case 'bishop':
                    this.isValid = isValidMoveBishop(this.selectedSquare, clickedsquare, this.squares);
                    break;
                case 'queen':
                    this.isValid = isValidMoveQueen(this.selectedSquare, clickedsquare, this.squares);
                    break;
                case 'king':
                    this.isValid = isValidMoveKing(this.selectedSquare, clickedsquare);
                    break;
                default:
                    this.isValid = false;
            }

            if (this.isValid) {
                if (clickedsquare.piece && clickedsquare.piece.color !== selectedPiece.color) {
                    clickedsquare.piece.addCapturedPiece();
                }
                clickedsquare.setPiece(selectedPiece);
                this.selectedSquare.setPiece(null);

                this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
               
                if (checkMate(this, this.currentTurn)) {
                    setTimeout(() => {
                        alert(this.currentTurn + " is in checkmate! Game Over.");
                    }, 1000);
                }

                
            }
            this.selectedSquare.element.classList.remove('selected');
            this.selectedSquare = null;
        }
    }


}

export default Board;