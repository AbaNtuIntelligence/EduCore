"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Search, X, LogOut } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  price: string;
  unit: string;
  image: string;
  sku: string;
  featured: boolean;
  stock: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    features: '',
    price: '',
    unit: '',
    sku: '',
    stock: 'In Stock',
    featured: false,
    imageUrl: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('category', formData.category);
    formDataObj.append('description', formData.description);
    formDataObj.append('features', formData.features);
    formDataObj.append('price', formData.price);
    formDataObj.append('unit', formData.unit);
    formDataObj.append('sku', formData.sku);
    formDataObj.append('stock', formData.stock);
    formDataObj.append('featured', String(formData.featured));
    formDataObj.append('imageUrl', formData.imageUrl);
    
    // ✅ Determine if this is a new product or editing
    const isNewProduct = !editingProduct || !editingProduct.id;
    
    if (!isNewProduct) {
      formDataObj.append('id', String(editingProduct.id));
      console.log('✅ Editing product ID:', editingProduct.id);
    } else {
      console.log('✅ Adding new product (no ID)');
    }

    try {
      // ✅ Use POST for new products, PUT for updates
      const url = '/api/products';
      const method = isNewProduct ? 'POST' : 'PUT';
      
      console.log('📤 Sending request to:', url);
      console.log('📦 Method:', method);
      console.log('🆔 Is new product:', isNewProduct);
      
      const res = await fetch(url, {
        method,
        body: formDataObj,
      });
      
      const responseText = await res.text();
      console.log('📨 Response status:', res.status);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        alert('Server error: ' + responseText.substring(0, 200));
        return;
      }
      
      if (res.ok) {
        console.log('✅ Save successful:', result);
        await fetchProducts();
        setShowModal(false);
        // Reset form after successful save
        setEditingProduct(null);
        setFormData({
          name: '',
          category: '',
          description: '',
          features: '',
          price: '',
          unit: '',
          sku: '',
          stock: 'In Stock',
          featured: false,
          imageUrl: '',
        });
      } else {
        console.error('❌ Save error:', result);
        alert('Error saving product: ' + (result.error || result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      alert('Network error: ' + (error as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchProducts();
      } else {
        const error = await res.json();
        alert('Error deleting product: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    console.log('✏️ Editing product:', product);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      features: product.features.join('\n'),
      price: product.price,
      unit: product.unit,
      sku: product.sku,
      stock: product.stock || 'In Stock',
      featured: product.featured,
      imageUrl: product.image || '',
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    console.log('➕ Opening add product modal');
    // Reset form and ensure editingProduct is null
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      description: '',
      features: '',
      price: '',
      unit: '',
      sku: '',
      stock: 'In Stock',
      featured: false,
      imageUrl: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Don't reset editingProduct here to keep state
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A2B4C]">Product Management</h1>
            <p className="text-gray-600">Manage your catalogue products ({products.length} total)</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <Plus size={20} /> Add Product
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-red-300 hover:bg-red-50 text-red-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#F05A28] focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No products found. Click "Add Product" to create one.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.image && product.image.startsWith('http') ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/1A2B4C/FFFFFF?text=📦';
                                }}
                              />
                            ) : (
                              <span className="text-2xl">📦</span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-[#1A2B4C]">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#1A2B4C]">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 
                          product.stock === 'Pre-order' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.stock || 'In Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1A2B4C]">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/XXXXXXX.png"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/1A2B4C/FFFFFF?text=Invalid+URL';
                      }}
                    />
                  </div>
                )}
                {editingProduct?.image && !formData.imageUrl && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Current image:</p>
                    <img 
                      src={editingProduct.image} 
                      alt="Current product" 
                      className="w-20 h-20 object-cover rounded-lg mt-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/1A2B4C/FFFFFF?text=📦';
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                >
                  <option value="">Select a category</option>
                  <option value="stationery">Stationery</option>
                  <option value="furniture">Office Furniture</option>
                  <option value="ppe">PPE & Safety</option>
                  <option value="cleaning">Cleaning & Hygiene</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., R 285.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., per box"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status *</label>
                  <select
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-[#F05A28] focus:outline-none"
                  >
                    <option value="In Stock">✅ In Stock</option>
                    <option value="Pre-order">📦 Pre-order</option>
                    <option value="Out of Stock">❌ Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#F05A28] focus:ring-[#F05A28] rounded"
                />
                <label className="text-sm font-medium text-gray-700">Featured Product</label>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-[#F05A28] hover:bg-[#d94a1e] text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
