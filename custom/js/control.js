var botui = new BotUI('chatbot');

var socket = io.connect('http://localhost:8010');

botui.message.add({
	content: 'Hey you there?',
	delay: 1500,
}).then(function() {
	botui.action.text({
		action: {
			placeholder: 'Say sth.', }
	}).then(function(res) {
		socket.emit('fromClient', {
			client : res.value
		});
		console.log(res.value);
	}).then(function() {
		socket.on('fromServer', function(data) {
			console.log(data.server);
			newMessage(data.server);
			addAction();
		})
	});
})

function addAction() {
	botui.action.text({
		action: {
			placehoder: 'whats up...',
		}
	}).then(function (res) {
		socket.emit('fromClient', {client : res.value});
		console.log('client response: ', res.value);
	})
}


function newMessage(response) {
	botui.message.add({
		content: response,
		delay: 0,
	})
}
