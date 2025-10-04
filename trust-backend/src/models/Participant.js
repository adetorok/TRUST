import mongoose from 'mongoose';
const ParticipantSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  studyId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Study', required: true, index: true },
  siteId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Site', index: true },
  leadId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', unique: true },
  status:   { type: String, enum: ['consented','screening','randomized','completed','withdrawn','screen_fail'], default: 'consented', index: true }
}, { timestamps: true });
export default mongoose.model('Participant', ParticipantSchema);
