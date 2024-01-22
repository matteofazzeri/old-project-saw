<?php

require __DIR__ . '/../inc/inc.php';

//$category = $_GET['categories'];
$serchItem = $_GET['search'];

echo json_encode(
    getElem('SELECT products.*, spaceships.*, product_sizes.size_name, 
            AVG(COALESCE(reviews.rating, 0)) AS average_rating 
            FROM products LEFT JOIN spaceships ON products.id = spaceships.product_id 
            LEFT JOIN product_sizes ON spaceships.size = product_sizes.id
            LEFT JOIN reviews ON products.id = reviews.product_id
            WHERE products.name = :name;',
        ['name' => $serchItem]
    )
);