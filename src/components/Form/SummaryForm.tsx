import React from 'react';
import type { InvoiceData } from '../../types';

interface Props {
  data: InvoiceData;
  updateData: (updates: Partial<InvoiceData>) => void;
}

export const SummaryForm: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-4 pt-6 border-t mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Totals & Formatting</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={data.taxRate}
            onChange={(e) => updateData({ taxRate: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={data.discountRate}
            onChange={(e) => updateData({ discountRate: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
      </div>
    </div>
  );
};
