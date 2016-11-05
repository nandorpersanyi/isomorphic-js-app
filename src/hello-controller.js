import nunjucks from 'nunjucks';
import Controller from './lib/controller';

// Configure nunjucks to read from the dist directory
nunjucks.configure('./dist');

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

export default class HelloController extends Controller{
	toString(callback){
		nunjucks.renderString('<p>hello {{fname}} {{lname}}</p>', getName(this.context), (err,html) => {
			if(err){
				return callback(err,null);
			}
			callback(null,html);
		});
	}
}