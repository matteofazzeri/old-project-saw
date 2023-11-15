<?php

require __DIR__ . ('/../src/inc/included.php');

if (!isLogged()) {
  header('Location: ../src/login.php');
}

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


display('head', ['title' => 'Home', 'css' => ['style', 'navbar', 'shop']]);
display('header', []);

// collegamento al db per prendere le informazioni che servono

display('form', [
  'types' => ['text', 'text', 'text', 'number'],
  'names' => ['name', 'author', 'link', 'price'],
  'placeholders' => ['Model Name', 'Author', 'Link', 'Price'],
  'patterns' => ['.{,100}', '.{,100}', '.{,100}', '.{,15}'],
  'values' => ['', '', '', ''],
  'remember' => false
]);

$r = queryMaker(
  'SELECT name, author, link, price FROM ship',
  []
);
?>

<div class="sketchfab-embed-wrapper">
  <div class="item-card">
    <iframe title="Jedi Star Fighter" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share 
    src=<?php echo $r['link']?>>
    </iframe>
    <span class="item-description">
      <div class="name"><?php echo $r['name']?></div> <!-- questo diventerà $itemName -->
      <div class="divider">
        <div class="info">
          <p>By
            <a href="https://sketchfab.com/petri.liuhto?utm_medium=embed&utm_campaign=share-popup&utm_content=0b641c2f2b854f1f9ae7f2a731e44dbd" target="_blank" rel="nofollow" class="author">
            <?php echo $r['author']?> <!-- questo diventerà $author -->
            </a>
          </p>
          <p class="item-price"><?php echo $r['price']?>&</p> <!-- questo diventerà $price -->
        </div>
      </div>
    </span>
  </div>
</div>