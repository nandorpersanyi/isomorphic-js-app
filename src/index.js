import Hapi from 'hapi';
import nunjucks from 'nunjucks';

// Configure nunjucks to read from the dist directory
nunjucks.configure('./dist');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host:'localhost',
	port:8000
});

// Add a route
server.route({
	method:'GET',
	path:'/hello/{name*}',
	handler: function(request,reply){
		// Read template and compile using context object
		nunjucks.render('index.html', getName(request), function(err,html){
			// Reply with HTML response
			reply(html);
		});
	}
});

function getName(request){
	// Default values
	let name = {
		fname: 'Nandor',
		lname: 'Persanyi'
	}

	// Split path params
	let nameParts = request.params.name ? request.params.name.split('/') : [];

	// Order of precedence
	// 1. path param
	// 2. query param
	// 3. default value
	name.fname = (nameParts[0] || request.query.fname) || name.fname;
	name.lname = (nameParts[1] || request.query.lname) || name.lname;

	return name;
}

// Start the server
server.start();
