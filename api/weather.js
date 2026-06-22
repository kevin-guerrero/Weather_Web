export default async function handler(request, response) {
    // Ciudad que el usuario envia desde la web
    const { city } = request.query;

    // Clave guardada que lee Vercel
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // Llamada a OpenWeatherMap de forma oculta
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        // 4. Devolver los datos del tiempo a la web
        return response.status(200).json(data);

    } catch (error) {
        // Mostrar error en la consola
        console.error("Error interno detectado:", error);
    }

}