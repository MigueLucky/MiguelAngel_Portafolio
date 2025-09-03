$(function () {
    mostrarProyectosMain();

    $(".alternarMain").on("click", function () {
        let $main = $("main");
        let tipoActual = $(this).data("tipo");
        let $boton = $(this);

        $main.fadeOut(200, function () {
            $main.empty();

            if (tipoActual === "proyectos") {
                $boton.data("tipo", "contacto");
                $boton.text("Vuelve a seguir viendo mis proyectos");

                $main.removeClass("proyectos").addClass("contacto");
                mostrarContacto();
            } else {
                $boton.data("tipo", "proyectos");
                $boton.text("Contacta conmigo pinchando aquí");

                $main.removeClass("contacto").addClass("proyectos");
                mostrarProyectosMain();
            }
            $main.fadeIn(200);
        });
    });
});

function mostrarProyectosMain() {
    const proyectos = [
        { "nombre": "Lista de tareas" }
    ];

    proyectos.forEach(proyecto => {
        let div = $('<div></div>');

        div.on("click", function () {
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
}

function mostrarContacto() {
    $("main").append(`
        <form id="formContacto" action="https://formsubmit.co/miguejordaterol@gmail.com" method="POST">
            <input type="text" name="asunto" placeholder="Asunto del email" />
            <textarea name="descripcion" placeholder="Descripción del email" rows="5"></textarea>
            <input type="email" name="email" placeholder="Tu correo (opcional, para poder responderte)" />

            <button type="submit">Enviar</button>

            <p class="error">Por favor, rellena todos los campos obligatorios antes de enviar.</p>
        </form>
    `);

    $("main").off().on("submit", "#formContacto", function () {
        let asunto = this.asunto.value.trim();
        let descripcion = this.descripcion.value.trim();

        if (!asunto || !descripcion) {
            $(".error").show();
            return false; 
        }  else {
            $("main").empty();
            $("main").append(`
                <h2>Mensaje enviado correctamente, le responderé lo antes posible.</h2>
                <h3>Se le movera automaticamente al index pasados unos segundos</h3>
                `);
            
            setTimeout(function() {
                window.location.href = "index.html";
            }, 5000);

            return true;
        }
    });
}
