const mouseEventHandlers = require('./mouse-event-handlers');
const drawOnCanvas = require('./draw-on-canvas');

const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

function renderEditBedFormForCurrentlySelectedRect() {
    const currentSelected = window.plantManager.mouseEventVariables.currentRectSelected;
    if (!currentSelected) {
        return;
    }

    const updateBedForm = document.querySelector('form[data-update-bed]');
    const name = currentSelected.name;
    const width = currentSelected.width;
    const height = currentSelected.height;
    const fill = currentSelected.fill;
    const soilCharacteristics = currentSelected.soil_characteristics;
    const type = currentSelected.bed_type;


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
    rectangles: [],
    renderEditBedFormForCurrentlySelectedRect: renderEditBedFormForCurrentlySelectedRect
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