<?php

include 'inc/included.php';

if (isLogged()) {
  header('Location: ../public/index.php');
  die();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['submit'])) {
    /* controllare che il valore $email sia una mail oppure un username */
    if (checkEmail($_POST['email']) or checkUsername($_POST['email']))
      $email = $_POST['email'];

    $pwd = filter_var($_POST['pass']);

    /* 
    * con la chiamata a loginPwd controllo indirettamente che l'utente esista oppure no
    * questo perché se l'utente non esiste, allora non esiste nemmeno alcuna pwd. 
    * mi sono accorto ora che manca il controllo backend che la pwd sia corretta
    * o che almeno abbia inserito qualcosa nella casella
    */
    if (password_verify($pwd, loginPwd($email))) {
      $_SESSION['id'] = id($email);
      /* controllo remember me */
      if (isset($_POST['remember'])) {
        $rememberMe_id = bin2hex(random_bytes(64));
        setcookie('rmbme', $rememberMe_id, time() + 60 * 60 * 24 * 30);

        /* connect to db to edit the token, expire_date, keep_logged */

        insertValue(
          "UPDATE logged SET token = :token, expire_date = :expire_date, keep_logged = :keep_logged WHERE users_id = :users_id;",
          [
            'token' => $rememberMe_id,
            'expire_date' => date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 30),
            'keep_logged' => 1,
            'users_id' => $_SESSION['id']
          ]
        );
      }

      $_SESSION['logged'] = true;
      header('Location: ../public/index.php');
    } else {
      echo "Wrong password";
    }
  }
}

display('head', ['title' => 'Login', 'css' => ['style', 'navbar', 'form']]);
display('header');

display('form', [
  /* 
  *  how to use form with display function:
  *  (1) name of the variable that will be used in the form 
  *  (2) array of value of the variables: ['elem1', 'elem2', '', 'elem4']
  *  (1) => (2)
  */

  'types' => ['text', 'password'],
  'names' => ['email', 'pass'],
  'placeholders' => ['E-mail', 'Password'],
  'patterns' => [
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
    '.{8,}'
  ],
  'values' => $_SESSION['wrongdata'] ?? ['', ''],
  'remember' => true
]);

display('foot');
