<?php

require __DIR__ . '/../../inc/inc.php';

$userId = $_GET['user_id'];
$product_id = $_GET['product_id'];

echo "user: $userId, product_id: $product_id";


// * check if the elem is in the cart list

$cart = getElem('SELECT * FROM shopping_cart WHERE user_id = :user_id AND product_id = :product_id GROUP BY user_id', [
    'user_id' => $userId,
    'product_id' => $product_id,
]);

echo json_encode($cart);