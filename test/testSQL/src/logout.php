<?php

include ('./inc/included.php');

insertValue(
  "UPDATE logged SET expire_date = :expire_date, keep_logged = :keep_logged WHERE users_id = :users_id;",
  [
    'expire_date' => date('Y-m-d H:i:s', time()),
    'keep_logged' => 0,
    'users_id' => $_SESSION['id']
  ]
);

$_SESSION = [];
$_SESSION['id'] = 0;
$_SESSION['logged'] = false;

session_unset();
session_destroy();

setcookie('rmbme', '0', time() - 3600);

header(("location: login.php"));