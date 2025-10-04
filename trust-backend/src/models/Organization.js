import mongoose from 'mongoose';

const OrgSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  type: { type: String, enum: ['sponsor','cro','site','vendor','system'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Organization', OrgSchema);
