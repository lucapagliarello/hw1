<?php
    session_start();
    require_once 'configurazione.php';
    require_once 'autenticazione.php';

    if (!checkAuth()) {
        header('Location: accesso.php');
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    if (!$conn) {
        die("Connessione fallita: " . mysqli_connect_error());
    }

    $user_id = $_SESSION['_agora_user_id'];

    $query = "SELECT username FROM users WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $user_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $username);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);

    if (!$username) {
        echo "Errore: utente non trovato.";
        exit;
    }

    $qualita = isset($_POST['qualita']) ? (int)$_POST['qualita'] : null;
    $spedizione = isset($_POST['spedizione']) ? (int)$_POST['spedizione'] : null;
    $assistenza = isset($_POST['assistenza']) ? (int)$_POST['assistenza'] : null;
    $commento = isset($_POST['commento']) ? trim($_POST['commento']) : null;

    if (!$qualita || !$spedizione || !$assistenza) {
        echo "Errore: Tutti i campi di valutazione devono essere compilati.";
        exit;
    }

    $stmt = mysqli_prepare($conn, "INSERT INTO recensioni (username, qualita, spedizione, assistenza, commento) VALUES (?, ?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, "siiis", $username, $qualita, $spedizione, $assistenza, $commento);

    if (mysqli_stmt_execute($stmt)) {
        header("Location: recensioni.php");
        exit;
    } else {
        echo "Errore nell'inserimento della recensione.";
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);

?>
