import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { allow } from '../middleware/rbac.js';
import { listParticipants } from '../controllers/participant.controller.js';
const r = Router();
r.use(auth);
r.get('/', allow('pm','coordinator','viewer','sponsor_user','cro_user','site_user'), listParticipants);
export default r;
