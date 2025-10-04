# TRUST Backend Testing Guide - Messages & Tasks

This guide provides comprehensive testing instructions for the new Messages and Tasks features.

## Prerequisites

1. **MongoDB Setup**: Ensure MongoDB is running locally or use MongoDB Atlas
2. **Environment Configuration**: Copy `.env.example` to `.env` and configure
3. **Dependencies**: Run `npm install` to install all dependencies

## Setup Testing Environment

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Seed the database**:
   ```bash
   npm run seed
   ```

3. **Get authentication token**:
   ```bash
   curl -X POST http://localhost:4000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@trust.local","password":"ChangeMe123!"}'
   ```

   Save the token from the response for use in subsequent requests.

## Testing Messages API

### 1. Create a Message

```bash
curl -X POST http://localhost:4000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "LEAD_ID_FROM_SEED",
    "studyId": "STUDY_ID_FROM_SEED",
    "type": "email",
    "direction": "outbound",
    "subject": "Study Update",
    "body": "Thank you for your interest in our study. We will contact you soon.",
    "to": "participant@example.com",
    "tags": ["update", "automated"]
  }'
```

### 2. List Messages

```bash
curl -X GET "http://localhost:4000/api/messages?type=email&direction=outbound" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Get Message Statistics

```bash
curl -X GET "http://localhost:4000/api/messages/stats" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Mark Message as Read

```bash
curl -X POST http://localhost:4000/api/messages/MESSAGE_ID/read \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Testing Tasks API

### 1. Create a Task

```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "LEAD_ID_FROM_SEED",
    "studyId": "STUDY_ID_FROM_SEED",
    "title": "Follow up with participant",
    "description": "Call to check on study progress and answer questions",
    "type": "follow_up",
    "priority": "medium",
    "assignedTo": "USER_ID_FROM_SEED",
    "dueDate": "2024-12-31T10:00:00Z",
    "tags": ["follow_up", "phone"]
  }'
```

### 2. List All Tasks

```bash
curl -X GET "http://localhost:4000/api/tasks?status=pending&priority=high" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Get My Tasks

```bash
curl -X GET "http://localhost:4000/api/tasks/my?overdue=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Complete a Task

```bash
curl -X POST http://localhost:4000/api/tasks/TASK_ID/complete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"notes": "Successfully completed the follow-up call"}'
```

### 5. Assign a Task

```bash
curl -X POST http://localhost:4000/api/tasks/TASK_ID/assign \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"assignedTo": "USER_ID_FROM_SEED"}'
```

### 6. Get Task Statistics

```bash
curl -X GET "http://localhost:4000/api/tasks/stats" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Testing Workflow Integration

### 1. Create a Lead

```bash
curl -X POST http://localhost:4000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "studyId": "STUDY_ID_FROM_SEED",
    "siteId": "SITE_ID_FROM_SEED",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "15551234567",
    "source": "landing_page"
  }'
```

### 2. Create a Message for the Lead

```bash
curl -X POST http://localhost:4000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "NEW_LEAD_ID",
    "type": "email",
    "direction": "outbound",
    "subject": "Welcome to our study",
    "body": "Thank you for your interest. We will contact you soon.",
    "to": "john.doe@example.com"
  }'
```

### 3. Create a Follow-up Task

```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "NEW_LEAD_ID",
    "title": "Initial contact with John Doe",
    "description": "Call to discuss study participation",
    "type": "follow_up",
    "priority": "high",
    "dueDate": "2024-01-15T10:00:00Z"
  }'
```

## Testing Error Handling

### 1. Invalid Message Type

```bash
curl -X POST http://localhost:4000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "invalid_type",
    "direction": "outbound",
    "body": "Test message"
  }'
```

Expected: 400 Bad Request with validation error

### 2. Missing Required Fields

```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Task without title"
  }'
```

Expected: 400 Bad Request with validation error

### 3. Unauthorized Access

```bash
curl -X GET http://localhost:4000/api/messages \
  -H "Authorization: Bearer invalid_token"
```

Expected: 401 Unauthorized

## Testing RBAC (Role-Based Access Control)

### 1. Test Coordinator Access

Login as coordinator and test task creation:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"coordinator@trust.local","password":"ChangeMe123!"}'
```

### 2. Test Nurse Access

Login as nurse and test message creation:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nurse@trust.local","password":"ChangeMe123!"}'
```

## Performance Testing

### 1. Bulk Message Creation

```bash
for i in {1..10}; do
  curl -X POST http://localhost:4000/api/messages \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"type\": \"email\",
      \"direction\": \"outbound\",
      \"subject\": \"Test Message $i\",
      \"body\": \"This is test message number $i\",
      \"to\": \"test$i@example.com\"
    }"
done
```

### 2. Bulk Task Creation

```bash
for i in {1..10}; do
  curl -X POST http://localhost:4000/api/tasks \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Test Task $i\",
      \"description\": \"This is test task number $i\",
      \"type\": \"follow_up\",
      \"priority\": \"medium\"
    }"
done
```

## Database Verification

### 1. Check Message Collection

```javascript
// In MongoDB shell or MongoDB Compass
db.messages.find().limit(5).pretty()
```

### 2. Check Task Collection

```javascript
// In MongoDB shell or MongoDB Compass
db.tasks.find().limit(5).pretty()
```

### 3. Check Activity Logs

```javascript
// In MongoDB shell or MongoDB Compass
db.activitylogs.find({entity: {$in: ['message', 'task']}}).limit(10).pretty()
```

## Expected Results

After running all tests, you should see:

1. **Messages**: Created, listed, and tracked with proper status updates
2. **Tasks**: Created, assigned, completed with proper workflow integration
3. **Activity Logs**: All actions properly logged for audit trail
4. **RBAC**: Proper access control based on user roles
5. **Validation**: Input validation working correctly
6. **Error Handling**: Proper error responses for invalid requests

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Check MONGO_URI in .env
2. **JWT Secret Error**: Ensure JWT_SECRET is set in .env
3. **Port Already in Use**: Change PORT in .env or kill existing process
4. **Validation Errors**: Check request body format and required fields

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=trust:*
npm run dev
```

This comprehensive testing guide ensures all new features work correctly and integrate properly with the existing TRUST backend system.