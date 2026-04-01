import React from 'react';
import { Upload } from 'lucide-react';
import type { InvoiceData, CurrencyType, TemplateType } from '../../types';

interface Props {
  data: InvoiceData;
  updateData: (updates: Partial<InvoiceData>) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type TemplateMeta = {
  id: TemplateType;
  label: string;
  desc: string;
  /** CSS classes for the mini swatch */
  accent: string;
  dots: string; // bg class for stripe/swatch
};

const templates: TemplateMeta[] = [
  {
    id: 'modern',
    label: 'Modern',
    desc: 'Clean & colorful',
    accent: 'bg-blue-600',
    dots: 'bg-blue-100',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    desc: 'Pure simplicity',
    accent: 'bg-gray-900',
    dots: 'bg-gray-100',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    desc: 'Bold & structured',
    accent: 'bg-indigo-700',
    dots: 'bg-indigo-100',
  },
  {
    id: 'elegant',
    label: 'Elegant',
    desc: 'Refined centred',
    accent: 'bg-amber-500',
    dots: 'bg-amber-50',
  },
  {
    id: 'bold',
    label: 'Bold',
    desc: 'Full-bleed header',
    accent: 'bg-rose-600',
    dots: 'bg-rose-100',
  },
  {
    id: 'slate',
    label: 'Slate',
    desc: 'Dark sidebar',
    accent: 'bg-slate-800',
    dots: 'bg-slate-200',
  },
  {
    id: 'neon',
    label: 'Neon',
    desc: 'Dark & vivid',
    accent: 'from-violet-600 to-fuchsia-500 bg-gradient-to-r',
    dots: 'bg-violet-100',
  },
  {
    id: 'classic',
    label: 'Classic',
    desc: 'Ledger style',
    accent: 'bg-emerald-700',
    dots: 'bg-emerald-50',
  },
];

export const InvoiceConfigForm: React.FC<Props> = ({ data, updateData, handleLogoUpload }) => {
  const currencies: CurrencyType[] = ['USD', 'EUR', 'GBP'];

  return (
    <div className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6 transition-colors">

      {/* Template Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Template Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {templates.map((t) => {
            const active = data.template === t.id;
            return (
              <button
                key={t.id}
                onClick={() => updateData({ template: t.id })}
                className={`relative flex flex-col items-start p-3 rounded-xl border-2 transition-all text-left group
                  ${active
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'
                  }`}
              >
                {/* Mini swatch */}
                <span className={`w-full h-2 rounded-full mb-2 ${t.accent}`} />
                <span className={`text-xs font-bold ${active ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'}`}>
                  {t.label}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5">
                  {t.desc}
                </span>
                {active && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors">

        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
          <select
            value={data.currency}
            onChange={(e) => updateData({ currency: e.target.value as CurrencyType })}
            className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border transition-colors"
          >
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Brand Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.brandColor}
              onChange={(e) => updateData({ brandColor: e.target.value })}
              className="h-10 w-14 rounded cursor-pointer border-0 p-0"
            />
            <span className="text-gray-500 dark:text-gray-400 text-sm font-mono uppercase">{data.brandColor}</span>
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Logo</label>
          <div className="flex items-center gap-4">
            {data.logo ? (
              <div className="relative group">
                <img src={data.logo} alt="Logo preview" className="h-12 w-auto object-contain bg-gray-50 dark:bg-white rounded p-1" />
                <button
                  onClick={() => updateData({ logo: null })}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <label className="flex justify-center w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Upload size={16} />
                    <span>Upload Logo</span>
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
