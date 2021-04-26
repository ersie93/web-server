const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const weatherImg = document.querySelector('#weather-img');

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const location = search.value;

	messageOne.innerText = "Loading...";
	messageTwo.innerText = "";
	weatherImg.src = "";

	fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
		response.json().then((data) => {
			if(data.error){
				messageOne.innerText = data.error;
			} else {
				console.log(data.forecast);
				messageOne.innerText = data.location;
				messageTwo.innerText = data.forecast[0];
				weatherImg.src = data.forecast[1];
			}
		})
	})
})