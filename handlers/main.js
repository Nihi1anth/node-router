'use strict';

const fs = require('fs');

class Main {
	static index(res) {
		fs.readFile('index.html', {encoding: 'utf-8'}, (err, view) => {
			if (!err) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(view);
				res.end();
			}
		});
	}

	static foo(res) {
		fs.readFile('foo.html', {encoding: 'utf-8'}, (err, view) => {
			if (!err) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(view);
				res.end();
			}
		});
	}
}

module.exports = Main;