document.addEventListener('DOMContentLoaded', function() {
    // Clear the localStorage when the page is loaded
    localStorage.removeItem('formData');

    const form = document.getElementById('formRegister');
    const nameInput = document.getElementById('nameinput');
    const idInput = document.getElementById('idinput');
    const dateInput = document.getElementById('dateinput');
    const tableBody = document.getElementById('tablebody');

    // Function to save data to localStorage
    function saveDataToLocalStorage(data) {
        localStorage.setItem('formData', JSON.stringify(data));
    }

    // Function to display data in the table
    function displayData() {
        tableBody.innerHTML = '';

        let data = JSON.parse(localStorage.getItem('formData')) || [];

        data.forEach(function(item, index) {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const idCell = document.createElement('td');
            const dateCell = document.createElement('td');
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');

            nameCell.textContent = item.name;
            idCell.textContent = item.id;

            // Check if item has original date, otherwise use current date
            const date = item.originalDate ? new Date(item.originalDate) : new Date();
            // Format the date to day/month/year hours:minutes:seconds
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            dateCell.textContent = formattedDate;

            editButton.textContent = 'Editar';
            editButton.addEventListener('click', function() {
                editData(index);
            });

            actionsCell.appendChild(editButton);

            row.appendChild(nameCell);
            row.appendChild(idCell);
            row.appendChild(dateCell);
            row.appendChild(actionsCell);

            tableBody.appendChild(row);
        });
    }

    // Function to add data
    function addData(name, id, date) {
        let data = JSON.parse(localStorage.getItem('formData')) || [];
        const newData = { name, id, originalDate: date }; // Store original date along with data
        data.push(newData);
        saveDataToLocalStorage(data);
        displayData();
    }

/*     // Function to edit data
    function editData(index) {
        let data = JSON.parse(localStorage.getItem('formData')) || [];
        const item = data[index];
        nameInput.value = item.name;
        idInput.value = item.id;
        dateInput.value = originalDate.date;
    } */

    // Function to edit data
function editData(index) {
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    const item = data[index];
    // Update the data in the existing row
    const row = tableBody.children[index];
    const nameCell = row.children[0];
    const idCell = row.children[1];

    // Update name and id
    nameCell.textContent = nameInput.value.trim();
    idCell.textContent = idInput.value.trim();

    // Update the original date
    const originalDate = new Date(item.originalDate);
    const formattedDate = `${originalDate.getDate()}/${originalDate.getMonth() + 1}/${originalDate.getFullYear()} ${originalDate.getHours()}:${originalDate.getMinutes()}:${originalDate.getSeconds()}`;
    const dateCell = row.children[2];
    dateCell.textContent = formattedDate;

    // Update the data in localStorage
    item.name = nameInput.value.trim();
    item.id = idInput.value.trim();
    saveDataToLocalStorage(data);
}


    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = nameInput.value.trim();
        const id = idInput.value.trim();
        // Get current date in the desired format
        const currentDate = new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (name && id) {
            addData(name, id, currentDate);
            form.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    // Display existing data on load
    displayData();
});
