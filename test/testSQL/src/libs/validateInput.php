<?php 

function sanitaze(string $data): string {
  return $data;
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

function checkEmail($data): bool {
  return preg_match("/^[a-zA-Z\d\.]+@[a-zA-Z\d]+\.[a-z]{2,3}$/", $data);
}

function checkUsername($data): bool {
  return preg_match("/^[Ss][0-9]{7}$/", $data);
}

function checkAll($email, $username, $name, $pwd, $cpwd): bool {
  return checkEmail($email) and checkUsername($username)
    and nameCheck($name) and checkPwd($pwd, $cpwd) and !userExists($email, $username);
}