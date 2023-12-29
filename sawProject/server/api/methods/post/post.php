<?php

if(strpos($_SERVER['REQUEST_URI'], 'form')) {
    if($_GET['registration']) {
        /* CASO DI REGISTER */
        echo json_encode("vero");
    }
    else {
        /* CASO DI LOGIN */
        require __DIR__ . "/forms/login.php";
    }
}