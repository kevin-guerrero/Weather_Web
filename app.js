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

    // Pintar los resultados en la página
    datosDelTiempo.weather.forEach(clima => {
        const descripcion = document.createElement('p');
        const imagen = document.createElement('img');

        descripcion.textContent = `${clima.description}`;
        imagen.src = `https://openweathermap.org/img/wn/${clima.icon}.png`;
        imagen.alt = `https://openweathermap.org/img/wn/${clima.description}`

        weatherSection.appendChild(descripcion);
        weatherSection.appendChild(imagen);
    });
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