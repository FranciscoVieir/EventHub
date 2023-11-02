import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEvent extends Document {
	title: string;
	description: string;
	image_url: string;
	selected_date: string;
	withImage: boolean;
}

const eventSchema: Schema<IEvent> = new Schema({
	title: String,
	description: String,
	image_url: String,
	selected_date: String,
	withImage: Boolean,
});

const Event: Model<IEvent> = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
