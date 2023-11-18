<?php

require __DIR__ . ('/../src/inc/included.php');

if (!isLogged())
  header('Location: ./login.php');

$to_show = 'new';

if (isset($_POST['all']))
  $to_show = $_POST['all'];
if (isset($_POST['new']))
  $to_show = $_POST['new'];
if (isset($_POST['used']))
  $to_show = $_POST['used'];

display('head', ['title' => 'Home', 'css' => ['style', 'navbar', 'shop']]);
display('header', []);

// collegamento al db per prendere le informazioni che servono

?>

<div class="selection-bar">
  <form action="#" method="post">
    <input type="submit" name="all" id="all" value='all'>
    <input type="submit" name="new" id="new" value='new'>
    <input type="submit" name="used" id="used" value="used">
  </form>
</div>

<?php

$r = getAllElem(
  'SELECT name, author, link FROM ship',
  []
);

display('item.inc', ['models' => $r]);