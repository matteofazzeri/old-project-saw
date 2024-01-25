<?php
// process-data.php

header("Access-Control-Allow-Origin: *");

$requestURL = explode('/', $_SERVER['REQUEST_URI']);

$URL_lenght = $requestURL[count($requestURL) - 1];


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require __DIR__ . "/post.cart.php";
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    require __DIR__ . "/get.cart.php";
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    require __DIR__ . "/put.php";
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    require __DIR__ . "/delete.cart.php";
} else {
    echo "Invalid request";
}
exit();