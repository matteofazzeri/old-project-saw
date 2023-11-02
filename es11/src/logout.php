<?php

include ('./inc/included.php');

$_SESSION = [];

session_unset();
session_destroy();

header(("location: login.php"));