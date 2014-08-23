module.exports = function(color) {
    if (color[0] === '#') {
        color = color.substring(1);
    }
    return encodeURIComponent(color);
};
