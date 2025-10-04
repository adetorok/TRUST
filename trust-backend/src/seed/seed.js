import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import Organization from '../models/Organization.js';
import User from '../models/User.js';

async function main() {
  await connectDB(process.env.MONGO_URI);
  const org = await Organization.create({ name: 'TRUST Demo Sponsor', type: 'sponsor' });
  const admin = await User.create({
    orgId: org._id,
    email: 'admin@trust.local',
    name: 'Demo Admin',
    passwordHash: await bcrypt.hash('ChangeMe123!', 12),
    roles: ['org_admin','pm']
  });
  console.log('Seeded:', org.name, admin.email);
  process.exit(0);
}
main();
