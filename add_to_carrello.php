<?php
    require_once 'autenticazione.php';
    if (!$userid = checkAuth()) {
        echo json_encode(['ok' => false, 'error' => 'Utente non autenticato']);
        exit;
    }

    require_once 'configurazione.php';

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    if (mysqli_connect_errno()) {
        echo json_encode(['ok' => false, 'error' => 'Connessione fallita']);
        exit;
    }

    $userid = mysqli_real_escape_string($conn, $userid);
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $snippet = mysqli_real_escape_string($conn, $_POST['snippet']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);
    $thumbnail = mysqli_real_escape_string($conn, $_POST['thumbnail']);

    // Evita duplicati nel carrello
    $checkQuery = "SELECT * FROM cart WHERE user_id = '$userid' AND title = '$title'";
    $res = mysqli_query($conn, $checkQuery);
    if (mysqli_num_rows($res) > 0) {
        echo json_encode(['ok' => true, 'message' => 'Già nel carrello']);
        exit;
    }

    $insertQuery = "INSERT INTO cart(user_id, title, snippet, price, thumbnail)
                    VALUES ('$userid', '$title', '$snippet', '$price', '$thumbnail')";

    if (mysqli_query($conn, $insertQuery)) {
        echo json_encode(['ok' => true]);
    } else {
        echo json_encode(['ok' => false, 'error' => mysqli_error($conn)]);
    }

    mysqli_close($conn);
?>