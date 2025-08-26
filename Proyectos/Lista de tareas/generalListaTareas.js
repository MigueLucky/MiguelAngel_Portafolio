$(function () {
    $("#volverAtras").on("click", function () {
        window.location.href = "https://miguelucky.github.io/MiguelAngel_Portafolio/";
    });

    function cargarTareas() {
        $.getJSON('generalListaTareas.json', function (tareas) {
            let lista = $('#listaTareas');
            lista.empty();
            tareas.forEach(function (tarea) {
                const tareaHtml = `
                <div id="${tarea.id}" class="tarea">
                    <div>
                        <strong>${tarea.nombre}</strong>
                        <p>${tarea.descripcion}</p>
                    </div>
                    <div>
                        <button id="${tarea.id}" class="btnEditarTarea">Editar</button>
                        <button id="${tarea.id}" class="btnBorrarTarea">Borrar</button>
                    </div>
                </div>
            `;
                lista.append(tareaHtml);
            });
        });

        $(".btnEditarTarea").off().on("click", function () {

        })

        $(".btnBorrarTarea").off().on("click", function () {
            $(this).id
        })
    }
    cargarTareas();
});