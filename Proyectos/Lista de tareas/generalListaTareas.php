<?php
// Aclaracion, este archivo y el json no se usan para NADA, una vez que lo he terminado de programar,
// me he dado cuenta que en GitHub Pages no se puede usar lenguajes de backend, solo archivos estaticos
// asi que he dicidido usar un api externa llamada Firebase, aun asi, he decidido dejarlo, para que veais
// como haria un CRUD. 
header('Content-Type: application/json');

$jsonFile = 'generalListaTareas.json';

// Mostrar todas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($jsonFile)) {
        $tareas = json_decode(file_get_contents($jsonFile), true);
        echo json_encode($tareas, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode([]);
    }
    exit;
}

// Crear
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $tareas = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];

    if (isset($data['nombre'])) {
        $nuevoId = count($tareas) > 0 ? max(array_column($tareas, 'id')) + 1 : 1;
        $tareas[] = [
            'id' => $nuevoId,
            'nombre' => $data['nombre'],
            'descripcion' => isset($data['descripcion']) ? $data['descripcion'] : ''
        ];

        file_put_contents($jsonFile, json_encode($tareas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['ok' => true, 'tareas' => $tareas]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos para crear tarea']);
    exit;
}

// Editar
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    $tareas = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];

    if (isset($data['id'], $data['nombre'])) {
        foreach ($tareas as &$tarea) {
            if ($tarea['id'] == $data['id']) {
                $tarea['nombre'] = $data['nombre'];
                $tarea['descripcion'] = isset($data['descripcion']) ? $data['descripcion'] : '';
            }
        }

        unset($tarea);
        file_put_contents($jsonFile, json_encode($tareas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['ok' => true, 'tareas' => $tareas]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos para editar tarea']);
    exit;
}

// Borrar
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    $tareas = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];

    if (isset($data['id'])) {
        $tareas = array_filter($tareas, function ($t) use ($data) {
            return $t['id'] != $data['id'];
        });
        $tareas = array_values($tareas); // Reindexar
        file_put_contents($jsonFile, json_encode($tareas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['ok' => true, 'tareas' => $tareas]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'ID no proporcionado para borrar tarea']);
    exit;
}
