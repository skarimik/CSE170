var events = require('../events.json');

exports.eventsInfo = function(req, res) { 
	
    var randomEvent = events[Math.floor(events.length * Math.random())];
  	console.log(randomEvent);
  	res.json(events);
}