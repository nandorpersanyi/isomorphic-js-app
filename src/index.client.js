import HelloController from './hello-controller';
import Application from './lib';

const application = new Application({
	'/hello/{name*}': HelloController
},{
	// Query selector for the element in which
	// the controller response should be injected
	target: 'body'
});

application.start();
