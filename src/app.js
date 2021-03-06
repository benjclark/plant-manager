const httpRequests = require('./http-requests');

function closeAllOverlays() {
    const overlays = document.querySelectorAll('.overlay');
    overlays.forEach(el => {el.classList.add('hidden')});
}

function retrieveBedFromWindowObject(name) {
    const beds = window.plantManager.beds;
    for (let i = 0; i < beds.length; i++) {
        if (beds[i].name === name) {
            return beds[i];
        }
    }
}

function createBedRectInWindow() {
    const createBedForm = document.querySelector('form[data-create-bed]');
    window.plantManager.beds.push({
        name: createBedForm.querySelector('input[data-bed-name]').value,
        x: 50,
        y: 50,
        width: createBedForm.querySelector('input[data-bed-width]').value,
        height: createBedForm.querySelector('input[data-bed-height]').value,
        fill: createBedForm.querySelector('input[data-bed-colour]').value,
        soilCharacteristics: createBedForm.querySelector('select[data-bed-soil-characteristics]').value,
        bedType: createBedForm.querySelector('select[data-bed-type]').value,
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

function populateBedDropdowns(bedObj) {
    const name = bedObj.bed_name;
    Array.prototype.slice.call(document.querySelectorAll('select[data-plant-bed]')).forEach(selectEl => {
        const el = document.createElement('option');
        el.setAttribute('value', name);
        el.textContent = name;
        selectEl.appendChild(el);
    })
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
    httpRequests.sendSaveAllPlantPositionsRequest();
});

document.querySelector('input[data-save-bed]').addEventListener('click', event => {
    event.preventDefault();
    updateBedRectInWindow();
    httpRequests.sendSaveBedRequest();
    window.plantManager.drawAll();
});

document.querySelector('input[data-save-plant]').addEventListener('click', event => {
    event.preventDefault();
    httpRequests.sendSavePlantRequest();
    window.plantManager.drawAll();
});

document.querySelector('input[data-delete-bed]').addEventListener('click', event => {
    event.preventDefault();
    httpRequests.sendDeleteBedRequest();
    window.plantManager.drawAll();
});

document.querySelector('input[data-delete-plant]').addEventListener('click', event => {
    event.preventDefault();
    httpRequests.sendDeletePlantRequest();
    window.plantManager.drawAll();
});

[].slice.call(document.querySelectorAll('[data-open-overlay]')).forEach(button => {
    const overlayName = button.dataset.openOverlay;
    button.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector(`div[data-${overlayName}-overlay]`).classList.remove('hidden');
    });
});

[].slice.call(document.querySelectorAll('[data-close-overlay]')).forEach(button => {
    const overlayName = button.dataset.closeOverlay;
    button.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector(`div[data-${overlayName}-overlay]`).classList.add('hidden');
    });
});

httpRequests.get('/getBeds').then(response => {
    response.json().then(data => {
        let i = 1;
        data.forEach(obj => {
            window.plantManager.beds.push({
                name: obj.bed_name,
                x: obj.bed_x,
                y: obj.bed_y,
                width: obj.bed_width,
                height: obj.bed_height,
                fill: obj.bed_colour,
                soilCharacteristics: obj.bed_soil_characteristics,
                bedType: obj.bed_type,
                isDragging: false,
            });
            if(i < 32) {
                document.querySelector(`[data-table-name-${i}]`).setAttribute('value', obj.bed_name);
                document.querySelector(`[data-table-type-${i}]`).setAttribute('value', obj.bed_type);
                document.querySelector(`[data-table-soil-characteristics-${i}]`).setAttribute('value', obj.bed_soil_characteristics);
                document.querySelector(`[data-table-name-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-table-type-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-table-soil-characteristics-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-tr-${i}]`).dataset.empty = "false";
                i++;
            }
            populateBedDropdowns(obj);
        });
        window.plantManager.drawAll();
    });
});

httpRequests.get('/getPlants').then(response => {
    response.json().then(data => {
        let i = 1;
        data.forEach(obj => {
            window.plantManager.plants.push({
                name: obj.plant_name,
                bed: obj.plant_bed,
                type: obj.plant_type,
                datePlanted: obj.plant_date_planted.slice(0, 10),
                lastCrop: obj.plant_last_crop.slice(0, 10),
                nextCrop: obj.plant_next_crop.slice(0, 10),
                imageFileName: obj.plant_icon,
                x: obj.plant_x,
                y: obj.plant_y,
                width: 35,
                height: 35,
                isDragging: false
            });
            if(i < 32) {
                document.querySelector(`[data-table-plant-name-${i}]`).setAttribute('value', obj.plant_name);
                document.querySelector(`[data-table-plant-bed-${i}]`).setAttribute('value', obj.plant_bed);
                document.querySelector(`[data-table-plant-type-${i}]`).setAttribute('value', obj.plant_type);
                document.querySelector(`[data-table-plant-date-planted-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-table-plant-last-crop-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-table-plant-next-crop-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-plant-tr-${i}]`).dataset.empty = "false";
                i++;
            }
        });
        window.plantManager.drawAll();
    });
});
