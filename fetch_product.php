<?php 
    require_once 'autenticazione.php';
    if (!$userid = checkAuth()) exit;

    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $userid);

    $query = "SELECT id, title, snippet, price, thumbnail FROM products WHERE user_id = '$userid' ORDER BY id DESC LIMIT 10";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    $productArray = array();
    while ($entry = mysqli_fetch_assoc($res)) {
        $productArray[] = $entry;
    }

    echo json_encode($productArray);
    exit;

?>