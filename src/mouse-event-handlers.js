const drawOnCanvas = require('./draw-on-canvas');

function mouseUpHandler(e) {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables;
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    mouseEventVars.dragok = false;
    for (let i = 0; i < pm.rectangles.length; i++) {
        pm.rectangles[i].isDragging = false;
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

    // test each rect to see if mouse is inside
    mouseEventVars.dragok = false;
    for (let i = 0; i < pm.rectangles.length; i++) {
        const r = pm.rectangles[i];
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
            // if yes, set that rects isDragging=true
            mouseEventVars.dragok = true;
            r.isDragging = true;
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
    if (mouseEventVars.dragok) {
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
    mouseEventVars.dragok = false;
    mouseEventVars.startX = undefined;
    mouseEventVars.startY = undefined;
}

module.exports = {
    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler,
    setupMouseEventVariables
};