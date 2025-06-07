<?php
    require_once 'autenticazione.php';
    require_once 'configurazione.php';

    if (!$userid = checkAuth()) {
        echo json_encode(['ok' => false, 'error' => 'Utente non autenticato']);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    if (!$conn) {
        echo json_encode(['ok' => false, 'error' => 'Connessione al database fallita']);
        exit;
    }

    $userid = mysqli_real_escape_string($conn, $userid);
    $id = isset($_POST['id']) ? mysqli_real_escape_string($conn, $_POST['id']) : null;

    if (!$id) {
        echo json_encode(['ok' => false, 'error' => 'ID mancante']);
        mysqli_close($conn);
        exit;
    }

    // Cancella SOLO se il prodotto appartiene all'utente loggato
    $query = "DELETE FROM cart WHERE id = '$id' AND user_id = '$userid'";

    if (mysqli_query($conn, $query)) {
        if (mysqli_affected_rows($conn) > 0) {
            echo json_encode(['ok' => true]);
        } else {
            echo json_encode(['ok' => false, 'error' => 'Nessuna riga corrispondente trovata']);
        }
    } else {
        echo json_encode(['ok' => false, 'error' => mysqli_error($conn)]);
    }

    mysqli_close($conn);
?>
