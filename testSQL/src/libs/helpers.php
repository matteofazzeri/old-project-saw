<?php

/* need to add the check if the user has the autologin on */
function isLogged(): bool
{
  $query = "SELECT keep_logged, users_id FROM logged WHERE token = :token_cookie;";
  $data = [
    'token_cookie' => $_COOKIE['rmbme'] ?? 'null'
  ];

  $result = queryMaker($query, $data);

  if (!empty($result))
    if ($result['keep_logged'] == 1) /* need to check expire date! */ {
      $_SESSION['logged'] = true;
      $_SESSION['id'] = dbInfo($result['users_id'], 'id');
    }

  if (isset($_SESSION["logged"])) {
    if ($_SESSION['logged'])
      return true;
  }
  return false;
}

function display(string $filename, array $data = []): void
{
  // create variables from the associative array
  foreach ($data as $key => $value) {
    $$key = $value;
  }
  require_once __DIR__ . '/../inc/' . $filename . '.php';
}


function randomString($lenght = 64): string
{
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $lenght; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}

function queryMaker($query_code, $data = [])
{
  require __DIR__ . '/../inc/db.inc.php';

  try {
    $query = $query_code;
    $stmt = $pdo->prepare($query);

    foreach ($data as $key => $value)
      $stmt->bindParam(':' . $key, $value);

    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $pdo = null;
    $stmt = null;

    return $result;
    die();
  } catch (PDOException $e) {
    die("Query failed: " . $e->getMessage() . '<br/>' . $query_code);
  }
}

function queryInsert($query_code, $data = [])
{
  require __DIR__ . '/../inc/db.inc.php';

  try {
    $query = $query_code;
    $stmt = $pdo->prepare($query);

    foreach ($data as $key => &$value)
      $stmt->bindParam(':' . $key, $value);

    $stmt->execute();

    $pdo = null;
    $stmt = null;
  } catch (PDOException $e) {
    die("Query failed: " . $e->getMessage() . '<br/>' . $query_code);
  }
}
