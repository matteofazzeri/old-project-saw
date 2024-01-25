<?php
// process-data.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");


$requestURL = $_SERVER['REQUEST_URI'];

if (strpos($requestURL, "forms")) {
    // TODO: send request to form.php file 
} else if (strpos($requestURL, "shop")) {
    require __DIR__ . "/shop/shop.php";
} else if (strpos($requestURL, "cart")) {
    require __DIR__ . "/shop/cart/cart.php";
} else if (strpos($requestURL, "users")) {
    require __DIR__ . "/users/users.php";
}

