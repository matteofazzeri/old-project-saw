<?php

function loginPwd($data): string {
  $query = "SELECT pwd FROM users WHERE email = :email;";
  $data = ['email' => $data];
  $res = queryMaker($query, $data);

  if(!empty($res))  return $res['pwd'];
  return 'Unknown';
}

function userExists($email, $username): bool {
  $res = queryMaker(
    "SELECT * FROM users WHERE email = :email OR username = :username;",
    [
      'email' => $email,
      'username' => $username
    ]
  );

  if(!empty($res))  return true;
  return false;
}

function id($data): string {
  $query = "SELECT id FROM users WHERE email = :email;";
  $data = ['email' => $data];
  $res = queryMaker($query, $data);

  if(!empty($res))  return $res['id'];
  return 'Unknown';
}

function dbInfo($id, $toFind): string {

  $query = "SELECT $toFind FROM users WHERE id = :id;";
  $data = ['id' => $id];
  $res = queryMaker($query, $data);

  if(!empty($res))  return $res[$toFind];
  return 'Unknown';
}