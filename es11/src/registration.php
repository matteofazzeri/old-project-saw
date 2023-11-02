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
      /*
      * controllo se l'email è corretta sintatticamente
      * controllo che l'utente non sia loggato
      * controllo se la password è corretta sintatticamente
      * controllo se la password è uguale alla conferma password
      * controllo che il nome inserito sia corretto relativamente alla regex
      * se tutto è corretto, allora loggo l'utenteù
      */
      if(checkEmail($_POST['email'])) {
        if(!loggedIn($_POST['email'])) { 
          if(checkRegistrationPassword($_POST['pass'], $_POST['cpass'])) {
            if(nameCheck($_POST['namelastname'])) {
              header('Location: ./login.php');
              $email = sanitaze($_POST['email']);
              $pass = sanitaze($_POST['pass']);
              $cpass = sanitaze($_POST['cpass']);
              $name = sanitaze($_POST['namelastname']);
              registerUser($email . "\t" . password_hash($pass, PASSWORD_BCRYPT) . "\t" . $name . "\n");
            } else {
              echo 'Name not valid!';
            }
          } else {
            echo 'Password not valid!';
          }
        } else {
          echo 'User already logged in!';
        }
        
      } else {
        echo 'Email not valid!';
      }

      
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
    '^([a-zA-Z]+[àèéìòù]*\s+)+([a-zA-Z]+[àèéìòù]*\s*)$',
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
    '.{8,}',
    '.{8,}'
  ]
]);

display('foot');
