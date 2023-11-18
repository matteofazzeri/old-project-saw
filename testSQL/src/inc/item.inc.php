<?php
if (!empty($models))
  foreach ($models as $index => $value)
    echo '
  <div class="sketchfab-embed-wrapper">
    <div class="item-card">
      <iframe title="Jedi Star Fighter" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share 
      src=' . ($models[$index]['link'] ?? '') . '>
      </iframe>
      <span class="item-description">
        <div class="name">' . ($models[$index]['name'] ?? 'Unknown') . '</div> <!-- questo diventerà $itemName -->
        <div class="divider">
          <div class="info">
            <p>By
              <a href="https://sketchfab.com/petri.liuhto?utm_medium=embed&utm_campaign=share-popup&utm_content=0b641c2f2b854f1f9ae7f2a731e44dbd" target="_blank" rel="nofollow" class="author">
                ' . ($models[$index]['author'] ?? 'unknown') . ' <!-- questo diventerà $author -->
              </a>
            </p>
            <p class="item-price">' . ($models[$index]['price'] ?? '****') . '&</p> <!-- questo diventerà $price -->
          </div>
        </div>
      </span>
    </div>
  </div>';
else
  echo '<div class="no-elem-found"><p>no element found</p></div>';
