<?php

include __DIR__ . '/../inc/inc.php';


// decode the data passed from the fronend
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$categories = $_GET['categories'];

function missing_data($required, $data): void
{
    $missingInformation = array_diff($required, array_keys($data));
    if (!empty($missingInformation)) {
        echo json_encode([
            'error' => 'Missing Data',
            'message' => 'Missing Data, please provide required ' . implode(', ', $missingInformation)
        ]);
        http_response_code(400); // Bad Request
        exit();
    }
}

function invalid_data($invalidInformation): void
{
    echo json_encode([
        'error' => 'Invalid Data',
        'message' => 'Invalid Data, please provide valid ' . $invalidInformation
    ]);
    http_response_code(400); // Bad Request
    exit();
}

function insertGenericProduct($data): int
{
    $query = 'INSERT INTO products (name, price, description, availability, quantity) 
                VALUES (:name, :price, :description, :available, :quantity)';
    $queryData = [
        'name' => $data['name'],
        'price' => $data['price'],
        'description' => $data['description'],
        'available' => $data['available'],
        'quantity' => $data['quantity']
    ];
    $index = insertValue($query, $queryData, true);
    if ($index !== false)
        return $index;
    return false;
}




switch ($categories) {
    case 'spaceships':
        // * check for missing data
        $required = ['name', 'price', 'description', 'available', 'quantity', 'model', 'fuel_type', 'capacity', 'speed', 'size'];
        missing_data($required, $data);

        // TODO: check the validity of the data (so i dont have to continuously delete the data from the database)

        // * add data to the database + receive the id of the product
        $product_id = insertGenericProduct($data);
        if ($product_id !== false) {
            $query = 'INSERT INTO spaceships (product_id, model, fuel_type, capacity, speed, size) 
                        VALUES (:product_id, :model, :fuel_type, :capacity, :speed, :size)';

            // * get the id of the size
            $size = getElem('SELECT id AS size_id FROM product_sizes WHERE size_name = :size', ['size' => strtoupper($data['size'])])[0];
            if (empty($size))
                invalid_data('size');

            $queryData = [
                'product_id' => $product_id,
                'model' => $data['model'],
                'fuel_type' => $data['fuel_type'],
                'capacity' => $data['capacity'],
                'speed' => $data['speed'],
                'size' => $size['size_id']
            ];
            $e = insertValue($query, $queryData);
            if ($e !== true) {
                echo $e;
                exit();
            }

        } else
            invalid_data($data);

        http_response_code(204);
        break;


    case 'spacesuits':
        $required = ['name', 'price', 'description', 'available', 'quantity', 'material', 'color', 'size'];
        missing_data($required, $data);
        http_response_code(204);
        break;



    case 'space_parts':
        $required = ['name', 'price', 'description', 'available', 'quantity'];
        missing_data($required, $data);
        http_response_code(204);
        break;


        
    default:
        echo json_encode([
            'error' => 'Invalid Category',
            'message' => 'Invalid Category, must be one of the following categories: spaceship, spacesuit, spacepart'
        ]);
        http_response_code(400); // Bad Request
        exit();
}