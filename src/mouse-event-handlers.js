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
            // pm.renderEditFormForCurrentlySelectedPlant();   <--- TODO
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
