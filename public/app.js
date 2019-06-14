const createPlantForm = document.querySelector('form[data-create-plant]');
const createBedForm = document.querySelector('form[data-create-bed]');
$('[data-plant-date-planted]').datepicker({format: 'yyyy/mm/dd'});

createPlantForm.addEventListener('submit', event => {
    event.preventDefault();
    const plant_name = createPlantForm.querySelector('input[data-plant-name]').value;
    const date_planted = createPlantForm.querySelector('input[data-plant-date-planted]').value;
    post('/createPlant', {plant_name, date_planted});
});
createBedForm.addEventListener('submit', event => {
    event.preventDefault();
    const bed_name = createBedForm.querySelector('input[data-bed-name]').value;
    const bed_soil_characteristics = createBedForm.querySelector('select[data-bed-soil-characteristics]').value;
    const bed_type = createBedForm.querySelector('select[data-bed-type]').value;
    const bed_width = createBedForm.querySelector('input[data-bed-width]').value;
    const bed_height = createBedForm.querySelector('input[data-bed-height]').value;
    const bed_colour = createBedForm.querySelector('input[data-bed-colour]').value;
    const bed_x = 200;
    const bed_y = 300;
    window.plantManager.rectangles.push({
        name: bed_name,
        x: bed_x,
        y: bed_y,
        width: bed_width,
        height: bed_height,
        fill: bed_colour,
        isDragging: false
    });
    window.plantManager.drawAll();
    post('/createBed', {bed_name, bed_soil_characteristics, bed_type, bed_width, bed_height, bed_colour, bed_x, bed_y});
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
document.querySelector('button[data-get-beds]').addEventListener('click', event => {
    event.preventDefault();
    get('/getBeds').then(response => {
        console.dir(response);
        response.json().then(data => {
            data.forEach(obj => {
                window.plantManager.rectangles.push({
                    name: obj.bed_name,
                    x: obj.bed_x,
                    y: obj.bed_y,
                    width: obj.bed_width,
                    height: obj.bed_height,
                    fill: obj.bed_colour,
                    isDragging: false
                });
            });
            window.plantManager.drawAll();
        });
    });
});
document.querySelector('button[data-update-beds]').addEventListener('click', event => {
    event.preventDefault();
    const pm = window.plantManager;
    for (let z = 0; z < pm.rectangles.length; z++) {
        setTimeout(() => {
            post('/updateRecPosition',{bed_name: pm.rectangles[z].name, bed_x: pm.rectangles[z].x, bed_y: pm.rectangles[z].y});
        }, 500);
    }
});

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