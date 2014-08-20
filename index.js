var c = require('color');
var url = require('url');

var input = document.querySelector('input');

function tryParse(color) {
    try {
        return c(color);
    } catch (e) {}
}

function set(color) {
    color = color.trim();
    // `color` accepts hex strings without
    // leading pound as long as they don't
    // contain only digits ¯\_(ツ)_/¯
    if (/^\d+$/.test(color)) {
        color = '#' + color;
    }
    var rgb = tryParse(color);
    if (!rgb) {
        color = '#' + color;
        rgb = tryParse(color);
    }
    if (!rgb) {
        return;
    }
    document.body.style.backgroundColor = color;
    input.style.color = rgb.negate().greyscale().lighten(0.5).rgbaString();
    if (!input.value) {
        input.value = color;
    }
    if (color[0] === '#') {
        color = color.substring(1);
    }
    location.hash = encodeURIComponent(color.toLowerCase());
}

input.addEventListener('input', function() {
    set(input.value);
});

var hash = url.parse(location.href).hash;
var hash = hash && hash.substring(1);
set(decodeURIComponent(hash));

// TODO: Add color details below input
// TODO: Set default input value to default background color
// TODO: Favicon require('ndarray-canvas')(canvas, red, green, blue)
