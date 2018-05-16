import { Router } from 'express';

import controllers from './../../controllers';

const router = Router();

router.get('/validate-user', controllers.userController.validateUser);

router.post('/login', controllers.userController.login);

router.post('/register', controllers.userController.register);

router.post('/logout', controllers.userController.logout);

export default router;
