import Hapi from 'hapi';
import nunjucks from 'nunjucks';
import HelloController from './hello-controller';
import Application from './lib';

// Configure nunjucks to read from the dist directory
nunjucks.configure('./dist');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host:'localhost',
	port:8000
});

const application = new Application({
	'/hello/{name*}': HelloController
},{
	server:server,
	document: function(application,controller,request,reply,body,callback){
		nunjucks.render('./index.html', {body:body}, (err,html) => {
			if(err){
				return callback(err,null);
			}
			callback(null,html);
		});
	}
});


application.start()
