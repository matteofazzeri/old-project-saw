<?php

include 'inc/included.php';

if (isLogged()) {
  header('Location: ../public/index.php');
  exit();
} 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['submit'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $pwd = filter_var($_POST['pass']);
    if(userExists($email)) {
      if($pwd === loginPwd($email)) {
        $_SESSION['id'] = id($email);
        $_SESSION['logged'] = true;
        header('Location: ../public/index.php');
      } else {
        echo "Wrong password";
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
