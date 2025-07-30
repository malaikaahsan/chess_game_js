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
        if (dy === dir) {
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



export function isValidMoveRook(fromsquare, tosquare) { }
export function isValidMoveBishop(fromsquare, tosquare) { }
export function isValidMoveQueen(fromsquare, tosquare) { }



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
