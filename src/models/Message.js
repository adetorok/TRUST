import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', index: true },
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', index: true },
  studyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Study', index: true },
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', index: true },
  
  // Message details
  type: { type: String, enum: ['email', 'sms', 'phone', 'in_person'], required: true },
  direction: { type: String, enum: ['inbound', 'outbound'], required: true },
  status: { type: String, enum: ['sent', 'delivered', 'read', 'failed', 'pending'], default: 'pending' },
  
  // Content
  subject: String,
  body: String,
  template: String, // Template used for automated messages
  
  // Contact info
  to: String, // Email or phone number
  from: String, // Sender email or phone
  
  // Metadata
  scheduledAt: Date,
  sentAt: Date,
  readAt: Date,
  externalId: String, // External service message ID
  
  // Tracking
  openedCount: { type: Number, default: 0 },
  clickedLinks: [String],
  
  // Audit
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  notes: String
}, { timestamps: true });

// Indexes for efficient querying
MessageSchema.index({ tenantId: 1, leadId: 1, createdAt: -1 });
MessageSchema.index({ tenantId: 1, type: 1, status: 1 });
MessageSchema.index({ tenantId: 1, scheduledAt: 1 });

export default mongoose.model('Message', MessageSchema);