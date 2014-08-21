var c = require('color');
var favicon = require('favicon-color');
var now = require('performance-now');
var raf = require('raf');
var url = require('url');

var id;
var input = document.querySelector('input');
var icon = document.querySelector('[rel=icon]');
var current = c(window.getComputedStyle(document.body).backgroundColor);

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
    input.style.color = rgb.clone().negate().greyscale().lighten(0.5).rgbaString();
    if (!input.value) {
        input.value = color;
    }
    if (color[0] === '#') {
        color = color.substring(1);
    }
    location.hash = encodeURIComponent(color.toLowerCase());
    raf.cancel(id);
    tweenFavicon(icon, current.rgbArray(), rgb.rgbArray(), 500);
    current = rgb;
}

function tweenFavicon(icon, from, to, duration) {
    var end = now() + duration;
    var diff = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
    id = raf(function loop() {
        var ratio = Math.min(1, 1 - ((end - now()) / duration));
        favicon(icon,
            Math.floor(from[0] + (diff[0] * ratio)),
            Math.floor(from[1] + (diff[1] * ratio)),
            Math.floor(from[2] + (diff[2] * ratio)));
        if (ratio < 1) {
            id = raf(loop);
        }
    });
}

input.addEventListener('input', function() {
    set(input.value);
});

var hash = url.parse(location.href).hash;
var hash = hash && hash.substring(1);
if (hash) {
    set(decodeURIComponent(hash));
} else {
    set(current.keyword() || current.hexString());
}

// TODO: Add color details below input
// TODO: Improve text color, e.g. #5ad
