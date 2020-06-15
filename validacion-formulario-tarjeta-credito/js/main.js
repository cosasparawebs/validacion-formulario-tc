const tarjeta = document.querySelector('#tarjeta');
const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const formulario = document.querySelector('#formulario-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .numero');
const nombreTarjeta = document.querySelector('#tarjeta .nombre');
const logoMarca = document.querySelector('#logo-marca');
const firma = document.querySelector('#tarjeta .firma p');
const mesExpiracion = document.querySelector('#tarjeta .mes');
const yearExpiracion = document.querySelector('#tarjeta .year');
const ccv = document.querySelector('#tarjeta .ccv');

//muestra frente de la tarjeta al escribir

const mostrarFrente = () =>{
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}


//rotacion tarjeta

tarjeta.addEventListener('click', () =>{
    tarjeta.classList.toggle('active');
});

//abrir formulario
btnAbrirFormulario.addEventListener('click', () =>{
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

//generar select mes

for(i = 1; i <=12; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

//generar select año

// *** el for de abajo es mejor porque se actualiza solo
// for(i = 2020; i <= 2027; i++){
//     let opcionYear = document.createElement('option');
//     opcionYear.value = i;
//     opcionYear.innerText = i;
//     formulario.selectYear.appendChild(opcionYear);
// }

const yearActual = new Date().getFullYear();
for(i = yearActual; i <= yearActual + 8; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

//input numero tarjeta

formulario.inputNumero.addEventListener('keyup', (e) =>{
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput

    //EXPRESIONES REGULARES:
    //elimina espacios en blanco 
    .replace(/\s/g, '')
    //elimina las letras
    .replace(/\D/g, '')
    //agregar espacios cada 4 numeros
    .replace(/([0-9]{4})/g, '$1 ')
    //elimina el ultimo espacio
    .trim();

    numeroTarjeta.textContent = valorInput;

    if(valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';
        logoMarca.innerHTML = '';
    }

    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);

    }else if(valorInput[0] == 5){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    //da vuelta la tarjeta al frente
    mostrarFrente();
});

//input nombre tarjeta

formulario.inputNombre.addEventListener('keyup', (e) =>{
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == ''){
        nombreTarjeta.textContent = '------ ------';
    }

    mostrarFrente();
});

//select mes

formulario.selectMes.addEventListener('change', (e) =>{
    mesExpiracion.textContent = e.target.value;

    mostrarFrente();
});

// select año

formulario.selectYear.addEventListener('change', (e) =>{
    yearExpiracion.textContent = e.target.value.slice(2);

    mostrarFrente();
});

//ccv

formulario.inputCCV.addEventListener('keyup', () =>{
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active');
    }

    formulario.inputCCV.value = formulario.inputCCV.value
    .replace(/\s/g, '')
    .replace(/\D/g, '');

    ccv.textContent = formulario.inputCCV.value;
})