const createPlantForm = document.querySelector('form[data-create-plant]');
$('[data-create-plant-date-planted]').datepicker({format: 'yyyy/mm/dd'});

createPlantForm.addEventListener('submit', event => {
    event.preventDefault();
    const plant_name = createPlantForm.querySelector('input[data-create-plant-name]').value;
    const date_planted = createPlantForm.querySelector('input[data-create-plant-date-planted]').value;
    console.log(date_planted);
    post('/createPlant', {plant_name, date_planted});
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