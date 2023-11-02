<?php

require __DIR__ . ('/../src/inc/included.php');

/* if(!isLogged()) {
    header('Location: ../src/login.php');
} */

?>

<?php 
    display('head', ['title' => 'Home', 'css' => ['style', 'navbar']]);
    display('header',[]);
?>



<?php 
    display('foot') 
?>