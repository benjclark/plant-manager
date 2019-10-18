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
