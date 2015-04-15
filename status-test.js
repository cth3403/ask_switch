// the libchat options can be were *found* in a script on the libanswers page
var libchat_options = {"domain":"liverpool.beta.libanswers.com","id":"920","base_domain":"v2.libanswers.com"};

var json, offline, myWindow, content, error;

/*
 * check libchat online status
 */
function checkStatus() {
		jQuery.ajax({
			url : window.location.protocol+'//'+libchat_options.base_domain+'/chat_client_status.php',
			dataType : "jsonp",
			data: { id: libchat_options.id },
			success : function(data) {
				//showChat(data.status);
			json = data;
			if(json.status === false){
				myWindow = 'http://libapps.liv.ac.uk/ask_switch/qp.html';
			}
			if(json.status === true){
				myWindow = 'http://v2.libanswers.com/chati.php?iid=447&hash=68c8b9ecde9aa6ded68efa82a518a301&online=true';
			}

			content = jQuery('iframe[title="Chat widget"]').attr('src', myWindow);

			return content;

			},
			error : function() {
				error = data;
			}
		});
	}

/*
 * get information about whether the manual switch has been tripped
 */
function checkOffline(){
	jQuery.ajax({
    url: 'http://libapps.liv.ac.uk/ask_switch/data/data.json',
    contentType: "application/json",
    dataType: 'jsonp'
	});
}

/*
 * choose the function to route to depending on offline switch status
 */
function jsonpcallback(data){
	offline = data;
	console.log(offline);
	if(offline.switch == "offline"){
		content = 'http://v2.libanswers.com/chati.php?iid=447&hash=68c8b9ecde9aa6ded68efa82a518a301&online=false';
	}
	else{
		checkStatus();
	}
	return content;
}

jQuery(document).ready(function(){
  checkOffline();
});
