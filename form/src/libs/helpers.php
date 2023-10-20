<?php

function userExists($email) {
    $fp = fopen("libs/users.txt", "r");
    while ($line = fgets($fp)) {
        $data = explode("\t", $line);
        if(trim($data[0]) == $email)
            return true;
    }
    return false;
}

function addUser($email, $username, $name, $password) {
    $fp = fopen("libs/users.txt", "a");

    //echo "adding user " . $name;

    fputs($fp, $email. "\t". $username. "\t". $name. "\t". password_hash($password, PASSWORD_BCRYPT)."\n");
    fclose($fp);
}


function showErrors($div , $textError, $x) {

    if($x) {
        echo "
            <span class='error $div.'-error'' style='display: flex'>
                <i class='bi bi-x-circle error-icon'></i>
                <p class='error-text'>$textError</p>
            </span>
        ";

    } else {
        echo "
            <span class='error $div.'-error'' style='display: none'>
                <i class='bi bi-x-circle error-icon'></i>
                <p class='error-text'>$textError</p>
            </span>
        ";
    }
}

function showData($i) {
    $fp = fopen("libs/users.txt", "r");
    while ($line = fgets($fp)) {
        $data = explode("\t", $line);
        if(trim($data[0]) == $_SESSION["username"]) {
            return $data[$i] ?? "";
        }
    }
    return "";
}

function isLogged() {
    if(isset($_SESSION['login']) && $_SESSION['login'] == true) {
        return true;
    } else {
        return false;
    }
}

// possibilità di eliminare il proprio account
function deleteUser() {

}

