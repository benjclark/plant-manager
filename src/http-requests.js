function sendCreatePlantRequest() {
    const createPlantForm = document.querySelector('form[data-create-plant]');
    const plant_name = createPlantForm.querySelector('input[data-plant-name]').value;
    const plant_bed = createPlantForm.querySelector('select[data-plant-bed]').value;
    const plant_type = createPlantForm.querySelector('select[data-plant-type]').value;
    const plant_date_planted = createPlantForm.querySelector('input[data-plant-date-planted]').value;
    const plant_last_crop = createPlantForm.querySelector('input[data-plant-last-crop]').value;
    const plant_next_crop = createPlantForm.querySelector('input[data-plant-next-crop]').value;
    const plant_icon = createPlantForm.querySelector('select[data-plant-icon]').value;
    post('/createPlant', {plant_name, plant_bed, plant_type, plant_date_planted, plant_last_crop, plant_next_crop, plant_icon});
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
    for (let z = 0; z < pm.beds.length; z++) {
        post('/updateBedPosition',{bed_name: pm.beds[z].name, bed_x: pm.beds[z].x, bed_y: pm.beds[z].y});
    }
}

function sendSaveAllPlantPositionsRequest() {
    const pm = window.plantManager;
    for (let z = 0; z < pm.plants.length; z++) {
        post('/updatePlantPosition',{plant_name: pm.plants[z].name, plant_bed: pm.plants[z].bed, plant_x: pm.plants[z].x, plant_y: pm.plants[z].y});
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

function sendSavePlantRequest() {
    const updatePlantForm = document.querySelector('form[data-update-plant]');
    const name = updatePlantForm.querySelector('[data-plant-name]').value;
    const bed = updatePlantForm.querySelector('[data-plant-bed]').value;
    const type = updatePlantForm.querySelector('[data-plant-type]').value;
    const datePlanted = updatePlantForm.querySelector('[data-plant-date-planted]').value;
    const lastCrop = updatePlantForm.querySelector('[data-plant-last-crop]').value;
    const nextCrop = updatePlantForm.querySelector('[data-plant-next-crop]').value;
    const icon = updatePlantForm.querySelector('[data-plant-icon]').value;
    post('/updatePlant',{plant_name: name, plant_bed: bed, plant_type: type, plant_date_planted: datePlanted, plant_last_crop: lastCrop, plant_next_crop: nextCrop, plant_icon: icon});
}

function sendDeleteBedRequest() {
    const updateBedForm = document.querySelector('form[data-update-bed]');
    const name = updateBedForm.querySelector('[data-bed-name]').value;
    window.plantManager.beds = window.plantManager.beds.filter(obj => {
        return obj.name !== name;
    });
    post('/deleteBed',{bed_name: name});
}

function sendDeletePlantRequest() {
    const updatePlantForm = document.querySelector('form[data-update-plant]');
    const name = updatePlantForm.querySelector('[data-plant-name]').value;
    window.plantManager.plants = window.plantManager.plants.filter(obj => {
        return obj.name !== name;
    });
    post('/deletePlant',{plant_name: name});
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
    sendSaveAllPlantPositionsRequest,
    sendSaveBedRequest,
    sendSavePlantRequest,
    sendDeleteBedRequest,
    sendDeletePlantRequest,
    get,
    post
};
