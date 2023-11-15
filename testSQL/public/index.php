<?php

require __DIR__ . ('/../src/inc/included.php');

if (!isLogged()) {
  header('Location: ../src/login.php');
}

display('head', ['title' => 'Home', 'css' => ['style', 'navbar']]);
display('header', []);
?>

<div class="container">
  <div>
    <h1>Welcome <?php echo dbInfo($user_id, 'name') ?></h1>
  </div>
  <a href="../src/ecommerce.php">
    <button class='shop-btn'>SHOP</button>
  </a>
</div>

<?php
display('foot')
?>