# React Packer

[![NPM](https://nodei.co/npm/react-packer.png)](http://www.npmjs.com/package/react-packer)

Packer is a React component, making bin packing layout.

Currently it is not perfect.

## Usage

See `examples/` or:

```javascript
var Packer = require('react-packer');

var App = React.createClass({
	render: function () {
        return (
			<Packer>
				<Packer />
				<Packer className='item' />
				<Packer>
					<p>Hello World</p>
				</Packer>
			</Packer>
		);
	}
});

React.render(
	<App />,
	document.body
)
```

_Notice_: Multiple `Packer` components must be enclosed in an element such as `div` or another `Packer` react element.

## Install

```bash
npm install react-packer --save
```

## License

The MIT License, See LICENSE.txt file.

---

Copyright (c) 2015, Towry Wang
