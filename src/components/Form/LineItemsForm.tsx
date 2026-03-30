import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { InvoiceData, LineItem } from '../../types';

interface Props {
  data: InvoiceData;
  addItem: () => void;
  updateItem: (id: string, updates: Partial<LineItem>) => void;
  removeItem: (id: string) => void;
}

export const LineItemsForm: React.FC<Props> = ({ data, addItem, updateItem, removeItem }) => {
  return (
    <div className="space-y-4 pt-6 border-t mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Line Items</h3>
      
      <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 mb-2">
        <div className="col-span-6">Description</div>
        <div className="col-span-2 text-center">Qty</div>
        <div className="col-span-3 text-right">Price</div>
        <div className="col-span-1"></div>
      </div>

      <div className="space-y-3">
        {data.items.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-3 md:bg-transparent md:p-0 rounded-lg">
            <div className="col-span-1 md:col-span-6">
              <label className="block text-xs text-gray-500 md:hidden mb-1">Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                placeholder="Item description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs text-gray-500 md:hidden mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-center"
              />
            </div>
            <div className="col-span-1 md:col-span-3">
              <label className="block text-xs text-gray-500 md:hidden mb-1">Price</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{data.currency === 'USD' ? '$' : data.currency === 'EUR' ? '€' : '£'}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                  className="block w-full pl-7 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-right"
                />
              </div>
            </div>
            <div className="col-span-1 flex justify-end md:justify-center mt-2 md:mt-0">
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-4 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
      >
        <Plus size={16} className="mr-1" />
        Add Line Item
      </button>
    </div>
  );
};
