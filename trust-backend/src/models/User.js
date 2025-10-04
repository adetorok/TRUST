import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import unique from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', index: true, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  roles: [{ type: String, enum: [
    'system_admin','org_admin','sponsor_user','cro_user','site_user','vendor_user',
    'pm','coordinator','nurse','viewer'
  ], index: true }],
  active: { type: Boolean, default: true }
}, { timestamps: true });

UserSchema.methods.compare = function (pwd) {
  return bcrypt.compare(pwd, this.passwordHash);
};

UserSchema.plugin(unique);
export default mongoose.model('User', UserSchema);
