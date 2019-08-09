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