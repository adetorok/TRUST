import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { allow } from '../middleware/rbac.js';
import { 
  createTask, 
  listTasks, 
  getTask, 
  updateTask, 
  completeTask, 
  assignTask, 
  getTaskStats,
  getMyTasks 
} from '../controllers/task.controller.js';

const r = Router();

// All routes require authentication
r.use(auth);

// Create task - coordinators and above can create tasks
r.post('/', allow('pm', 'coordinator', 'org_admin'), createTask);

// List all tasks - coordinators and above can view all tasks
r.get('/', allow('pm', 'coordinator', 'viewer', 'org_admin'), listTasks);

// Get my assigned tasks - all authenticated users can see their own tasks
r.get('/my', allow('pm', 'coordinator', 'nurse', 'site_user', 'sponsor_user', 'cro_user'), getMyTasks);

// Get task stats - for reporting
r.get('/stats', allow('pm', 'coordinator', 'viewer', 'org_admin'), getTaskStats);

// Get specific task
r.get('/:id', allow('pm', 'coordinator', 'nurse', 'viewer', 'site_user', 'sponsor_user', 'cro_user'), getTask);

// Update task - coordinators and above
r.put('/:id', allow('pm', 'coordinator', 'org_admin'), updateTask);

// Complete task - assigned user or coordinators and above
r.post('/:id/complete', allow('pm', 'coordinator', 'nurse', 'site_user', 'sponsor_user', 'cro_user'), completeTask);

// Assign task - coordinators and above
r.post('/:id/assign', allow('pm', 'coordinator', 'org_admin'), assignTask);

export default r;