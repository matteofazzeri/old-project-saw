<?php

include ('./inc/included.php');

$_SESSION = [];

session_unset();
session_destroy();

setcookie('rmbme', '', time() - 3600);


header(("location: login.php"));