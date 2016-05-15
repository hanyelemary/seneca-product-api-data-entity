"use strict";

var seneca = require('seneca')()
	.use('product-service')
	.use('entity')
	.use('jsonfile-store', {
		folder: './data'
	});

var port = 3000;
var app = require('express')()
	.use(require('body-parser').json())
	.use(seneca.export('web'))
	.listen(port);

console.log(`Listening on port ${port}`);
