<?php
require __DIR__ . '/../../inc/inc.php';

$user_id = $_GET['user_id'];

$res = getElem('SELECT * FROM spaceships_detail_view as sp JOIN shopping_cart as sc ON sp.product_id = sc.product_id WHERE user_id = :user_id', [
    'user_id' => $user_id,
]);

$res = array_merge(
    $res,
    getElem('SELECT * FROM spacesuits_detail_view as sp JOIN shopping_cart as sc ON sp.product_id = sc.product_id WHERE user_id = :user_id', [
        'user_id' => $user_id,
    ])
);

echo json_encode($res, JSON_PRETTY_PRINT);
exit();