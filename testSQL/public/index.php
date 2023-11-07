<?php

require __DIR__ . ('/../src/inc/included.php');

if (!isLogged()) {
  header('Location: ../src/login.php');
} else {
  $user = $_SESSION['id'];
}

display('head', ['title' => 'Home', 'css' => ['style', 'navbar']]);
display('header', []);
?>

<div class="container">
  <div>
    <h1>Welcome <?php echo dbInfo($user, 'username')?></h1>
  </div>
</div>

<?php
display('foot')
?>