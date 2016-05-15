"use strict";

const request = require('request');
const id = 345;
const baseUrl = `http://localhost:3000/products`;

describe(`POST product/add`, function() {
	it('should create a new product in the jsonfile-store', function(done) {
		request.post(`${baseUrl}/add`, {
      json: {
    		id: 345,
    		name: 'Memory card',
    		description: 'Stores all of the camera image information.',
    		price: 79.99
    	}
    }, function(error, response, body) {
			expect(body.length).not.toEqual(0);
			done();
		});
	});
});


describe(`GET product by id: ${id}`, function() {
	it('should respond with the correct product JSON', function(done) {
		request(`${baseUrl}/${id}`, function(error, response, body) {
			expect(response.statusCode).toEqual(200);
			expect(body.length).not.toEqual(0);
			done();
		});
	});
});
