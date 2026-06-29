import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getProductsData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'products.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products data:', error);
    return { products: [], categories: [] };
  }
}

function saveProductsData(data: any) {
  const dataPath = path.join(process.cwd(), 'data', 'products.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET /api/products - Get all products
export async function GET() {
  try {
    const data = getProductsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Add a new product
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const unit = formData.get('unit') as string;
    const sku = formData.get('sku') as string;
    const stock = formData.get('stock') as string;
    const featured = formData.get('featured') === 'true';
    const features = (formData.get('features') as string)?.split('\n').filter(f => f.trim()) || [];
    
    // Create slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Read existing data
    const data = getProductsData();
    
    // Create new product
    const newId = data.products.length > 0 ? Math.max(...data.products.map((p: any) => p.id)) + 1 : 1;
    
    // Handle image upload
    const imageFile = formData.get('image') as File | null;
    let imagePath = '/images/products/default-product.jpg';
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const timestamp = Date.now();
      const ext = imageFile.name.split('.').pop();
      const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;
      const relativePath = `/images/products/${filename}`;
      const fullPath = path.join(process.cwd(), 'public', relativePath);
      
      // Ensure directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, buffer);
      imagePath = relativePath;
    }
    
    const newProduct = {
      id: newId,
      name,
      slug,
      category,
      description,
      features,
      price,
      unit,
      image: imagePath,
      sku,
      featured,
      stock: stock || 'In Stock',
    };
    
    data.products.push(newProduct);
    
    // Update categories
    const categoryMap = new Map<string, number>();
    data.products.forEach((p: any) => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });
    
    data.categories = data.categories.map((cat: any) => ({
      ...cat,
      count: categoryMap.get(cat.id) || 0,
    }));
    
    const allCategory = data.categories.find((c: any) => c.id === 'all');
    if (allCategory) allCategory.count = data.products.length;
    
    saveProductsData(data);
    
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}
