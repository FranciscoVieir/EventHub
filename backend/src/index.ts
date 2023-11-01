const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const port = 3000;

const Events = mongoose.model('Event', {
	title: String,
	description: String,
	image_url: String,
	selected_date: String,
});

app.get('/', async (request, response) => {
	const events = await Events.find();

	return response.send(events);
});

app.post('/', async (req, res) => {
	const event = new Events({
		title: req.body.title,
		description: req.body.description,
		image_url: req.body.image_url,
		selected_date: req.body.selected_date,
	});
	await event.save();

	return res.send(event);
});

app.delete('/:id', async (req, res) => {
	const eventsDelete = await Events.findByIdAndDelete(req.params.id);
	return res.send(eventsDelete);
});

app.put('/:id', async (req, res) => {
	const eventsUpdate = await Events.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			description: req.body.description,
			image_url: req.body.image_url,
			selected_date: req.body.selected_date,
		},
		{
			new: true,
		}
	);
	return res.send(eventsUpdate);
});

app.listen(port, () => {
	mongoose.connect(
		'mongodb+srv://devneto02:p84ZT7CbfLrQWUbE@eventapi.fpz4kuw.mongodb.net/?retryWrites=true&w=majority'
	);

	console.log('App running');
});
