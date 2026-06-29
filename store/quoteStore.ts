import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteItem {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  quantity: number;
  unit: string;
  image: string;
}

interface QuoteStore {
  items: QuoteItem[];
  addItem: (product: any, quantity: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearQuote: () => void;
  getTotalItems: () => number;
  getSubtotal: () => string;
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, {
              id: product.id,
              name: product.name,
              slug: product.slug,
              sku: product.sku,
              price: product.price,
              quantity: quantity,
              unit: product.unit,
              image: product.image || '/images/products/default-product.jpg',
            }],
          };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter(item => item.id !== id),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      clearQuote: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getSubtotal: () => {
        const total = get().items.reduce((sum, item) => {
          const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
          return sum + (price * item.quantity);
        }, 0);
        return `R ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
      },
    }),
    {
      name: 'educore-quote',
    }
  )
);
