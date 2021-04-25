const request = require('request');

const forecast = (latLong, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${latLong}`;

	request({ url, json: true }, (error, { body }) =>{
		// console.log(response.body.current);
		if(error){
			callback('Unable to connect to weather app!');
		} else if(body.error){
			callback('Unable to find location!');
		} else { 
			callback(undefined,`${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees.`);
		}
	})
}

module.exports = forecast;
