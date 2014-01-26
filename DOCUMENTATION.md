# Nest.js Documentation

_Version 0.10.0 - 26/01/2014_  
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

* Utility
	- [.loadScript()](#loadscript)
	- [.toggleFullscreen()](#togglefullscreen)
	- [.visibility()](#visibility)
	- [.notify()](#notify)
	- [.vibrate()](#vibrate)
	- [.thread()](#thread)
	- [.guid()](#guid)

## About Nest.js

### Using Nest.js

Just add the script to your HTML page to import Nest.js

```html
<script src="js/nest.min.js"></script>
```

Then you are ready to rock! You can use `$$` to access Nest.js functions, first at all to select an element using css selector. Mind that if you provide a selector that target more than one element, all modifications will be applied to all elements that match that selector.  
Here some examples:

```js
var myElement = $$("#example");
var myElement2 = $$("table tr td.someclass"); // all "td" elements that have the class "someclass"
var myBody = $$("body");
var myDocument = $$(document.documentElement); // direct injection of element
```

Then you can use the function you want on the elements selected. Mind that most of the APIs are chainable, unless they return some value.

```js
$$("#example").text("Hello There!").css("color", "rgb(123, 231, 213)");
$$(document.documentElement).toggleFullscreen();
var exampleWidth = $$("#example").width();
```

There are also many function that doesn't need any element. You can use these using any selector, but I suggest to use `$$()`:

```js
$$().vibrate(1000);

var GUID = $$().guid();

$$().notify("Welcome to Wonderland!", {
	dir: "auto",
	body: "We are very happy that you have joined us!",
	icon: "aVeryImpressiveImage.png"
});
```

### Browser Support

Nest.js offers cross-browser copatibility and support for the current browsers:

Browser                     | Version         | Support      
:-------------------------- | :-------------: | :---:
_Desktop_                   | -               | -
Mozilla Firefox             | 11              | Full
Google Chrome               | 32              | Full
Apple Safari                | 6.1             | Almost Complete _(lacks of .vibrate(), .notify() only Safari 7+)_
Opera                       | 12.1            | Almost Complete _(lacks of .notify(), .vibrate())_
Microsoft Internet Explorer | 10              | Almost Complete _(lacks of .notify(), .vibrate(), .thread())_
_Mobile_                    | -               | -
Mozilla Firefox for Android | ?               | ?
Mozilla Firefox OS          | ?               | ?
Android Browser             | ?               | ?
Google Chrome for Android   | ?               | ?
iOS Safari                  | ?               | ?
Opera Mobile                | ?               | ?
Opera Mini                  | ?               | ?
BlackBerry Browser          | ?               | ?
MS Internet Explorer Mobile | ?               | ?

## APIs Documentation

### .text()

Set the text inside of the selected elements, or get the text of the first element selected. Doesn't parse HTML, so any eventual tag that you insert through this function will be added as plain text (that means that will be escaped).

Examples:

```js
$$("#example").text("ciao");
var exampleText = $$("#example").text();
```

### .html()

Set the HTML content of the selected elements, or get the HTML of the first element selected. Of course the string is parsed so any HTML tag you insert on your string will be parsed and will appear in the document as a HTML element.  
If you just want to add plain text inside the element, you should use `.text()` instead, for better performance.

Examples:

```js
$$("#example").html("<span style='color: blue'>ciao</span>");
var exampleHTML = $$("#example").html();
```

### .append()

Append the passed parameter to the elements. The paramenter can be a string containing HTML, a Node/HTMLElement or a `Nest.js` object. If it's a `Nest.js` object, only the first element is moved.

Examples:

```js
$$("#example").append("<span style='color: blue'>ciao</span>");
$$("#example").append($$("#example2"));
$$("#example").append(document.createElement("div"));
```

### .prepend()

Prepend the passed parameter to the elements. The paramenter can be a string containing HTML, a Node/HTMLElement or a `Nest.js` object. If it's a `Nest.js` object, only the first element is moved.

Examples:

```js
$$("#example").prepend("<span style='color: blue'>ciao</span>");
$$("#example").prepend($$("#example2"));
$$("#example").prepend(document.createElement("div"));
```

### .empty()

Remove all the content of the element. It's basically the same behaviour using `.html('')`;

Examples:

```js
$$("#example").empty();
```

### .css()

Set css style of the elements, or get the style value of the first element. You can pass a object with many styles or just one property/value tuple.

Examples:

```js
// return background-color of the element
var exampleBg = $$("#example").css("background-color");

// set the color to the element
$$("#example").css("color", "#FFFFFF");

// set multiple css styles
$$("#example").css({
	"color": "#FFFFFF",
	"border": "1px solid black"
});
```

### .addClass()

Add one or multiple css classes to the elements.

Examples:

```js
// add one class
$$("#example").addClass("class0");

// add multiple classes
$$("#example").addClass("class1 class2");
```

### .removeClass()

Remove one or multiple css classes to the elements.

Examples:

```js
// remove one class
$$("#example").removeClass("class0");

// remove multiple classes
$$("#example").removeClass("class1 class2");
```

### .toggleClass()

Toggle one or multiple css classes to the elements. Toggle means that if a class is already present on the element, the class will be removed, if not present it will be added.

Examples:

```js
// toggle one class
$$("#example").toggleClass("class0");

// toggle multiple classes
$$("#example").toggleClass("class1 class2");
```

### .hasClass()

Return `true` if the class specified is present on the first element, `false` otherwise.

Examples:

```js
var question = $$("#example").hasClass("myclass");
```

### .on()

Register an event on the selected elements. You must pass the event name (without "on") and the function callback, and you can optionally specifiy if you want bubbing. Default bubbling value is `false`.

Examples:

```js
$$("#example").on("click", function (e) {
	/* do something */
}, false);

var myFunction = function (e) {
	/* do something */
};
$$("#example").on("click", myFunction);
```

### .off()

Unregister an event on the selected elements. You must pass the event name (without "on") and the function reference, and you can optionally specifiy if you want bubbing. Default bubbling value is `false`.

Examples:

```js
var myFunction = function (e) {
	/* do something */
};
$$("#example").on("click", myFunction, false);

$$("#example").off("click", myFunction);
```

### .trigger()

Dispatch an event to the selected elements. You can optionally add an object containing additional data that will be added to the event object.

Examples:

```js
$$("#example").trigger("click");


$$("#example").on("click", function (event) {
	$$("#example2").text(event.detail.myprop);
});
$$("#example").trigger("click", { myprop: mydata });
```

### .width()

Return the width of the selected first element.

Examples:

```js
var exampleWidth = $$("#example").width();
```

### .height()

Return the height of the selected first element.

Examples:

```js
var exampleHeight = $$("#example").height();
```

### .toggleFullscreen()

Toggle fullscreen mode on the selected first element. The selected element must be a multimedia element, like for example a `<video>` tag.  
If you want to just toggle the fullscreen mode on the entire page you must select as element `document.documentElement`.

Examples:

```js
$$("video").toggleFullscreen();
$$(document.documentElement).toggleFullscreen();
```

### .visibility()

Define functions that will be executed when the page is being hidden (for example is not the foreground tab, or is in another window not visible, is in a window that's minimized etc.) and when the page is visible again.
You can provide both or only one function, wrapped in an object.

Examples:

```js
$$().visibility({
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
$$().notify("Notification Title", {
	dir: "auto",
	body: "Notification text",
	icon: "path/to/image.png"
});
```

### .vibrate()

Vibrate the device for a number of milliseconds or following a vibration pattern. Obviously this works only on mobile devices, on desktop browser nothing happen.

**WARNING:** this function will obviously work only on mobile devices or on devices that have the option to vibrate. If the device cannot vibrate, it simply don't do anything so you can use function as a plus without worring.

Examples:

```js
$$().vibrate(1000); // Vibrate for one second

$$().vibrate([200, 100, 200, 100]); // Vibration pattern [vibrationTime, pause,…]
```

### .thread()

Execute some code using a separate thread, useful if you need to do very long calculations.  
As a matter of fact, this function create a Web Workers injecting code without using an external JavaScript file.

**WARNING:** Internet Explorer will throw a security error if you try to use this function. Other browsers are ok.

Examples:

```js
var myworker = $$().thread(function() {
	self.onmessage = function(e) {
		self.postMessage("'" + e.data + "' received!");
	};
});

myworker.onmessage = function(e) {
	document.getElementById("response").innerHTML = e.data;
};

myworker.postMessage('Example');
```

### .guid()

Return a RFC4122 compliant GUID, useful to generate IDs for, in example, HTML elements.

Examples:

```js
var GUID = $$().guid();
```

### .loadScript()

Dinamically load a script into the page. You can load JavaScript using `"js"` as parameter or CSS using `"css"`.  
JavaScripts will be added at the bottom of the `<body>`, and CSS will be added at the bottom of the `<head>`.  
You can optionally specify a callback function that will be executed once the loading and parse is done.

Examples:

```js
// simple loading
$$().loadScript("js", "path/to/script.js");

// load the script and execute a callback when loaded
$$().loadScript("js", "path/to/script.js", function () {
	/* do something */
});

// load a stylesheet
$$().loadScript("css", "path/to/stylesheet.css");
```
