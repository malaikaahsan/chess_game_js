import Square from "./square.js"
import { initialPosition, isValidMovePawn, isValidMoveRook, isValidMoveKnight, isValidMoveBishop, isValidMoveQueen, isValidMoveKing } from "./utils.js";
import Piece from "./piece.js"
class Board {
    container = null;
    selectedSquare = null;
    squares = {};
    currentTurn = 'white';

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
                    this.highlightMoves(clickedsquare);
                }
            }
        }

        else {
            let selectedPiece = this.selectedSquare.piece;

            if (clickedsquare.piece) {
                if (clickedsquare.piece.color === selectedPiece.color) {
                    this.clearHighlights();
                    this.selectedSquare.element.classList.remove('selected');
                    this.selectedSquare = clickedsquare;
                    clickedsquare.element.classList.add('selected');
                    this.highlightMoves(clickedsquare);
                    return;
                }
                else {
                    clickedsquare.piece.addCapturedPiece();
                }
            }

            let isValid = false;

            switch (selectedPiece.type) {
                case 'pawn':
                    isValid = isValidMovePawn(this.selectedSquare, clickedsquare);
                    break;
                case 'knight':
                    isValid = isValidMoveKnight(this.selectedSquare, clickedsquare);
                    break;
                case 'rook':
                    isValid = isValidMoveRook(this.selectedSquare, clickedsquare);
                    break;
                case 'bishop':
                    isValid = isValidMoveBishop(this.selectedSquare, clickedsquare);
                    break;
                case 'queen':
                    isValid = isValidMoveQueen(this.selectedSquare, clickedsquare);
                    break;
                case 'king':
                    isValid = isValidMoveKing(this.selectedSquare, clickedsquare);
                    break;
                default:
                    isValid = false;
            }

            if (isValid) {
                clickedsquare.setPiece(selectedPiece);
                this.selectedSquare.setPiece(null);
                this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
            }

            this.clearHighlights();
            this.selectedSquare.element.classList.remove('selected');
            this.selectedSquare = null;
        }
    }




    highlightMoves() {

    }
    clearHighlights() {

    }


}

export default Board;