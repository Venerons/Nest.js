# Nest.js

_Copyright (c) 2014 Daniele Veneroni._  
_Released under MIT License (X11 License). See [LICENSE.md](LICENSE.md) for further information._

Nest.js is an utility framework that let you build fast and efficient web app using simple and beautiful syntax.

## Using Nest.js

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

## Licensing

Nest.js is released under MIT License (X11 License). [Read the full license](LICENSE.md). 

## Credits

Created and maintained by Daniele Veneroni ([@Venerons](http://twitter.com/Venerons)).
