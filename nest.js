// ┌───────────────────────────────────────────────────────────────────────┐
// │ Nest.js                                                               │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Version 0.10.0 - 26/01/2014                                           │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Copyright (c) 2014 Daniele Veneroni (http://venerons.github.io)       │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Licensed under the MIT License (X11 License).                         │
// └───────────────────────────────────────────────────────────────────────┘

'use strict';

//***** INSTANCE **********************************************************************************

function Nest(a) {
	this.version = '0.10.0';
	this.element = a || null;
	this.length = a.length || 0;
	this.first = a[0] || null;
}

//***** SELECTOR **********************************************************************************

var $$ = function (query) {
	if (typeof query === 'string') {
		if (/^#[a-zA-Z]+[a-zA-Z0-9_\-]*$/.test(query)) {
			return new Nest([ document.getElementById(query.slice(1)) ]);
		} else {
			return new Nest(document.querySelectorAll(query));
		}
	} else {
		return new Nest([ query ]);
	}
};

Nest.fn = Nest.prototype;

//***** TEXT **************************************************************************************

Nest.fn.text = function (text) {
	if (text) {
		// set text
		for (var i = 0; i < this.length; i++) {
			this.element[i].textContent = text;
		}
		return this;
	} else {
		// return first selected text
		return this.first.textContent;
	}
};

//***** HTML **************************************************************************************

Nest.fn.html = function (html) {
	if (html) {
		// set html
		for (var i = 0; i < this.length; i++) {
			this.element[i].innerHTML = html;
		}
		return this;
	} else {
		// return first selected html
		return this.first.innerHTML;
	}
};

//***** EMPTY *************************************************************************************

Nest.fn.empty = function () {
	for (var i = 0; i < this.length; i++) {
		this.element[i].innerHTML = '';
	}
	/* alternative:

	for (var i = 0; i < this.length; i++) {
		while (this.element[i].firstChild) {
			this.element[i].removeChild(this.element[i].firstChild);
		}
	}
	
	*/
	return this;
};

//***** APPEND HTML *******************************************************************************

Nest.fn.append = function (html) {
	if (typeof html === 'string') {
		for (var i = 0; i < this.length; i++) {
			this.element[i].insertAdjacentHTML('beforeend', html);
		}
	} else if (html instanceof Nest && html.first) {
		for (var i = 0; i < this.length; i++) {
			this.element[i].appendChild(html.first);
		}
	} else {
		for (var i = 0; i < this.length; i++) {
			this.element[i].appendChild(html);
		}
	}
	return this;
};

//***** PREPEND HTML ******************************************************************************

Nest.fn.prepend = function (html) {
	if (typeof html === 'string') {
		for (var i = 0; i < this.length; i++) {
			this.element[i].insertAdjacentHTML('afterbegin', html);
		}
	} else if (html instanceof Nest && html.first) {
		for (var i = 0; i < this.length; i++) {
			this.element[i].insertBefore(html.first, this.element[i].firstChild);
		}
	} else {
		for (var i = 0; i < this.length; i++) {
			this.element[i].insertBefore(html, this.element[i].firstChild);
		}
	}
	return this;
};

//***** CSS ***************************************************************************************

Nest.fn.css = function (a, b) {
	if (typeof a === 'string' && !b) {
		// return css value
		return window.getComputedStyle(this.first).getPropertyValue(a);
	} else if (typeof a == 'object' && !b) {
		// set css by object
		for (var i = 0; i < this.length; i++) {
			for (var key in a) {
				if (a.hasOwnProperty(key)) {
					this.element[i].style.setProperty(key, a[key], this.element[i].style.getPropertyPriority(key));
				}
			}
		}
	} else if (typeof a === 'string' && typeof b === 'string') {
		// set css by property, value tuple
		for (var i = 0; i < this.length; i++) {
			this.element[i].style.setProperty(a, b, this.element[i].style.getPropertyPriority(a));
		}
	}
	return this;
};

//***** ADD CLASS *********************************************************************************

Nest.fn.addClass = function (classes) {
	var array = classes.split(' ');
	var arrayLength = array.length;
	for (var i = 0; i < this.length; i++) {
		for (var j = 0; j < arrayLength; j++) {
			this.element[i].classList.add(array[j]);
		}
	}
	return this;
};

//***** REMOVE CLASS ******************************************************************************

Nest.fn.removeClass = function (classes) {
	var array = classes.split(' ');
	var arrayLength = array.length;
	for (var i = 0; i < this.length; i++) {
		for (var j = 0; j < arrayLength; j++) {
			this.element[i].classList.remove(array[j]);
		}
	}
	return this;
};

//***** TOGGLE CLASS ******************************************************************************

Nest.fn.toggleClass = function (classes) {
	var array = classes.split(' ');
	var arrayLength = array.length;
	for (var i = 0; i < this.length; i++) {
		for (var j = 0; j < arrayLength; j++) {
			this.element[i].classList.toggle(array[j]);
		}
	}
	return this;
};

//***** HAS CLASS *********************************************************************************

Nest.fn.hasClass = function (c) {
	return this.first.classList.contains(c);
};

//***** ON EVENT **********************************************************************************

Nest.fn.on = function (eventName, func, bubbling) {
	bubbling = bubbling || false;
	if (this.first.addEventListener) {
		for (var i = 0; i < this.length; i++) {
			this.element[i].addEventListener(eventName, func, bubbling);
		}
	} else {
		for (var i = 0; i < this.length; i++) {
			this.element[i]['on' + eventName] = func;
		}
	}
	return this;
};

