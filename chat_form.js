

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
  var term = $( "#chat_choice option:selected").val();
  sendData(term);
});
}

drwForm(json);

