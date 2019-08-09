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
            r.isDragging = true;
            pm.renderEditBedFormForCurrentlySelectedRect();
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