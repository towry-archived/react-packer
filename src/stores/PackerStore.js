/*!
 * Copyright (c) 2015 By Towry Wang
 * All rights reserved
 *
 * @license MIT License (http://towry.me/mit-license/)
 */

var Dispatcher = require('../dispatcher/PackerDispatcher');
var Constants = require('../constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var dom = require('../utils/dom');
var Node = require('../supports/Node');

var ActionTypes = Constants.ActionTypes;

var _packers = {};
var _id = 0;
var _prefix = '_packer_';
var currentContainerId = null;

// debug
window._packers = _packers;

var CHILDS_LAYOUT_CHANGE = 'childs_layout_change';

var _listeners = {};

var PackerStore = assign({}, EventEmitter.prototype, {

  getCurrentId: function () {
    return _prefix + _id++;
  },

  emitChangeChildsLayout: function (id) {
    if (! (id in _listeners)) {
        return;
      }

      var cbs = _listeners[id];
      var cb;

      while (cbs.length) {
        cb = cbs.pop();
        cb.call(null);
      }
  },

  addChangeChildsLayoutListener: function (callback, id) {
    var packer = _packers[id];
    var parent = packer.containerId;
    if (!parent) {
      return;
    }

    _listeners[parent] = _listeners[parent] || [];
    _listeners[parent].push(callback);
  },

  get: function (id) {
    return _packers[id];
  },

  getAll: function () {
    return _packers;
  }
})

var popOutCallbacks = [];

function restoreContainerId(size, old) {
  return function () {
    if (size <= 0) {
      currentContainerId = old;
      popOutCallbacks.pop();
      return;
    }
    size = size - 1;
  }
}

Dispatcher.register(function (action) {
  switch(action.type) {
    case ActionTypes.ADD_PACKER:
      Dispatcher.waitFor([PackerStore.dispatchToken]);
      if (popOutCallbacks.length) {
        (popOutCallbacks[popOutCallbacks.length-1]).call(this);
      }
      break;

    default:
      // do nothing
  }
})

// main
PackerStore.dispatchToken = Dispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.CLICK_PACKER:
      console.log(action.id);
      break;

    case ActionTypes.ADD_PACKER:
      var packer = _packers[action.id] = action.packer;
      packer.containerId = currentContainerId;

      if (packer.isContainer) {
        // those three lines is important
        if (popOutCallbacks.length) {
          (popOutCallbacks[popOutCallbacks.length-1]).call(this);
        }

        popOutCallbacks.push(restoreContainerId(packer.size, currentContainerId));
        currentContainerId = action.id;
      } 
      break;

    case ActionTypes.UPDATE_PACKER_RECT:
      var packer = _packers[action.id];
      var el = packer.packer.getDOMNode();
      var width, height;

      width = parseInt(dom.css(el, 'width'), 10) || 0;
      height = parseInt(dom.css(el, 'height'), 10) || 0;
      width = width + (parseInt(dom.css(el, 'marginLeft'), 10) || 0) + (parseInt(dom.css(el, 'marginRight'), 10) || 0);
      height = height + (parseInt(dom.css(el, 'marginTop'), 10) || 0) + (parseInt(dom.css(el, 'marginBottom'), 10) || 0);

      if (packer.isContainer) {
        packer.node = new Node(width, height);
        PackerStore.emitChangeChildsLayout(action.id);
      }
      packer.width = width;
      packer.height = height;
      break;

    case ActionTypes.LAYOUT_PACKER:
      var packer = _packers[action.id];
      var parent = _packers[packer.containerId];
      if (!parent) {
        break;
      }

      var node = parent.node.split(packer.width, packer.height);
      if (!node) {
        console.log('missed');
        break;
      }

      packer.left = node.x();
      packer.top = node.y(); 
      break;

    default:
      // pass
  }
})

module.exports = PackerStore;
