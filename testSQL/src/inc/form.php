<?php
?>

<div class="form-container">
  <form action="#" method="post">

    <?php
    foreach ($types as $index => $type) {
      echo '<span class="input-field">';
      echo '<input type= "' . $type . '" name="' . $names[$index] . '" id="' . $names[$index] .
        '" placeholder="' . $placeholders[$index] . '" pattern="' . $patterns[$index] . '" required' .
        ' value="' . $values[$index] . '">';
      echo '</span>';
    }

    if ($remember) {
      echo '<div class="form-footer">';
      echo '<span class="checkbox">';
      echo '<label for="remember">Remember me</label>';
      echo '<input type="checkbox" name="remember" id="remember" placeholder="rember">';
      echo '</span>';
      echo '<span class="forgot-pwd">';
      echo '<a href="#">Forgot password?</a>';
      echo '</span>';
      echo '</div>';
    }

    ?>

    <input type="submit" name="submit" value="Submit">

  </form>
</div>