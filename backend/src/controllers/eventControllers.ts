import { Request, Response } from 'express';
import Event, { IEvent } from '../models/EventModel';

export const getAllEvents = async (req: Request, res: Response) => {
	try {
		const events: IEvent[] = await Event.find();

		events.sort((a, b) => {
			const dateA = new Date(a.selected_date).getTime();
			// console.log(dateA, 'DATEA by selecteddate');
			const dateB = new Date(b.selected_date).getTime();
			// console.log(dateB, 'DATEB by selecteddate');
			return dateA - dateB;
		});

		return res.json(events);
	} catch (error) {
		return res
			.status(500)
			.json({ error: 'Erro interno no servidor getAllEvents' });
	}
};

export const createEvent = async (req: Request, res: Response) => {
	try {
		const event: IEvent = new Event({
			title: req.body.title,
			description: req.body.description,
			image_url: req.body.image_url,
			selected_date: req.body.selected_date,
		});
		await event.save();
		return res.status(201).json(event);
	} catch (error) {
		return res
			.status(500)
			.json({ error: 'Erro interno no servidor no createEvent' });
	}
};

export const deleteEvent = async (req: Request, res: Response) => {
	try {
		const eventsDelete = await Event.findByIdAndDelete(req.params.id);
		return res.json(eventsDelete);
	} catch (error) {
		return res
			.status(500)
			.json({ error: 'Erro interno no servidor no deleteEvent' });
	}
};

export const updateEvent = async (req: Request, res: Response) => {
	try {
		const eventsUpdate = await Event.findByIdAndUpdate(
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
		return res.json(eventsUpdate);
	} catch (error) {
		return res
			.status(500)
			.json({ error: 'Erro interno no servidor no UpdateEvent' });
	}
};
