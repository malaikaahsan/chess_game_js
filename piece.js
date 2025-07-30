class Piece {
    type = null;
    color = null;
    piece = null;
    pieceHtml = null

    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.piece = this.showPiece();
    }
    showPiece() {
        let image = document.createElement("img");
        image.src = `chesspieces/${this.color}_${this.type}.png`
        image.classList.add("chesspiece");
        this.pieceHtml = image
        return image;
    }
    addCapturedPiece() {
        let capturedZoneId = this.color === 'white' ? 'captured-white' : 'captured-black';
        let container = document.getElementById(capturedZoneId);

        const img = document.createElement('img');
        img.classList.add('captured-piece');
        img.src = `chesspieces/${this.color}_${this.type}.png`;


        container.appendChild(img);
    }


}
export default Piece;