import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import Organization from '../models/Organization.js';
import User from '../models/User.js';
import Study from '../models/Study.js';
import Site from '../models/Site.js';
import Lead from '../models/Lead.js';
import Message from '../models/Message.js';
import Task from '../models/Task.js';

async function main() {
  await connectDB(process.env.MONGO_URI);
  
  // Create organization
  const org = await Organization.create({ name: 'TRUST Demo Sponsor', type: 'sponsor' });
  
  // Create admin user
  const admin = await User.create({
    orgId: org._id,
    email: 'admin@trust.local',
    name: 'Demo Admin',
    passwordHash: await bcrypt.hash('ChangeMe123!', 12),
    roles: ['org_admin','pm']
  });
  
  // Create additional users
  const coordinator = await User.create({
    orgId: org._id,
    email: 'coordinator@trust.local',
    name: 'Demo Coordinator',
    passwordHash: await bcrypt.hash('ChangeMe123!', 12),
    roles: ['coordinator']
  });
  
  const nurse = await User.create({
    orgId: org._id,
    email: 'nurse@trust.local',
    name: 'Demo Nurse',
    passwordHash: await bcrypt.hash('ChangeMe123!', 12),
    roles: ['nurse']
  });
  
  // Create study
  const study = await Study.create({
    orgId: org._id,
    title: 'IBS-C Study',
    protocol: 'IBSC-001',
    phase: 'II',
    therapeuticArea: 'Gastroenterology',
    status: 'recruiting'
  });
  
  // Create site
  const site = await Site.create({
    orgId: org._id,
    name: 'Med Clinical Research Newark',
    city: 'Newark',
    state: 'NJ',
    piName: 'Dr. Sarah Johnson',
    contactEmail: 'contact@medclinical.com',
    contactPhone: '+1-555-0123'
  });
  
  // Create leads
  const lead1 = await Lead.create({
    tenantId: org._id,
    studyId: study._id,
    siteId: site._id,
    firstName: 'Joshua',
    lastName: 'Edwards',
    email: 'joshua.edwards@email.com',
    phone: '13474015886',
    source: 'community_outreach',
    stage: 'potential',
    createdBy: admin._id
  });
  
  const lead2 = await Lead.create({
    tenantId: org._id,
    studyId: study._id,
    siteId: site._id,
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '15551234567',
    source: 'landing_page',
    stage: 'screening',
    createdBy: coordinator._id
  });
  
  // Create sample messages
  await Message.create({
    tenantId: org._id,
    leadId: lead1._id,
    studyId: study._id,
    siteId: site._id,
    type: 'email',
    direction: 'outbound',
    subject: 'Welcome to TRUST Study',
    body: 'Thank you for your interest in our IBS-C study. We will contact you soon to schedule a screening appointment.',
    to: lead1.email,
    from: 'noreply@trust.local',
    status: 'sent',
    sentAt: new Date(),
    createdBy: coordinator._id,
    tags: ['welcome', 'automated']
  });
  
  await Message.create({
    tenantId: org._id,
    leadId: lead2._id,
    studyId: study._id,
    siteId: site._id,
    type: 'phone',
    direction: 'outbound',
    body: 'Follow-up call to confirm screening appointment',
    to: lead2.phone,
    status: 'completed',
    createdBy: nurse._id,
    notes: 'Patient confirmed appointment for next Tuesday at 2 PM'
  });
  
  // Create sample tasks
  await Task.create({
    tenantId: org._id,
    leadId: lead1._id,
    studyId: study._id,
    siteId: site._id,
    title: 'Initial contact with Joshua Edwards',
    description: 'Call to discuss study participation and answer questions',
    type: 'follow_up',
    priority: 'high',
    status: 'pending',
    assignedTo: coordinator._id,
    assignedBy: admin._id,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    stage: 'potential',
    tags: ['initial_contact']
  });
  
  await Task.create({
    tenantId: org._id,
    leadId: lead2._id,
    studyId: study._id,
    siteId: site._id,
    title: 'Schedule screening appointment',
    description: 'Coordinate with Maria Rodriguez for screening visit',
    type: 'screening',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: nurse._id,
    assignedBy: coordinator._id,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    stage: 'screening',
    tags: ['screening', 'appointment']
  });
  
  await Task.create({
    tenantId: org._id,
    studyId: study._id,
    siteId: site._id,
    title: 'Weekly site check-in',
    description: 'Regular check-in with site staff',
    type: 'communication',
    priority: 'low',
    status: 'pending',
    assignedTo: coordinator._id,
    assignedBy: admin._id,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
    isRecurring: true,
    recurrencePattern: 'weekly',
    recurrenceInterval: 1,
    tags: ['site_check', 'recurring']
  });
  
  console.log('✅ Seeded successfully:');
  console.log('- Organization:', org.name);
  console.log('- Users:', admin.email, coordinator.email, nurse.email);
  console.log('- Study:', study.title);
  console.log('- Site:', site.name);
  console.log('- Leads:', lead1.firstName, lead2.firstName);
  console.log('- Messages: 2 created');
  console.log('- Tasks: 3 created');
  
  process.exit(0);
}

main().catch(console.error);