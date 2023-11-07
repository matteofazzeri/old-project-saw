<header>
  <div class="header">
    <img src="..." alt="logo">
    <nav>
      <?php
      echo '<span class="nav-item"><a href="../public/index.php">Home</a></span>';
      if (isLogged()) {
        echo '
          <span class="nav-item"><a href="../src/showProfile.php">show profile</a></span>
          <span class="nav-item"><a href="../src/logout.php">logout</a></span>
        ';
      } else {
        echo '
          <span class="nav-item"><a href="../src/registration.php">signin</a></span>
          <span class="nav-item"><a href="../src/login.php">login</a></span>
        ';
      }
      ?>
    </nav>
  </div>
</header>