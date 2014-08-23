var c = require('color');
var favicolor = require('favicolor');
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

function prepare(color) {
    color = color.trim().toLowerCase();
    if (/^([0-9a-f]{3}){1,2}$/.test(color)) {
        color = '#' + color;
    }
    return color;
}

function set(color) {
    color = prepare(color);
    var rgb = tryParse(color);
    if (!rgb) {
        return;
    }
    document.body.style.backgroundColor = color;
    input.style.color = rgb.clone().negate().greyscale().lighten(0.5).rgbaString();
    if (!input.value) {
        input.value = color;
    }
    document.title = color;
    if (color[0] === '#') {
        color = color.substring(1);
    }
    location.hash = encodeURIComponent(color);
    raf.cancel(id);
    tweenFavicon(icon, current.rgbArray(), rgb.rgbArray(), 500);
    current = rgb;
}

function tweenFavicon(icon, from, to, duration) {
    var end = now() + duration;
    var diff = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
    id = raf(function loop() {
        var ratio = Math.min(1, 1 - ((end - now()) / duration));
        favicolor(icon,
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
// TODO: Cli that opens browser
