import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { allow } from '../middleware/rbac.js';
import { createStudy, listStudies } from '../controllers/study.controller.js';
const r = Router();
r.use(auth);
r.post('/', allow('org_admin','pm','sponsor_user','cro_user'), createStudy);
r.get('/', allow('org_admin','pm','viewer','sponsor_user','cro_user','site_user'), listStudies);
export default r;
