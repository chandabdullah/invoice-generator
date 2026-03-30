import React from 'react';
import type { InvoiceData, SenderInfo, ClientInfo } from '../../types';

interface Props {
  data: InvoiceData;
  updateSender: (updates: Partial<SenderInfo>) => void;
  updateClient: (updates: Partial<ClientInfo>) => void;
  updateData: (updates: Partial<InvoiceData>) => void;
}

export const DetailsForm: React.FC<Props> = ({ data, updateSender, updateClient, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Meta */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
            <input
              type="text"
              value={data.invoiceNumber}
              onChange={(e) => updateData({ invoiceNumber: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => updateData({ date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date (Optional)</label>
            <input
              type="date"
              value={data.dueDate || ''}
              onChange={(e) => updateData({ dueDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
            />
          </div>
        </div>

        {/* Brand/Logo configuration can be here or separate config form */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        {/* Sender Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Your Details (Sender)</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name / Company</label>
            <input
              type="text"
              value={data.sender.name}
              onChange={(e) => updateSender({ name: e.target.value })}
              placeholder="Your Company Name"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={data.sender.email}
              onChange={(e) => updateSender({ email: e.target.value })}
              placeholder="you@company.com"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={data.sender.address}
              onChange={(e) => updateSender({ address: e.target.value })}
              placeholder="123 Business Rd..."
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
              rows={3}
            />
          </div>
        </div>

        {/* Client Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Bill To (Client)</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              value={data.client.name}
              onChange={(e) => updateClient({ name: e.target.value })}
              placeholder="Client Name"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Email</label>
            <input
              type="email"
              value={data.client.email}
              onChange={(e) => updateClient({ email: e.target.value })}
              placeholder="client@email.com"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Address</label>
            <textarea
              value={data.client.address}
              onChange={(e) => updateClient({ address: e.target.value })}
              placeholder="Client Address..."
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
