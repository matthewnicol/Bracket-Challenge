<?php

$f = $_GET['fname'];
$d = $_GET['details'];

if (file_exists($f)) {
  $state = 1;
}

else {
    $state = 2;    
    $myfile = fopen($f, "w") or $state = 0;
    if ($state == 2) {
        fwrite($myfile, $f . ":" . $d);
        fclose($myfile);
        $file = "allbrackets";
        file_put_contents($file, $f . " ", FILE_APPEND | LOCK_EX);
    }
}

if ($state == 0) { $msg = "?cantopen"; }
if ($state == 1) { $msg = "?fileexists"; }
if ($state == 2) { $msg = "?success"; }

header( "Location: http://www.nbabracketchallenge.com/" . $msg ); 

?>