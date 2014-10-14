<?php

//require("config.php");

$jd=cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
$dayW = jddayofweek($jd,0);



// check to see whether there are any closed days set
if (sizeof($dayArr) > 0) {

foreach ($dayArr as $key => $value) {
	if($value == $dayW){
		// set the chat as closed
	}
	else{
		return;
	}
}

}

// check to see if the manual switch has been flipped
if ($switch == false){

// set the chat as closed

}



$switch_var = "11:50";
$switch_time = strtotime($switch_var);
$real_time = strtotime("now");

if($real_time >= $switch_time){

/*
echo "switch";
echo "<br /><br />";
echo $switch_time;
echo "<br /><br />";
echo $real_time;
echo "<br /><br />";

echo "QuestionPoint";
*/

echo '<style>
#qpchatwidget{
    border-color: #FF9900;

.qp_institution_name_bar{
    background-color: #FF9900;

</style>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript" ></script>

<!-- If using qwidget size "fill", make sure that the minimum height for the parent element of qwidget container on this page is 230 px and the minimum width is 160px.-->
<!-- NOTE - After pasting the code to your page, check it to ensure it does not contain any text formatting such as smart or curly quotation marks.-->
<!-- IMPORTANT - If using multiple chat widgets on the same page: Please incrementally change the "qwidgetno" attribute on the div and script elements for each additional qwidget on the same page.-->
<!-- Beginning of QuestionPoint qwidget code. -->
<div id="questionpoint.chatwidget" qwidgetno="1" ></div>
<script id="questionpoint.bootstrap" qwidgetno="1" type="text/javascript" src="http://www.questionpoint.org/crs/qwidgetV4/js/qwidget.bootstrap.js?langcode=1&instid=13842&skin=blue&size=standard" charset="utf-8">//<noscript>Please enable javascript to chat with librarians online</noscript></script>';


}
else{

/*
echo "no switch";
echo "<br /><br />";
echo $switch_time;
echo "<br /><br />";
echo $real_time;
echo "<br /><br />";


echo "Libchat<br />";
*/

echo '<div id="libchat_inline_widget"></div> <script> var libchat_1413effb6ce639d15c0f7b6e66d2acd7 = { iid:447, key:"9674f955eb730bc", width:"240" }</script> <script type="text/javascript" src="//liv.ac.uk.libanswers.com/load_chat.php?hash=1413effb6ce639d15c0f7b6e66d2acd7&options=libchat_1413effb6ce639d15c0f7b6e66d2acd7"></script>';

}







?>