# Nest.js Documentation

_Version 0.14.0 - 15/02/2014_  
_Copyright (c) 2014 Daniele Veneroni ([http://venerons.github.io](http://venerons.github.io))_  
_Licensed under the MIT License (X11 License)_  

## Table of Contents

* About Nest.js
	- [Using Nest.js](#using-nestjs)
	- [Browser Support](#browser-support)

* DOM
	- [.text()](#text)
	- [.html()](#html)
	- [.empty()](#empty)
	- [.append()](#append)
	- [.prepend()](#prepend)
	- [.before()](#before)
	- [.after()](#after)
	- [.remove()](#remove)
	- [.attr()](#attr)
	- [.removeAttr()](#removeattr)
	- [.show()](#show)
	- [.hide()](#hide)
	- [.fadeIn()](#fadeIn)
	- [.fadeOut()](#fadeOut)
	- [.val()](#val)
	- [.width()](#width)
	- [.height()](#height)

* Styling
	- [.css()](#css)
	- [.addClass()](#addclass)
	- [.removeClass()](#removeclass)
	- [.toggleClass()](#toggleclass)
	- [.hasClass()](#hasclass)

* Events
	- [.on()](#on)
	- [.off()](#off)
	- [.trigger()](#trigger)

* AJAX
	- [.ajax()](#ajax)
	- [.get()](#get)
	- [.post()](#post)
	- [.json()](#json)

* Utility
	- [.loadScript()](#loadscript)
	- [.queryString()](#querystring)
	- [.toQueryString()](#toquerystring)
	- [.toggleFullscreen()](#togglefullscreen)
	- [.visibility()](#visibility)
	- [.notify()](#notify)
	- [.vibrate()](#vibrate)
	- [.thread()](#thread)
	- [.guid()](#guid)

## About Nest.js

## Using Nest.js

Just add the script to your HTML page to import Nest.js

```html
<script src="js/nest.min.js"></script>
```

Then you are ready to rock! You can use `$$` or `Nest` to access Nest.js functions, first at all to select an element using css selector. Mind that if you provide a selector that target more than one element, all modifications will be applied to all elements that match that selector.  
Here some examples:

```js
// get element by id
var myElement = $$('#example');

// all 'td' elements that have the class 'someclass'
var myElement2 = $$('table tr td.someclass');

// all 'li' elements that are child of a 'ol' element
var myBody = $$('ol > li');

// direct injection of element
var myDocument = $$(document.documentElement);
```

Then you can use the function you want on the elements selected. Mind that most of the APIs are chainable, unless they return some value.

```js
$$('#example').text('Hello There!').css('color', 'rgb(123, 231, 213)');

$$(document.documentElement).toggleFullscreen();

var exampleWidth = $$('#example').width();
```

There are also many function that doesn't need any element:

```js
$$.vibrate(1000);

var GUID = $$.guid();

$$.notify('Welcome to Wonderland!', {
	dir: 'auto',
	body: 'We are very happy that you have joined us!',
	icon: 'aVeryImpressiveImage.png'
});
```

### Browser Support

Nest.js is cross-browser and offers support for almost any browser in their last 2 most recent versions, that means the current version and the previous.  
Support means that I try to do anything to get the APIs work on that version and if someone finds a bug, I'll try to fix it. However, also if a browser is not supported can be still compatible, that means that it should work well but I don't care about making better on it.  
So, essentially: if it's supported, it should works fine, and you can complain if doesn't. If it's compatible, it should works fine too, but don't complain if don't.

Browser                     | Compatible | Supported | Support Level   | Notes
:-------------------------- | :--------: | :-------: |:--------------: | :---
_Desktop_                   | -          | -         | -               | -
Mozilla Firefox             | 11         | 26 - 27   | Full            | 
Google Chrome               | 32         | 32        | Full            | 
Apple Safari                | 6.1        | 6.1 - 7   | Almost Complete | lacks of `.vibrate()`, `.notify()` only Safari 7+
Opera                       | 12.1       | 18 - 19   | Almost Complete | lacks of `.notify()`, `.vibrate()`
Microsoft Internet Explorer | 10         | 10 - 11   | Almost Complete | lacks of `.notify()`, `.vibrate()`, `.thread()`
_Mobile_                    | -          |           | -               | 
Mozilla Firefox for Android | ?          |           | ?               | 
Mozilla Firefox OS          | ?          |           | ?               | 
Android Browser/WebView     | ?          |           | ?               | 
Google Chrome for Android   | ?          |           | ?               | 
iOS Safari/Chrome/WebView   | ?          |           | ?               | 
Opera Mobile                | ?          |           | ?               | 
Opera Mini                  | ?          |           | ?               | 
BlackBerry Browser          | ?          |           | ?               | 
MS Internet Explorer Mobile | ?          |           | ?               | 

## APIs Documentation

### .text()

Set the text inside of the selected elements, or get the text of the first element selected. Doesn't parse HTML, so any eventual tag that you insert through this function will be added as plain text (that means that will be escaped).

Examples:

```js
$$('#example').text('ciao');
var exampleText = $$('#example').text();
```

### .html()

Set the HTML content of the selected elements, or get the HTML of the first element selected. Of course the string is parsed so any HTML tag you insert on your string will be parsed and will appear in the document as a HTML element.  
If you just want to add plain text inside the element, you should use `.text()` instead, for better performance.

Examples:

```js
$$('#example').html('<span style="color: blue">ciao</span>');
var exampleHTML = $$('#example').html();
```

### .append()

Append the passed parameter to the elements. The paramenter can be a string containing HTML, a Node/HTMLElement or a `Nest.js` object. If it's a `Nest.js` object, only the first element is moved.

Examples:

```js
$$('#example').append('<span style="color: blue">ciao</span>');
$$('#example').append($$('#example2'));
$$('#example').append(document.createElement('div'));
```

### .prepend()

Prepend the passed parameter to the elements. The paramenter can be a string containing HTML, a Node/HTMLElement or a `Nest.js` object. If it's a `Nest.js` object, only the first element is moved.

Examples:

```js
$$('#example').prepend('<span style="color: blue">ciao</span>');
$$('#example').prepend($$('#example2'));
$$('#example').prepend(document.createElement('div'));
```

### .before()

Insert the passed parameter right before to the elements, as child of se same parent Node. The paramenter can be a string containing HTML, a Node/HTMLElement or a `Nest.js` object. If it's a `Nest.js` object, only the first element is moved.

Examples:

```js
$$('#example').before('<span style="color: blue">ciao</span>');
$$('#example').before($$('#example2'));
$$('#example').before(document.createElement('div'));
```

### .after()

Insert the passed parameter right after to the elements, as child of se same parent Node. The paramenter can be a string containing HTML, a Node/HTMLElement or a `Nest.js` object. If it's a `Nest.js` object, only the first element is moved.

Examples:

```js
$$('#example').after('<span style="color: blue">ciao</span>');
$$('#example').after($$('#example2'));
$$('#example').after(document.createElement('div'));
```

### .empty()

Remove all the content of the element. It's basically the same behaviour using `.html('')`;

Examples:

```js
$$('#example').empty();
```

### .remove()

Remove all the elements. The elements must be DOM elements, otherwise they will not be removed. It returns a Nest object containing the remaining elements that has not been removed, or an empty Nest object if all elements has been removed.

Examples:

```js
$$('#example').remove();
$$('li').remove()
```

### .attr()

Set the attribute value to all selected elements, or get the attribute value of the first element.

Examples:

```js
// return attribute value
var isExampleHidden = $$('#example').attr('hidden');

// set the attribute to a value
$$('#example').attr('hidden', true);
```

### .removeAttr()

Remove the attribute to all selected elements.

Examples:

```js
$$('#example').removeAttr('hidden');
```

### .show()

Make the selected elements visible, if they was hidden. Use it in conjunction with `.hide()`.

Examples:

```js
$$('#example').show();
```

### .hide()

Make the selected elements hidden, if they was visible. Use it in conjunction with `.show()`.

Examples:

```js
$$('#example').hide();
```

### .fadeIn()

Make the selected elements fade in, making they visible. Use it in conjunction with `.fadeOut()`.

Examples:

```js
$$('#example').fadeIn();

// fadeIn in 200 milliseconds
$$('#example').fadeIn(200);
```

### .fadeOut()

Make the selected elements fade out, making they hidden. Use it in conjunction with `.fadeIn()`.

Examples:

```js
$$('#example').fadeOut();

// fadeOut in 200 milliseconds
$$('#example').fadeOut(200);
```

### .val()

Set the value of all selected form elements, or get the value of the first element.

Examples:

```js
// return value
var exampleValue = $$('#example').val();

// set the value
$$('input').val(somevalue);
```

### .css()

Set css style of the elements, or get the style value of the first element. You can pass a object with many styles or just one property/value tuple.

Examples:

```js
// return background-color of the element
var exampleBg = $$('#example').css('background-color');

// set the color to the element
$$('#example').css('color', '#FFFFFF');

// set multiple css styles
$$('#example').css({
	'color': '#FFFFFF',
	'border': '1px solid black'
});
```

### .addClass()

Add one or multiple css classes to the elements.

Examples:

```js
// add one class
$$('#example').addClass('class0');

// add multiple classes
$$('#example').addClass('class1 class2');
```

### .removeClass()

Remove one or multiple css classes to the elements.

Examples:

```js
// remove one class
$$('#example').removeClass('class0');

// remove multiple classes
$$('#example').removeClass('class1 class2');
```

### .toggleClass()

Toggle one or multiple css classes to the elements. Toggle means that if a class is already present on the element, the class will be removed, if not present it will be added.

Examples:

```js
// toggle one class
$$('#example').toggleClass('class0');

// toggle multiple classes
$$('#example').toggleClass('class1 class2');
```

### .hasClass()

Return `true` if the class specified is present on the first element, `false` otherwise.

Examples:

```js
var question = $$('#example').hasClass('myclass');
```

### .on()

Register an event on the selected elements. You must pass the event name (without 'on') and the function callback, and you can optionally specifiy if you want bubbing. Default bubbling value is `false`.

Examples:

```js
$$('#example').on('click', function (e) {
	/* do something */
}, false);

var myFunction = function (e) {
	/* do something */
};
$$('#example').on('click', myFunction);

$$('button').on('mouseover mouseout mousemove', myFunction);
```

### .off()

Unregister an event on the selected elements. You must pass the event name (without 'on') and the function reference, and you can optionally specifiy if you want bubbing. Default bubbling value is `false`.

Examples:

```js
var myFunction = function (e) {
	/* do something */
};
$$('#example').on('click', myFunction, false);

$$('#example').off('click', myFunction);

$$('button').off('mouseover mouseout mousemove', myFunction);
```

### .trigger()

Dispatch an event to the selected elements. You can optionally add an object containing additional data that will be added to the event object.

Examples:

```js
$$('#example').trigger('click');


$$('#example').on('click', function (event) {
	$$('#example2').text(event.detail.myprop);
});
$$('#example').trigger('click', { myprop: mydata });
```

### .width()

Return the width of the selected first element.

Examples:

```js
var exampleWidth = $$('#example').width();
```

### .height()

Return the height of the selected first element.

Examples:

```js
var exampleHeight = $$('#example').height();
```

### .toggleFullscreen()

Toggle fullscreen mode on the selected first element. The selected element should be a multimedia element, like for example a `<video>` tag.  
If you want to just toggle the fullscreen mode on the entire page you can execute this function on a empty selector, that is the same as executing this function on `document.documentElement`.

Examples:

```js
$$('video').toggleFullscreen();
$$().toggleFullscreen(); // same as $$(document.documentElement).toggleFullscreen();
```

### .visibility()

Define functions that will be executed when the page is being hidden (for example is not the foreground tab, or is in another window not visible, is in a window that's minimized etc.) and when the page is visible again.
You can provide both or only one function, wrapped in an object.

Examples:

```js
$$.visibility({
	onHidden: function () {
		// the page is not visible, do something
	},
	onVisible: function () {
		// the page is visible again, do something
	}
});
```

### .notify()

Send a notification using browser notification system. If not available, use old good alert message.

Examples:

```js
$$.notify('Notification Title', {
	dir: 'auto',
	body: 'Notification text',
	icon: 'path/to/image.png'
});
```

### .vibrate()

Vibrate the device for a number of milliseconds or following a vibration pattern. Obviously this works only on mobile devices, on desktop browser nothing happen.

**WARNING:** this function will obviously work only on mobile devices or on devices that have the option to vibrate. If the device cannot vibrate, it simply don't do anything so you can use function as a plus without worring.

Examples:

```js
$$.vibrate(1000); // Vibrate for one second

$$.vibrate([200, 100, 200, 100]); // Vibration pattern [vibrationTime, pause,…]
```

### .thread()

Execute some code using a separate thread, useful if you need to do very long calculations.  
As a matter of fact, this function create a Web Workers injecting code without using an external JavaScript file.

**WARNING:** Internet Explorer will throw a security error if you try to use this function. Other browsers are ok.

Examples:

```js
var myworker = $$.thread(function() {
	self.onmessage = function(e) {
		self.postMessage("'" + e.data + "' received!");
	};
});

myworker.onmessage = function(e) {
	document.getElementById('response').innerHTML = e.data;
};

myworker.postMessage('Example');
```

### .guid()

Return a RFC4122 compliant GUID, useful to generate IDs for, in example, HTML elements.

Examples:

```js
var GUID = $$.guid();
```

### .loadScript()

Dinamically load a script into the page. You can load JavaScript using `'js'` as parameter or CSS using `'css'`.  
JavaScripts will be added at the bottom of the `<body>`, and CSS will be added at the bottom of the `<head>`.  
You can optionally specify a callback function that will be executed once the loading and parse is done.

Examples:

```js
// simple loading
$$.loadScript('js', 'path/to/script.js');

// load the script and execute a callback when loaded
$$.loadScript('js', 'path/to/script.js', function () {
	/* do something */
});

// load a stylesheet
$$.loadScript('css', 'path/to/stylesheet.css');
```

### .queryString()

Return the value of the specified paramether of the page's query string, decoding if necessary both keys and values. Return false if the specified paramether does not exists.

Examples:

```js
// assuming a querystring i.e. '?user=john%20doe&pass=mypass'
var user = $$.queryString('user'); // user -> 'john doe'
var pass = $$.queryString('pass'); // pass -> 'mypass'
```

### .toQueryString()

Return a formatted query string from an object containing key-value pairs. It will also properly encode both keys and values.

Examples:

```js
var query = $$.toQueryString({
	'user': 'john doe',
	'pass': 'mypass'
});

alert(query); // '?user=john%20doe&pass=mypass'
```

### .ajax()

Execute an AJAX request with the given paramethers

Examples:

```js
$$.ajax({
	type: 'GET' // get, post
	url: 'mycgi.cgi'
	async: true // true, false
	dataType: 'text' // xml, json, html, text
	data: 'user=johndoe&pass=mypass' // querystring or object like { user: 'johndoe', pass: 'mypass' }
	success: function (data) {
		// do something with data
		// note: if you set dataType to 'json', data will be the json already parsed
	}
	error: function (error) {
		alert(error);
	}
});
```

### .get()

Execute an AJAX GET request with the given paramethers. It's a shortcut for the former `.ajax()`.

Examples:

```js
$$.get(url, { id: 1234, user: 'johndoe' }, function (data) { ... });
```

### .post()

Execute an AJAX POST request with the given paramethers. It's a shortcut for the former `.ajax()`.

Examples:

```js
$$.post(url, { id: 1234, user: 'johndoe' }, function (data) { ... });
```

### .json()

Execute an AJAX JSON request with the given paramethers. It's a shortcut for the former `.ajax()`. The data returned will be json already parsed.

Examples:

```js
$$.json(url, { id: 1234, user: 'johndoe' }, function (data) { ... });
```
