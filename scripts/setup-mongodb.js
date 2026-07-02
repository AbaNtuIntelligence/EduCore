const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function setupDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB || 'educore');
    
    // Create products collection
    const collections = await db.listCollections({ name: 'products' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('products');
      console.log('✅ Created "products" collection');
    } else {
      console.log('✅ "products" collection already exists');
    }
    
    // Create indexes
    const collection = db.collection('products');
    
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ sku: 1 }, { unique: true });
    console.log('✅ Created indexes on slug, category, and sku');
    
    // Insert sample data if collection is empty
    const count = await collection.countDocuments();
    if (count === 0) {
      const sampleProducts = [
        {
          id: 1,
          name: 'A4 80gsm Copy Paper - Box of 5 Reams',
          slug: 'a4-copy-paper-80gsm',
          category: 'stationery',
          description: 'Premium quality A4 copy paper for everyday printing and photocopying.',
          features: ['80gsm weight', 'Acid-free for longevity', 'Suitable for double-sided printing', 'Bright white finish'],
          price: 'R 285.00',
          unit: 'per box',
          image: 'https://i.imgur.com/q5qUaQT.jpeg',
          sku: 'EDU-PAP-001',
          featured: true,
          stock: 'In Stock',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Executive Office Desk - 1800mm',
          slug: 'executive-office-desk-1800mm',
          category: 'furniture',
          description: 'Modern executive desk with sleek finish and built-in cable management.',
          features: ['1800mm x 900mm x 750mm', 'High-density MDF', 'Built-in cable management', '5 colour options available'],
          price: 'R 4,250.00',
          unit: 'per unit',
          image: 'https://i.imgur.com/wOyKRAu.jpeg',
          sku: 'EDU-FUR-012',
          featured: true,
          stock: 'In Stock',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: '3-Ply Disposable Face Masks - Box of 50',
          slug: '3-ply-disposable-face-masks-box-of-50',
          category: 'ppe',
          description: 'High-quality disposable 3-ply face masks with elastic ear loops.',
          features: ['3-ply protection', 'Elastic ear loops', 'Breathable material', 'CE certified'],
          price: 'R 125.00',
          unit: 'per box',
          image: 'https://i.imgur.com/48bu7cJ.png',
          sku: 'EDU-PPE-003',
          featured: true,
          stock: 'In Stock',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await collection.insertMany(sampleProducts);
      console.log(`✅ Inserted ${sampleProducts.length} sample products`);
    } else {
      console.log(`✅ ${count} products already exist in database`);
    }
    
    console.log('🎉 Database setup complete!');
  } catch (error) {
    console.error('❌ Setup error:', error);
  } finally {
    await client.close();
  }
}

setupDatabase();
