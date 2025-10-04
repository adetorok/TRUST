import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { allow } from '../middleware/rbac.js';
import { createPrescreen } from '../controllers/prescreen.controller.js';
const r = Router();
r.use(auth);
r.post('/', allow('nurse','pm','coordinator'), createPrescreen);
export default r;
