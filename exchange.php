<?php
    header('Content-Type: application/json');

    $from = $_GET['from'] ?? '';
    $apiKey = 'SECRET';

    if (empty($from)) {
    echo json_encode(['error' => 'Parametro "from" mancante']);
    exit;
    }

    $url = 'https://v6.exchangerate-api.com/v6/' . urlencode($apiKey) . '/latest/' . urlencode($from);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
?>
