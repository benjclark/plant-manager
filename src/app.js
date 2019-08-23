const httpRequests = require('./http-requests');

$('[data-plant-date-planted]').datepicker({format: 'yyyy/mm/dd'});

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
                document.querySelector(`[data-table-name-${i}]`).setAttribute('value', obj.bed_name);
                document.querySelector(`[data-table-type-${i}]`).setAttribute('value', obj.bed_type);
                document.querySelector(`[data-table-soil-characteristics-${i}]`).setAttribute('value', obj.bed_soil_characteristics);
                document.querySelector(`[data-table-name-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-table-type-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-table-soil-characteristics-${i}]`).dataset.empty = "false";
                document.querySelector(`[data-tr-${i}]`).dataset.empty = "false";
                i++;
            }
        });
        window.plantManager.drawAll();
    });
});