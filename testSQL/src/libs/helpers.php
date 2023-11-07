<?php
function isLogged(): bool {
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