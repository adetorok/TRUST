# TRUST Backend - Messages & Tasks Enhancement

This is the enhanced TRUST backend with **Messages** (email/SMS logs) and **Tasks** (follow-up reminders and assignments) functionality.

## New Features Added

### 📧 Messages System
- **Multi-channel communication**: Email, SMS, phone calls, and in-person interactions
- **Bidirectional tracking**: Inbound and outbound message logging
- **Status tracking**: Sent, delivered, read, failed, pending
- **Scheduling**: Future message scheduling
- **Template support**: Automated message templates
- **Analytics**: Message statistics and reporting
- **Tenant isolation**: Multi-tenant message separation

### ✅ Tasks System
- **Task management**: Create, assign, update, and complete tasks
- **Priority levels**: Low, medium, high, urgent
- **Due dates**: Task scheduling with overdue detection
- **Assignment**: Assign tasks to specific users
- **Recurring tasks**: Daily, weekly, monthly recurring tasks
- **Task types**: Follow-up, screening, consent, visit, documentation, communication
- **My tasks**: Personal task dashboard
- **Analytics**: Task statistics and reporting

## API Endpoints

### Messages API (`/api/messages`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/` | Create message | ✅ | pm, coordinator, nurse, site_user, sponsor_user, cro_user |
| GET | `/` | List messages | ✅ | pm, coordinator, nurse, viewer, site_user, sponsor_user, cro_user |
| GET | `/stats` | Message statistics | ✅ | pm, coordinator, viewer, sponsor_user, cro_user |
| GET | `/:id` | Get specific message | ✅ | pm, coordinator, nurse, viewer, site_user, sponsor_user, cro_user |
| PUT | `/:id` | Update message | ✅ | pm, coordinator, org_admin |
| POST | `/:id/read` | Mark as read | ✅ | pm, coordinator, nurse, site_user, sponsor_user, cro_user |

### Tasks API (`/api/tasks`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/` | Create task | ✅ | pm, coordinator, org_admin |
| GET | `/` | List all tasks | ✅ | pm, coordinator, viewer, org_admin |
| GET | `/my` | Get my tasks | ✅ | pm, coordinator, nurse, site_user, sponsor_user, cro_user |
| GET | `/stats` | Task statistics | ✅ | pm, coordinator, viewer, org_admin |
| GET | `/:id` | Get specific task | ✅ | pm, coordinator, nurse, viewer, site_user, sponsor_user, cro_user |
| PUT | `/:id` | Update task | ✅ | pm, coordinator, org_admin |
| POST | `/:id/complete` | Complete task | ✅ | pm, coordinator, nurse, site_user, sponsor_user, cro_user |
| POST | `/:id/assign` | Assign task | ✅ | pm, coordinator, org_admin |

## Usage Examples

### Creating a Message

```bash
curl -X POST http://localhost:4000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "LEAD_ID",
    "studyId": "STUDY_ID",
    "type": "email",
    "direction": "outbound",
    "subject": "Study Update",
    "body": "Thank you for your participation in our study.",
    "to": "participant@email.com",
    "tags": ["update", "automated"]
  }'
```

### Creating a Task

```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "LEAD_ID",
    "studyId": "STUDY_ID",
    "title": "Follow up with participant",
    "description": "Call to check on study progress",
    "type": "follow_up",
    "priority": "medium",
    "assignedTo": "USER_ID",
    "dueDate": "2024-01-15T10:00:00Z",
    "tags": ["follow_up", "phone"]
  }'
```

### Getting My Tasks

```bash
curl -X GET "http://localhost:4000/api/tasks/my?overdue=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Getting Message Statistics

```bash
curl -X GET "http://localhost:4000/api/messages/stats?studyId=STUDY_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Data Models

### Message Model
```javascript
{
  tenantId: ObjectId,        // Organization reference
  leadId: ObjectId,         // Lead reference (optional)
  participantId: ObjectId,  // Participant reference (optional)
  studyId: ObjectId,        // Study reference (optional)
  siteId: ObjectId,        // Site reference (optional)
  type: String,            // 'email', 'sms', 'phone', 'in_person'
  direction: String,       // 'inbound', 'outbound'
  status: String,          // 'sent', 'delivered', 'read', 'failed', 'pending'
  subject: String,         // Email subject (optional)
  body: String,            // Message content
  template: String,         // Template used (optional)
  to: String,              // Recipient email/phone
  from: String,            // Sender email/phone
  scheduledAt: Date,       // Scheduled send time (optional)
  sentAt: Date,            // Actual send time
  readAt: Date,            // Read time
  externalId: String,      // External service ID
  openedCount: Number,     // Email open count
  clickedLinks: [String],  // Clicked links
  createdBy: ObjectId,     // User who created
  tags: [String],          // Tags for categorization
  notes: String            // Additional notes
}
```

### Task Model
```javascript
{
  tenantId: ObjectId,           // Organization reference
  leadId: ObjectId,             // Lead reference (optional)
  participantId: ObjectId,      // Participant reference (optional)
  studyId: ObjectId,            // Study reference (optional)
  siteId: ObjectId,             // Site reference (optional)
  title: String,                // Task title
  description: String,          // Task description
  type: String,                 // 'follow_up', 'screening', 'consent', 'visit', 'documentation', 'communication', 'other'
  priority: String,              // 'low', 'medium', 'high', 'urgent'
  status: String,               // 'pending', 'in_progress', 'completed', 'cancelled'
  assignedTo: ObjectId,         // Assigned user
  assignedBy: ObjectId,          // User who created/assigned
  dueDate: Date,                // Due date
  completedAt: Date,             // Completion time
  reminderAt: Date,             // Reminder time
  stage: String,                // Lead stage when created
  autoGenerated: Boolean,       // System-generated vs manual
  tags: [String],               // Tags for categorization
  notes: String,                // Additional notes
  attachments: [{               // File attachments
    name: String,
    url: String
  }],
  isRecurring: Boolean,         // Recurring task flag
  recurrencePattern: String,     // 'daily', 'weekly', 'monthly'
  recurrenceInterval: Number,    // Every N days/weeks/months
  recurrenceEndDate: Date       // End date for recurrence
}
```

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI, JWT secret, and email settings
   ```

3. **Seed the database**:
   ```bash
   npm run seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Test the endpoints**:
   ```bash
   # Health check
   curl http://localhost:4000/health
   
   # Login to get token
   curl -X POST http://localhost:4000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@trust.local","password":"ChangeMe123!"}'
   ```

## Next Steps

The next milestones for TRUST backend development are:

1. **File Uploads**: Add multer + S3 integration for document management
2. **Exports & Reports**: Add CSV exports and summary reporting endpoints
3. **Audit Hardening**: Implement append-only logs with user/timezone stamps for Part 11 compliance
4. **Real-time Notifications**: Add WebSocket support for real-time task and message updates
5. **Advanced Analytics**: Add dashboard endpoints with charts and metrics

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **RBAC Authorization**: Role-based access control for all endpoints
- **Tenant Isolation**: Multi-tenant data separation
- **Input Validation**: Zod schema validation for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **Security Headers**: Helmet.js for security headers
- **CORS Configuration**: Configurable cross-origin resource sharing

## Database Indexes

The system includes optimized indexes for:
- Tenant-based queries (`tenantId`)
- User assignments (`assignedTo`)
- Due dates and scheduling (`dueDate`, `reminderAt`)
- Message status and type (`status`, `type`)
- Lead and study relationships (`leadId`, `studyId`)

This ensures efficient querying even with large datasets.