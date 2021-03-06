var http = require('../');

var assert = require('assert');
var common = require('./includes/common.js');

var callback = false;

var server = common.createFooServer(false, function () {
	http.get({url: common.options.url404}, function (err, res) {
		callback = true;
		assert.ok(err instanceof Error);
		assert.deepEqual(err.document, 'Not Found');
		assert.deepEqual(err.largeDocument, false);
		server.close();
	});
});

process.on('exit', function () {
	assert.ok(callback);
});
