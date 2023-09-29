"use strict";

const dateNow = new Date();
const hourNow = dateNow.getHours() + ':' + (dateNow.getMinutes().toString()).padStart(2, 0);

const titleName = 'Parking pro';
const minimoIngresoFijo = 600;
const valorMinutos = 20;
const tiempoMinimo = 30;


const horaActual = document.getElementById('horaActual');

// Show Alert
// const alert = document.getElementById('alert-msg');

//find a element html by id
const modalRegister = document.getElementById('createModal');

const titlesTable = [ 'Patente', 'Hora Ingreso', 'Hora Egreso', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
const table = document.getElementById('list_row');
const quantityRowsOfTable = 5;

const btnIngreso = document.getElementById('btn-ingreso');
const createRegister = document.getElementById('create-register');
const egresoRegister = document.getElementById('save-register');
const btnEgreso = document.getElementById('btn-egreso');

// Elements of form
const formRegister = document.getElementById('form-create-register');
const labelHourIngreso =document.getElementById('staticHour');
const labelHourEgreso =document.getElementById('staticHourEgreso');
const inputPatente = document.getElementById('inputPatente');

// Elements if Modal
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');


function showTime(){
  const dateNow = new Date();
  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes();
  let seconds = dateNow.getSeconds();
  if (hours < 10) hours = 0 + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  horaActual.innerHTML = hours+ ":" +minutes+ ":" +seconds;
}
setInterval(() => showTime(), 1000);

function consulta  ( url, method = 'GET' ) {
  return new Promise(( resolve, reject ) => {
    fetch( url, { method: method, redirect: 'follow' } )
    .then( response => response.json() )
    .then( data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
    .catch( err => { console.log( err ) } )
  });
}

const printList = async ( data ) => {
  table.innerHTML = "";
  if( data.length == 0 || !data || data == undefined ) {
    console.log('No hay datos');
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  console.log('Estoy por aca en printList');
  

  for ( const i in data ) {
    const { inicioServicio, finServicio, placaServicio } = data[i];
    const actions = [
      `<button type="button" id='btnShowRegister' onClick='calculoMonto("${ placaServicio }", "${ inicioServicio }")' class="btn btn-primary">TERMINAR</button>`,
    //   `<button type="button" class="btn btn-danger">ELIMINAR</button>`
    ]

    const rowClass = 'text-right';
    const customRow = `<td>${ [ placaServicio, inicioServicio, finServicio, actions ].join('</td><td>') }</td>`;
    const row = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
}
const sendInfoParking = async (uidPatente = '', btnAction = 'create_register') => {
  const dateNow = new Date();
  const hourNow = dateNow.getHours() + ':' + (dateNow.getMinutes().toString()).padStart(2, 0);
  labelHourIngreso.value = btnAction == 'create_register' ? hourNow : '';
  const data = {
    inicioServicio: dateNow,
    finServicio: null,
    placaServicio : uidPatente.toUpperCase()
  }
  
  createEditRegister( data, 'POST').then(response => {
    if(response.ok){
      showRegisters();
      // reset of Formulary
      formRegister.reset();
      modalTitle.textContent = btnAction == 'edit_register' ? `Registro editado de ${ data.placaServicio }` : 'Registro Creado';
      //Close modal
      bootstrap.Modal.getInstance(modalRegister).hide();
      modalTitle.textContent = '';
      showMessegeAlert( false, 'edit_register' ? `Registro Editado` : 'Registro Creado');
      return true;
    }
  }).catch(err => {
    console.log(err)
    showMessegeAlert( true, 'Error al editar el registro');
    return false;
  });
}


const createEditRegister = async ( data, methods ='POST', uid = '') => {  
  const query = uid == '' ? 'registers' : `registers/edit/${ uid }`
  return await fetch( api + query , {
    method: methods,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
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


async function sendEgresoParking(patente, horaIngreso) {

  const dateNow = new Date();
  const hourNow = dateNow.getHours() + ':' + (dateNow.getMinutes().toString()).padStart(2, 0);
  labelHourEgreso.value = hourNow

  calculoMonto(patente, horaIngreso);

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
  const result = await sendInfoParking(inputPatente.value);
  if(result) bootstrap.Modal.getInstance(modalRegister).hide();
});

// Escuchar el evento de click del boton btnIngreso y ejecutar sendInfoParking
egresoRegister.addEventListener('click', async (e) => {
  e.preventDefault();
  //Verificar que los campos esten llenos

  consulta('/registers/','GET')


  const result = await sendInfoParking(inputPatente.value, 'edit_register');
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
  const hourNow = dateNow.getHours() + ':' + (dateNow.getMinutes().toString()).padStart(2, 0);
  labelHourIngreso.value = hourNow;
});

// Show all registers in the table
const showRegisters = async () => {
  const registers = await consulta( api + 'registers', 'GET');
  localStorage.setItem('estacionamientos',  JSON.stringify(registers.data));
  printList( registers.data );
}

// Show register by id
const showRegistersForId = async ( id ) => {
  const data = JSON.parse( localStorage.getItem('estacionamientos') );
  if (data) return '';
  const register = await consulta( api + 'registers/' + id );
  printList( register.data );
}

// Show register by filters
const showRegistersForFilters = async ( filters ) => {
  const register = await consulta( api + 'registers/' + filters );
  printList( register.data );
}


//Funciones de muestra de mensajes de alerta
function showMessegeAlert ( isErro = false, message, time = 3000 ) {
  if (isErro) {
    alert.classList.add('alert-danger');
    alert.classList.remove('alert-success');
  } else {
    alert.classList.add('alert-success');
    alert.classList.remove('alert-danger');
  }
  alert.textContent = message;
  alert.style.display = 'block';
  setTimeout(() => {
    alert.style.display = 'none';
  }, time);
}

window.addEventListener("load", async() => {
  dateAttentionSearch.max = new Date().toISOString().substring(0,10);
  showTitlesTable();
  const spinner = document.getElementsByClassName('spinner');
  table.innerHTML = spinner;
  await showRegisters();
  // const fader = document.getElementById('fader');
  // fader.classList.add("close");
  // fader.style.display = 'none';
})