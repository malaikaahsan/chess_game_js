class Square {
    piece = null;
    row = null;
    col = null;
    color = null;
    element = null;

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.color = (row + col) % 2 === 0 ? 'light' : 'dark';
        this.element = this.createElement();
    }
    createElement() {
        const div = document.createElement("div");
        div.classList.add("square", this.color, this.row, this.col);
        return div;
    }
    setPiece(piece) {
        this.piece = piece;
        this.element.innerHTML = '';
        if (piece) {
            this.element.appendChild(piece.piece);
        }
    }
}
export default Square;
