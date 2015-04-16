/*!
 * Copyright (c) 2015 By Towry Wang
 * All rights reserved
 *
 * @license MIT License (http://towry.me/mit-license/)
 */

var React = require('react/addons');
var emptyfn = require('react/lib/emptyFunction');
var assign = require('react/lib/Object.assign');

var PackerActionCreators = require('../actions/PackerActionCreators');
var PackerStore = require('../stores/PackerStore');

var cssStyles = {
  'position': 'relative'
}

var PackerComponent = React.createClass({

  propTypes: {
    tagName: React.PropTypes.string,
    className: React.PropTypes.string, /* or array ? */
  },

  getDefaultProps: function () {
    
    return {
      tagName: 'div',
      className: 'columns',
      id: 0
    }
  },

  getInitialState: function () {
    return {
      /**
       * The length of it's child
       */
      size: 0,
      _packer_id: PackerStore.getCurrentId(),
      left: null,
      top: null
    }
  },

  getStyle: function () {
    if (this.state.left != null && this.state.top != null) {
      var compound = {
        position: 'absolute',
        left: this.state.left,
        top: this.state.top
      }
    }

    return assign(cssStyles, compound);
  },

  getAttr: function () {
    var className = this.props.className;
    if (className.trim() !== 'columns') {
      className = className.trim() + ' columns';
    }
    className = className + ' ' + this.state._packer_id;

    return {
      className: className,
      style: this.getStyle(),
      onClick: this._onclick
    }
  },

  componentWillMount: function () {
    React.Children.map(this.props.children, function (child) {
      if (child.type === PackerComponent) {
        this.state.size++;
      }
    }, this);

    PackerActionCreators.addPacker(this.state._packer_id, {
      packer: this,
      isContainer: this.state.size > 0,
      size: this.state.size
    });
  },

  componentDidMount: function () {
    PackerActionCreators.updatePackerRect(this.state._packer_id);

    PackerStore.addChangeChildsLayoutListener(function () {
      setTimeout(function () {
        var self = this;

        return function () {
          PackerActionCreators.layoutOne(self.state._packer_id);
          var packer = PackerStore.get(self.state._packer_id);

          self.setState({
            left: packer.left,
            top: packer.top
          })
        }
      }.call(this), 0);
    }.bind(this), this.state._packer_id);
  },

  componentWillReceiveProps: function (a) {
    // console.log(this._reactInternalInstance._rootNodeID);
  },

  renderChildren: function () {
    return React.Children.map(this.props.children, function (child) {
      if (child.type === PackerComponent) {
        return child;
      } else {
        return child;
      }
    }, this)
  },

  render: function () {
    return React.createElement(this.props.tagName, this.getAttr(), this.renderChildren());
  },

  _onclick: function (e) {
    e.stopPropagation();

    PackerActionCreators.clickPacker(this.state._packer_id);
  },

  _OnChange: function () {
    this.setState({
      name: 'haha'
    })
  }
});

module.exports = PackerComponent;
