var springSpace = springSpace || {};

var offline, deffo;

/**
 * Univerisy of Liverpool Change
 * 
 * check data file to see whether chat should be offline
 * @return jsoncallback
 */
function checkOffline(){
	jQuery.ajax({
    	url: 'http://libapps.liv.ac.uk/ask_switch/data/offline.json',
    	contentType: "application/json",
    	dataType: 'jsonp',
	});
}

/**
 * Univerisy of Liverpool Change
 * 
 * process json callback 
 * @param  json data wrapped in function
 * @return json
 */
function jsonpcallback(data){
	offline = data;
	return offline;
}

// Univerisy of Liverpool Change
checkOffline();

(function(){
	
	if (!window.console) {
		var noOp = function(){}; // no-op function
		console = {
			log: noOp,
			warn: noOp,
			error: noOp
		}
	}

	var chat_div, chat_load, chat_timer, chat_self_triggered, chat_button;
	var libchat_options = {"domain":"liverpool.beta.libanswers.com","id":"3722","iid":"447","hash":"0c1cafbd27ef89e465f4a764e1602805","name":"homepagewidget","ts":"2015-07-22T15:59:50.705Z","uid":262,"ref":"","key":"9674f955eb730bc","chat_title":"Welcome to LibChat!","byeMsg":"Thanks for chatting!","dept_label":"Select Department:","name_label":"Name (leave blank for anonymous chat)","name_default":"","guest_label":"Guest","width":"60%","height":340,"is_personal":false,"isBuilding":true,"chat_button":"Start Chat","done_button":"Chat again","press_enter":"Press ENTER to send","submit_button":"Submit","email_trans":"Email chat transcript","offline_text":"Library Help","slidebutton_url":"https:\/\/s3.amazonaws.com\/libapps\/accounts\/1081\/images\/Chattab3.png","slidebutton_text":"Live Chat","slidebutton_position":"l","slidebutton_bcolor":"","slidebutton_color":"#FFFFFF","slidebutton_width":"42","slidebutton_height":"133","la_hide":false,"la_hide_msg":"Sorry, chat is offline but you can still get help.","la_hide_msg2":"<a href=\"http:\/\/liverpool.beta.libanswers.com\" target=\"_parent\">Search our Knowledgebase and\/or submit your question<\/a>","la_search_opt":{"group_id":"112","label":"Library Help","button":"Search","placeholder":"Type your question"},"la_search_box":"<div id=\"s-la-content-search-3722\" class=\"s-la-content-search s-la-content\"><form method=\"get\" name=\"s-la-searchform\" id=\"s-la-searchform-3722\" action=\"\" onsubmit=\"return false;\" target=\"_parent\" role=\"search\" aria-labelledby=\"s-la-content-search-query-3722\"><div class=\"form-group\"><label for=\"s-la-content-search-query-3722\" class=\"s-la-searchform-label sr-only control-label\">Library Help<\/label><input type=text id=s-la-content-search-query-0 class=\"s-la-content-search-query form-control\" name=\"q\" placeholder=\"Type your question\" value=\"\" autocomplete=off \/><\/div><div class=\"form-group\"><button class=\"btn btn-sm btn-default s-la-searchform-button\" type=\"submit\" style=\"background-color: #44AAFF; border-color: #44AAFF; color: #FFFFFF;\">Search<\/button><\/div><\/form><\/div>","sound_on":"Sound is On (click to toggle)","sound_off":"Sound is Off (click to toggle)","star_text":"Please rate this chat:","rate_1":"Bad","rate_2":"So-so","rate_3":"Good","rate_4":"Great","trans":"Enter an email address to send this chat transcript to:","error_sess":"Error starting session.","error_send":"Error sending this message.","error_tran":"Error sending transcript.","left":" has left the chat","typing":" is typing...","joined":" has joined the chat","initial_question":true,"initial_question_label":"Your Question","comments_label":"Any comments?","comments_button_text":"Submit Feedback","enable_anon":true,"enable_comments":true,"enable_sound":false,"star_ratings":true,"file_uploads":true,"file_title":"Upload File","file_intro":"Note: Maximum file size is 5MB. File is removed after one month, it is not kept permanently.","file_label":"Attach a file","file_action":"Upload","cancel_button":"Cancel","css":"","custom_css":"","color_backg":"#f9f9f9","color_head":"#44AAFF","color_btn":"#FFFFFF","color_border":"","user1":{"tag":1,"name":"click to edit","id":0,"show":0,"required":0,"type":"t","val":""},"user2":{"tag":2,"name":"click to edit","id":0,"show":0,"required":0,"type":"t","val":""},"user3":{"tag":3,"name":"click to edit","id":0,"show":0,"required":0,"type":"t","val":""},"error_off":"Sorry it doesn't appear any librarians are online... Please try again later.","wait":"Please wait... A librarian will connect shortly!","depart_id":[{"u":0,"d":[26]}],"widget_type":3,"autoload_time":45,"autoload_head":"Do you need help?","autoload_text":"A librarian is online ready to help.","autoload_yes":"Chat Now","autoload_no":"No Thanks","missedchat_time":"30","missedchat_message":"We apologise for the delay. Don't want to wait?","missedchat_link":"Submit your question.","missedchat_queue":"90","fbwidget":false,"autopop":false,"peel":"","user4":{"tag":4,"name":"click to edit","id":0,"show":0,"required":0,"type":"t","val":""},"user5":{"tag":5,"name":"click to edit","id":0,"show":0,"required":0,"type":"t","val":""},"offline_url":"","slidebutton_url_off":"","slidebutton_text_off":"Offline","base_domain":"v2.libanswers.com","onlinerules":[{"u":0,"d":[26]}]};
	var cascadeServer = "https:\/\/cascade2.libchat.com:443";
	
		
	//!check jquery version up to second decimal
	//is the current version >= minimum version
	function minVersion(minv, curr) {
		curr = curr || window.jQuery.fn.jquery;
		var c = curr.split('.');
		var m = minv.split('.');
		
		if (parseInt(c[0], 10) > parseInt(m[0], 10)) { return true; }
		else if (parseInt(c[0], 10) < parseInt(m[0], 10)) { return false; }
		else {
			if (typeof c[1] == 'undefined') { c[1] = 0; }
			if (typeof m[1] == 'undefined') { m[1] = 0; }
			if (parseInt(c[1], 10) > parseInt(m[1], 10)) { return true; }
			else if (parseInt(c[1], 10) < parseInt(m[1], 10)) { return false; }
			else { return true; }
		}
	}

	//get jquery either from namespace, window, or by loading it
	if (typeof springSpace.jq == "undefined") {
		if (window.jQuery === undefined) {
			loadJquery();
		} else {
			if (minVersion('1.7', window.jQuery.fn.jquery)) {
				springSpace.jq = window.jQuery;
				main();
			} else {
				loadJquery();
			}
		}
	} else {
		main();
	}		
	
	//!Load jQuery
	function loadJquery(){
		var script_tag = document.createElement('script');
		script_tag.setAttribute("type","text/javascript");
		script_tag.setAttribute("src", "//code.jquery.com/jquery-1.11.1.min.js");
		if (script_tag.readyState) { // for IE
			script_tag.onreadystatechange = function () {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					scriptLoadHandler();
				}
			};
		} else {
			script_tag.onload = scriptLoadHandler;
		}
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
	}		
		
	//!Called once jQuery has loaded
	function scriptLoadHandler() {
		springSpace.jq = window.jQuery.noConflict(true);
		main();
	}		

	//!Check online status
	function checkStatus() {
				
			springSpace.jq.ajax({
				url : cascadeServer+'/widget_status',
				dataType : "jsonp",
				data: { iid: libchat_options.iid, rules: JSON.stringify(libchat_options.onlinerules) },
				success : function(data) {
					var online = false;
					if (data.u || data.d) {
						online = true;
					}
					// Univerisy of Liverpool Change
					checkOffline();
					showChat(online);
				},
				timeout: 10000
			}).fail(function(){
				showChat(false);
			});
			}
			
	function main() {
	
		springSpace.jq(document).ready(function(){
		
					
			//change a % width to some standard pixel width for new window
			if (typeof libchat_options.width == 'string' && libchat_options.width.indexOf('%') !== -1) {
				libchat_options.width = '400';
			}
				
		
		//only load a stylesheet if there was a custom one set
		if (libchat_options.css !== '') {
			if(document.createStyleSheet) {
				try { document.createStyleSheet(libchat_options.css); } catch (e) { }
			}
			else {
				var css_tag = document.createElement("link");
				css_tag.setAttribute("rel", "stylesheet");
				css_tag.setAttribute("type", "text/css");
				css_tag.setAttribute("href", libchat_options.css);
				(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css_tag);
			}
		}			
		if (!libchat_options.color_border || libchat_options.color_border == '') { libchat_options.color_border = 'transparent'; }
		
					
			!function(a){a.fn.tabSlideOut=function(b){var c=a.extend({tabHandle:".lcs_chat_button",content_div:".lcs_load",speed:300,action:"click",tabLocation:"l",topPos:"200px",leftPos:"20px",fixedPosition:!0,positioning:"absolute",pathToTabImage:null,imageHeight:null,imageWidth:null,onLoadSlideOut:!1,buttonBGcolor:null},b||{});c.tabHandle=a(c.tabHandle),c.content_div=a(c.content_div);var d=this;c.positioning=c.fixedPosition===!0?"fixed":"absolute",!document.all||window.opera||window.XMLHttpRequest||(c.positioning="absolute"),null!=c.pathToTabImage&&c.tabHandle.css({background:"url("+c.pathToTabImage+") "+c.buttonBGcolor+" no-repeat",width:c.imageWidth,height:c.imageHeight,textIndent:"-99999px"}),c.tabHandle.css({display:"block",outline:"none",position:"absolute"}),d.css({"line-height":"1",position:c.positioning});var e={containerWidth:parseInt(d.outerWidth(),10)+"px",containerHeight:parseInt(d.outerHeight(),10)+"px",tabWidth:parseInt(c.tabHandle.outerWidth(),10)+"px",tabHeight:parseInt(c.tabHandle.outerHeight(),10)+"px"};("t"===c.tabLocation||"b"===c.tabLocation)&&(d.css({left:c.leftPos}),c.tabHandle.css({right:0})),"t"===c.tabLocation&&(d.css({top:"-"+e.containerHeight}),c.tabHandle.css({bottom:"-"+e.tabHeight})),"b"===c.tabLocation&&(d.css({bottom:"-"+e.containerHeight,position:"fixed"}),c.tabHandle.css({top:"-"+e.tabHeight})),("l"===c.tabLocation||"r"===c.tabLocation)&&d.css({height:e.containerHeight,top:c.topPos}),"l"===c.tabLocation&&(d.css({left:"-"+e.containerWidth}),c.tabHandle.css({right:"-"+e.tabWidth}),c.tabHandle.css(null!=c.pathToTabImage?{top:0}:{top:e.tabWidth})),"r"===c.tabLocation&&(d.css({right:"-"+e.containerWidth}),null!=c.pathToTabImage&&c.tabHandle.css({left:"-"+e.tabWidth}),c.tabHandle.css({top:0}),a("html").css("overflow-x","hidden")),c.tabHandle.click(function(a){a.preventDefault()});var f=function(){"t"===c.tabLocation?d.animate({top:"-"+e.containerHeight},c.speed).removeClass("open"):"l"===c.tabLocation?d.animate({left:"-"+e.containerWidth},c.speed).removeClass("open"):"r"===c.tabLocation?d.animate({right:"-"+e.containerWidth},c.speed).removeClass("open"):"b"===c.tabLocation&&d.animate({bottom:"-"+e.containerHeight},c.speed).removeClass("open"),c.content_div.attr("aria-hidden",!0)},g=function(){"t"==c.tabLocation?d.animate({top:"-3px"},c.speed).addClass("open"):"l"==c.tabLocation?d.animate({left:"-3px"},c.speed).addClass("open"):"r"==c.tabLocation?d.animate({right:"-3px"},c.speed).addClass("open"):"b"==c.tabLocation&&d.animate({bottom:"-3px"},c.speed).addClass("open"),c.content_div.attr("aria-hidden",!1)};c.tabHandle.click(function(){d.hasClass("open")?f():g()}),d.on("tabslideout.toggle",function(){d.hasClass("open")?f():g()})}}(springSpace.jq);
			
			chat_div = springSpace.jq('<div class="lcs_slide_out"></div>').css({
				'width': libchat_options.width,
				'height': '70px',
				'border': '1px solid '+libchat_options.color_border,
				'background-color': libchat_options.color_backg,
				'box-shadow': '0 0 5px #ccc',
				'z-index': '100'
			}).attr('title', "Click to open chat window"); // @todo make this customizable
						
			chat_button = springSpace.jq('<a class="lcs_chat_button" href="#"></a>');			
			chat_load = springSpace.jq('<div class="lcs_load" aria-hidden="true"></div>');
			
			chat_div.append(chat_button);
			chat_div.append(chat_load);
			springSpace.jq('body').append(chat_div);
			
			if (libchat_options.slidebutton_url && libchat_options.slidebutton_url !== '') {
				chat_div.tabSlideOut({
					pathToTabImage: libchat_options.slidebutton_url, 
					imageHeight: libchat_options.slidebutton_height,
					imageWidth: libchat_options.slidebutton_width,
					tabLocation: libchat_options.slidebutton_position,
					topPos: libchat_options.button_top,
					leftPos: libchat_options.button_posLeft,
					buttonBGcolor: libchat_options.slidebutton_bcolor
				});
			} else {
				if (!libchat_options.slidebutton_color) { libchat_options.slidebutton_color = '#ffffff'; }
				var chat_button_span = springSpace.jq('<span></span>').html(libchat_options.slidebutton_text).css({ padding: '10px', display: 'block', borderStyle: 'solid', borderColor: libchat_options.slidebutton_color, color: libchat_options.slidebutton_color, backgroundColor: 'transparent', margin: '1px' });
				if ((libchat_options.slidebutton_position == 'b')) {
					chat_button.css({ backgroundColor: libchat_options.slidebutton_bcolor, textDecoration: 'none', boxShadow: 'rgb(204, 204, 204) 0px 0px 5px' });
					chat_button_span.css({ borderWidth: '4px 4px 0px 4px',  });
				} else {
					var rotate = (libchat_options.slidebutton_position == 'l') ? '270deg' : '-270deg';
					chat_button.css({ transformOrigin: 'top left', transform: 'rotate('+rotate+')', backgroundColor: libchat_options.slidebutton_bcolor, textDecoration: 'none', boxShadow: 'rgb(204, 204, 204) 0px 0px 5px' });
					chat_button_span.css({ borderWidth: '0px 4px 4px 4px',  });
				}
				chat_button.append(chat_button_span);
				chat_div.tabSlideOut({
					tabLocation: libchat_options.slidebutton_position,
				});
			}
			
			chat_button.on('click', function(e) {
				window.clearTimeout(chat_timer);
				if(chat_div.hasClass('open')){
					checkStatus();
				} else {
					// window is closing
					chat_div.css({'width': libchat_options.width, 'height': '70px' }).attr('title', "Click to open chat window");
				}
				return true;
			});
			
			//timer
			if (libchat_options.autoload_time && parseInt(libchat_options.autoload_time,10) > 0) {
				chat_timer = window.setTimeout(function(){ chat_self_triggered = true; checkStatus(); }, parseInt(libchat_options.autoload_time, 10) * 1000);
			}
			
					
			}); //end docready
	}//end main

	function showChat(online){
		var qs = window.location.protocol+'//'+libchat_options.base_domain+'/chati.php?';
		qs += "iid=" + libchat_options.iid + 
			 "&hash=" + libchat_options.hash;

		if (typeof libchat_options['template'] !== 'undefined') {
			qs += "&template="+encodeURIComponent(libchat_options['template']);
		}
		
		if (typeof libchat_options['template_css'] !== 'undefined') {
			qs += "&template_css="+encodeURIComponent(libchat_options['template_css']);
		}		
		qs += "&online="+online;
		
		try {
			if ( typeof libchat_options.width === 'string' && libchat_options.width.indexOf("%") == -1 )
				libchat_options.width = parseInt(libchat_options.width,10);
		} catch(e){}

		try {
			if ( typeof libchat_options.height === 'string' && libchat_options.height.indexOf("%") == -1 )
				libchat_options.height = parseInt(libchat_options.height,10);
		} catch(e){}
		/**
		 * University of Liverpool amendment to add QP switch
		 */
		if(online === false && offline.switch != "offline"){
			qs = window.location.protocol+'//libapps.liv.ac.uk/ask_switch/qp.html';
		}
		else if(online === false && offline.switch == "offline"){
			qs = window.location.protocol+'//v2.libanswers.com/chati.php?iid=447&hash=0c1cafbd27ef89e465f4a764e1602805&online=false';
		}
		// end of University of Liverpool amendment
		
						//slideout
				else if (online === false && chat_self_triggered === true) { chat_self_triggered = false; return; }
				else if (chat_self_triggered === true) {
					chat_div.trigger('tabslideout.toggle'); chat_self_triggered = false; qs += '&auto=true';
					chat_load.attr('aria-live', 'polite');
					springSpace.jq(window).on('message', function(e){
						var data = e.originalEvent.data;
						if (data == 'closewidget') {
							chat_button.trigger('click');
							chat_load.removeAttr('aria-live');
						} else if (data == 'chatstarted') {
							chat_load.removeAttr('aria-live');
						}
					});
				}
				
				chat_div.css({'width':libchat_options.width, 'height': libchat_options.height });
				
				var $iframe = springSpace.jq('<iframe></iframe>').attr({ 'id': 'iframe_'+libchat_options.hash, 'name': 'iframe_'+libchat_options.hash, 'title': 'Chat widget', 'src': qs, 'frameborder': 0, 'scrolling': 'no' }).css({ 'border': 'none', boxSizing: 'border-box', 'width': '100%', 'height': libchat_options.height });
				chat_load.html($iframe).show();
				
						
		
	}//end showchat

})(); //end anonymous function