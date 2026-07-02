const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  console.log('🔍 Testing MongoDB connection...');
  console.log('📡 URI:', uri ? '✅ Found' : '❌ Not found');
  
  if (!uri) {
    console.log('❌ MONGODB_URI not found in .env.local');
    return;
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    const db = client.db(process.env.MONGODB_DB || 'educore');
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name).join(', ') || 'No collections found');
    
    await client.close();
    console.log('✅ Test complete!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
