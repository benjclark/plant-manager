(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
const mouseEventHandlers = require('./mouse-event-handlers');
const drawOnCanvas = require('./draw-on-canvas');

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

function renderCurrentlySelectedRect() {
    const currentSelected = window.plantManager.mouseEventVariables.currentRectSelected;
    if (!currentSelected) {
        return;
    }

    const updateBedForm = document.querySelector('form[data-update-bed]');
    const name = currentSelected.name;
    const width = currentSelected.width;
    const height = currentSelected.height;
    const fill = currentSelected.fill;

    updateBedForm.querySelector('[data-bed-name]').value = name;
    updateBedForm.querySelector('[data-bed-width]').value = width;
    updateBedForm.querySelector('[data-bed-height]').value = height;
    updateBedForm.querySelector('[data-bed-colour]').value = fill;
}

window.plantManager = {
    canvasOffsetX: canvas.getBoundingClientRect().left,
    canvasOffsetY: canvas.getBoundingClientRect().top,
    rectangles: [],
    renderCurrentlySelectedRect: renderCurrentlySelectedRect
};
const pm = window.plantManager;

canvasContext.fillStyle = "#af865d3d";
canvasContext.fillRect(0,0, canvas.width, canvas.height);

mouseEventHandlers.setupMouseEventVariables();
canvas.onmousedown = mouseEventHandlers.mouseDownHandler;
canvas.onmouseup = mouseEventHandlers.mouseUpHandler;
canvas.onmousemove = mouseEventHandlers.mouseMoveHandler;

drawOnCanvas.drawAll();
pm.drawAll = drawOnCanvas.drawAll;
},{"./draw-on-canvas":1,"./mouse-event-handlers":3}],3:[function(require,module,exports){
const drawOnCanvas = require('./draw-on-canvas');

function mouseUpHandler(e) {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables;
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    mouseEventVars.somethingIsBeingDragged = false;

    for (let z = 0; z < pm.rectangles.length; z++) {
        pm.rectangles[z].isDragging = false;
    }
}

function mouseDownHandler(e) {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables;
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    const mx = parseInt(e.clientX - pm.canvasOffsetX);
    const my = parseInt(e.clientY - pm.canvasOffsetY);

    // clear all the dragging flags
    mouseEventVars.somethingIsBeingDragged = false;

    // test each rect to see if mouse is inside
    for (let i = (pm.rectangles.length - 1); i >= 0; i--) {
        const r = pm.rectangles[i];
        if (mx > parseInt(r.x, 10) && mx < parseInt(r.x, 10) + parseInt(r.width, 10) && my > parseInt(r.y, 10) && my < parseInt(r.y, 10) + parseInt(r.height, 10)) {
            // if yes, set that rects isDragging=true
            mouseEventVars.somethingIsBeingDragged = true;
            mouseEventVars.currentRectSelected = r;
            console.log(mouseEventVars.currentRectSelected);
            r.isDragging = true;
            pm.renderCurrentlySelectedRect();
            break;
        }
    }
    // save the current mouse position
    mouseEventVars.startX = mx;
    mouseEventVars.startY = my;
}

function mouseMoveHandler(e) {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables;
    // if we're dragging anything...
    if (mouseEventVars.somethingIsBeingDragged) {
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        const mx = parseInt(e.clientX - pm.canvasOffsetX);
        const my = parseInt(e.clientY - pm.canvasOffsetY);

        // calculate the distance the mouse has moved
        // since the last mousemove
        const dx = mx - mouseEventVars.startX;
        const dy = my - mouseEventVars.startY;

        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove
        for (let i = 0; i < pm.rectangles.length; i++) {
            const r = pm.rectangles[i];
            if (r.isDragging) {
                r.x += dx;
                r.y += dy;
            }
        }

        // redraw the scene with the new rect positions
        drawOnCanvas.drawAll();

        // reset the starting mouse position for the next mousemove
        mouseEventVars.startX = mx;
        mouseEventVars.startY = my;
    }
}

function setupMouseEventVariables() {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables = {};
    mouseEventVars.somethingIsBeingDragged = false;
    mouseEventVars.currentRectSelected = undefined;
    mouseEventVars.startX = undefined;
    mouseEventVars.startY = undefined;
}

module.exports = {
    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler,
    setupMouseEventVariables
};
},{"./draw-on-canvas":1}]},{},[2])

//# sourceMappingURL=interact-with-canvas.js.map
