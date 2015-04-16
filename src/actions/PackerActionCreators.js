var Dispatcher = require('../dispatcher/PackerDispatcher');
var Constants = require('../constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  clickPacker: function (id) {
    Dispatcher.dispatch({
      type: ActionTypes.CLICK_PACKER,
      id: id
    })
  },

  addPacker: function (id, o) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_PACKER,
      id: id,
      packer: o
    })
  },

  updatePackerRect: function (id) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_PACKER_RECT,
      id: id
    })
  },

  layoutOne: function (id) {
    Dispatcher.dispatch({
      type: ActionTypes.LAYOUT_PACKER,
      id: id
    })
  }
}
