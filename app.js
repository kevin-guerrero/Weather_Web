// Función asincrona para obtener el tiempo de una ciudad buscada
async function obtenerTiempo(ciudadBuscada) {
    try {
        // Llamar a la API
        const respuesta = await fetch(`/api/weather?city=${ciudadBuscada}`);
        const datosDelTiempo = await respuesta.json();

        // Resulados de la respuesta que devuelve OpenWeatherMap en la consola
        console.log(datosDelTiempo);

    } catch (error) {
        console.error("Error al obtener el tiempo:", error);
    }
}

// Pruebas
obtenerTiempo("Barcelona")