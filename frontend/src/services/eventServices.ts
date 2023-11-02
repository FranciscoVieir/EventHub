import {IEvent} from '../Interface';
import axios from 'axios';

const apiUrl = 'http://192.168.0.103:3000';

export const getAllEvents = async (): Promise<IEvent[]> => {
  try {
    const response = await axios.get(`${apiUrl}/events`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (eventData: IEvent): Promise<IEvent> => {
  const response = await axios.post(`${apiUrl}/events`, eventData, {
    headers: {
      'Content-Type': 'application/json',
      body: JSON.stringify(eventData),
    },
  });
  return response.data;
};

export const updateEvent = async (
  eventId: string,
  eventData: IEvent,
): Promise<IEvent> => {
  const response = await axios.put(`${apiUrl}/events/${eventId}`, eventData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  await axios.delete(`${apiUrl}/events/${eventId}`);
};
