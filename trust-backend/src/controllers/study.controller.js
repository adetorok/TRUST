import { z } from 'zod';
import Study from '../models/Study.js';

const upsert = z.object({
  title: z.string(),
  protocol: z.string().optional(),
  phase: z.enum(['I','II','III','IV','N/A']).optional(),
  therapeuticArea: z.string().optional(),
  languages: z.array(z.string()).optional()
});

export async function createStudy(req, res, next) {
  try {
    const data = upsert.parse(req.body);
    const doc = await Study.create({ ...data, orgId: req.user.orgId });
    res.status(201).json(doc);
  } catch (e) { next(e); }
}

export async function listStudies(req, res, next) {
  try {
    const docs = await Study.find({ orgId: req.user.orgId }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (e) { next(e); }
}
