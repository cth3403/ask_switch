<?php

// save data sent as POST to data/data.json
if(isset($_POST["chat_choice"])){

	$myFile = "data/data.json";
	$fh = fopen($myFile, 'w+') or die("can't open file");
	$stringData = 'jsonpcallback({"switch" : "'.$_POST["chat_choice"].'"});';
	fwrite($fh, $stringData);
	fclose($fh);
}

?>