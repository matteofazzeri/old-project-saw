<?php

require __DIR__ . '/../inc/inc.php';

$categories = $_GET['categories'];
$searchItem = $_GET['search'];

function sendQuery($table, $searchItem)
{
    return getElem('SELECT *
                FROM ' . $table . '
                WHERE LOWER(product_name) LIKE LOWER(:name)
                ORDER BY product_name',
        ['name' => '%' . $searchItem . '%']
    );
}

switch ($categories) {
    case 'spaceship':
        echo json_encode(sendQuery("spaceships_detail_view", $searchItem), JSON_PRETTY_PRINT);
        break;

    case 'spacesuit':
        echo json_encode(sendQuery("spacesuits_detail_view", $searchItem), JSON_PRETTY_PRINT);
        break;

    case 'spacepart':

        echo json_encode(sendQuery("spaceparts_detail_view", $searchItem), JSON_PRETTY_PRINT);
        break;

    default:
        $res = sendQuery("spaceships_detail_view", $searchItem);

        $res = array_merge(
            $res,
            sendQuery("spacesuits_detail_view", $searchItem)
        );

        echo json_encode($res, JSON_PRETTY_PRINT);
        break;
}


http_response_code(200);
exit();