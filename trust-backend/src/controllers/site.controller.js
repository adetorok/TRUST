import { z } from 'zod';
import Site from '../models/Site.js';

const upsert = z.object({
  name: z.string(),
  piName: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional()
});

export async function createSite(req, res, next) {
  try {
    const data = upsert.parse(req.body);
    const doc = await Site.create({ ...data, orgId: req.user.orgId });
    res.status(201).json(doc);
  } catch (e) { next(e); }
}

export async function listSites(req, res, next) {
  try {
    const docs = await Site.find({ orgId: req.user.orgId }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (e) { next(e); }
}
