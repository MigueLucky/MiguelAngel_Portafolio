$(function () {
    const API_KEY = "0f5a2a6d7654443a83dd01d51984aede";

    $("#volverAtras").on("click", function () {
        window.location.href = "https://miguelucky.github.io/MiguelAngel_Portafolio/";
    });

    if (navigator.geolocation) {
        $("#manual").on("click", function () {
            $("#automatico").css("width", "30%");
            $("#manual").css("width", "70%");
            manualmente();
        });

        $("#automatico").on("click", function () {
            $("#automatico").css("width", "70%");
            $("#manual").css("width", "30%");
            $("#manual").empty();
            $("#manual").append("<strong>Manualmente</strong>")

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let latitud = position.coords.latitude;
                    let longitud = position.coords.longitude;

                    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitud}&lon=${longitud}&appid=${API_KEY}`)
                        .then(response => response.json())
                        .then(data => establecerMainCambiarFondo(data))
                },
                function (error) {
                    console.error("Error al obtener la ubicación:", error.message);
                }
            );
        });
    } else {
        $("#automatico").hide();
        $("#manual").css("width", "100%");
        manualmente();
    }
})

function manualmente() {
    $("#manual").empty();
    $("#manual").append(`
        <input type="text" id="provincia" placeholder="Escribe tu provincia...">
        <input type="text" id="ciudad" placeholder="Escribe tu ciudad...">
        `);
}

function establecerMainCambiarFondo(data) {
    console.log(data);
}