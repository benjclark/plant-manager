function clearCanvas() {
    const canvas = document.querySelector('canvas');
    const canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBed(x, y, w, h) {
    const canvasContext = document.querySelector('canvas').getContext('2d');
    canvasContext.beginPath();
    canvasContext.rect(x, y, w, h);
    canvasContext.closePath();
    canvasContext.fill();
}

function drawPlant(x, y, w, h, fileName) {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = `/${fileName}`;
    image.onload = () => {
        ctx.drawImage(image, x, y, w, h);
    };
}

function drawAll() {
    const pm = window.plantManager;
    const canvas = document.querySelector('canvas');
    const canvasContext = canvas.getContext('2d');
    clearCanvas();
    canvasContext.fillStyle = "#af865d3d";
    drawBed(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pm.beds.length; i++) {
        const b = pm.beds[i];
        canvasContext.fillStyle = b.fill;
        drawBed(b.x, b.y, b.width, b.height);
    }
    for (let i = 0; i < pm.plants.length; i++) {
        const p = pm.plants[i];
        drawPlant(p.x, p.y, p.width, p.height, p.imageFileName);
    }
}

module.exports = {
    clearCanvas,
    drawBed,
    drawAll
};
