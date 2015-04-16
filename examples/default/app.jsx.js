/*!
 * Copyright (c) 2015 By Towry Wang
 * All rights reserved
 *
 * @license MIT License (http://towry.me/mit-license/)
 */

var React = require('react');
var Packer = require('../../../src/');

var App = React.createClass({

    _handleClick: function () {
        console.log('f');
    },

    componentDidMount: function () {
        var btn = document.getElementById('btn');
        btn.addEventListener('click', this._handleClick);
    },

    render: function () {
        return (
            <Packer className="container">
                {this.props.results.map(function (result) {
                    return <Packer className='item' key={result.id}>{result.text}</Packer>
                })}
                <Packer className="inline-block border">
                    <Packer className="item">
                        <Packer className="item sub" />
                    </Packer>
                    <Packer className="item" />
                </Packer>
                <Packer className="item w3" />
                <Packer className="item" />
            </Packer>
        );
    }
})

var results = [
    {id: 1, text: "1"},
    {id: 2, text: "2"},
    {id: 3, text: "3"}
];

React.render(
    <App results={results} />,
    document.getElementById('app')
);