//***** OFF EVENT *********************************************************************************

Nest.fn.off = function (eventName, func, bubbling) {
	bubbling = bubbling || false;
	if (this.first.removeEventListener) {
		for (var i = 0; i < this.length; i++) {
			this.element[i].removeEventListener(eventName, func, bubbling);
		}
	} else {
		for (var i = 0; i < this.length; i++) {
			this.element[i]['on' + eventName] = null;
		}
	}
};

//***** TRIGGER EVENT *****************************************************************************

Nest.fn.trigger = window.CustomEvent ? function (type, object) {
	if (object) {
		for (var i = 0; i < this.length; i++) {
			this.element[i].dispatchEvent(new CustomEvent(type, { bubbles: false, cancelable: false, detail: object }));
		}
	} else {
		for (var i = 0; i < this.length; i++) {
			this.element[i].dispatchEvent(new Event(type));
		}
	}
	return this;
} : function (type, object) {
	// IE 10
	if (object) {
		for (var i = 0; i < this.length; i++) {
			var evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(type, false, false, object);
			this.element[i].dispatchEvent(evt);
		}
	} else {
		for (var i = 0; i < this.length; i++) {
			this.element[i].dispatchEvent(new Event(type));
		}
	}
	return this;
};

//***** GET WIDTH *********************************************************************************

Nest.fn.width = function () {
	return Math.max(this.first.offsetWidth, this.first.clientWidth);
};

//***** GET HEIGHT ********************************************************************************

Nest.fn.height = function () {
	return Math.max(this.first.offsetHeight, this.first.clientHeight);
};

//***** FULLSCEEN *********************************************************************************

Nest.fn.toggleFullscreen = document.fullscreenElement !== null ? function () {
	if (document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	} else {
		if (this.first.requestFullscreen) {
			this.first.requestFullscreen();
		} else if (this.first.mozRequestFullScreen) {
			this.first.mozRequestFullScreen();
		} else if (this.first.msRequestFullscreen) {
			this.first.msRequestFullscreen();
		} else if (this.first.webkitRequestFullScreen) {
			if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
				this.first.webkitRequestFullScreen();
			} else {
				this.first.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		}
	}
	return this;
} : function () {
	// nothing...
	return this;
};

//***** VISIBILITY ********************************************************************************

Nest.fn.visibility = function (obj) {
	var visibilityEvent = document.hidden !== undefined ? 'visibilitychange' : document.mozHidden !== undefined ? 'mozvisibilitychange' : document.webkitHidden !== undefined ? 'webkitvisibilitychange' : document.msHidden !== undefined ? 'msvisibilitychange' : null;
	//var hidden = document.hidden || document.mozHidden || document.msHidden || document.msHidden || document.webkitHidden;
	//var visibilityState = document.visibilityState || document.mozVisibilityState || document.msVisibilityState || document.webkitVisibilityState;
	obj.onHidden = obj.onHidden || function () {};
	obj.onVisible = obj.onVisible || function () {};
	new Nest(document).on(visibilityEvent, function () {
		if (document.hidden || document.mozHidden || document.msHidden || document.msHidden || document.webkitHidden) {
			obj.onHidden();
		} else {
			obj.onVisible();
		}
	});
	return this;
};

//***** NOTIFICATIONS *****************************************************************************

Nest.fn.notify = window.Notification ? function (title, content) {
	// Firefox 22+, Chrome 22+, Safari 7+, BlackBerry Browser 10+
	if (Notification.permission !== 'granted') {
		Notification.requestPermission(function () {
			var n = new Notification(title, content);
		});
	} else {
		var n = new Notification(title, content);
	}
	return this;
} : function (title, content) {
	// IE, Opera
	alert(title + '\n\n' + content.body);
	return this;
};

//***** VIBRATION *********************************************************************************

navigator.vibrate = navigator.vibrate || navigator.mozVibrate || navigator.webkitVibrate || navigator.msVibrate || null;

Nest.fn.vibrate = navigator.vibrate ? function (ms) {
	navigator.vibrate(ms);
	return this;
} : function () {
	// nothing...
	return this;
};

//***** THREAD ************************************************************************************

window.URL = window.URL || window.webkitURL || null;

Nest.fn.thread = !window.URL ? function (func) {
	// Opera fallback that don't support window.URL
	return new Worker('data:application/javascript,' + encodeURIComponent('(' + func + ')()'));
} : function (func) {
	// Chrome 20+ - Firefox 13+ - Safari 6+ - IE 10+
	var blob = new Blob(['(' + func + ')()'], { type: 'application/javascript' });
	return new Worker(URL.createObjectURL(blob));
};

//***** GUID **************************************************************************************

Nest.fn.guid = function () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};

//***** LOAD SCRIPT *******************************************************************************

Nest.fn.loadScript = function (type, path, callback) {
	var script, node;
	if (type === 'js') {
		script = document.createElement('script');
		script.type = 'application/javascript';
		script.async = true;
		script.defer = true;
		script.src = encodeURIComponent(path);
		node = document.body || document.getElementsByTagName('head')[0];
	} else if (type === 'css') {
		script = document.createElement('link');
		script.rel = 'stylesheet';
		script.type = 'text/css';
		script.href = encodeURIComponent(path);
		node = document.getElementsByTagName('head')[0] || document.body;
	}
	if (callback) {
		script.onload = function () {
			callback();
		};
	}
	if (script) {
		node.appendChild(script);
	}
	return this;
};