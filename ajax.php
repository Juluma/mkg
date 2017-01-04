<?php
// Return file names from img folder
$folder = 'img/bouquets/select/';
$images = array_diff(scandir($folder), ['..', '.']);
echo json_encode($images);
exit;
