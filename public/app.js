const createPlantForm = document.querySelector('form[data-create-plant]');

createPlantForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const plantName = createPlantForm.querySelector('input[data-create-plant-name]').value;
    const datePlanted = createPlantForm.querySelector('input[data-create-plant-date-planted]').value;
    post('/createPlant', {plantName, datePlanted});
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