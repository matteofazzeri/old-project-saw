<?php

require __DIR__ . ('/../src/inc/included.php');

if (!isLogged()) {
  header('Location: ../src/login.php');
} else {
  $user = $_SESSION['username'];
  //echo 'ok -> ' . explode(' ', $user)[0];
}

display('head', ['title' => 'Home', 'css' => ['style', 'navbar']]);
display('header', []);
?>


<h1>Welcome <?php echo $user?></h1>


<?php
display('foot')
?>