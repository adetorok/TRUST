import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { allow } from '../middleware/rbac.js';
import { 
  createMessage, 
  listMessages, 
  getMessage, 
  updateMessage, 
  markAsRead, 
  getMessageStats 
} from '../controllers/message.controller.js';

const r = Router();

// All routes require authentication
r.use(auth);

// Create message - most roles can create messages
r.post('/', allow('pm', 'coordinator', 'nurse', 'site_user', 'sponsor_user', 'cro_user'), createMessage);

// List messages - most roles can view messages
r.get('/', allow('pm', 'coordinator', 'nurse', 'viewer', 'site_user', 'sponsor_user', 'cro_user'), listMessages);

// Get message stats - for reporting
r.get('/stats', allow('pm', 'coordinator', 'viewer', 'sponsor_user', 'cro_user'), getMessageStats);

// Get specific message
r.get('/:id', allow('pm', 'coordinator', 'nurse', 'viewer', 'site_user', 'sponsor_user', 'cro_user'), getMessage);

// Update message - limited to coordinators and above
r.put('/:id', allow('pm', 'coordinator', 'org_admin'), updateMessage);

// Mark message as read
r.post('/:id/read', allow('pm', 'coordinator', 'nurse', 'site_user', 'sponsor_user', 'cro_user'), markAsRead);

export default r;