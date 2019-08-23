(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const httpRequests = require('./http-requests');

$('[data-plant-date-planted]').datepicker({format: 'yyyy/mm/dd'});

const bedsTable = {
    names: getTableCellsFor('name'),
    types: getTableCellsFor('type'),
    soilCharacteristics: getTableCellsFor('soil-characteristics'),
    lastDugs: getTableCellsFor('last-dug'),
    lastVegs: getTableCellsFor('last-veg')
};


function getTableCellsFor(heading) {
    const arrayResult = [];
    for (let i = 0; i < 30; i++) {
        arrayResult.push(document.querySelectorAll(`data-table-${heading}-${i}`));
    }
    return arrayResult;
}

function closeAllOverlays() {
    const overlays = document.querySelectorAll('.overlay');
    overlays.forEach(el => {el.classList.add('hidden')});
}

function retrieveBedFromWindowObject(name) {
    const rectangles = window.plantManager.rectangles;
    for (let i = 0; i < rectangles.length; i++) {
        if (rectangles[i].name === name) {
            return rectangles[i];
        }
    }

}

function createBedRectInWindow() {
    const createBedForm = document.querySelector('form[data-create-bed]');
    window.plantManager.rectangles.push({
        name: createBedForm.querySelector('input[data-bed-name]').value,
        x: 200,
        y: 300,
        width: createBedForm.querySelector('input[data-bed-width]').value,
        height: createBedForm.querySelector('input[data-bed-height]').value,
        fill: createBedForm.querySelector('input[data-bed-colour]').value,
        soil_characteristics: createBedForm.querySelector('select[data-bed-soil-characteristics]').value,
        bed_type: createBedForm.querySelector('select[data-bed-type]').value,
        isDragging: false
    });
}

function updateBedRectInWindow() {
    const updateBedForm = document.querySelector('form[data-update-bed]');
    const name = updateBedForm.querySelector('[data-bed-name]').value;
    const bed = retrieveBedFromWindowObject(name);
    bed.name = name;
    bed.width = parseInt(updateBedForm.querySelector('[data-bed-width]').value, 10);
    bed.height = parseInt(updateBedForm.querySelector('[data-bed-height]').value, 10);
    bed.fill = updateBedForm.querySelector('[data-bed-colour]').value;
    bed.soilCharacteristics = updateBedForm.querySelector('[data-bed-soil-characteristics]').value;
    bed.type = updateBedForm.querySelector('[data-bed-type]').value;
}

document.querySelector('form[data-create-plant]').addEventListener('submit', event => {
    event.preventDefault();
    httpRequests.sendCreatePlantRequest();
    closeAllOverlays();
});

document.querySelector('form[data-create-bed]').addEventListener('submit', event => {
    event.preventDefault();
    httpRequests.sendCreateBedRequest();
    createBedRectInWindow();
    window.plantManager.drawAll();
    closeAllOverlays();
});

document.querySelector('button[data-update-beds]').addEventListener('click', event => {
    event.preventDefault();
    httpRequests.sendSaveAllBedPositionsRequest();
});

document.querySelector('input[data-save-bed]').addEventListener('click', event => {
    event.preventDefault();
    updateBedRectInWindow();
    httpRequests.sendSaveBedRequest();
    window.plantManager.drawAll();
});

document.querySelector('input[data-delete-bed]').addEventListener('click', event => {
    event.preventDefault();
    httpRequests.sendDeleteBedRequest();
    window.plantManager.drawAll();
});

[].slice.call(document.querySelectorAll('[data-add-button]')).forEach(button => {
    const value = button.dataset.addButton;
    button.addEventListener('click', event => {
        document.querySelector(`div[data-add-${value}-overlay]`).classList.remove('hidden');
    });
});

[].slice.call(document.querySelectorAll('[data-close-button]')).forEach(button => {
    const value = button.dataset.closeButton;
    button.addEventListener('click', event => {
        document.querySelector(`div[data-add-${value}-overlay]`).classList.add('hidden');
    });
});

httpRequests.get('/getBeds').then(response => {
    response.json().then(data => {
        let i = 1;
        data.forEach(obj => {
            window.plantManager.rectangles.push({
                name: obj.bed_name,
                x: obj.bed_x,
                y: obj.bed_y,
                width: obj.bed_width,
                height: obj.bed_height,
                fill: obj.bed_colour,
                soil_characteristics: obj.bed_soil_characteristics,
                bed_type: obj.bed_type,
                isDragging: false
            });
            if(i <= 31) {
                document.querySelector(`[data-table-name-${i}]`).textContent = obj.bed_name;
                document.querySelector(`[data-table-type-${i}]`).textContent = obj.bed_type;
                document.querySelector(`[data-table-soil-characteristics-${i}]`).textContent = obj.bed_soil_characteristics;
                i++;
            }
        });
        window.plantManager.drawAll();
    });
});
},{"./http-requests":2}],2:[function(require,module,exports){
function sendCreatePlantRequest() {
    const createPlantForm = document.querySelector('form[data-create-plant]');
    const plant_name = createPlantForm.querySelector('input[data-plant-name]').value;
    const date_planted = createPlantForm.querySelector('input[data-plant-date-planted]').value;
    post('/createPlant', {plant_name, date_planted});
}

function sendCreateBedRequest() {
    const createBedForm = document.querySelector('form[data-create-bed]');
    const bed_name = createBedForm.querySelector('input[data-bed-name]').value;
    const bed_soil_characteristics = createBedForm.querySelector('select[data-bed-soil-characteristics]').value;
    const bed_type = createBedForm.querySelector('select[data-bed-type]').value;
    const bed_width = createBedForm.querySelector('input[data-bed-width]').value;
    const bed_height = createBedForm.querySelector('input[data-bed-height]').value;
    const bed_colour = createBedForm.querySelector('input[data-bed-colour]').value;
    const bed_x = 200;
    const bed_y = 300;
    post('/createBed', {bed_name, bed_soil_characteristics, bed_type, bed_width, bed_height, bed_colour, bed_x, bed_y});
}

function sendSaveAllBedPositionsRequest() {
    const pm = window.plantManager;
    for (let z = 0; z < pm.rectangles.length; z++) {
        post('/updateBedPosition',{bed_name: pm.rectangles[z].name, bed_x: pm.rectangles[z].x, bed_y: pm.rectangles[z].y});
    }
}

function sendSaveBedRequest() {
    const updateBedForm = document.querySelector('form[data-update-bed]');
    const name = updateBedForm.querySelector('[data-bed-name]').value;
    const width = updateBedForm.querySelector('[data-bed-width]').value;
    const height = updateBedForm.querySelector('[data-bed-height]').value;
    const fill = updateBedForm.querySelector('[data-bed-colour]').value;
    const soilCharacteristics = updateBedForm.querySelector('[data-bed-soil-characteristics]').value;
    const type = updateBedForm.querySelector('[data-bed-type]').value;
    post('/updateBed',{bed_name: name, bed_soil_characteristics: soilCharacteristics, bed_type: type, bed_width: width, bed_height: height, bed_colour: fill});
}

function sendDeleteBedRequest() {
    const updateBedForm = document.querySelector('form[data-update-bed]');
    const name = updateBedForm.querySelector('[data-bed-name]').value;
    window.plantManager.rectangles = window.plantManager.rectangles.filter(obj => {
        return obj.name !== name;
    });
    post('/deleteBed',{bed_name: name});
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

function get(path) {
    return window.fetch(path, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
        }
    });
}

module.exports = {
    sendCreatePlantRequest,
    sendCreateBedRequest,
    sendSaveAllBedPositionsRequest,
    sendSaveBedRequest,
    sendDeleteBedRequest,
    get,
    post
};
},{}]},{},[1])

//# sourceMappingURL=app.js.map
