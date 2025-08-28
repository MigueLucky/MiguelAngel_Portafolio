import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore();

$(function () {
    $("#volverAtras").on("click", function () {
        window.location.href = "https://miguelucky.github.io/MiguelAngel_Portafolio/";
    });

    $("#btnCrearTareas").on("click", function () {
        let nombreTarea = $("#nombreTarea").val();
        let descripcionTarea = $("#descripcionTarea").val();

        crearTarea(nombreTarea, descripcionTarea);
    });

    $("#listaTareas").on("click", ".btnEditarTarea", function() {
        let idTarea = $(this).attr("id");
        let nombreTarea = $("#nombreTarea").val();
        let descripcionTarea = $("#descripcionTarea").val();

        if (nombreTarea) {
            editarTarea(idTarea, nombreTarea, descripcionTarea);
        }
    });

    $("#listaTareas").on("click", ".btnBorrarTarea", function() {
        let idTarea = $(this).attr("id");

        borrarTarea(idTarea)
    });

    cargarTareas();
});

function renderizarTareas(tareas) {
    $("#listaTareas").empty();

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
        $("#listaTareas").append(tareaHtml);
    });
};

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