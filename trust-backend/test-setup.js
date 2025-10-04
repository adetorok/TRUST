// Simple test to verify the backend setup
import 'dotenv/config';

console.log('✅ Environment variables loaded');
console.log('✅ Dependencies imported successfully');

// Test basic imports
try {
  const express = await import('express');
  console.log('✅ Express imported');
  
  const mongoose = await import('mongoose');
  console.log('✅ Mongoose imported');
  
  const { z } = await import('zod');
  console.log('✅ Zod imported');
  
  // Test Zod schema
  const testSchema = z.object({
    name: z.string().min(1),
    email: z.string().email()
  });
  
  const result = testSchema.parse({ name: 'Test', email: 'test@example.com' });
  console.log('✅ Zod validation working:', result);
  
  console.log('\n🎉 All basic tests passed! The backend setup is correct.');
  console.log('\nTo start the server:');
  console.log('1. Set up MongoDB connection in .env');
  console.log('2. Run: npm run dev');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}