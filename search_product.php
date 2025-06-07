<?php
    require_once 'autenticazione.php';

    if (!checkAuth()) exit;

    header('Content-Type: application/json');

    $q = $_GET['q'] ?? '';
    $q = trim($q);
    if ($q === '') {
      echo json_encode(['shopping_results' => []]);
      exit;
    }

    $api_key = '66cc39a6d9fa6b32eeb43df3e4a04c254d541982277a0477ef9a6f9661a640ef';
    $search_engine = 'google_shopping';

    $url = 'https://serpapi.com/search.json?engine=' . urlencode($search_engine) . '&q=' . urlencode($q) . '&api_key=' . urlencode($api_key);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
?>
