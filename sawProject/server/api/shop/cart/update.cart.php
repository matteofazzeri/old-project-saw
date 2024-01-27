<?php

require __DIR__ . '/../../inc/inc.php';

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// * add to db

try {
    $e = insertValue("UPDATE shopping_cart SET quantity = :new_quantity WHERE user_id = :user_id AND product_id = :product_id", [
        'user_id' => $data['user_id'],
        'product_id' => $data['product_id'],
        'new_quantity' => $data['quantity']
    ]);

    if ($e !== true) {
        echo $e;
        exit();
    }
    echo json_encode($data);
    //http_response_code(204);
    exit();
} catch (PDOException $e) {
    echo ("Query failed: " . $e->getMessage());
    http_response_code(500); // Internal Server Error
    exit();
}
