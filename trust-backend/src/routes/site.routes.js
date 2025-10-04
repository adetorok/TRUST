import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { allow } from '../middleware/rbac.js';
import { createSite, listSites } from '../controllers/site.controller.js';
const r = Router();
r.use(auth);
r.post('/', allow('org_admin','pm','site_user'), createSite);
r.get('/', allow('org_admin','pm','viewer','site_user','sponsor_user','cro_user'), listSites);
export default r;
