const drawOnCanvas = require('./draw-on-canvas');

function mouseUpHandler(e) {
    const pm = window.plantManager;
    const mouseEventVars = pm.mouseEventVariables;
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    mouseEventVars.dragok = false;

    for (let z = 0; z < pm.rectangles.length; z++) {
        pm.rectangles[z].isDragging = false;
    }

    // for (let i = 0; i < pm.rectangles.length; i++) {
    //     const r = pm.rectangles[i];
    //     const bed_name = r.name;
    //     const bed_x = r.x;
    //     const bed_y = r.y;
    //     console.log({bed_name, bed_x, bed_y});
    //     post('/updateRecPosition', {bed_name, bed_x, bed_y});
    // }
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
        if ((mx > r.x) && (mx < (r.x + r.width)) && (my > r.y) && (my < (r.y + r.height))) {
            // if yes, set that rects isDragging=true
            console.log('rec just started dragging  ', r);
            console.log((mx > r.x) +"  "+ (mx < (r.x + r.width) +"  "+ (my > r.y) +"  "+ (my < (r.y + r.height)));
            console.log("rec " + r.name + " - mouse x position " + mx + " is greater than rectangle x " + r.x);
            console.log("rec " + r.name + " - mouse x position " + mx + " is less than rectangle x " + r.x + " plus rectangle width " + r.width);
            console.log("rec " + r.name + " - mouse y position " + my + " is greater than rectangle y " + r.y);
            console.log("rec " + r.name + " - mouse y position " + my + " is less than rectangle y " + r.y + " plus rectangle height " + r.height);
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

function post(path, data) {
    return window.fetch(path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

module.exports = {
    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler,
    setupMouseEventVariables
};