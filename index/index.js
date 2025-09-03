$(function () {
    const proyectos = [
        { "nombre": "Lista de tareas" }
    ];

    //Mostrar los proyectos en el index
    proyectos.forEach(proyecto => {
        let div = $('<div></div>');

        div.on("click", function() {
            window.location.href = "https://miguelucky.github.io/MiguelAngel_Portafolio/Proyectos/" + proyecto.nombre + "/";
        });

        let img = $('<img>', {
            class: 'imgProyecto',
            src: 'Proyectos/' + proyecto.nombre + '/img/' + proyecto.nombre + '.png'
        });

        let p = $('<p></p>').text(proyecto.nombre);

        div.append(img, p);
        $('main').append(div);
    });
});
