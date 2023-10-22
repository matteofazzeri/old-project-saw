<?php

include ("../src/libs/helpers.php");

session_start();

if(isLogged()) {
    header("location: ../src/index.php");
} else {
    header("location: ../src/login.php");
}

