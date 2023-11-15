<?php

require __DIR__ . ('/../src/inc/included.php');

if (!isLogged() or !isAdmin())
  header('Location: ../public/index.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['submit'])) {
    queryInsert(
      'INSERT INTO ship (name, author, link, price)
          VALUES (:name,:author,:link,:price)',
      [
        'name' => $_POST['name'],
        'author' => $_POST['author'],
        'link' => $_POST['link'],
        'price' => $_POST['price'],
      ]
    );
  }
}

display('head', ['title' => 'Home', 'css' => ['style', 'navbar','admin']]);
display('header', []);

echo '<h1>Admin Page</h1>';
echo '<div class="ship-add-container">';
  echo '<h4>Insert new ship<h4>';

  display('form', [
    'types' => ['text', 'text', 'text', 'number'],
    'names' => ['name', 'author', 'link', 'price'],
    'placeholders' => ['Model Name', 'Author', 'Link', 'Price'],
    'patterns' => ['.{,100}', '.{,100}', '.{,100}', '.{,15}'],
    'values' => ['', '', '', ''],
    'remember' => false
  ]);
  echo '<span class="tot-ship">Total ships in the database: &nbsp;';
    echo queryMaker(
      'SELECT COUNT(*) FROM ship',
      []
    )[0]['COUNT(*)'];
  echo '</span>';

echo '</div>';


