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
        //http_response_code(400); // Bad Request
        echo json_encode([
            'error' => 'Missing Data',
            'message' => 'Missing Data, please provide required ' . implode(', ', $missingInformation)
        ]);
        exit();
    }
}

function invalid_data($invalidInformation): void
{
    //http_response_code(400); // Bad Request
    echo json_encode([
        'error' => 'Invalid Data',
        'message' => 'Invalid Data, please provide valid ' . $invalidInformation
    ]);
    exit();
}

function insertGenericProduct($data): bool
{
    $query = 'INSERT INTO products (name, price, description, availability, quantity) 
                VALUES (:name, :price, :description, :available, :quantity)';
    $e = insertValue($query, $data);
    return $e === true;
}


switch ($categories) {
    case 'spaceship':
        // * check for missing data
        $required = ['name', 'price', 'description', 'available', 'quantity', 'model', 'fuel_type', 'capacity', 'speed', 'size'];
        missing_data($required, $data);

        // TODO: check the validity of the data (so i dont have to continuously delete the data from the database)

        // ! guarda ultima interezione con chatGPT -> basta passare l'intero array $data senza spezzettarlo!!!

        // * add data to the database
        if (insertGenericProduct($data)) {
            $query = 'INSERT INTO spaceships (model, fuel_type, capacity, speed, size) 
                        VALUES (:model, :fuel_type, :capacity, :speed, :size)';

            // * get the id of the size
            $size = getElem('SELECT id FROM product_sizes WHERE size_name = :size', ['size' => $data['size']]);

            if (empty($size))
                invalid_data('size');
            insertValue($query, $data);
        } else
            invalid_data($data);

        http_response_code(204);
        break;
    case 'spacesuit':
        $required = ['name', 'price', 'description', 'available', 'quantity', 'material', 'color', 'size'];
        missing_data($required, $data);
        http_response_code(204);
        break;
    case 'spacepart':
        $required = ['name', 'price', 'description', 'available', 'quantity'];
        missing_data($required, $data);
        http_response_code(204);
        break;
    default:
        http_response_code(400); // Bad Request
        echo json_encode([
            'error' => 'Invalid Category',
            'message' => 'Invalid Category, must be one of the following categories: spaceship, spacesuit, spacepart'
        ]);
        exit();
}