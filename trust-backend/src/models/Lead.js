import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const LeadSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', index: true, required: true }, // partition
  studyId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Study', index: true, required: true },
  siteId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Site', index: true },
  firstName: String,
  lastName: String,
  email: { type: String, index: true },
  phone: String,
  preferredWindows: [{ type: String, enum: ['9-12','12-15','15-18','18-21'] }],
  language: { type: String, enum: ['en','es'], default: 'en' },
  source: { type: String, enum: ['landing_page','qr','community_outreach','referral','import','other'], default: 'landing_page' },
  stage: { type: String, enum: ['potential','pending_consent','screening','enrolled','screen_fail','not_interested','do_not_contact'], default: 'potential', index: true },
  tags: [String],
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

LeadSchema.index({ tenantId: 1, studyId: 1, email: 1 });
LeadSchema.plugin(mongoosePaginate);
export default mongoose.model('Lead', LeadSchema);
