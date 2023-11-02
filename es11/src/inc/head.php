<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php
        foreach($css as $key => $link) {
            $link = "../src/libs/" . $link . ".css";
            echo "<link rel='stylesheet' href=$link>";
        }
    ?>

    <title><?php echo $title ?? 'Document' ?></title>
</head>
<body>