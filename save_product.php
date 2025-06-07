<?php 
        require_once 'autenticazione.php';
        if (!$userid = checkAuth()) exit;

        saveProduct();

    function saveProduct() {
        global $dbconfig, $userid;

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

        $userid = mysqli_real_escape_string($conn, $userid);
        $title = mysqli_real_escape_string($conn, $_POST['title']);
        $snippet = mysqli_real_escape_string($conn, $_POST['snippet']);
        $price = mysqli_real_escape_string($conn, $_POST['price']);
        $thumbnail = mysqli_real_escape_string($conn, $_POST['thumbnail']);

        // Verifica se già salvato
        $checkQuery = "SELECT * FROM products WHERE user_id = '$userid' AND title = '$title'";
        $res = mysqli_query($conn, $checkQuery) or die(mysqli_error($conn));
        if (mysqli_num_rows($res) > 0) {
            echo json_encode(['ok' => true, 'message' => 'Già salvato']);
            exit;
        }

        $insertQuery = "INSERT INTO products(user_id, title, snippet, price, thumbnail)
                        VALUES ('$userid', '$title', '$snippet', '$price', '$thumbnail')";

        if (mysqli_query($conn, $insertQuery)) {
            echo json_encode(['ok' => true]);
        } else {
            echo json_encode(['ok' => false, 'error' => mysqli_error($conn)]);
        }

        mysqli_close($conn);
    }
?>