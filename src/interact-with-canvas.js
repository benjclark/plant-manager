const mouseEventHandlers = require('./mouse-event-handlers');
const drawOnCanvas = require('./draw-on-canvas');

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

window.plantManager = {
    canvasOffsetX: canvas.getBoundingClientRect().left,
    canvasOffsetY: canvas.getBoundingClientRect().top,
    rectangles: []
};
const pm = window.plantManager;

canvasContext.fillStyle = "#af865d3d";
canvasContext.fillRect(0,0, canvas.width, canvas.height);

pm.rectangles.push({
    x: 100,
    y: 100,
    width: 160,
    height: 240,
    fill: "#50432a",
    isDragging: false
});

mouseEventHandlers.setupMouseEventVariables();
canvas.onmousedown = mouseEventHandlers.mouseDownHandler;
canvas.onmouseup = mouseEventHandlers.mouseUpHandler;
canvas.onmousemove = mouseEventHandlers.mouseMoveHandler;

drawOnCanvas.drawAll();