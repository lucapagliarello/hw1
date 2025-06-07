<?php
    header('Content-Type: application/json');

    $q = $_GET['q'] ?? '';
    $criterio = $_GET['criterio'] ?? 'title';
    $lingua = $_GET['lingua'] ?? '';

    $q = trim($q);
    if ($q === '') {
      echo json_encode(['docs' => [], 'num_found' => 0]);
      exit;
    }

    $url = 'https://openlibrary.org/search.json?' . urlencode($criterio) . '=' . urlencode($q);
    if ($lingua !== '') {
      $url .= '&language=' . urlencode($lingua);
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
?>
