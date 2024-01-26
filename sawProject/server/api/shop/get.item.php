<?php

require __DIR__ . '/../inc/inc.php';

$categories = $_GET['categories'];
$serchItem = $_GET['search'];

switch ($categories) {
    case 'spaceship':
        echo json_encode(
            getElem('SELECT * FROM spaceships_detail_view
                    WHERE LOWER(product_name) LIKE LOWER(:name)',
                ['name' => $serchItem . '%']
            )
        );
        break;

    case 'spacesuit':
        echo json_encode(
            getElem('SELECT * FROM spacesuits_detail_view
                    WHERE LOWER(product_name) LIKE LOWER(:name)',
                ['name' => $serchItem . '%']
            )
        );
        break;

    case 'spacepart':
        echo json_encode(
            getElem('SELECT * FROM spaceparts_detail_view
                    WHERE LOWER(product_name) LIKE LOWER(:name)',
                ['name' => $serchItem . '%']
            )
        );
        break;

    default:

        $res = getElem('SELECT * FROM spaceships_detail_view
                WHERE LOWER(product_name) LIKE LOWER(:name)',
            ['name' => $serchItem . '%']
        );

        $res = array_merge(
            $res,
            getElem('SELECT * FROM spacesuits_detail_view
                WHERE LOWER(product_name) LIKE LOWER(:name)',
                ['name' => $serchItem . '%']
            )
        );

        echo json_encode($res, JSON_PRETTY_PRINT);
        break;
}


http_response_code(200);
exit();