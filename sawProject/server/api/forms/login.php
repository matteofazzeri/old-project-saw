<?php
// process-data.php

header("Access-Control-Allow-Origin: *");

$user_id = $_GET['users_id'];

echo json_encode($user_id);
