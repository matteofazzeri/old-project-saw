<?php

include 'inc/included.php';

if (isLogged()) {
  header('Location: ../public/index.php');
  exit();
} 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['submit'])) {
    if (empty($_POST['email']) || empty($_POST['pass'])) {
      exit('Please fill all the fields!');
    } else {
      if (checkUser($_POST['email'], $_POST['pass'])) {
        $_SESSION['logged'] = true;
        $_SESSION['username'] = getUserName($_POST['email']);
        $_SESSION['wrongdata'] = [];
        header('Location: ../public/index.php');
      } else {
        $_SESSION['wrongdata'] = [$_POST['email'], $_POST['pass']];
        echo 'Wrong credentials!';
      }
    }
  }
}

display('head', ['title' => 'Login', 'css' => ['style', 'navbar', 'form']]);
display('header');

display('form', [
  /* 
    how to use form with display function:
    (1) name of the variable that will be used in the form 
    (2) array of value of the variables: ['elem1', 'elem2', '', 'elem4']
    (1) => (2)
    ---------------------------------------------
    */
  'types' => ['email', 'password'],
  'names' => ['email', 'pass'],
  'placeholders' => ['E-mail', 'Password'],
  'patterns' => [
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
    '.{8,}'
  ],
  'values' => $_SESSION['wrongdata'] ?? ['','']
]);

display('foot');
