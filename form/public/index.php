<?php

require "../src/inc/bootstrap.php";
if(isset($_SESSION['login']) && !$_SESSION['login'])
    header("location:../src/login.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Welcome User</h1>
    <h3>Try login or register to access your personal information</h3>
    <a href="../src/login.php">Login</a>
    <br>
    <a href="../src/registration.php">Signup</a>
</body>
</html>