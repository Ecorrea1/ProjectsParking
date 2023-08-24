//Como agregar el modo estricto js
"use strict";

const titleName = 'Parking pro';
const minimoIngresoFijo = 600;
const valorMinutos = 20;
const tiempoMinimo = 30;

//find a element html by id
const modalRegister = document.getElementById('createModal');

const titlesTable = [ 'Pantete', 'Hora Ingreso', 'Hora Egreso', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
// const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');
const quantityRowsOfTable = 5;

const btnIngreso = document.getElementById('btn-ingreso');
const createRegister = document.getElementById('create-register');
const btnEgreso = document.getElementById('btn-egreso');

// Elelents of form
const formRegister = document.getElementById('form-create-register');
const labelHourIngreso =document.getElementById('staticHour');
const inputPatente = document.getElementById('inputPatente');

const printList = async ( data ) => {
  table.innerHTML = "";
  if( data.length == 0 ) {
    // showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }
  
  for ( const i in data ) {

    const { horaIngreso, horaEgreso, patente } = data[i];
    const actions = [
      `<button type="button" id='btnShowRegister' onClick='calculoMonto("${ patente }", "${ horaIngreso }")' class="btn btn-primary">TERMINAR</button>`,
    //   `<button type="button" class="btn btn-danger">ELIMINAR</button>`
    ]

    const rowClass  = 'text-right';
    const customRow = `<td>${ [ patente, horaIngreso, horaEgreso, actions ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;

  }
}

//Calcular monto minimo por minutos ingresados en el parking
function calculoMonto( patente, horaIngreso ){

    console.log( 'hora de ingreso', horaIngreso );
    const dateNow = new Date();
    const hourNow = dateNow.getHours() + ':' + (dateNow.getMinutes().toString()).padStart(2, 0);
    const calculaTiempo =  horaIngreso - hourNow
    const total = (calculaTiempo > tiempoMinimo) ? minimoIngresoFijo * valorMinutos / tiempoMinimo : minimoIngresoFijo
    alert(`Este es el total de patente: ${patente} |  ${total}`);
    
};

const sendInfoParking = (inputPlaca) => {
  if (!inputPlaca) {
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = "Debe ingresar una placa";
    errorModal.show();
    return false;
  }
    // obtener hora del sisitema
    const dateNow = new Date();
    let hourNow = dateNow.getHours() + ':' + ( dateNow.getMinutes().toString() ).padStart(2, 0);
    //obtener el valor de los inputs
    labelHourIngreso.value = hourNow;
    
    const infoPark = [{
        "horaIngreso": `${hourNow}`,
        "horaEgreso": `-`,
        "patente" :`${inputPlaca}`
    }]

    // const allData = localStorage.getItem('dataLocal');
    // const addNewData = [...allData , infoPark];
    // localStorage.setItem('dataLocal', JSON.stringify(addNewData));
    printList(infoPark);
    return true;
}

function showHourIngreso() {
    const dateNow = new Date();
    const hourNow = dateNow.getHours() + ':' + (dateNow.getMinutes().toString()).padStart(2, 0);
    return hourNow;
}
// Escuchar el evento de click del boton btnIngreso y ejecutar sendInfoParking
createRegister.addEventListener('click', async (e) => {
  e.preventDefault();
  //Verificar que los campos esten llenos
  const result = sendInfoParking(inputPatente.value);
  if(result) bootstrap.Modal.getInstance(modalRegister).hide();
});

// Show titles of table
const showTitlesTable = () => {
    let titles = '';
    for (const i in titlesTable ) {
      titles += `<th>${ titlesTable[i] }</th>`;
    }
    tableTitles.innerHTML += `<tr>${ titles }</tr>`;
}


modalRegister.addEventListener('show.bs.modal', () => {
    formRegister.reset();
    const dateNow = new Date();
    let hourNow = dateNow.getHours() + ':' + ( dateNow.getMinutes().toString() ).padStart(2, 0);
    labelHourIngreso.value = hourNow;
});

async function showRegisters() {
  // localStorage.clear();
  localStorage.setItem('dataLocal',[]);
  const data = localStorage.getItem('dataLocal');
  printList(data);
}

async function initState () {
  showTitlesTable();
  await showRegisters();
}
  
initState();