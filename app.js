// Función asincrona para obtener el tiempo de una ciudad buscada
async function obtenerTiempo(ciudadBuscada) {
    try {
        // Llamar a la API
        const respuesta = await fetch(`/api/weather?city=${ciudadBuscada}`);
        const datosDelTiempo = await respuesta.json();

        // Resulados de la respuesta que devuelve OpenWeatherMap en la consola
        console.log(datosDelTiempo);

        // TODO: Pintar aqui los resultados o hacer una función que lo haga

    } catch (error) {
        console.error("Error al obtener el tiempo:", error);
    }
};

// Boton submit
const inputEnviar = document.getElementById("submit");

// div weather section donde se mostrara la info
const weatherSection = document.getElementById("weatherSection"); 

// Evento cuando el usuario introduce una ciudad
inputEnviar.addEventListener("click", function() {
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
        obtenerTiempo(inputUsuari);
    }
});

// Pruebas
//obtenerTiempo("Barcelona")