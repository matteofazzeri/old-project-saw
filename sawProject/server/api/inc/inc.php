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

    
    echo '<pre>' . json_encode($result, JSON_PRETTY_PRINT) . '</pre>';
    //echo json_encode($result, JSON_PRETTY_PRINT);

  } catch (PDOException $e) {
    die("Query failed: " . $e->getMessage() . '<br/>' . $query_code);
  }
}

function insertValue($query_code, $data = [])
{
    require __DIR__ . '/connect.inc.php';

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

