
var Rect = require('./Rect');

module.exports = Node;

/**
 * Node class
 * @param {number} width - Width for 
 * @constructor
 */
function Node (width, height) {
  this.left = null;
  this.right = null;

  if (typeof width != 'undefined' && typeof height != 'undefined') {
    this.rect = new Rect(width, height);
  } else {
    this.rect = null;
  }

  this.size = 0;
}

Node.prototype.toString = function () {
  return "<Node " + this.rect.toString() + ">";
}

var node_keys = 'x y w h'.split(' ');
for (var i = 0, I = node_keys.length; i < I; i++) {
  Object.defineProperty(Node.prototype, node_keys[i], {
    value: function (n) {
      return function () {
        if (!this.rect) return -1;
        return this.rect[node_keys[n]];
      }
    }.call(this, i),
    writtable: false
  })
}

Node.prototype.occupied = function () {
  return this.rect && this.rect.occupied;
}

Node.prototype.occupy = function () {
  if (!this.rect) return;
  this.rect.occupied = true;
}

/**
 * Check if the block fit into this node
 */
Node.prototype.fit = function (w, h) {
  if (Object.prototype.toString.call(w) == '[object Array]' && w.length == 2) {
    h = w[1];
    w = w[0];
  }

  if (this.rect.w === w && this.rect.h === h) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check if this node is bigger than the block
 */
Node.prototype.embrace = function (w, h) {
  if (Object.prototype.toString.call(w) == '[object Array]' && w.length == 2) {
    h = w[1];
    w = w[0];
  }

  if (!this.rect) return false;
  else if (this.rect.w >= w && this.rect.h >= h) {
    return true;
  } else {
    return false;
  }
}

/**
 * Split the node recursively
 */
Node.prototype.split = function (w, h) {
  if (Object.prototype.toString.call(w) == '[object Array]' && w.length == 2) {
    h = w[1];
    w = w[0];
  }

  if (!this.rect) {
    throw new Error("No parent?");
  }

  if (this.occupied()) {
    return null;
  }
  if (!this.embrace(w, h)) {
    return null;
  }

  if (this.fit(w, h)) {
    this.occupy()
    return this;
  }

  // if not splited
  if (this.size === 0) {
    this.left = new Node();
    this.right = new Node();
    this.size += 2;

    if (this.rect.w - w > this.rect.h - h) {
      // left/right
      this.left.rect = new Rect(w, this.rect.h, this.rect.x, this.rect.y);
      this.right.rect = new Rect(this.rect.w - w, this.rect.h, this.rect.x + w, this.rect.y);
    } else {
      // top/down
      this.left.rect = new Rect(this.rect.w, h, this.rect.x, this.rect.y);
      this.right.rect = new Rect(this.rect.w, this.rect.h - h, this.rect.x, this.rect.y + h);
    }
  }

  var ok = this.left.split(w, h)

  if (!ok) {
    return this.right.split(w, h);
  } else {
    return ok;
  }
}
