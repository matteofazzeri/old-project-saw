<?php
function getElem($query_code, $data = [])
{
  require __DIR__ . '/connect.inc.php';
  $result = [];
  try {
    $query = $query_code;
    $stmt = $pdo->prepare($query);

    foreach ($data as $key => $value)
      $stmt->bindParam(':' . $key, $value);

    $stmt->execute();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      array_push($result, $row);
    }

    $pdo = null;
    $stmt = null;


    echo json_encode($result, JSON_PRETTY_PRINT);
    return $result;
  } catch (PDOException $e) {
    echo ("Query failed: " . $e->getMessage() . '<br/>' . $query_code);
    return false;
  }
}

function insertValue($query_code, $data = [], $needIndex = false)
{
  require __DIR__ . '/connect.inc.php';

  try {
    $query = $query_code;
    $stmt = $pdo->prepare($query);

    foreach ($data as $key => &$value)
      $stmt->bindParam(':' . $key, $value);
    $stmt->execute();

    if ($needIndex)
      $lastIndex = $pdo->lastInsertId();

    $pdo = null;
    $stmt = null;

    return $needIndex === false ? true : $lastIndex;
  } catch (PDOException $e) {
    echo ("Query failed: " . $e->getMessage() . '<br/>' . $query_code);
    return false;
  }
}

