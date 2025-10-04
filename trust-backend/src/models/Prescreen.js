import mongoose from 'mongoose';
const PrescreenSchema = new mongoose.Schema({
  leadId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true, index: true },
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  outcome: { type: String, enum: ['eligible','ineligible','pending_info'], required: true },
  notes: String,
  answers: [{ q: String, a: String }],
}, { timestamps: true });
export default mongoose.model('Prescreen', PrescreenSchema);
