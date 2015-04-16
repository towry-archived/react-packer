
var defView = document.defaultView;
function getStyle (ele) {
  if (defView && defView.getComputedStyle) {
    return defView.getComputedStyle(ele, null);
  } else {
    return ele.currentStyle;
  }
}

function offset (ele) {
  var x = 0;
  var y = 0;

  var rect = ele.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right
  }
}


module.exports = {
  css: function (ele, prop) {
    return getStyle(ele)[prop];
  },

  offset: offset
}
