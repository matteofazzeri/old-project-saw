<?php 

function sanitaze(string $data): string {
  return $data;
}

function checkLoginPassword($password) {
  $fp = fopen("libs/users.txt", "r");
  while ($line = fgets($fp)) {
    $data = explode("\t", $line);
    if (password_verify($password, trim($data[count($data) - 1])))
      return true;
  }
  return false;
}

/* input checker */

function checkPwd($p, $cpass) {
  $lowercase = preg_match("/.*[a-zàèéìòù]+.*/", $p);
  $uppercase = preg_match("/.*[A-Z]+.*/", $p);
  $numbers = preg_match("/.*[0-9]+.*/", $p);
  $character = preg_match("/.*[!|£\$%&=?\^\+-\.,:;_|\*].*/", $p);

  if (strlen($p) < 8) return false;
  if ($lowercase || $uppercase || $numbers || $character) {
    if (
      ($lowercase && $uppercase) || ($lowercase && $numbers) || ($lowercase && $character) ||
      ($uppercase && $numbers) || ($uppercase && $character) || ($numbers) || ($character)
    ) {
      if (
        ($lowercase && $uppercase && $numbers) || ($lowercase && $uppercase && $character) ||
        ($lowercase && $numbers && $character) || ($uppercase && $numbers && $character)
      ) {
        if ($lowercase && $uppercase && $numbers && $character) {
          // se pass e cpass non sono uguali, impossible registrarsi nel sito
          if ($p != $cpass) {
            return false;
          }
          return true;
        }
      }
    }
  }
  return false;
}

function nameCheck($data): bool {
  if(preg_match("/^.\d.$/", $data)) { echo "why tf u have a number in your name man!"; }
  return preg_match("/([a-zA-Z]+[àèéìòù]*\s+)+([a-zA-Z]+[àèéìòù]*\s*)/", $data);
}

/* 
* queste due funzioni verranno chiamata sia da
* registration.php e da login.php 
* il controllo regex per il login non servirebbe,
* ma può essere utile per eventuali messaggi di errori specifici.
* i controlli per poter vedere gli errori a schermo io li farei con js 
* per poter avere avere un vista degli errori a tempo reale (per gli errori sintattici)
*/

function checkEmail($data): bool {
  return preg_match("/^[a-zA-Z\d\.]+@[a-zA-Z\d]+\.[a-z]{2,3}$/", $data);
}

function checkUsername($data): bool {
  return preg_match("/^[Ss][0-9]{7}$/", $data);
}

function checkAll($email, $username, $name, $pwd, $cpwd): bool {
  echo "email: " . checkEmail($email);
  echo "username: " . checkUsername($username);
  echo "name: " . nameCheck($name);
  echo "pwd: " . checkPwd($pwd, $cpwd);
  return checkEmail($email) and checkUsername($username) and nameCheck($name) and checkPwd($pwd, $cpwd);
}