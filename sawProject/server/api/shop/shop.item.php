<?php

require __DIR__ . '/../inc/inc.php';

//$category = $_GET['categories'];
$serchItem = $_GET['search'];

echo getElem(
    "SELECT * FROM `products` WHERE `name` LIKE :search",
    [
        'search' => '%' . $serchItem . '%'
    ]
);