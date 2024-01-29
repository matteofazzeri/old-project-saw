<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>SAW: profile</title>
    </head>
    <body>
        <?php
            session_start();
            if(!isset($_SESSION["username"])) {
                header("Location: login.php");
                exit();
            }
            echo "Welcome " . $_SESSION["username"];
        ?>
        <br>
        <a href="logout.php">Logout</a>
    </body>
</html>