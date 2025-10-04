import mongoose from 'mongoose';
import { z } from 'zod';
import Lead from '../models/Lead.js';
import Participant from '../models/Participant.js';
import ActivityLog from '../models/ActivityLog.js';
import { canTransition } from '../utils/workflow.js';

const createLeadSchema = z.object({
  studyId: z.string(),
  siteId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  language: z.enum(['en','es']).default('en'),
  source: z.enum(['landing_page','qr','community_outreach','referral','import','other']).default('landing_page'),
  preferredWindows: z.array(z.enum(['9-12','12-15','15-18','18-21'])).optional()
});

export async function createLead(req, res, next) {
  try {
    const body = createLeadSchema.parse(req.body);
    const doc = await Lead.create({
      ...body,
      tenantId: req.user.orgId,
      createdBy: req.user.id
    });
    await ActivityLog.create({
      tenantId: req.user.orgId, actorId: req.user.id,
      entity: 'lead', entityId: doc._id, action: 'lead.create', to: { stage: doc.stage }
    });
    res.status(201).json(doc);
  } catch (e) { next(e); }
}

export async function listLeads(req, res, next) {
  try {
    const { page = 1, limit = 20, stage } = req.query;
    const filter = { tenantId: req.user.orgId };
    if (stage) filter.stage = stage;
    const result = await Lead.paginate(filter, { page, limit, sort: { createdAt: -1 } });
    res.json(result);
  } catch (e) { next(e); }
}

export async function moveStage(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const { to } = req.body;
    const lead = await Lead.findOne({ _id: id, tenantId: req.user.orgId }).session(session);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    if (!canTransition(lead.stage, to)) return res.status(400).json({ error: 'Illegal transition' });

    const fromStage = lead.stage;
    lead.stage = to;
    await lead.save({ session });

    if (to === 'enrolled') {
      await Participant.create([{
        tenantId: lead.tenantId, studyId: lead.studyId, siteId: lead.siteId, leadId: lead._id, status: 'consented'
      }], { session });
    }

    await ActivityLog.create([{
      tenantId: req.user.orgId, actorId: req.user.id, entity: 'lead', entityId: lead._id,
      action: 'lead.stage_change', from: { stage: fromStage }, to: { stage: to }
    }], { session });

    await session.commitTransaction();
    res.json(lead);
  } catch (e) {
    await session.abortTransaction();
    next(e);
  } finally {
    session.endSession();
  }
}
