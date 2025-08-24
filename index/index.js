$(function () {
    const proyectos = [
        { "nombre": "Mario" },
        { "nombre": "Lista de tareas" }
    ];

    proyectos.forEach(proyecto => {
        let div = $('<div></div>');

        let img = $('<img>', {
            class: 'imgProyecto',
            src: 'Proyectos/' + proyecto.nombre + '/img/' + proyecto.nombre + '.png'
        });

        let p = $('<p></p>').text(proyecto.nombre);

        div.append(img, p);
        $('main').append(div);
    });
});
