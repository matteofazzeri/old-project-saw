<?php

require __DIR__ . '/../../inc/inc.php';

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// * add to db

$e = insertValue('INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES (:user_id, :product_id, :quantity)', [
    'user_id' => $data['user_id'],
    'product_id' => $data['product_id'],
    'quantity' => $data['quantity']
]);

if ($e !== true) {
    echo $e;
    exit();
}


http_response_code(204);
exit();