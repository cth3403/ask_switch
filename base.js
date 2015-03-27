var json, chatHTML, isClick, myWindow;

//which window to open or draw offline button
function useServ(json){

  if(json ==='qp'){
    myWindow.window.location.href = '[questionpoint window url]';
    }
  if(json === 'libchat'){
     myWindow.window.location.href = '[libchat window url';
    }
  if(json === 'offline'){
      myWindow.document.write('<img src="//libchat.s3.amazonaws.com/chat_button_offline.png" alt="Chat is offline - Ask a Question or browse our existing Answers!" title="Chat is offline - Ask a Question or browse our existing Answers!" style="border: none;">');
    }

}


// define what the button does/looks like based on the json.switch setting
function drwButton(widget){
		if(widget === 'qp' || 'libchat'){
				chatHTML = $('#chat_button').html('<div class="chat_button"><img src="http://libchat.s3.amazonaws.com/chat_button_online.png" style="cursor: pointer;"></div>');
        $('.chat_button img').click(function(){
          myWindow = window.open("","","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=300, height=340");
          myWindow.document.write('<div id="op_status">Getting operator status ...</div>');
          isClick = true;
          json = null;
          getSetting();
        });
		}
    if(widget === 'offline'){
				chatHTML = $('#chat_button').html('<img src="//libchat.s3.amazonaws.com/chat_button_offline.png" alt="Chat is offline - Ask a Question or browse our existing Answers!" title="Chat is offline - Ask a Question or browse our existing Answers!" style="border: none;">');
		}
    return chatHTML;
}

// draw the form and set the selected value to what is sent back in json.switch
function drwForm(widget){

  var form = '<div id="ask_switch"><div id="searchForm"><fieldset><legend>Chat Choice</legend><select id="chat_choice_select" name="chat_choice">';

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

  form += '</select><button id="chat_sub">Submit</button></div></div>';

  var option = $( "#chat_choice").html(form);
  submitChange();
}

// send the data of the form to the PHP script which will write it to data.json
function sendData(data){
    $.when($.ajax({
      type: 'POST',
      url: '[php server location for form save]/form_save.php',
      async: false,
      data: { 'chat_choice': data }})).then(window.location.reload());
}

// overide the default submit function to pick out what needs to go to the PHP script
function submitChange(){
// Attach a submit handler to the form
$( "#chat_sub" ).click(function( event ) {
  var term = $( "#chat_choice option:selected").val();
  sendData(term);
});
}

// retrieve the json file
function getSetting(){
$.ajax({
    url: '[location of json file default is the same php server]/data.json?',
    async: false,
    contentType: "application/json",
    dataType: 'jsonp'});
}

function jsonpcallback(data){
	json = data.switch;
	if(isClick === true){
		useServ(json);
	}
	return;
}

isClick = false;
getSetting();


