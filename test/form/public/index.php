<?php

include(realpath("../src/inc/bootstrap.php"));

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../src/libs/style.css">
  <title>Home</title>
</head>

<body>
  <div class="container">
    <h1>Welcome <?php echo showData(1) ?? "" ?></h1>

    <div class="data-show">
      <h3>Your Personal Data:</h3>


      <?php
      if (!isLogged())
        echo "<h5>It appers you are not registered/logged in.
                    Try login or signup to see your data</h5>";
      ?>

      <ul class="data">
        <li class="data-field">
          <span class="data-title">
            <label for="data-email">E-mail:</label>
          </span>
          <p class="data-email"><?php echo showData(0) ?? ""; ?></p>
        </li>
        <li class="data-field">
          <span class="data-title">
            <label>Name & Lastname:</label>
          </span>
          <p><?php echo showData(2); ?></p>
        </li>
        <li class="data-field">
          <span class="data-title">
            <label>Username:</label>
          </span>
          <p><?php echo showData(1); ?></p>
        </li>
      </ul>
      <?php if (isLogged()) echo "<a href='../src/setcookie.php'>Try out cookie</a>"; ?>
    </div>
    <div class="logout">
      <?php
      if (isLogged())
        echo "<a href='../src/logout.php'>Logout</a>";
      else {
        echo "<a href='../src/login.php'>Login</a>";
        echo "<p>or</p>";
        echo "<a href='../src/registration.php'>Signup</a>";
      }
      ?>
    </div>
  </div>


</body>

</html>