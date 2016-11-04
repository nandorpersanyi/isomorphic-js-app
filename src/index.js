import Hapi from 'hapi';

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host:'localhost',
	port:8000
});

// Add a route
server.route({
	method:'GET',
	path:'/hello',
	handler: function(request,reply){
		reply('hellfvvvbbfo world');
	}
});

// Start the server
server.start();
