import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore();

$(function () {
    $("#volverAtras").on("click", function () {
        window.location.href = "https://miguelucky.github.io/MiguelAngel_Portafolio/";
    });

    $("#buscadorTareas").on("input", function () {
    let texto = $(this).val().toLowerCase();

    $("#listaTareas .tarea").each(function () {
        let nombre = $(this).find("strong").text().toLowerCase();
        let descripcion = $(this).find("p").text().toLowerCase();

        if (nombre.includes(texto) || descripcion.includes(texto)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});

    $("#btnCrearTareas").on("click", function () {
        $("body").addClass("modal-abierto");

        $("#fondoNegro").addClass("activo");
        $("body").addClass("modal-abierto");

        $(".contenidoFondoNegro div h3").text("Crea nueva tarea")
        $("#fondoNegro").fadeIn(300).css("display", "flex");

        $("#btnGuardarYCrear").off().on("click", function () {
            let nombreTarea = $("#nombreTarea").val();
            let descripcionTarea = $("#descripcionTarea").val();

            if (nombreTarea) {
                crearTarea(nombreTarea, descripcionTarea);

                cerrarFondoNegro();
            } else {
                $(".error").text("Por favor, ponle un nombre a la tarea.");
            };
        });

        $(".fa-xmark").on("click", function () {
            cerrarFondoNegro();
        });
    });

    $("#listaTareas").on("click", ".btnEditarTarea", function () {
        $("body").addClass("modal-abierto");

        let idTarea = $(this).attr("id");
        let nombreTarea = $(this).data("nombre");
        let descripcionTarea = $(this).data("descripcion");

        $("#nombreTarea").val(nombreTarea);
        $("#descripcionTarea").val(descripcionTarea);
        $(".contenidoFondoNegro div h3").text("Edita tarea")

        $("#fondoNegro").fadeIn(300).css("display", "flex");

        $("#btnGuardarYCrear").off().on("click", function () {
            nombreTarea = $("#nombreTarea").val();
            descripcionTarea = $("#descripcionTarea").val();

            if (nombreTarea) {
                editarTarea(idTarea, nombreTarea, descripcionTarea);

                cerrarFondoNegro();
            } else {
                $(".error").text("Por favor, ponle un nombre a la tarea.");
            };
        });

        $(".fa-xmark").on("click", function () {
            cerrarFondoNegro();
        });
    });

    $("#listaTareas").on("click", ".btnBorrarTarea", function () {
        let idTarea = $(this).attr("id");

        borrarTarea(idTarea)
    });

    cargarTareas();
});

function renderizarTareas(tareas) {
    $("#listaTareas").empty();
    $("#buscadorTareas").val("");

    tareas.forEach(function (tarea) {
        const tareaHtml = `
                <div id="${tarea.id}" class="tarea">
                    <div>
                        <strong>${tarea.nombre}</strong>
                        <p>${tarea.descripcion && tarea.descripcion.trim() ? tarea.descripcion : "Tarea sin descripción"}</p>
                    </div>
                    <div>
                        <button id="${tarea.id}" class="btnEditarTarea" data-nombre="${tarea.nombre}" data-descripcion="${tarea.descripcion}">Editar</button>
                        <button id="${tarea.id}" class="btnBorrarTarea">Borrar</button>
                    </div>
                </div>
            `;
        $("#listaTareas").append(tareaHtml);
    });
};

function cerrarFondoNegro() {
    $("#fondoNegro").fadeOut(300, function () {
        $("#descripcionTarea").val("");
        $("#nombreTarea").val("");
        $(".error").text("");
        $("body").removeClass("modal-abierto");
    });
}

async function cargarTareas() {
    const querySnapshot = await getDocs(collection(db, "tareas"));
    const tareas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderizarTareas(tareas);
}

async function crearTarea(nombre, descripcion) {
    await addDoc(collection(db, "tareas"), { nombre, descripcion });
    cargarTareas();
}

async function editarTarea(id, nombre, descripcion) {
    const tareaRef = doc(db, "tareas", id);
    await updateDoc(tareaRef, { nombre, descripcion });
    cargarTareas();
}

async function borrarTarea(id) {
    const tareaRef = doc(db, "tareas", id);
    await deleteDoc(tareaRef);
    cargarTareas();
}