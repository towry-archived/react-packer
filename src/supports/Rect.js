
module.exports = Rect;

function Rect(w, h, x, y) {
  this.w = w;
  this.h = h;
  this.x = x || 0;
  this.y = y || 0;
  this.occupied = false;
}

Rect.prototype.toString = function () {
  return "<Rect " + this.x + ", " + this.y + ", " + this.w + ", " + this.h + ">";
}

