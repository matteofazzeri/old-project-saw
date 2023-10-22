<?php

session_start();
/*
if(isset($_SESSION['login']) && $_SESSION['login'] == true) {
    if(isset($_SESSION['username'])) {
        $username = $_SESSION['username'];
    }
} else {
    header("location: ./login.php");
}*/

include ("./libs/helpers.php");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <div class="container">
        <h1>Welcome <?php echo $username ?? "" ?></h1>

        <h3>Your Personal Data</h3>
        <p>E-mail: <?php echo showData(0);?></p>
        <p>Name & Lastname: <?php echo showData(2);?></p>
        <p>Username: <?php echo showData(1);?></p>
        
    </div>

    <?php 
        if(isLogged()) 
            echo "<a href='logout.php'>Logout</a>"; 
        else
            echo "<a href='login.php'>Login</a>";
    ?>
</body>
</html>