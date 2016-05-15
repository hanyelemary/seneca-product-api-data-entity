"use strict";

var productService = function() {

	var products = this.make('products');	//the collection

	this.add('role: products, cmd: getProductById', (args, callback) => {
		var productId = args.req$.params.id;
		products.load$(productId, (error, result) => {
			callback(null, result);
		});
	});

	this.add('role: products, cmd: search', (args, callback) => {
		var pattern = new RegExp(args.query, "i");
		products.list$((error, products) => {
			var result = products.filter(prod => {
				return (pattern.test(prod.name) || pattern.test(prod.description));
			});

			callback(null, result);
		});
	});

	this.add('role: products, cmd: add', (args, callback) => {
		products = Object.assign(products, args.req$.body);
		products.save$((error, product) => {
			if (error) {
				console.log(`Error creating product: ${error}`);
				callback(null, {error: error});
			}
			callback(null, {success: true, _id: product.id});
		});
	});

	this.act('role: web', {
		use: {
			prefix: '',
			pin: 	'role: products, cmd: *',
			map: {
				getProductById: { alias: '/products/:id' },
				search: { POST: true, alias: '/products' },
				add: { POST: true, alias: '/products/add' }
			}
		}
	});
};

module.exports = productService;
