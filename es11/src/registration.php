<?php

include 'inc/included.php';

if(isLogged()) {
    header('Location: ../public/index.php');
    exit();
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(isset($_POST['submit'])) {
        if(empty($_POST['email']) || empty($_POST['pass'])) {
            $old_pass = $_POST['pass'];
            $old_email = $_POST['email'];
        }
    }
}

display('head', ['title' => 'Signup', 'css' => ['style', 'navbar', 'form']]);
display('header');

display('form', [
    /* 
    how to use form with display function:
    (1) name of the variable that will be used in the form 
    (2) array of value of the variables: ['elem1', 'elem2', '', 'elem4']
    (1) => (2)
    ---------------------------------------------
    */
    'types' => ['text', 'email', 'password', 'password'],
    'names' => ['namelastname', 'email', 'pass', 'cpass'],
    'placeholders' => ['Name & Lastname', 'E-mail', 'Password', 'Confirm Password'],
    'patterns' => [
        // $ for ending line, ^ for starting line
        '^[a-zA-Z\s]+$',
        '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
        '.{8,}',
        '.{8,}'
    ]
]);

display('foot');