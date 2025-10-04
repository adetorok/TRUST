import { z } from 'zod';
import Prescreen from '../models/Prescreen.js';
import ActivityLog from '../models/ActivityLog.js';

const schema = z.object({
  leadId: z.string(),
  outcome: z.enum(['eligible','ineligible','pending_info']),
  notes: z.string().optional(),
  answers: z.array(z.object({ q: z.string(), a: z.string() })).optional()
});

export async function createPrescreen(req, res, next) {
  try {
    const body = schema.parse(req.body);
    const doc = await Prescreen.create({
      ...body,
      nurseId: req.user.id
    });
    await ActivityLog.create({
      tenantId: req.user.orgId, actorId: req.user.id, entity: 'prescreen', entityId: doc._id,
      action: 'prescreen.create', to: { outcome: doc.outcome }
    });
    res.status(201).json(doc);
  } catch (e) { next(e); }
}
