import mongoose from 'mongoose';

const StudySchema = new mongoose.Schema({
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true }, // sponsor owner
  croId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  title: { type: String, required: true },
  protocol: { type: String, index: true },
  phase: { type: String, enum: ['I','II','III','IV','N/A'], default: 'N/A' },
  therapeuticArea: String,
  languages: { type: [String], default: ['en','es'] },
  status: { type: String, enum: ['planning','recruiting','on_hold','completed'], default: 'planning' }
}, { timestamps: true });

export default mongoose.model('Study', StudySchema);
