import { z } from 'zod';
import Message from '../models/Message.js';
import ActivityLog from '../models/ActivityLog.js';
import { sendMail } from '../utils/email.js';

const createMessageSchema = z.object({
  leadId: z.string().optional(),
  participantId: z.string().optional(),
  studyId: z.string().optional(),
  siteId: z.string().optional(),
  type: z.enum(['email', 'sms', 'phone', 'in_person']),
  direction: z.enum(['inbound', 'outbound']),
  subject: z.string().optional(),
  body: z.string().min(1),
  template: z.string().optional(),
  to: z.string().optional(),
  from: z.string().optional(),
  scheduledAt: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional()
});

const updateMessageSchema = z.object({
  status: z.enum(['sent', 'delivered', 'read', 'failed', 'pending']).optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export async function createMessage(req, res, next) {
  try {
    const body = createMessageSchema.parse(req.body);
    
    // Convert scheduledAt string to Date if provided
    const data = {
      ...body,
      tenantId: req.user.orgId,
      createdBy: req.user.id,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined
    };
    
    const message = await Message.create(data);
    
    // Log the activity
    await ActivityLog.create({
      tenantId: req.user.orgId,
      actorId: req.user.id,
      entity: 'message',
      entityId: message._id,
      action: 'message.create',
      to: { type: message.type, direction: message.direction, status: message.status }
    });
    
    // If it's an outbound email and not scheduled, send immediately
    if (message.type === 'email' && message.direction === 'outbound' && !message.scheduledAt) {
      try {
        await sendMail(message.to, message.subject || 'Message from TRUST', message.body);
        message.status = 'sent';
        message.sentAt = new Date();
        await message.save();
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        message.status = 'failed';
        await message.save();
      }
    }
    
    res.status(201).json(message);
  } catch (e) {
    next(e);
  }
}

export async function listMessages(req, res, next) {
  try {
    const { 
      page = 1, 
      limit = 20, 
      type, 
      direction, 
      status, 
      leadId, 
      participantId,
      studyId,
      siteId 
    } = req.query;
    
    const filter = { tenantId: req.user.orgId };
    
    if (type) filter.type = type;
    if (direction) filter.direction = direction;
    if (status) filter.status = status;
    if (leadId) filter.leadId = leadId;
    if (participantId) filter.participantId = participantId;
    if (studyId) filter.studyId = studyId;
    if (siteId) filter.siteId = siteId;
    
    const result = await Message.find(filter)
      .populate('leadId', 'firstName lastName email')
      .populate('participantId', 'status')
      .populate('studyId', 'title protocol')
      .populate('siteId', 'name city state')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Message.countDocuments(filter);
    
    res.json({
      docs: result,
      totalDocs: total,
      limit: parseInt(limit),
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (e) {
    next(e);
  }
}

export async function getMessage(req, res, next) {
  try {
    const { id } = req.params;
    const message = await Message.findOne({ _id: id, tenantId: req.user.orgId })
      .populate('leadId', 'firstName lastName email phone')
      .populate('participantId', 'status')
      .populate('studyId', 'title protocol')
      .populate('siteId', 'name city state')
      .populate('createdBy', 'name email');
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json(message);
  } catch (e) {
    next(e);
  }
}

export async function updateMessage(req, res, next) {
  try {
    const { id } = req.params;
    const body = updateMessageSchema.parse(req.body);
    
    const message = await Message.findOneAndUpdate(
      { _id: id, tenantId: req.user.orgId },
      body,
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    // Log the activity
    await ActivityLog.create({
      tenantId: req.user.orgId,
      actorId: req.user.id,
      entity: 'message',
      entityId: message._id,
      action: 'message.update',
      to: body
    });
    
    res.json(message);
  } catch (e) {
    next(e);
  }
}

export async function markAsRead(req, res, next) {
  try {
    const { id } = req.params;
    const message = await Message.findOneAndUpdate(
      { _id: id, tenantId: req.user.orgId },
      { 
        status: 'read',
        readAt: new Date()
      },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    // Log the activity
    await ActivityLog.create({
      tenantId: req.user.orgId,
      actorId: req.user.id,
      entity: 'message',
      entityId: message._id,
      action: 'message.read',
      to: { status: 'read', readAt: new Date() }
    });
    
    res.json(message);
  } catch (e) {
    next(e);
  }
}

export async function getMessageStats(req, res, next) {
  try {
    const { studyId, siteId, leadId } = req.query;
    const filter = { tenantId: req.user.orgId };
    
    if (studyId) filter.studyId = studyId;
    if (siteId) filter.siteId = siteId;
    if (leadId) filter.leadId = leadId;
    
    const stats = await Message.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            type: '$type',
            direction: '$direction',
            status: '$status'
          },
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json(stats);
  } catch (e) {
    next(e);
  }
}