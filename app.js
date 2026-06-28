// div weather section donde se mostrara la info
const weatherSection = document.getElementById("weatherSection"); 

// Boton submit
const inputEnviar = document.getElementById("submit");

/**
 * Función asincrona que hace la llamada a la API para obtener el tiempo de una ciudad buscada por el usuario.
 * @author Kevin Guerrero
 * @param {String} ciudadBuscada 
 * @returns JSON con los datos del tiempo
 */
async function obtenerTiempo(ciudadBuscada) {
    try {
        // Llamar a la API
        const respuesta = await fetch(`/api/weather?city=${ciudadBuscada}`);
        const datosDelTiempo = await respuesta.json();

        return datosDelTiempo;

    } catch (error) {
        console.error("Error al obtener el tiempo:", error);
    }
};

/**
 * Función que muestra el clima en la página utilizando los datos de un JSON que recibe por parametro.
 * @author Kevin Guerrero
 * @param {JSON} datosDelTiempo
 */

function pintarResultados(datosDelTiempo) {

    // Mostrar descripción del clima
    datosDelTiempo.weather.forEach(clima => {
        creadorDeElementosInfo('p', clima.description, false, "", "");
        const imagen = document.createElement('img');

        imagen.src = `https://openweathermap.org/img/wn/${clima.icon}.png`;
        imagen.alt = `https://openweathermap.org/img/wn/${clima.description}`;

        weatherSection.appendChild(imagen);
    });

    // Mostrar los resultados principales (Temperatura, temperatura min y max, humedad...)
    creadorDeElementosInfo('p', datosDelTiempo.main.temp, true, "Temperatura: ", "C°")
    creadorDeElementosInfo('p', datosDelTiempo.main.temp_min, true, "Temperatura Mínima: ", "C°")
    creadorDeElementosInfo('p', datosDelTiempo.main.temp_max, true, "Temperatura Máxima: ", "C°")
    creadorDeElementosInfo('p', datosDelTiempo.main.humidity, false, "Humedad", "%");
}

/**
 * Función que convierte de kelvin a grados celsius.
 * @param {Number} kelvin - La temperatura en Kelvin.
 * @returns gradosCelsius redondeados, ejemplo: (K: 306.57 | C°: 33).
 */
function calcularGrados(kelvin) {
    let gradosSinRedondear = kelvin - 273.15;
    let gradosCelsius = Math.round(gradosSinRedondear);

    return gradosCelsius;
}

function creadorDeElementosInfo(elemento, valorParam, necesitaConversion, textoInfo, textoFinal) {
    // Crear Elemento
    let nuevoElemento = document.createElement(elemento);

    // Convertir valor a celsius (Si es que es necesario)
    let valorElemento;

    if (necesitaConversion === true){
        valorElemento = calcularGrados(valorParam);
    }else {
        valorElemento = valorParam;
    };

    // Poner la info en el elemento
    nuevoElemento.textContent = `${textoInfo} ${valorElemento} ${textoFinal}`;

    weatherSection.appendChild(nuevoElemento);
}

// Evento cuando el usuario introduce una ciudad
inputEnviar.addEventListener("click", async (event)=> {
    let inputUsuari = document.getElementById("busquedad").value;
    weatherSection.style.display = "block";
    if(inputUsuari == "") {
        weatherSection.innerHTML = `
        <div> 
            <h2> ERROR: No se ha introducido ninguna ciudad </h2>
            <p> Por favor intentelo de nuevo con una <u> ciudad validad</u> . </p>
        </div>
        `;
        return;
    }else {
        let datosJSON = await obtenerTiempo(inputUsuari);
        pintarResultados(datosJSON);
    }
});