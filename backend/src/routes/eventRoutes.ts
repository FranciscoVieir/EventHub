import { Router } from 'express';
import * as eventController from '../controllers/eventControllers';

const router = Router();

router.get('/events', eventController.getAllEvents);
router.post('/events', eventController.createEvent);
router.delete('/events/:id', eventController.deleteEvent);
router.put('/events/:id', eventController.updateEvent);

export default router;
