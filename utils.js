export let initialPosition = {
    '0,0': { type: 'rook', color: 'black' },
    '0,1': { type: 'knight', color: 'black' },
    '0,2': { type: 'bishop', color: 'black' },
    '0,3': { type: 'queen', color: 'black' },
    '0,4': { type: 'king', color: 'black' },
    '0,5': { type: 'bishop', color: 'black' },
    '0,6': { type: 'knight', color: 'black' },
    '0,7': { type: 'rook', color: 'black' },

    '1,0': { type: 'pawn', color: 'black' },
    '1,1': { type: 'pawn', color: 'black' },
    '1,2': { type: 'pawn', color: 'black' },
    '1,3': { type: 'pawn', color: 'black' },
    '1,4': { type: 'pawn', color: 'black' },
    '1,5': { type: 'pawn', color: 'black' },
    '1,6': { type: 'pawn', color: 'black' },
    '1,7': { type: 'pawn', color: 'black' },


    '6,0': { type: 'pawn', color: 'white' },
    '6,1': { type: 'pawn', color: 'white' },
    '6,2': { type: 'pawn', color: 'white' },
    '6,3': { type: 'pawn', color: 'white' },
    '6,4': { type: 'pawn', color: 'white' },
    '6,5': { type: 'pawn', color: 'white' },
    '6,6': { type: 'pawn', color: 'white' },
    '6,7': { type: 'pawn', color: 'white' },

    '7,0': { type: 'rook', color: 'white' },
    '7,1': { type: 'knight', color: 'white' },
    '7,2': { type: 'bishop', color: 'white' },
    '7,3': { type: 'queen', color: 'white' },
    '7,4': { type: 'king', color: 'white' },
    '7,5': { type: 'bishop', color: 'white' },
    '7,6': { type: 'knight', color: 'white' },
    '7,7': { type: 'rook', color: 'white' },

};



export function isValidMovePawn(fromsquare, tosquare) {
    let piece = fromsquare.piece;

    let dx = tosquare.col - fromsquare.col;
    let dy = tosquare.row - fromsquare.row;
    let dir;
    if (piece.color === 'white') {
        dir = -1;
    } else {
        dir = 1;
    }
    // one step
    if (dx === 0) {
        if (dy === dir) {
            if (tosquare.piece === null) {
                return true;
            }
        }
    }
    // first step
    let WPawnStart = piece.color === 'white' && fromsquare.row === 6;
    let BPawnStart = piece.color === 'black' && fromsquare.row === 1;

    if (dx === 0) {
        if (dy === 2 * dir) {
            if (WPawnStart || BPawnStart) {
                if (tosquare.piece === null) {
                    return true;
                }
            }
        }
    }

    if (Math.abs(dx) === 1) {
        if (dy === dir && tosquare.piece) {
            return true;
        }
    }
    return false;
}


export function isValidMoveKnight(fromsquare, tosquare) {

    let dx = Math.abs(tosquare.col - fromsquare.col);
    let dy = Math.abs(tosquare.row - fromsquare.row);

    if ((dx === 1 && dy === 2)) {
        return true;
    }
    if ((dx === 2 && dy === 1)) {
        return true;
    }
    return false;

}



export function isValidMoveRook(fromsquare, tosquare, squares) {
    let piece = fromsquare.piece;

    let dx = tosquare.col - fromsquare.col;
    let dy = tosquare.row - fromsquare.row;

    if (dx !== 0 && dy !== 0) {
        return false;
    }

    if (!isPathClear(fromsquare, tosquare, squares)) {
        return false;
    }

    let dest = tosquare.piece;

    if (!dest || dest.color !== piece.color) {
        return true;
    }

    return false;
}


export function isValidMoveBishop(fromsquare, tosquare, squares) {
    let piece = fromsquare.piece;

    let dx = Math.abs(tosquare.col - fromsquare.col);
    let dy = Math.abs(tosquare.row - fromsquare.row);

    if (dx !== dy) {
        return false;
    }

    if (!isPathClear(fromsquare, tosquare, squares)) {
        return false;
    }

    const dest = tosquare.piece;
    if (!dest || dest.color !== piece.color) {
        return true;
    }
    return false;

}


