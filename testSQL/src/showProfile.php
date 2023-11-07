<?php
require __DIR__ . ('/../src/inc/included.php');

if(!isLogged()) {
  header('Location: ../src/login.php');
}


display('head', ['title' => 'Profile', 'css' => ['style', 'navbar']]);
display('header', []);

?>

<div class="container">
  <div>
    <h1>Welcome <?php echo dbInfo($user_id, 'name') ?></h1>
  </div>
  <div class="grid">
    <span class="grid-line">
      <h5>E-mail:</h5>
      <p><?php echo dbInfo($user_id, 'email') ?></p>
    </span>
    <span class="grid-line">
      <h5>Username:</h5>
      <p><?php echo dbInfo($user_id, 'username') ?></p>
    </span>
    <span class="grid-line">
      <h5>Password:</h5>
      <p><?php echo '************' ?></p>
    </span>
  <div>
</div>