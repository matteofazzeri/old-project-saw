<?php

function loginPwd($data): string
{
  $query = "SELECT pwd FROM users WHERE email = :email OR username = :username;";
  $data = ['email' => $data, 'username' => $data];
  $res = getAllElem($query, $data);

  if (!empty($res))  return $res[0]['pwd'];
  return '     ';
}

function userExists($email): bool
{
  $res = getAllElem(
    "SELECT * FROM users WHERE email = :email OR username = :username;",
    [
      'email' => $email,
      'username' => $email
    ]
  );

  if (!empty($res))  return true;
  return false;
}

function id($data): string
{
  $query = "SELECT id FROM users WHERE email = :email OR username = :username;";
  $data = ['email' => $data, 'username' => $data];
  $res = getAllElem($query, $data);

  if (!empty($res))  return $res[0]['id'];
  return 'Unknown';
}

function dbInfo($id, $toFind): string
{
  $query = "SELECT $toFind FROM users WHERE id = :id;";
  $data = ['id' => $id];
  $res = getAllElem($query, $data);

  if (!empty($res))  return $res[0][$toFind];
  return 'Unknown';
}
