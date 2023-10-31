<?php

function isLogged():bool {
    if($_SESSION['logged'])
        return true;    
    return false;
}

function display(string $filename, array $data = []): void {
    foreach($data as $key => $val)
        $$key = $val;
    require_once __DIR__ . '/../inc/' . $filename . '.php';
}