<?php
require __DIR__ . '/../../inc/inc.php';

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// * remove from db

$e = insertValue('DELETE FROM shopping_cart WHERE user_id = :user_id AND product_id = :product_id', [
    'user_id' => $data['user_id'],
    'product_id' => $data['product_id']
]);

if ($e !== true) {
    echo $e;
    exit();
}

http_response_code(204);
exit();