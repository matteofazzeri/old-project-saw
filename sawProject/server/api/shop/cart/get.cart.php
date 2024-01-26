<?php
require __DIR__ . '/../../inc/inc.php';

$user_id = $_GET['user_id'];

echo json_encode(getElem('SELECT * FROM shopping_cart WHERE user_id = :user_id', [
    'user_id' => $user_id,
]));