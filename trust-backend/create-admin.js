import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from './src/config/db.js';
import Organization from './src/models/Organization.js';
import User from './src/models/User.js';

// Set MongoDB URI directly
const MONGO_URI = 'mongodb+srv://adetorok:Omoyeni0!@dalento0.ajjfhj5.mongodb.net/trust-clinical-trial';

async function createAdmin() {
  try {
    console.log('Connecting to database...');
    console.log('MongoDB URI: Set');
    
    await connectDB(MONGO_URI);
    
    console.log('Creating organization...');
    const org = await Organization.create({ 
      name: 'TRUST Clinical Trials', 
      type: 'sponsor' 
    });
    
    console.log('Creating admin user...');
    const admin = await User.create({
      orgId: org._id,
      email: 'admin@trust.com',
      name: 'TRUST Admin',
      passwordHash: await bcrypt.hash('admin123', 12),
      roles: ['system_admin', 'org_admin']
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@trust.com');
    console.log('🔑 Password: admin123');
    console.log('🏢 Organization:', org.name);
    console.log('👤 Roles:', admin.roles);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
