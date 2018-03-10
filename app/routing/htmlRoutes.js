var path = require('path');

module.exports = function(app){

	//Sets the route for the home page
	 app.get('/', function (req, res) {
   	 res.sendFile(path.join(__dirname, '../public/home.html'));
	 });


	//Sets the route for the survey page
	app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});



};

