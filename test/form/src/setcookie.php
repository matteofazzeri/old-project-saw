<?php
    include './inc/bootstrap.php';

    /* if(!isLogged()) {
        header('Location: ../public/index.php');
    } */


    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        if(isset($_POST['set'])) {
            setcookie('text-font', $_POST['text-font'], time() + (86400 * 30));
            setcookie('text-color', $_POST['text-color'], time() + (86400 * 30));
            setcookie('back-color', $_POST['back-color'], time() + (86400 * 30));
            header('location: ./showcookie.php');
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./libs/cookies.css">
    <title>Set-cookies</title>
</head>
<body>
    <div class="cookie">
        <form action="#" method="POST">
            <div class="data-input">
                <span>
                    <label for="back-color">Background Color:</label>
                    <input type="color" name="back-color" id="back-color" value="#ffffff">
                </span>
                <span>
                    <label for="text-color">Text Color:</label>
                    <input type="color" name="text-color" id="text-color">
                </span>
                <span>
                    <label for="text-font">Choose Font:</label>
                    <select name="text-font" id="text-font">
                      <option value="arial" selected>Arial</option>
                      <option value="sans-serif">Sans Serif</option>
                      <option value="monospace">monospace</option>
                      <option value="fantasy">fantasy</option>
                      <option value="cursive">cursive</option>
                      <option value="serif">serif</option>
                      <option value="verdana">verdana</option>
                    </select>
                </span>
            </div>
            <div class="submit-button">
                <input type="submit" name="set" value="Imposta">
            </div>
        </form>
    </div>
</body>
</html>