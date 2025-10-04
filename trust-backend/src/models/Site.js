import mongoose from 'mongoose';
const SiteSchema = new mongoose.Schema({
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true }, // site org
  name: { type: String, required: true },
  piName: String,
  city: String, state: String,
  contactEmail: String, contactPhone: String
}, { timestamps: true });
export default mongoose.model('Site', SiteSchema);
