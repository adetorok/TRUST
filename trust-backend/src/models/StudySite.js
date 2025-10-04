import mongoose from 'mongoose';
const StudySiteSchema = new mongoose.Schema({
  studyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Study', index: true, required: true },
  siteId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Site', index: true, required: true },
  targetEnrollment: Number,
  startDate: Date, endDate: Date,
  status: { type: String, enum: ['pending','active','paused','closed'], default: 'pending' }
}, { timestamps: true });

StudySiteSchema.index({ studyId: 1, siteId: 1 }, { unique: true });
export default mongoose.model('StudySite', StudySiteSchema);
