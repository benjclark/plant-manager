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
    post('/createBed', {bed_name, bed_soil_characteristics, bed_type});
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