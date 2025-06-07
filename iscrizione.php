<?php
require_once 'autenticazione.php';

if (checkAuth()) {
    header("Location: home.php");
    exit;
}   

if (!empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["name"]) && 
    !empty($_POST["surname"]) && !empty($_POST["confirm_password"]) && !empty($_POST["allow"]))
{
    $error = array();
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
        $error[] = "Username non valido";
    } else {
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $query = "SELECT username FROM users WHERE username = '$username'";
        $res = mysqli_query($conn, $query);
        if (mysqli_num_rows($res) > 0) {
            $error[] = "Username già utilizzato";
        }
    }

    if (strlen($_POST["password"]) < 8) {
        $error[] = "Caratteri password insufficienti";
    } 

    if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
        $error[] = "Le password non coincidono";
    }

    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $error[] = "Email non valida";
    } else {
        $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
        $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
        if (mysqli_num_rows($res) > 0) {
            $error[] = "Email già utilizzata";
        }
    }

    if (count($error) == 0) {
        $name = mysqli_real_escape_string($conn, $_POST['name']);
        $surname = mysqli_real_escape_string($conn, $_POST['surname']);

        $password = mysqli_real_escape_string($conn, $_POST['password']);
        $password = password_hash($password, PASSWORD_BCRYPT);

        $query = "INSERT INTO users(username, password, name, surname, email) VALUES('$username', '$password', '$name', '$surname', '$email')";
        
        if (mysqli_query($conn, $query)) {
            $_SESSION["_agora_username"] = $_POST["username"];
            $_SESSION["_agora_user_id"] = mysqli_insert_id($conn);
            mysqli_close($conn);
            header("Location: home.php");
            exit;
        } else {
            $error[] = "Errore di connessione al Database";
        }
    }

    mysqli_close($conn);
}
else if (isset($_POST["username"])) {
    $error = array("Riempi tutti i campi");
}
?>

<!DOCTYPE html>
<html>
<head>
    <link rel='stylesheet' href='iscrizione.css'>
    <script src='signup.js' defer></script>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="favicon.png">
    <meta charset="utf-8">

    <title>Iscriviti con Vinted</title>
</head>
<body>
    <div id="logo">
        Vinted
    </div>
    <main>
    <section class="main_left">
    </section>
    <section class="main_right">
        <h1>Iscriviti gratuitamente per comprare tutto quello che vuoi!</h1>
        <form name='signup' method='post' enctype="multipart/form-data" autocomplete="off">
            <div class="names">
                <div class="name">
                    <label for='name'>Nome</label>
                    <input type='text' name='name' <?php if(isset($_POST["name"])){echo "value=\"".htmlspecialchars($_POST["name"])."\"";} ?> >
                    <div><img src="close.svg"/><span>Devi inserire il tuo nome</span></div>
                </div>
                <div class="surname">
                    <label for='surname'>Cognome</label>
                    <input type='text' name='surname' <?php if(isset($_POST["surname"])){echo "value=\"".htmlspecialchars($_POST["surname"])."\"";} ?> >
                    <div><img src="close.svg"/><span>Devi inserire il tuo cognome</span></div>
                </div>
            </div>
            <div class="username">
                <label for='username'>Nome utente</label>
                <input type='text' name='username' <?php if(isset($_POST["username"])){echo "value=\"".htmlspecialchars($_POST["username"])."\"";} ?>>
                <div><img src="close.svg"/><span>Nome utente non disponibile</span></div>
            </div>
            <div class="email">
                <label for='email'>Email</label>
                <input type='text' name='email' <?php if(isset($_POST["email"])){echo "value=\"".htmlspecialchars($_POST["email"])."\"";} ?>>
                <div><img src="close.svg"/><span>Indirizzo email non valido</span></div>
            </div>
            <div class="password">
                <label for='password'>Password</label>
                <input type='password' name='password' <?php if(isset($_POST["password"])){echo "value=\"".htmlspecialchars($_POST["password"])."\"";} ?>>
                <div><img src="close.svg"/><span>Inserisci almeno 8 caratteri</span></div>
            </div>
            <div class="confirm_password">
                <label for='confirm_password'>Conferma Password</label>
                <input type='password' name='confirm_password' <?php if(isset($_POST["confirm_password"])){echo "value=\"".htmlspecialchars($_POST["confirm_password"])."\"";} ?>>
                <div><img src="close.svg"/><span>Le password non coincidono</span></div>
            </div>
            <div class="allow"> 
                <input type='checkbox' name='allow' value="1" <?php if(isset($_POST["allow"])){echo $_POST["allow"] ? "checked" : "";} ?>>
                <label for='allow'>Accetto i termini e condizioni d'uso di Vinted.</label>
            </div>
            <?php if(isset($error)) {
                foreach($error as $err) {
                    echo "<div class='errorj'><img src='close.svg'/><span>".htmlspecialchars($err)."</span></div>";
                }
            } ?>
            <div class="submit">
                <input type='submit' value="Registrati" id="submit">
            </div>
        </form>
        <div class="signup">Hai un account? <a href="accesso.php">Accedi</a></div>
    </section>
    </main>
</body>
</html>
