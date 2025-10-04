import mongoose from 'mongoose';
const ActivityLogSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', index: true },
  actorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  entity:   { type: String, enum: ['lead','prescreen','participant','study','site'] },
  entityId: { type: mongoose.Schema.Types.ObjectId, index: true },
  action:   { type: String },
  from:     { type: mongoose.Schema.Types.Mixed },
  to:       { type: mongoose.Schema.Types.Mixed },
  note:     { type: String }
}, { timestamps: true, versionKey: false });

ActivityLogSchema.set('toJSON',{ transform: (_doc, ret)=>{ delete ret._id; }});
export default mongoose.model('ActivityLog', ActivityLogSchema);
