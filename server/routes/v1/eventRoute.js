import { Router } from 'express';
import controllers from './../../controllers';

import { authenticate } from './../../middlewares/authentication' 
const router = Router();

// router.get('/logs', controllers.eventController.getLogs);

router.post('/logs', authenticate, controllers.eventController.postEvent);

router.delete('/logs', authenticate, controllers.eventController.deleteEvents);

router.delete('/logs/:key', authenticate, controllers.eventController.deleteEvent);

router.get('/keys', authenticate, controllers.eventController.getEventKeys);

router.post('/filter', authenticate, controllers.eventController.filterEvents);

export default router;