export function isValidMoveQueen(fromsquare, tosquare, squares) {
    const piece = fromsquare.piece;

    const dx = Math.abs(tosquare.col - fromsquare.col);
    const dy = Math.abs(tosquare.row - fromsquare.row);

    if (dx === 0 || dy === 0) {

        if (!isPathClear(fromsquare, tosquare, squares)) {
            return false;
        }
        const dest = tosquare.piece;

        if (!dest || dest.color !== piece.color) {
            return true;
        }
        return false;
    }

    if (dx === dy) {
        if (!isPathClear(fromsquare, tosquare, squares)) {
            return false;
        }

        const dest = tosquare.piece;
        if (!dest || dest.color !== piece.color) {
            return true;
        }
        return false;
    }

    return false;

}



export function isValidMoveKing(fromsquare, tosquare) {
    let dest = tosquare.piece;
    let dx = Math.abs(tosquare.col - fromsquare.col);
    let dy = Math.abs(tosquare.row - fromsquare.row);

    if (dx <= 1 && dy <= 1) {
        if (dest && dest.type === 'king') {
            return false;
        }
        if (!dest) {
            return true;
        }
        return true;
    }
    return false;
}



export function isPathClear(fromsquare, tosquare, squares) {
    let dx = 0;
    let dy = 0;

    if (tosquare.col > fromsquare.col) {
        dx = 1;
    } else if (tosquare.col < fromsquare.col) {
        dx = -1;
    }

    if (tosquare.row > fromsquare.row) {
        dy = 1;
    } else if (tosquare.row < fromsquare.row) {
        dy = -1;
    }

    let col = fromsquare.col + dx;
    let row = fromsquare.row + dy;


    while (col !== tosquare.col || row !== tosquare.row) {
        const key = `${row},${col}`;
        if (squares[key] && squares[key].piece) {
            return false;
        }
        col += dx;
        row += dy;
    }

    return true;
}



export function kingUnderAttack(board, color, king) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let key = `${i},${j}`;
            let attackerSquare = board.squares[key]
            let attacker = attackerSquare.piece
            if (!attacker || attacker.color === color) {
                continue
            }
            let isValid = false;
            // console.log(attacker);
            switch (attacker.type) {
                case 'pawn':
                    isValid = isValidMovePawn(attackerSquare, king);
                    break;
                case 'knight':
                    isValid = isValidMoveKnight(attackerSquare, king);
                    break;
                case 'rook':
                    isValid = isValidMoveRook(attackerSquare, king, board.squares);
                    break;
                case 'bishop':
                    isValid = isValidMoveBishop(attackerSquare, king, board.squares);
                    break;
                case 'queen':
                    isValid = isValidMoveQueen(attackerSquare, king, board.squares);
                    break;
                case 'king':
                    isValid = isValidMoveKing(attackerSquare, king);
                    break;
                default:
                    isValid = false;
            }
            if (isValid) {
                return true
            }
        }
    }
    return false
}


export function checkMate(board, color) {
    let king = null;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let key = `${i},${j}`;
            let square = board.squares[key];
            let piece = square.piece;
            if (piece && piece.type === 'king' && piece.color === color) {
                king = square;
                break
            }
        }
    }

    let inCheck = kingUnderAttack(board, color, king)
    if (!inCheck) {
        return false
    }


    let canHelp = piecesSavesKing(board, color, king)
    if (canHelp) {
        return false
    }

    return true;
}

function piecesSavesKing(board, color, king) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let fromKey = `${i},${j}`
            let fromSquare = board.squares[fromKey]
            let piece = fromSquare.piece

            if (!piece || piece.color !== color || piece.type === 'king') continue
            // console.log(piece)

            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    let toKey = `${x},${y}`
                    let toSquare = board.squares[toKey]
                    if (toSquare.piece && toSquare.piece.color === color) continue
                    // console.log(toSquare.piece)

                    let valid = false
                    switch (piece.type) {
                        case 'pawn':
                            valid = isValidMovePawn(fromSquare, toSquare);
                            break;
                        case 'rook':
                            valid = isValidMoveRook(fromSquare, toSquare, board.squares);
                            break;
                        case 'knight':
                            valid = isValidMoveKnight(fromSquare, toSquare);
                            break;
                        case 'bishop':
                            valid = isValidMoveBishop(fromSquare, toSquare, board.squares);
                            break;
                        case 'queen':
                            valid = isValidMoveQueen(fromSquare, toSquare, board.squares);
                            break;
                    }

                    if (valid) {
                        let originalPiece = toSquare.piece;
                        toSquare.piece = piece;
                        fromSquare.piece = null;

                        let stillCheck = kingUnderAttack(board, color, king);

                        fromSquare.piece = piece;
                        toSquare.piece = originalPiece;

                        if (!stillCheck) {
                            return true;
                        }

                    }
                }
            }
        }
    }
    return false;
}


