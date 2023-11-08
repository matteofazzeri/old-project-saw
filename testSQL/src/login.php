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
    if (userExists($email)) {
      if ($pwd === loginPwd($email)) {
        $_SESSION['id'] = id($email);
        /* controllo remember me */
        if (isset($_POST['remember'])) {
          $rememberMe_id = randomString(64);
          setcookie('rmbme', $rememberMe_id, time() + 60 * 60 * 24 * 30);

          /* 
          * connect to db to insert the rememberMe_id 
          * - check if the user has an expire autologin
          *   yes -> change the old expire value with the new one (generate a new token)
          *   no -> add the user in the table 
          */

          /* $query_code = " INSERT INTO logged (users_id, token, keep_logged)
                        VALUES (:users_id, :token, :keep_logged);";
          $data = [
            'users_id' => $_SESSION['id'],
            'token' => $rememberMe_id,
            'keep_logged' => 1
          ];

          queryMaker($query_code, $data); */


          try {
            require __DIR__ . '/inc/db.inc.php';

            $query = "INSERT INTO logged (users_id, token, keep_logged)
            VALUES (:users_id, :token, :keep_logged);";

            $stmt = $pdo->prepare($query);
            echo 'ciao1';
            $log = 1;
            $stmt->bindParam(':users_id', $_SESSION['id']);
            $stmt->bindParam(':token', $rememberMe_id);
            $stmt->bindParam(':keep_logged', $log);

            $stmt->execute();
            echo 'ciao2';
            $pdo = null;
            $stmt = null;
          } catch (PDOException $e) {
            die("Query failed: " . $e->getMessage());
          }
        } else {
          /*
          * add the user to the db:
          * no expire date, keep_logged = 0
          */
          echo 'ciao3';
        }

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
  'values' => $_SESSION['wrongdata'] ?? ['', ''],
  'remember' => true
]);

display('foot');
