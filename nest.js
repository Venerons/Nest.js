// ┌───────────────────────────────────────────────────────────────────────┐
// │ Nest.js                                                               │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Version 0.16.0 - 20/09/2014                                           │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Copyright (c) 2014 Daniele Veneroni (http://venerons.github.io)       │
// ├───────────────────────────────────────────────────────────────────────┤
// │ Licensed under the MIT License (X11 License).                         │
// └───────────────────────────────────────────────────────────────────────┘

(function (global, alias) {
	'use strict';
	/* jshint bitwise: true */
	/* jshint camelcase: true */
	/* jshint curly: true */
	/* jshint eqeqeq: true */
	/* jshint forin: true */
	/* jshint freeze: true */
	/* jshint indent: 4 */
	/* jshint latedef: true */
	/* jshint newcap: true */
	/* jshint noarg: true */
	/* jshint noempty: true */
	/* jshint nonbsp: true */
	/* jshint nonew: true */
	/* jshint plusplus: false */
	/* jshint quotmark: single */
	/* jshint undef: true */
	/* jshint unused: true */
	/* jshint globalstrict: true */
	/* jshint trailing: true */

	/* jshint maxerr: 100 */
	/* jshint browser: true */
	/* jshint devel: true */
	/* jshint nonstandard: true */

	function Nest(a) {
		if (this instanceof Nest) {
			// Nest instance
			this.element = a || null;
			this.first = a[0] || null;
			this.length = a.length || 0;
		} else {
			// selector
			if (typeof a === 'string') {
				a = a.trim();
				if (/^#[a-zA-Z]+[a-zA-Z0-9_\-]*$/.test(a)) {
					return new Nest([ document.getElementById(a.slice(1)) ]);
				} else if (/^\.[a-zA-Z0-9]+[a-zA-Z0-9_\-]*$/.test(a)) {
					return new Nest(document.getElementsByClassName(a));
				} else {
					return new Nest(document.querySelectorAll(a));
				}
			} else {
				return new Nest([ a ]);
			}
		}
	}

	Nest.fn = Nest.prototype;

	Nest.version = '0.16.0';

	//***** IS **********************************************************************************

	Nest.fn.is = function (selector) {
		if (this.first.matches) {
			return this.first.matches(selector);
		} else if (this.first.mozMatchesSelector) {
			return this.first.mozMatchesSelector(selector);
		} else if (this.first.webkitMatchesSelector) {
			return this.first.webkitMatchesSelector(selector);
		} else if (this.first.msMatchesSelector) {
			return this.first.msMatchesSelector(selector);
		} else if (this.first.oMatchesSelector) {
			return this.first.oMatchesSelector(selector);
		}
		return false;
	};

	//***** TEXT **********************************************************************************

	Nest.fn.text = function (text) {
		if (text) {
			for (var i = 0; i < this.length; i++) {
				this.element[i].textContent = text;
			}
			return this;
		} else {
			return this.first.textContent;
		}
	};

	//***** HTML **********************************************************************************

	Nest.fn.html = function (html) {
		if (html) {
			for (var i = 0; i < this.length; i++) {
				this.element[i].innerHTML = html;
			}
			return this;
		} else {
			return this.first.innerHTML;
		}
	};

	//***** REPLACE *******************************************************************************

	Nest.fn.replace = function (html) {
		if (html) {
			for (var i = 0; i < this.length; i++) {
				this.element[i].outerHTML = html;
			}
			return this;
		}
	};

	//***** EMPTY *********************************************************************************

	Nest.fn.empty = function () {
		this.html('');
		/* alternative:
		for (var i = 0; i < this.length; i++) {
			while (this.element[i].firstChild) {
				this.element[i].removeChild(this.element[i].firstChild);
			}
		}
		*/
		return this;
	};

	//***** APPEND HTML ***************************************************************************

	Nest.fn.append = function (html) {
		var i;
		if (typeof html === 'string') {
			for (i = 0; i < this.length; i++) {
				this.element[i].insertAdjacentHTML('beforeend', html);
			}
		} else if (html instanceof Nest && html.first) {
			for (i = 0; i < this.length; i++) {
				this.element[i].appendChild(html.first);
			}
		} else {
			for (i = 0; i < this.length; i++) {
				this.element[i].appendChild(html);
			}
		}
		return this;
	};

	//***** PREPEND HTML **************************************************************************

	Nest.fn.prepend = function (html) {
		var i;
		if (typeof html === 'string') {
			for (i = 0; i < this.length; i++) {
				this.element[i].insertAdjacentHTML('afterbegin', html);
			}
		} else if (html instanceof Nest && html.first) {
			for (i = 0; i < this.length; i++) {
				this.element[i].insertBefore(html.first, this.element[i].firstChild);
			}
		} else {
			for (i = 0; i < this.length; i++) {
				this.element[i].insertBefore(html, this.element[i].firstChild);
			}
		}
		return this;
	};

	//***** BEFORE ********************************************************************************

	Nest.fn.before = function (html) {
		var i;
		if (typeof html === 'string') {
			for (i = 0; i < this.length; i++) {
				this.element[i].insertAdjacentHTML('beforebegin', html);
			}
		} else if (html instanceof Nest && html.first) {
			for (i = 0; i < this.length; i++) {
				this.element[i].parentNode.insertBefore(html.first, this.element[i]);
			}
		} else {
			for (i = 0; i < this.length; i++) {
				this.element[i].parentNode.insertBefore(html, this.element[i]);
			}
		}
		return this;
	};

	//***** AFTER *********************************************************************************

	Nest.fn.after = function (html) {
		var i;
		if (typeof html === 'string') {
			for (i = 0; i < this.length; i++) {
				this.element[i].insertAdjacentHTML('afterend', html);
			}
		} else if (html instanceof Nest && html.first) {
			for (i = 0; i < this.length; i++) {
				this.element[i].parentNode.insertBefore(html.first, this.element[i].nextSibling);
			}
		} else {
			for (i = 0; i < this.length; i++) {
				this.element[i].parentNode.insertBefore(html, this.element[i].nextSibling);
			}
		}
		return this;
	};

	//***** REMOVE ********************************************************************************

	Nest.fn.remove = function () {
		var a = [];
		for (var i = 0; i < this.length; i++) {
			if (this.element[i].parentNode) {
				this.element[i].parentNode.removeChild(this.element[i]);
			} else {
				a.push(this.element[i]);
			}
		}
		if (a.length > 0) {
			this.element = a;
			this.length = this.element.length;
			this.first = this.element[0];
		} else {
			this.element = null;
			this.length = 0;
			this.first = null;
		}
		return this;
	};

	//***** SHOW **********************************************************************************

	Nest.fn.show = function () {
		this.removeAttr('hidden');
		return this;
	};

	//***** HIDE **********************************************************************************

	Nest.fn.hide = function () {
		this.attr('hidden', true);
		return this;
	};

	//***** CSS ***********************************************************************************

	Nest.fn.css = function (a, b) {
		var i = 0;
		if (typeof a === 'string' && !b) {
			// return css value
			return global.getComputedStyle(this.first).getPropertyValue(a);
		} else if (typeof a === 'object' && !b) {
			// set css by object
			for (i = 0; i < this.length; i++) {
				for (var key in a) {
					if (a.hasOwnProperty(key)) {
						this.element[i].style.setProperty(key, a[key], this.element[i].style.getPropertyPriority(key));
					}
				}
			}
		} else if (typeof a === 'string' && typeof b === 'string') {
			// set css by property, value tuple
			for (i = 0; i < this.length; i++) {
				this.element[i].style.setProperty(a, b, this.element[i].style.getPropertyPriority(a));
			}
		}
		return this;
	};

	//***** PREFIX ***********************************************************************************

	Nest.fn.prefix = function (styles) {
		for (var key in styles) {
			if (styles.hasOwnProperty(key)) {
				var obj = {};
				obj['-moz-' + key] = styles[key];
				obj['-webkit-' + key] = styles[key];
				obj['-o-' + key] = styles[key];
				obj['-ms-' + key] = styles[key];
				obj[key] = styles[key];
				this.css(obj);
			}
		}
		return this;
	};

	//***** ADD CLASS *****************************************************************************

	Nest.fn.addClass = function (classes) {
		var array = classes.split(' '),
			arrayLength = array.length;
		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < arrayLength; j++) {
				this.element[i].classList.add(array[j]);
			}
		}
		return this;
	};

	//***** REMOVE CLASS **************************************************************************

	Nest.fn.removeClass = function (classes) {
		var array = classes.split(' '),
			arrayLength = array.length;
		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < arrayLength; j++) {
				this.element[i].classList.remove(array[j]);
			}
		}
		return this;
	};

	//***** TOGGLE CLASS **************************************************************************

	Nest.fn.toggleClass = function (classes) {
		var array = classes.split(' '),
			arrayLength = array.length;
		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < arrayLength; j++) {
				this.element[i].classList.toggle(array[j]);
			}
		}
		return this;
	};

	//***** HAS CLASS *****************************************************************************

	Nest.fn.hasClass = function (c) {
		return this.first.classList.contains(c);
	};

	//***** FADE IN *******************************************************************************

	Nest.fn.fadeIn = function (ms, callback) {
		ms = ms || 500;
		this.css({
			'-webkit-transition': 'opacity ' + ms + 'ms',
			'transition': 'opacity ' + ms + 'ms',
			'opacity': '1'
		});
		if (callback) {
			setTimeout(callback, ms);
		}
	};

	//***** FADE OUT ******************************************************************************

	Nest.fn.fadeOut = function (ms, callback) {
		ms = ms || 500;
		this.css({
			'-webkit-transition': 'opacity ' + ms + 'ms',
			'transition': 'opacity ' + ms + 'ms',
			'opacity': '0'
		});
		if (callback) {
			setTimeout(callback, ms);
		}
	};

	//***** ON EVENT ******************************************************************************

	Nest.fn.on = function (eventList, func, bubbling) {
		bubbling = bubbling || false;
		var array = eventList.split(' '), i, j, len;
		if (this.first.addEventListener) {
			for (j = 0, len = array.length; j < len; j++) {
				for (i = 0; i < this.length; i++) {
					this.element[i].addEventListener(array[j], func, bubbling);
				}
			}
		} else {
			for (j = 0, len = array.length; j < len; j++) {
				for (i = 0; i < this.length; i++) {
					this.element[i]['on' + array[j]] = func;
				}
			}
		}
		return this;
	};

	//***** OFF EVENT *****************************************************************************

	Nest.fn.off = function (eventList, func, bubbling) {
		bubbling = bubbling || false;
		var array = eventList.split(' '), i, j, len;
		if (this.first.removeEventListener) {
			for (j = 0, len = array.length; j < len; j++) {
				for (i = 0; i < this.length; i++) {
					this.element[i].removeEventListener(array[j], func, bubbling);
				}
			}
		} else {
			for (j = 0, len = array.length; j < len; j++) {
				for (i = 0; i < this.length; i++) {
					this.element[i]['on' + array[j]] = null;
				}
			}
		}
	};

	//***** TRIGGER EVENT *************************************************************************

	Nest.fn.trigger = 'CustomEvent' in global ? function (type, object) {
		var i;
		if (object) {
			for (i = 0; i < this.length; i++) {
				this.element[i].dispatchEvent(new CustomEvent(type, { bubbles: false, cancelable: false, detail: object }));
			}
		} else {
			for (i = 0; i < this.length; i++) {
				this.element[i].dispatchEvent(new Event(type));
			}
		}
		return this;
	} : function (type, object) {
		// IE 10
		var i;
		if (object) {
			for (i = 0; i < this.length; i++) {
				var evt = document.createEvent('CustomEvent');
				evt.initCustomEvent(type, false, false, object);
				this.element[i].dispatchEvent(evt);
			}
		} else {
			for (i = 0; i < this.length; i++) {
				this.element[i].dispatchEvent(new Event(type));
			}
		}
		return this;
	};

	//***** ATTRIBUTE *****************************************************************************

	Nest.fn.attr = function (a, b) {
		var i;
		if (typeof a === 'string' && !b) {
			// return attribute
			return this.first.getAttribute(a);
		} else if (typeof a === 'object' && !b) {
			// set attributes by object
			for (i = 0; i < this.length; i++) {
				for (var key in a) {
					if (a.hasOwnProperty(key)) {
						this.element[i].setAttribute(key, a[key]);
					}
				}
			}
		} else if (typeof a === 'string' && (typeof b === 'string' || typeof b === 'boolean')) {
			// set attribute by property, value tuple
			for (i = 0; i < this.length; i++) {
				this.element[i].setAttribute(a, b);
			}
		}
		return this;
	};

	//***** REMOVE ATTRIBUTE **********************************************************************

	Nest.fn.removeAttr = function (attr) {
		for (var i = 0; i < this.length; i++) {
			this.element[i].removeAttribute(attr);
		}
		return this;
	};

	//***** VALUE *********************************************************************************

	Nest.fn.value = function (value) {
		if (value) {
			for (var i = 0; i < this.length; i++) {
				this.element[i].value = value;
			}
			return this;
		} else {
			return this.first.value;
		}
	};

	//***** GET WIDTH *****************************************************************************

	Nest.fn.width = function () {
		return Math.max(this.first.offsetWidth, this.first.clientWidth);
	};

	//***** GET HEIGHT ****************************************************************************

	Nest.fn.height = function () {
		return Math.max(this.first.offsetHeight, this.first.clientHeight);
	};

	//***** IS FULLSCREEN *************************************************************************

	Nest.fn.isFullscreen = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || false ? function () {
		return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
	} : function () {
		// fullscreen APIs not supported, do nothing...
		return false;
	};

	//***** FULLSCREEN ****************************************************************************

	Nest.fn.fullscreen = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || false ? function (goFullscreen) {
		if (goFullscreen) {
			var el = this.first || document.documentElement;
			if (el.requestFullscreen) {
				// W3C standard
				el.requestFullscreen();
			} else if (el.mozRequestFullScreen) {
				// Firefox 10+, Firefox for Android
				el.mozRequestFullScreen();
			} else if (el.msRequestFullscreen) {
				// IE 11+
				el.msRequestFullscreen();
			} else if (el.webkitRequestFullscreen) {
				if (/Safari/.test(navigator.userAgent) && !(/Chrome/.test(navigator.userAgent))) {
					// Safari 6+
					el.webkitRequestFullscreen();
				} else {
					// Chrome 20+, Opera 15+, Chrome for Android, Opera Mobile 16+
					el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				}
			}
		} else {
			if (document.exitFullscreen) {
				// W3C standard
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				// Firefox 10+, Firefox for Android
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				// Chrome 20+, Safari 6+, Opera 15+, Chrome for Android, Opera Mobile 16+
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				// IE 11+
				document.msExitFullscreen();
			}
		}
		return this;
	} : function () {
		// fullscreen APIs not supported, do nothing...
		return this;
	};

	//***** VISIBILITY ****************************************************************************

	Nest.visibility = function (obj) {
		//var hidden = document.hidden || document.mozHidden || document.msHidden || document.webkitHidden;
		//var visibilityState = document.visibilityState || document.mozVisibilityState || document.msVisibilityState || document.webkitVisibilityState;
		obj.onHidden = obj.onHidden || function () {};
		obj.onVisible = obj.onVisible || function () {};
		Nest(document).on('visibilitychange mozvisibilitychange webkitvisibilitychange msvisibilitychange', function () {
			if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden) {
				obj.onHidden();
			} else {
				obj.onVisible();
			}
		});
	};

	//***** NOTIFICATIONS *************************************************************************

	Nest.notify = 'Notification' in global ? function (title, content) {
		// Firefox 22+, Chrome 22+, Safari 7+, BlackBerry Browser 10+
		if (!content) {
			content = {
				dir: 'auto',
				body: ''
			};
		}
		if (Notification.permission !== 'granted') {
			Notification.requestPermission(function () {
				var n = new Notification(title, content);
				n.onerror = function (e) { console.error('Notification Error: ', e); };
				return n;
			});
		} else {
			var n = new Notification(title, content);
			n.onerror = function (e) { console.error('Notification Error: ', e); };
			return n;
		}
	} : function (title, content) {
		// IE, Opera
		if (!content) {
			content = {
				body: ''
			};
		}
		alert(title + '\n\n' + content.body);
	};

	//***** LOCK ORIENTATION **********************************************************************

	Nest.lockOrientation = window.screen.lockOrientation || window.screen.mozLockOrientation || window.screen.msLockOrientation || function () { console.warn('screen.lockOrientation API not supported on this browser'); };

	//***** VIBRATION *****************************************************************************

	navigator.vibrate = navigator.vibrate || navigator.mozVibrate || navigator.webkitVibrate || navigator.msVibrate || false;

	Nest.vibrate = navigator.vibrate ? function (ms) {
		navigator.vibrate(ms);
	} : window.vibrate ? function (ms) {
		window.vibrate(ms);
	} : function () {
		// nothing...
	};

	//***** THREAD ********************************************************************************

	global.URL = global.URL || global.webkitURL || null;

	Nest.thread = !global.URL ? function (func) {
		// Opera fallback that don't support window.URL
		return new Worker('data:application/javascript,' + encodeURIComponent('(' + func + ')()'));
	} : function (func) {
		// Chrome 20+ - Firefox 13+ - Safari 6+ - IE 10+
		var blob = new Blob(['(' + func + ')()'], { type: 'application/javascript' });
		return new Worker(URL.createObjectURL(blob));
	};

	//***** GUID **********************************************************************************

	Nest.guid = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	};

	//***** REQUIRE *******************************************************************************

	Nest.require = function (scripts, callback, async) {
		if (typeof scripts === 'string') {
			scripts = [ scripts ];
		}
		async = async !== null ? async : true;
		scripts.forEach(function (path) {
			var type = path.substring(path.lastIndexOf('.') + 1), script, node;
			if (type === 'js') {
				script = document.createElement('script');
				script.type = 'application/javascript';
				script.async = async;
				script.src = path;
				node = document.body || document.head;
			} else if (type === 'css') {
				script = document.createElement('link');
				script.rel = 'stylesheet';
				script.type = 'text/css';
				script.href = path;
				node = document.head || document.body;
			}
			if (callback) {
				script.onload = function () {
					console.log('Loaded: ' + path);
					callback();
				};
			}
			if (script) {
				node.appendChild(script);
			}
		});
	};

	//***** QUERYSTRING ***************************************************************************

	Nest.queryString = function (variable) {
		var query = window.location.search.substring(1),
			vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) === variable) {
				return decodeURIComponent(pair[1]);
			}
		}
		return false;
	};

	//***** TO QUERYSTRING ************************************************************************

	Nest.toQueryString = function (list) {
		var querystring = '?';
		for (var key in list) {
			if (list.hasOwnProperty(key)) {
				querystring += encodeURIComponent(key.toString()) + '=' + encodeURIComponent(list[key].toString()) + '&';
			}
		}
		return querystring.substring(0, querystring.length - 1);
	};

	//***** AJAX **********************************************************************************

	/*

	ajax({
		type: <'GET' || 'POST'>,
		url: <string>,
		async: <true || false>,
		contentType: <'application/x-www-form-urlencoded' || 'text/plain' || 'multipart/form-data'>,
		data: <string || object || HTMLFormElement>,
		responseType: <'text' || 'json' || 'document' || 'arraybuffer' || 'blob'>,
		uploadProgress: <function(percentage)>,
		progress: <function(percentage)>,
		success: <function(response)>,
		error: <function(error)>
	});

	Note:

	- url is mandatory
	- HTMLFormElement as data only if type == 'POST' and contentType == 'multipart/form-data'
	- if resonseType == 'json', the response will be the JSON already parsed

	*/

	Nest.ajax = function (settings) {
		if (!settings.url) {
			return false;
		}
		settings.type = settings.type.toUpperCase() || 'GET';
		settings.async = settings.async === undefined ? true : settings.async;
		settings.contentType = settings.contentType || 'application/x-www-form-urlencoded';
		settings.responseType = settings.responseType || 'text';
		settings.uploadProgress = settings.uploadProgress || function (p) { console.log('XMLHttpRequest Upload ' + p + '%'); };
		settings.progress = settings.progress || function (p) { console.log('XMLHttpRequest Response ' + p + '%'); };
		settings.success = settings.success || function (data) { console.log(data); };
		settings.error = settings.error || function (error) { console.error(error); };

		// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

		try {
			var xhr = new XMLHttpRequest();

			xhr.upload.addEventListener('progress', function (e) {
				if (e.lengthComputable) {
					settings.uploadProgress(Math.round((e.loaded * 100) / e.total));
				} else {
					console.log('upload progress - not computable');
				}
			}, false);

			xhr.upload.addEventListener('error', function (e) {
				settings.error(new Error('XMLHttpRequest Upload Error'));
			}, false);

			xhr.upload.addEventListener('abort', function (e) {
				settings.error(new Error('XMLHttpRequest Upload Aborted'));
			}, false);
			
			xhr.upload.addEventListener('load', function (e) {
				settings.uploadProgress(100);
				console.log('xhr upload load - xhr upload completed');
			}, false);

			xhr.addEventListener('progress', function (e) {
				if (e.lengthComputable) {
					settings.progress(Math.round((e.loaded * 100) / e.total));
				} else {
					console.log('xhr progress - not computable');
				}
			}, false);

			xhr.addEventListener('error', function (e) {
				settings.error(new Error('XMLHttpRequest Error - Connection error of some sort'));
			}, false);

			xhr.addEventListener('abort', function (e) {
				settings.error(new Error('XMLHttpRequest Abort'));
			}, false);
			
			xhr.addEventListener('load', function (e) {
				if (xhr.status >= 200 && xhr.status < 400 || xhr.status === 0) {
					var response;
					// TODO - responseType 'xml' is permitted?
					if (settings.responseType.toLowerCase() === 'xml') {
						response = xhr.responseXML;
					} else if (settings.responseType.toLowerCase() === 'arraybuffer') {
						response = xhr.response;
					} else {
						response = xhr.responseText;
					}
					if (settings.responseType.toLowerCase() === 'json') {
						response = JSON.parse(response);
					}
					settings.success(response);
				} else {
					settings.error(new Error('XMLHttpRequest Error - Server reached, but it returned an error'));
				} 
			}, false);

			if (settings.type === 'GET') {
				if (settings.data) {
					if (typeof settings.data !== 'string') {
						settings.data = Nest.toQueryString(settings.data).slice(1);
					}
					settings.url += '?' + settings.data;
				}
				xhr.open(settings.type, settings.url, settings.async);
				xhr.responseType = settings.responseType;
				xhr.send(null);
			} else if (settings.type === 'POST') {
				xhr.open(settings.type, settings.url, settings.async);
				xhr.responseType = settings.responseType;
				xhr.setRequestHeader('Content-Type', settings.contentType);
				var data = null;
				if (settings.data) {
					// about content type: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Submitting_forms_and_uploading_files
					if (settings.contentType === 'application/x-www-form-urlencoded') {
						if (typeof settings.data !== 'string') {
							settings.data = Nest.toQueryString(settings.data).slice(1);
						}
						data = settings.data;
					} else if (settings.contentType === 'text/plain') {
						// TODO - check if data is already a well formatted text contentype and convert it otherwise
						data = settings.data;
					} else if (settings.contentType === 'multipart/form-data') {
						// https://developer.mozilla.org/en-US/docs/Web/API/FormData
						if (settings.data.toString() === '[object HTMLFormElement]') {
							data = new FormData(settings.data);
						} else {
							data = new FormData()
							if (typeof settings.data === 'string') {
								// TODO - convert string and then append
							} else {
								for (var key in settings.data) {
									if (settings.data.hasOwnProperty(key)) {
										data.append(key.toString(), settings.data[key]);
									}
								}
							}
						}
					}
				}
				xhr.send(data);
			}
		} catch (e) {
			settings.error(e);
		}
	};

	//***** GET ***********************************************************************************

	Nest.get = function (url, data, success) {
		Nest.ajax({
			url: url,
			type: 'GET',
			data: data,
			dataType: 'text',
			success: success
		});
	};

	//***** POST **********************************************************************************

	Nest.post = function (url, data, success) {
		Nest.ajax({
			url: url,
			type: 'POST',
			data: data,
			dataType: 'text',
			success: success
		});
	};

	//***** JSON **********************************************************************************

	Nest.json = function (url, data, success) {
		Nest.ajax({
			url: url,
			data: data,
			dataType: 'json',
			success: success
		});
	};

	//***** TYPE **********************************************************************************

	Nest.type = function (object) {
		return Object.prototype.toString.call(object).replace(/^\[object (.+)\]$/, "$1");
	};

	//***** VALIDATION ****************************************************************************

	// Many regex taken from http://www.regular-expressions.info/

	Nest.isTime = function (value, format) {
		format = format.toUpperCase() || 'HH:MM';
		if (format === 'HH:MM') {
			return /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
		} else if (format === 'MM:SS') {
			return /^[0-5][0-9]:[0-5][0-9]$/.test(value);
		} else {
			return false;
		}
	};

	Nest.isInteger = function (value) {
		return /^[-+]?[0-9]+$/.test(value) && !isNaN(value);
	};

	Nest.isFloat = function (value) {
		// validate i.e. 123.435, 123435
		return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(value) && !isNaN(value);
	};

	Nest.isHex = function (value) {
		// validate i.e. 12ADff, #12ADff, 0x12ADff
		return /^((0x|0X)?|#?)[a-fA-F0-9]+$/.test(value);
	};

	Nest.isEmail = function (value) {
		return /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
	};

	Nest.isIPv4 = function (value) {
		return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value);
	};

	//***** EXPOSURE ******************************************************************************

	global.Nest = Nest;
	global[alias] = global.Nest;

})(window || this, '$$');
