import React from 'react';
import { Upload } from 'lucide-react';
import type { InvoiceData, CurrencyType, TemplateType } from '../../types';

interface Props {
  data: InvoiceData;
  updateData: (updates: Partial<InvoiceData>) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InvoiceConfigForm: React.FC<Props> = ({ data, updateData, handleLogoUpload }) => {
  const currencies: CurrencyType[] = ['USD', 'EUR', 'GBP'];
  const templates: { id: TemplateType; label: string }[] = [
    { id: 'minimal', label: 'Minimal' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'modern', label: 'Modern' },
    { id: 'elegant', label: 'Elegant' },
    { id: 'bold', label: 'Bold' },
  ];

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        
        {/* Template Selection */}
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => updateData({ template: t.id })}
                className={`flex-1 min-w-[30%] py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  data.template === t.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selection */}
        <div className="w-full sm:w-32">
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={data.currency}
            onChange={(e) => updateData({ currency: e.target.value as CurrencyType })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white"
          >
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        
        {/* Brand Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.brandColor}
              onChange={(e) => updateData({ brandColor: e.target.value })}
              className="h-10 w-14 rounded cursor-pointer border-0 p-0"
            />
            <span className="text-gray-500 text-sm font-mono uppercase">{data.brandColor}</span>
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
          <div className="flex items-center gap-4">
            {data.logo ? (
              <div className="relative group">
                <img src={data.logo} alt="Logo preview" className="h-12 w-auto object-contain bg-gray-50 rounded" />
                <button 
                  onClick={() => updateData({ logo: null })}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <label className="flex justify-center w-full px-4 py-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Upload size={16} />
                    <span>Upload Logo Image</span>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </label>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
