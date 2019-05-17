function clearCanvas() {
    const canvas = document.querySelector('canvas');
    const canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function drawRectangle(x, y, w, h) {
    const canvasContext = document.querySelector('canvas').getContext('2d');
    canvasContext.beginPath();
    canvasContext.rect(x, y, w, h);
    canvasContext.closePath();
    canvasContext.fill();
}

function drawAll() {
    const pm = window.plantManager;
    const canvas = document.querySelector('canvas');
    const canvasContext = canvas.getContext('2d');
    clearCanvas();
    canvasContext.fillStyle = "#af865d3d";
    drawRectangle(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pm.rectangles.length; i++) {
        const r = pm.rectangles[i];
        canvasContext.fillStyle = r.fill;
        drawRectangle(r.x, r.y, r.width, r.height);
    }
}

module.exports = {
    clearCanvas,
    drawRectangle,
    drawAll
};