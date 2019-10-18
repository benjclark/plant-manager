(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
const mouseEventHandlers = require('./mouse-event-handlers');
const drawOnCanvas = require('./draw-on-canvas');

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

function detectIfPlantIsInABed() {
    const currentSelected = window.plantManager.mouseEventVariables.currentRectSelected;
    if (!currentSelected) {
        return;
    }
    // make sure it is a plant and not a bed
    if (currentSelected.bedType) {
        return;
    }

    const plant_x = currentSelected.x;
    const plant_y = currentSelected.y;

    const pm = window.plantManager;
    for (let i = (pm.beds.length - 1); i >= 0; i--) {
        const b = pm.beds[i];
        if (plant_x > parseInt(b.x, 10) && plant_x < parseInt(b.x, 10) + parseInt(b.width, 10) && plant_y > parseInt(b.y, 10) && plant_y < parseInt(b.y, 10) + parseInt(b.height, 10)) {
            // if yes, set that rects isDragging=true
            return b.name
        }
    }
    return false;
}

function renderEditFormForCurrentlySelectedPlant() {
    const currentSelected = window.plantManager.mouseEventVariables.currentRectSelected;
    if (!currentSelected) {
        return;
    }

    const currentBed = detectIfPlantIsInABed();

    const updateBedForm = document.querySelector('form[data-update-plant]');
    const name = currentSelected.name;
    const bed = currentBed;
    currentSelected.bed = currentBed;
    const type = currentSelected.type;
    const datePlanted = currentSelected.datePlanted;
    const lastCrop = currentSelected.lastCrop;
    const nextCrop = currentSelected.nextCrop;

    updateBedForm.querySelector('[data-plant-name]').value = name;
    updateBedForm.querySelector('[data-plant-bed]').value = bed;
    updateBedForm.querySelector('[data-plant-type]').value = type;
    updateBedForm.querySelector('[data-plant-date-planted]').value = datePlanted;
    updateBedForm.querySelector('[data-plant-last-crop]').value = lastCrop;
    updateBedForm.querySelector('[data-plant-next-crop]').value = nextCrop;


}

function renderEditFormForCurrentlySelectedBed() {
    const currentSelected = window.plantManager.mouseEventVariables.currentRectSelected;
    if (!currentSelected) {
        return;
    }

    const updateBedForm = document.querySelector('form[data-update-bed]');
    const name = currentSelected.name;
    const width = currentSelected.width;
    const height = currentSelected.height;
    const fill = currentSelected.fill;
    const soilCharacteristics = currentSelected.soilCharacteristics;
    const type = currentSelected.bedType;

    updateBedForm.querySelector('[data-bed-name]').value = name;
    updateBedForm.querySelector('[data-bed-width]').value = width;
    updateBedForm.querySelector('[data-bed-height]').value = height;
    updateBedForm.querySelector('[data-bed-colour]').value = fill;
    updateBedForm.querySelector('[data-bed-soil-characteristics]').value = soilCharacteristics;
    updateBedForm.querySelector('[data-bed-type]').value = type;
}

window.plantManager = {
    canvasOffsetX: canvas.getBoundingClientRect().left,
    canvasOffsetY: canvas.getBoundingClientRect().top,
    beds: [],
    plants: [],
    renderEditFormForCurrentlySelectedBed: renderEditFormForCurrentlySelectedBed,
    renderEditFormForCurrentlySelectedPlant: renderEditFormForCurrentlySelectedPlant
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

    for (let z = 0; z < pm.beds.length; z++) {
        pm.beds[z].isDragging = false;
    }
    for (let z = 0; z < pm.plants.length; z++) {
        pm.plants[z].isDragging = false;
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
    for (let i = (pm.beds.length - 1); i >= 0; i--) {
        const b = pm.beds[i];
        if (mx > parseInt(b.x, 10) && mx < parseInt(b.x, 10) + parseInt(b.width, 10) && my > parseInt(b.y, 10) && my < parseInt(b.y, 10) + parseInt(b.height, 10)) {
            // if yes, set that rects isDragging=true
            mouseEventVars.somethingIsBeingDragged = true;
            mouseEventVars.currentRectSelected = b;
            b.isDragging = true;
            pm.renderEditFormForCurrentlySelectedBed();
            break;
        }
    }
    for (let i = (pm.plants.length - 1); i >= 0; i--) {
        const p = pm.plants[i];
        if (mx > parseInt(p.x, 10) && mx < parseInt(p.x, 10) + parseInt(p.width, 10) && my > parseInt(p.y, 10) && my < parseInt(p.y, 10) + parseInt(p.height, 10)) {
            // if yes, set that rects isDragging=true
            mouseEventVars.somethingIsBeingDragged = true;
            mouseEventVars.currentRectSelected = p;
            p.isDragging = true;
            pm.renderEditFormForCurrentlySelectedPlant();
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
        for (let i = 0; i < pm.beds.length; i++) {
            const b = pm.beds[i];
            if (b.isDragging) {
                b.x += dx;
                b.y += dy;
            }
        }

        for (let i = 0; i < pm.plants.length; i++) {
            const p = pm.plants[i];
            if (p.isDragging) {
                p.x += dx;
                p.y += dy;
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
