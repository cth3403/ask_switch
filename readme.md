##LibChat Chat Switch

####Purpose:
To enable our librarians to switch between chat service provider depending on hours of operation i.e. LibChat for 9-5, Questionpoint for out of ours or to set chat as offline.

####Usage:
In the LibAnswers 'Look and Feel' add the following to the Custom JS/CSS Code box:

`<script type="text/javascript" src="http://[yourserver]/ask_switch/chat_switch.js"></script>`

Then in the 'Admin Alert Box' switch to the Plain Text editor and add the following:

`<div id="chat_choice"></div>`

Then everywhere you want the button to appear add the following HTML:

`<div id="chat_button"> <script type="text/javascript" src="http://[yourserver]/ask_switch/chat_switch.js"></script></div>`
