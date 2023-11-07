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
      $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
      $username = filter_var($_POST['username']);
      $name = filter_var($_POST['namelastname']);
      $pwd = filter_var($_POST['pass']);
      $cpwd = filter_var($_POST['cpass']);

      /* 
      * controlli sintattici
      * controlli sui valori presenti nel db -> solo per email e username
      * i controlli sui valori vengono fatti direttamente dalle funzioni
      */

      if(checkAll($email, $username, $name, $pwd, $cpwd)){
        /* connessione al db + passaggio dei dati di registrazione */
        try {
          require_once __DIR__ . '/inc/db.inc.php';

        $query = "INSERT INTO users (name, pwd, email, username) 
                VALUES (:name, :pwd, :email, :username);";
        
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':pwd', $pwd);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);

        $stmt->execute();
          $stmt->execute(array($name, $pwd, $email, $username));

          $pdo = null;
          $stmt = null;

          header('Location: login.php');
          die();

        } catch (PDOException $e) {
          die("Query failed: " . $e->getMessage());
        }
      } else {
        echo "Error -> unable to register";
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
  'types' => ['text', 'text', 'email', 'password', 'password'],
  'names' => ['namelastname', 'username', 'email', 'pass', 'cpass'],
  'placeholders' => ['Name & Lastname', 'Matricola' , 'E-mail', 'Password', 'Confirm Password'],
  'patterns' => [
    // $ for ending line, ^ for starting line
    '^([a-zA-Z]+[àèéìòù]*\s+)+([a-zA-Z]+[àèéìòù]*\s*)$',
    '^[Ss][0-9]{7}$',
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
    '.{8,}',
    '.{8,}'
  ],
  'values' => ['','','','','']
]);

display('foot');
