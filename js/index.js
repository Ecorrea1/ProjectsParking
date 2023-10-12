"use strict";

const titleName = 'Parking pro';
const minimoIngresoFijo = 600;
const valorMinutos = 20;
const tiempoMinimo = 30;
const horaActual = document.getElementById('horaActual');

// Show Alert
const alertMsG = document.getElementById('alert-msg');

const formSearch = document.getElementById('form-search');
const idServicioSearchInput = document.getElementById('idServicioSearchInput');
const patenteSearchInput = document.getElementById('patenteSearchInput');
const inicioServicioSearchInput = document.getElementById('inicioServicioSearchInput');
const btnClearFormSearch = document.getElementById('btn-clear-search');

let patenteValidator = false;
//find a element html by id
const modalRegister = document.getElementById('createModal');
const modalInfo = document.getElementById('modalInfo');
const myModal = new bootstrap.Modal('#createModal', { keyboard: false });
const myModalInfo = new bootstrap.Modal('#modalInfo', { keyboard: false });

const titlesTable = ['ID', 'Patente', 'Hora Ingreso', 'Hora Egreso', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
const table = document.getElementById('list_row');

const btnIngreso = document.getElementById('btn-ingreso');
const btnExitRegister = document.getElementById('btnExitRegister')
const createRegister = document.getElementById('create-register');
const btnEgreso = document.getElementById('btn-egreso');

// Elements of form
const formRegister = document.getElementById('form-create-register');
const formInfo = document.getElementById('form-info-register');
const labelHourIngreso =document.getElementById('labelStaticHour');
const labelHourEgreso =document.getElementById('labelStaticHourEgreso');
const patenteInput = document.getElementById('patenteInput');
const saveRegisterInfo = document.getElementById('save-register-info');

const labelIdInfo =document.getElementById('labelIdInfo');
const labelHourIngresoInfo =document.getElementById('labelStaticHourInfo');
const labelHourEgresoInfo =document.getElementById('labelStaticHourEgresoInfo');
const patenteInputInfo = document.getElementById('patenteInfoInput');
const totalInput = document.getElementById('totalInput');

// Elements if Modal
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');


function showTime(){
  const dateNow = new Date();
  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes();
  let seconds = dateNow.getSeconds();
  if (hours < 10) hours = "0" + hours;
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
  if( data.length == 0 || !data) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for ( const i in data ) {
    const { idServicio, inicioServicio, finServicio, placaServicio } = data[i];
    const actions = [
      `<button type="button" id='btnExitRegister' onClick='showModalCreateOrEdit("${ idServicio }", true ,"EDIT")' class="btn btn-primary">TERMINAR</button>`,
    ]

    const rowClass = 'text-right';
    const customRow = `<td>${ [idServicio, placaServicio, changeDate(inicioServicio), changeDate(finServicio), actions ].join('</td><td>') }</td>`;
    const row = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
}
const sendInfoParking = async (idServicio = '', action = 'CREATE'|'EDIT') => {
  patenteValidator = validateAllfields(patenteInput, divErrorPatente);
  if (!patenteValidator && action == 'CREATE') return console.log('Ingresa Patente');
  
  const data = {
    inicioServicio: action == 'CREATE' ? labelHourIngreso.value : labelHourIngresoInfo.value,
    finServicio: action == 'CREATE' ? null : labelHourEgresoInfo.value,
    placaServicio: action == 'CREATE' ?  patenteInput.value.toUpperCase() : patenteInputInfo.value
  }
  
  const result = await createEditRegister( data, 'POST', idServicio );
  if (!result) return showMessegeAlert( true, 'Error al editar el registro');
  await showRegisters();
  bootstrap.Modal.getInstance(action = 'CREATE' ? modalRegister : modalInfo).hide();
  showMessegeAlert( false, 'EDIT' ? `Registro Editado` : 'Registro Creado');
}


const createEditRegister = async ( data, methods ='POST', uid = '') => {  
  const query = uid == '' ? 'registers' : `registers/edit/${ uid }`
  return await fetch( api + query , {
    method: methods,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => {
      console.log(response.ok);
      return true;
    }
  )
  .catch(err => {
    console.log(err)
    return false;
  });
}
function calculoMonto( horaIngreso, horaEgreso ){
  console.log(`${ horaIngreso.substring(11,16) } - ${ horaEgreso.substring(11,16) }`);
  const calculaTiempo =  horaIngreso - horaEgreso
  return ( calculaTiempo > tiempoMinimo ) ? minimoIngresoFijo * valorMinutos / tiempoMinimo : minimoIngresoFijo
};
function showHourIngreso() {
  const dateNow = new Date();
  return `${dateNow.getFullYear()}/${addZeroToDate(dateNow.getDate())}/${addZeroToDate(dateNow.getDay())} ${dateNow.getHours()}:${addZeroToDate(dateNow.getMinutes())}:${ addZeroToDate(dateNow.getSeconds())}`;
}
// Escuchar el evento de click del boton btnIngreso y ejecutar sendInfoParking
createRegister.addEventListener('click', async (e) => {
  e.preventDefault();
  const result = await sendInfoParking('','CREATE');
  if(result) bootstrap.Modal.getInstance(modalRegister).hide();
});

const showTitlesTable = () => {
  let titles = '';
  for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
  tableTitles.innerHTML += `<tr>${ titles }</tr>`;
}

modalRegister.addEventListener('show.bs.modal', () => {
  clearForm();
  formRegister.reset();
  labelHourIngreso.value = showDateAndHours();
});

// Show all registers in the table
const showRegisters = async () => {
  const registers = await consulta( api + 'registers', 'GET');
  localStorage.setItem('estacionamientos',  JSON.stringify(registers.data));
  printList( registers.data );
}
// Show register by id
const showRegistersForId = async ( id ) => {
  const register = await consulta( api + 'registers/' + id );
  printList( register.data );
}
// Show register by filters
const showRegistersForFilters = async ( filters ) => {
  const register = await consulta( api + 'registers/' + filters );
  printList( register.data );
}
function showMessegeAlert ( isErro = false, message, time = 3000 ) {
  alertMsG.classList.add( isErro ? 'alert-danger' : 'alert-success' );
  alertMsG.classList.remove( isErro ? 'alert-success' : 'alert-danger' );
  alertMsG.textContent = message;
  alertMsG.style.display = 'block';
  setTimeout(() => { alertMsG.style.display = 'none'; }, time);
}
function showError( divInput, divError, messageError = '', show = true ) {
  divError.innerText = messageError;
  divInput.style.borderColor = show ? '#ff0000' : 'hsl(270, 3%, 87%)';
  divError.innerText = messageError;
}
function verifyIsFilled( input, divError ) {
  if (input.value == '') {
    divError.style.display = 'block';
    return false;
  } else {
    divError.style.display = 'none';
    return true;
  }
}
function  validateLetters( input ) {
  //Validar que solo sean letras
  const regex = /[A-z]/g;
  return regex.test(input.value) ? true : false;
}
function validateNumber(input) {
  // Validar input que solo sean numeros negativos
  const regex = /^[0-9]*$/;
  return regex.test(input.value) ? true : false;
}
function validateAllfields( divInput, divError, fieldNumber = false ) {
  if(verifyIsFilled(divInput, divError)){
    if (fieldNumber) {
      if (validateNumber(divInput)) {
        showError(divInput, divError, '', false);
        return true;
      } 
      showError(divInput, divError, 'Solo se permiten numeros', true);
      return false;
    } else {
      if(validateLetters(divInput)) {
        showError(divInput, divError, '', false);
        return true;
      }
      showError(divInput, divError, 'Solo se permiten letras', true);
      return false;
    }
  } else {
    showError(divInput, divError, 'Este campo es obligatorio');
    return false;
  }
}
async function showModalCreateOrEdit( uid ) {
  myModalInfo.show();
  formInfo.reset();

  const register = await consulta( api + 'registers/' + uid );
  const dateNow = new Date();
  labelHourIngreso.value = dateNow.toISOString();

  const { placaServicio, inicioServicio } = register.data;

  labelIdInfo.value = uid;
  patenteInputInfo.value = placaServicio;
  labelHourIngresoInfo.value = changeDate(inicioServicio);
  labelHourEgresoInfo.value = showDateAndHours();
  totalInput.value = calculoMonto(inicioServicio, showDateAndHours());
}

saveRegisterInfo.addEventListener('click', async(e) => {
  e.preventDefault();
  await sendInfoParking(labelIdInfo.value, 'EDIT');
})
const searchRegister = async ( searchQuery ) => {
  const register = await consulta( api + 'registers/search?page=1' + searchQuery );
  printList( register.data );
}

formSearch.addEventListener('submit', async(e) => {
  e.preventDefault();
  if ( idServicioSearchInput.value === '' && patenteSearchInput.value === '' && inicioServicioSearchInput.value === '' ) return await showRegisters();
  const searchQuery = '&idServicio=' + idServicioSearchInput.value + '&placaServicio=' + patenteSearchInput.value + '&inicioServicio=' + inicioServicioSearchInput.value;
  return await searchRegister( searchQuery );
});

btnClearFormSearch.addEventListener('click', async() =>  await showRegisters());
function clearForm() {
  // modalTitle.textContent = ''
  patenteInput.value = ''
  patenteInput.style.borderColor = 'hsl(270, 3%, 87%)'
  divErrorPatente.innerText = ''
}

createRegister.addEventListener('click', () => clearForm());
const showDateAndHours = () => {
  const dateNow = new Date();
  return `${dateNow.getFullYear()}-${addZeroToDate(dateNow.getDate())}-${addZeroToDate(dateNow.getDay())} ${ addZeroToDate(dateNow.getHours())}:${addZeroToDate(dateNow.getMinutes())}:${ addZeroToDate(dateNow.getSeconds())}`;
}
const addZeroToDate = (data) => data.toString().length == 1 ? '0' + data : data
const changeDate = (date) => date ? date.substring(0, 10) + ' ' + date.substring(11,19) : '-'

window.addEventListener("load", async() => {
  inicioServicioSearchInput.max = new Date().toISOString().substring(0,10);
  showTitlesTable();
  const spinner = document.getElementsByClassName('spinner');
  table.innerHTML = spinner;
  await showRegisters();
  // const fader = document.getElementById('fader');
  // fader.classList.add("close");
  // fader.style.display = 'none';
})