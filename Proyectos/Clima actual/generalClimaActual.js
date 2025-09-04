$(function () {
    const API_KEY = "0f5a2a6d7654443a83dd01d51984aede";

    $("#volverAtras").on("click", function () {
        window.location.href = "https://miguelucky.github.io/MiguelAngel_Portafolio/";
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let latitud = position.coords.latitude;
                let longitud = position.coords.longitude;

                fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitud}&lon=${longitud}&appid=${API_KEY}`)
                    .then(response => response.json())
                    .then(data => console.log(data))
            },
            function (error) {
                console.error("Error al obtener la ubicación:", error.message);
            }
        );
    } else {
        console.error("La geolocalización no está soportada en este navegador.");
    }
})