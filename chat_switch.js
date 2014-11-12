// get json data
function getSetting(){

  var url = 'http://libapps.liv.ac.uk/ask_switch/data/data.json?callback=?';

  $.when($.ajax({
    type: 'GET',
    url: 'http://libapps.liv.ac.uk/ask_switch/data/data.json?callback=?',
    async: false,
    jsonpCallback: 'jsonpcallback',
    contentType: "application/json",
    dataType: 'jsonp'})).then(function(data){
      var json = data;
      useSetting(json.switch);
  });

}

// pass json data on to relevant functions otherwise send an error to the console
function useSetting(data){
  if($('#chat_button').length > 0){
    drwButton(data);
  }
  if($('#chat_choice').length > 0){
    drwForm(data);
  }
  else{
    console.log('there has been an error processing the data');
  }
}

// define what the button does/looks like based on the json.switch setting
function drwButton(widget){
       var chatHTML;

			if(widget === 'qp'){
				chatHTML = $('#chat_button').html('<a href="#" onclick="window.open(\'http://libapps.liv.ac.uk/ask_switch/qp.html\',\'QuestionPoint\',\'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=300, height=340\');return false;"><img src="http://libchat.s3.amazonaws.com/chat_button_online.png"></a>');
			}
			if(widget === 'libchat'){
				chatHTML = $('#chat_button').html('<a href="#" onclick="window.open(\'http://libapps.liv.ac.uk/ask_switch/libchat.html\',\'LibChat\',\'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=300, height=340\');return false;"><img src="http://libchat.s3.amazonaws.com/chat_button_online.png"></a>');
			}
			else if(widget === 'offline'){
				chatHTML = $('#chat_button').html('<img src="//libchat.s3.amazonaws.com/chat_button_offline.png" alt="Chat is offline - Ask a Question or browse our existing Answers!" title="Chat is offline - Ask a Question or browse our existing Answers!" style="border: none;">');
			}
}

// draw the form and set the selected value to what is sent back in json.switch
function drwForm(widget){

        var form = '<div id="ask_switch"><form action="" method="post" id="searchForm"><fieldset><legend>Chat Choice</legend><select id="chat_choice_select" name="chat_choice">';

  switch (widget) {
    case 'libchat':
      form += '<option value="libchat" selected>Libchat</option><option value="qp">QuestionPoint</option><option value="offline">Offline</option>';
      break;
    case 'qp':
      form += '<option value="libchat">Libchat</option><option value="qp" selected>QuestionPoint</option><option value="offline">Offline</option>';
      break;
    case 'offline':
    form += '<option value="libchat">Libchat</option><option value="qp">QuestionPoint</option><option value="offline" selected>Offline</option>';
      break;

  }

  form += '</select><input type="submit" value="Submit"/></fieldset></form></div>';

       var option = $( "#chat_choice").html(form);
       submitChange();
}

// send the data of the form to the PHP script which will write it to data.json
function sendData(data){
  $.when($.ajax({
      type: 'POST',
      url: 'http://libapps.liv.ac.uk/ask_switch/form_save.php',
      async: false,
      data: { 'chat_choice': data }})).then(document.location.reload());
}

// overide the default submit function to pick out what needs to go to the PHP script
function submitChange(){
// Attach a submit handler to the form
$( "#searchForm" ).submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();
  var term = $( "#chat_choice option:selected").val();
  sendData(term);
});
}

// reload the document to show the value has changed
function emptyDiv(){
	document.location.reload();
}

getSetting();

$('#chat_button').click(function(){
	populateImg();
	emptyDiv();
});
