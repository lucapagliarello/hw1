<?php
    require_once 'autenticazione.php';
    if (!$userid = checkAuth()) {
        echo json_encode([]);
        exit;
    }

    require_once 'configurazione.php';
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $userid = mysqli_real_escape_string($conn, $userid);
    $query = "SELECT id, title, snippet, price, thumbnail FROM cart WHERE user_id = '$userid'";

    $res = mysqli_query($conn, $query);
    $products = [];

    while ($row = mysqli_fetch_assoc($res)) {
        $products[] = $row;
    }

    echo json_encode($products);
    mysqli_close($conn);
?>
