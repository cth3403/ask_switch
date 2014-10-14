<?php


$json = file_get_contents("data/data.json");
$json = json_decode($json, TRUE);

$dates_cont = $json[0]['dates_cont']);



$dates_arr = array();

$from = isset($_POST["from"])?$_POST["from"]:"";
$to = isset($_POST["to"])?$_POST["to"]:"";

if((isset($from) && isset($to)) && ($from && $to != "")){
	array_push($dates_arr, $from, $to);
	array_push($dates_cont, $dates_arr);
	
	print_r($dates_cont);

foreach ($dates_cont as $key => $value){
	print_r($value);
}
}

?>


<!DOCTYPE html>
<html lang="en">
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Switch library chat</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />
    <!-- jQuery UI css -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">

    <!-- jQuery javascript files -->
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="//code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>  

	<script>
		  $(function() {
    $( "#from" ).datepicker({
      dateFormat: "dd-mm-yy",
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      dateFormat: "dd-mm-yy",	
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });
  </script>
	</script>

  </head>

  <body>

<form  method="post">
<label for="from">From</label>
<input type="text" id="from" name="from">
<label for="to">to</label>
<input type="text" id="to" name="to">
<button type="submit" value="Submit">
</form>







  </body>
</html>