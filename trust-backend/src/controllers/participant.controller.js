import Participant from '../models/Participant.js';

export async function listParticipants(req, res, next) {
  try {
    const docs = await Participant.find({ tenantId: req.user.orgId }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (e) { next(e); }
}
