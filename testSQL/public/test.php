<?php

function lol($data = []) {
  foreach ($data as $key => $value) {
    //$data[$key] = $value;
    echo $key ." - " . $value . "<br>";
  }
}



lol([
  "boh"=> "ciao",
  "boh1"=> "ciao1",
  "boh2"=> "ciao2",
  "boh3"=> "ciao3",
]);