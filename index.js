"use strict";
const http = require('http'),
	fs = require('fs'),
	url = require('url');

const Router = require('./router');

class Server {

	static start(port) {
		this.getRoutes(port).then(this.createServer);
	}

	static getRoutes(port) {
		return new Promise((resolve) => {
			fs.readFile('routes.json', {encoding: 'utf-8'}, (err, routes) => {
				if (!err) {
					resolve({
						port: port,
						routes: JSON.parse(routes)
					});
				}
			});
		});
	}

	static createServer(settings) {
		http.createServer((req, res) => {
			let path = url.parse(req.url).pathname;
			let route = Router.find(path, settings.routes);

			try {
				let handler = require('./handlers/' + route.handler);
				handler[route.action](res);
			} catch(e) {
				res.writeHead(500);
				res.end();
			}
		}).listen(settings.port);
	}

}

Server.start({port: 3000});