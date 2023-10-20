<?php

function sanitaze($str) {
    return htmlspecialchars($str, ENT_NOQUOTES | ENT_SUBSTITUTE);
}