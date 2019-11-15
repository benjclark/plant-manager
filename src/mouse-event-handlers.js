const drawOnCanvas = require('./draw-on-canvas');

function mouseUpHandler(e) {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables;
    e.preventDefault();
    e.stopPropagation();

    mouseEventVars.somethingIsBeingDragged = false;

    for (let z = 0; z < pm.beds.length; z++) {
        pm.beds[z].isDragging = false;
    }
    for (let z = 0; z < pm.plants.length; z++) {
        pm.plants[z].isDragging = false;
    }
}

function dragIfClicked(rects, pm, mx, my, mouseEventVars) {
    for (let i = (rects.length - 1); i >= 0; i--) {
        const rect = rects[i];
        if (mx > parseInt(rect.x, 10) && mx < parseInt(rect.x, 10) + parseInt(rect.width, 10) && my > parseInt(rect.y, 10) && my < parseInt(rect.y, 10) + parseInt(rect.height, 10)) {
            mouseEventVars.somethingIsBeingDragged = true;
            mouseEventVars.currentRectSelected = rect;
            rect.isDragging = true;
            pm.renderEditFormForCurrentlySelectedBed();
            return;
        }
    }
}

function mouseDownHandler(e) {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables;
    e.preventDefault();
    e.stopPropagation();

    const mx = parseInt(e.clientX - pm.canvasOffsetX);
    const my = parseInt(e.clientY - pm.canvasOffsetY);

    mouseEventVars.somethingIsBeingDragged = false;

    const shouldMoveBedsWithPlants = window.plantManager.mouseEventVariables.movePlantsWithBedState;
    console.log(shouldMoveBedsWithPlants);

    if (shouldMoveBedsWithPlants) {
        dragIfClicked(pm.beds, pm, mx, my, mouseEventVars);
        const bedName = mouseEventVars.currentRectSelected.name;

        for (let i = 0; i < pm.plants.length; i++) {
            if (pm.plants[i].bed === bedName) {
                pm.plants[i].isDragging = true;
                console.log(pm.plants[i]);
            }
        }
    } else {
        dragIfClicked(pm.plants, pm, mx, my, mouseEventVars);
        if (mouseEventVars.somethingIsBeingDragged === false) {
            dragIfClicked(pm.beds, pm, mx, my, mouseEventVars);
        }
    }

    mouseEventVars.startX = mx;
    mouseEventVars.startY = my;
}

function mouseMoveHandler(e) {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables;
    if (mouseEventVars.somethingIsBeingDragged) {
        e.preventDefault();
        e.stopPropagation();

        const mx = parseInt(e.clientX - pm.canvasOffsetX);
        const my = parseInt(e.clientY - pm.canvasOffsetY);

        const dx = mx - mouseEventVars.startX;
        const dy = my - mouseEventVars.startY;

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

        drawOnCanvas.drawAll();

        mouseEventVars.startX = mx;
        mouseEventVars.startY = my;
    }
}

function setupMouseEventVariables() {
    const pm = window.plantManager;
    pm.mouseEventVariables = {};
    pm.mouseEventVariables.somethingIsBeingDragged = false;
    pm.mouseEventVariables.currentRectSelected = undefined;
    pm.mouseEventVariables.startX = undefined;
    pm.mouseEventVariables.startY = undefined;
    pm.mouseEventVariables.movePlantsWithBedState = undefined;
}

module.exports = {
    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler,
    setupMouseEventVariables
};
