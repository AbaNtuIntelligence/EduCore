import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('=== PUT REQUEST ===');
    console.log('Product ID:', id);
    
    const dataPath = path.join(process.cwd(), 'data', 'products.json');
    const fileData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileData);
    
    const index = data.products.findIndex((p: any) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const imageUrl = formData.get('imageUrl') as string;
    console.log('New image URL:', imageUrl);
    
    data.products[index].image = imageUrl;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log('✅ Product updated successfully!');
    
    return NextResponse.json({ 
      success: true, 
      product: data.products[index] 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to update product: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('=== GET REQUEST ===');
    console.log('Product ID:', id);
    
    const dataPath = path.join(process.cwd(), 'data', 'products.json');
    const fileData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileData);
    const product = data.products.find((p: any) => p.id === id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('=== DELETE REQUEST ===');
    console.log('Product ID:', id);
    
    const dataPath = path.join(process.cwd(), 'data', 'products.json');
    const fileData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileData);
    const index = data.products.findIndex((p: any) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    data.products.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
