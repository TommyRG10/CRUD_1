//adquirimos los elementos del DOM donde vamos a ingresar los datos de usuario:
//declaramos constantes que son variables que no cambian en el tiempo//
const form = document.getElementById('formRegister');
const nameinput = document.getElementById('nameinput');
const emailinput = document.getElementById('emailinput');

//donde vamos a pintar los datos de Usuario//
const tablebody = document.getElementById('tablebody');

// Para almacenar estos datos en el localStore, al actualizar, no se borre la info:
// Se crea una variable "let" que es dinamica, con el nombre "data" porque será nuesta base de datos
// Json.parse porque esos datos los adquirimos y convertimos en objetos almacenables como los arrays
// Guardamos en localStore en el navegador bajo la función formData() que son los datos de nuestro formulario:

let data = JSON.parse(localStorage.getItem('formData')) || []; 

// Creamos funcion para que al evento "submit" click al boton (agregar), almacene la información en memoria
form.addEventListener('submit', function(event){

//elimina comportamientos por defecto del formulario
    event.preventDefault();
    
    const name = nameinput.value;
    const email = emailinput.value;

    if(name && email){
        const newData = {name,email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
    //Función para borrar y volver a iniciar de JavaScript no se necesita crear
        form.reset();
    }else{
    alert ('Favor llenar todos los campos');

    }
})

//Función para guardar los datos del formulario:
function saveDataToLocalStorage(){
    localStorage.setItem('formData', JSON.stringify(data));
}

//Función para renderizar o actualizar el formulario, limpia el contenido de la tabla para nuevo registro:
function renderTable(){
    tablebody.innerHTML = '';

    //Para generar todos los registros del formulario en una tabla necesitamos iterar el "data" (toda la información) y crear la tabla
    // compuesta de un item e index, cada elemento tendrá su puesto en la tabla.
    data.forEach (function (item, index){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');

    // Dentro de la celda "action" o acciones creamos dos botones un editar y otro eliminar.
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')
    
    // Agregamos el contenido de la celda, texto para name y email.
        nameCell.textContent = item.name;
        emailCell.textContent = item.email;

    // Agregamos el texto en los botones.    
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';

    // asignamos las clases a los botones que aparecen en la celda "acciones".
        editButton.classList.add('button', 'button--secundary');
        deleteButton.classList.add('button', 'button--terciary');

    // Eventos de escucha con funciones para los botones de la celda "acciones" editar y eliminar.
        editButton.addEventListener('click', function(){
            editData(index);
        })

        deleteButton.addEventListener('click', function(){
            deleteData(index);
        })

        // Agregamos los botones a la celda de acciones.
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Creamos las filas o celdas para los textos que capture en la data:
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        // Creamos las filas para nuestro tablebody "la que aparece con la data":
        tablebody.appendChild(row);

    })  
}

// Confección de las funciones de editar y eliminar
function editData(index){
    const item = data[index];
    nameinput.value = item.name;
    emailinput.value = item.email;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index){
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();