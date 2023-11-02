<?php

function isLogged(): bool {
  if (isset($_SESSION["logged"])) {
    if ($_SESSION['logged'])
      return true;
  }
  return false;
}

function display(string $filename, array $data = []): void {
  foreach ($data as $key => $val)
    $$key = $val;
  require_once __DIR__ . '/../inc/' . $filename . '.php';
}

function loggedIn($mail): bool {
  $fp = fopen(__DIR__ . '/../data/users.txt', 'r');
  while (!feof($fp)) {
    $data = explode("\t", fgets($fp));
    if ($data[0] == $mail) {
      fclose($fp);
      return true;
    }
  }
  fclose($fp);
  return false;
}

function getUserName($mail): string {
  $fp = fopen(__DIR__ . '/../data/users.txt', 'r');
  while (!feof($fp)) {
    $data = explode("\t", fgets($fp));
    if ($data[0] == $mail) {
      return $data[2];
    }
  }
  fclose($fp);
  return 'ciao';
}

function checkUser($mail, $pass): bool {
  $fp = fopen(__DIR__ . '/../data/users.txt', 'r');
  while (!feof($fp)) {
    $data = explode("\t", fgets($fp));
    if ($data[0] == $mail && password_verify($pass, $data[1])){
      fclose($fp);
      return true;
    }
  }
  fclose($fp);
  return false;
}

function sanitaze($data): string {
  $data = htmlspecialchars($data);
  $data = htmlentities($data);
  return $data;
}

function registerUser($data):void {
  $fp = fopen(__DIR__ . '/../data/users.txt', 'a');
  fwrite($fp, $data);
  fclose($fp);
}

/* FUNCTION TO CHECK USER INPUT ACCURACY TO REGEX */

function checkEmail($data)
{
  $regex_email = "/^[a-zA-Z\d\.]+@[a-zA-Z\d]+\.[a-z]{2,3}$/";
  if (preg_match($regex_email, $data))
    return true;
  return false;
}

function nameCheck($data): bool {
  if (preg_match("/([a-zA-Z]+[àèéìòù]*\s+)+([a-zA-Z]+[àèéìòù]*\s*)/", $data))
    return true;
  return false;
}

function checkRegistrationPassword($p, $cpass) {
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

function checkLoginPassword($password) {
  $fp = fopen("libs/users.txt", "r");
  while ($line = fgets($fp)) {
    $data = explode("\t", $line);
    if (password_verify($password, trim($data[count($data) - 1])))
      return true;
  }
  return false;
}