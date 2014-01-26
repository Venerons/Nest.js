# Nest.js Roadmap

_Copyright (c) 2014 Daniele Veneroni._  
_Released under MIT License. See [LICENSE.md](LICENSE.md) for further information._

This document outlines the general goals for Nest.js ongoing development.

### Version 0.11.0 (Coming Soon)

* encapsulate functions on try..catch to better error handling
* remove element via .remove() (see notes)
* get/set the value of a form element via .val() - .val('value')
* show/hide a element via .show() - .hide()
* get/set element attribute via .attr('attribute') - .attr('attribute', 'value') - .removeAttr('attribute')
* insert element before selector via .before(element) (see notes)
* insert element after selector via .after(element) (see notes)

### Version 1.0.0 (Unscheduled)

* .css() also set styles with common vendor prefixes if needed (otherwise using a new function, i.e. .vendor()/.prefix()/.prefixed()/.prefixcss())
* get object dimensions in px via .offset('selector')
* AJAX calls handling (see notes)
* add/remove CSS rules on a stylesheet or create a new stylesheet with the rule (see notes)

### Notes

// ajax calls
$$.get(url, [parameters], [callback], [mime-type]);
$$.post(url, [parameters], [callback], [mime-type]);
$$.put(url, [parameters], [callback], [mime-type]);
$$.delete(url, [parameters], [callback], [mime-type]);
$$.json(url, [parameters], [callback]);

$$.json(url, {id: 1980, user: 'dan'}, function(data){ ... });

$$.ajax({
    type: 'POST', // defaults to 'GET'
    url: 'http://rest',
    data: {user: 'venerons', pass: 'twitter'},
    dataType: 'json', //'json', 'xml', 'html', or 'text'
    async: true,
    success: function(response) { ... },
    error: function(xhr, type) { ... }
});


// Add and Remove Rules Directly to Stylesheets

// We're all well versed in modifying styles via the element.style.propertyName method, and
// we've used JavaScript toolkits to do it, but did you know you can actually read and write
// rules within new and existing stylesheets?  The API is actually quite simple too!

function addCSSRule(sheet, selector, rules, index) {
	if(sheet.insertRule) {
		sheet.insertRule(selector + '{' + rules + '}', index);
	}
	else {
		sheet.addRule(selector, rules, index);
	}
}

// Use it!
addCSSRule(document.styleSheets[0], 'header', 'float: left');

addCSS('.header { position: fixed; height: 50px; width: 100%; }')
addCSS('.header { position: fixed; height: 50px; width: 100%; }', document.styleSheets[0])

// The most common use case is creating a new stylesheet, but if you want to modify an
// existing stylesheet, go for it.

//#####################

.before(html)

element.insertAdjacentHTML('beforebegin', html);

//#####################

.after(html)

element.insertAdjacentHTML('afterend', html);

//#####################

// Removing a specified element when knowing its parent node
var d = document.getElementById('top');
var d_nested = document.getElementById('nested');
var throwawayNode = d.removeChild(d_nested);

//#####################

.remove()

// Removing a specified element without having to specify its parent node
var node = document.getElementById('nested');
if (node.parentNode) {
  node.parentNode.removeChild(node);
}

