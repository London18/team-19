var apiai = require('apiai');

var app = apiai('');

var getRes = function(query) {
	var request = app.textRequest(query, {
		sessionId: '<unique sessionId>'
	});
	const responseFromAPI = new Promise(
		function(resolve, reject) {
			request.on('error', function(error) {
				reject(error);
			});
			request.on('response', function(response) {
				resolve(response.result.fulfillment.speech);
			});
		});
	request.end();
	return responseFromAPI;
};

module.exports = {getRes}
