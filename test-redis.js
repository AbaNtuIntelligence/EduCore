const { Redis } = require('@upstash/redis');
require('dotenv').config({ path: '.env.local' });

async function testRedis() {
  try {
    // Check if credentials exist
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    console.log('🔍 Checking Upstash credentials...');
    console.log('📡 URL:', url ? '✅ Found' : '❌ Missing');
    console.log('🔑 Token:', token ? '✅ Found' : '❌ Missing');
    
    if (!url || !token) {
      console.log('❌ Missing credentials in .env.local');
      console.log('Please add:');
      console.log('UPSTASH_REDIS_REST_URL=your-url');
      console.log('UPSTASH_REDIS_REST_TOKEN=your-token');
      return;
    }

    const redis = Redis.fromEnv();
    
    // Test connection
    console.log('🔄 Testing Redis connection...');
    await redis.set('test', 'Hello from EDUCORE!');
    const result = await redis.get('test');
    
    console.log('✅ Redis connected successfully!');
    console.log('📝 Test value:', result);
    
    // Clean up
    await redis.del('test');
    console.log('✅ Test complete!');
  } catch (error) {
    console.error('❌ Redis error:', error.message);
    if (error.message.includes('401')) {
      console.log('💡 The token might be wrong. Make sure you\'re using the TOKEN (not Readonly Token)');
    }
  }
}

testRedis();
