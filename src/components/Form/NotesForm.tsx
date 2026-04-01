import React, { useState } from 'react';
import { StickyNote, ChevronDown, ChevronUp, Landmark } from 'lucide-react';
import type { InvoiceData } from '../../types';

interface Props {
  data: InvoiceData;
  updateData: (updates: Partial<InvoiceData>) => void;
  onSync?: () => void;
}

export const NotesForm: React.FC<Props> = ({ data, updateData, onSync }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all bg-white dark:bg-gray-900 shadow-sm">
      {/* Toggle header */}
      <button
        id="notes-panel-toggle"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
            <StickyNote size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white leading-none">
              Notes &amp; Bank Details
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Payment instructions, bank info, T&amp;Cs…
            </p>
          </div>
          {data.notes && !open && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
              Added
            </span>
          )}
        </div>
        <span className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {/* Collapsible body */}
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-gray-800">
          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              {
                label: '🏦 Bank Transfer',
                icon: <Landmark size={12} />,
                text: 'Bank: ACME Bank\nAccount Name: Your Company Ltd\nAccount No: 1234-5678\nSort Code / IBAN: XX-XX-XX\nReference: {invoice number}',
              },
              {
                label: '💳 PayPal',
                icon: null,
                text: 'Please send payment via PayPal to:\npayments@yourcompany.com\nReference: {invoice number}',
              },
              {
                label: '📄 Terms',
                icon: null,
                text: 'Payment is due within 30 days of invoice date.\nLate payments may incur a 1.5% monthly fee.\nThank you for your business!',
              },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => { updateData({ notes: preset.text }); setTimeout(() => onSync?.(), 0); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <textarea
            id="invoice-notes"
            rows={6}
            placeholder="e.g. Bank: ACME Bank | Account No: 1234-5678 | Sort Code: 01-02-03&#10;Payment due within 30 days."
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            onBlur={() => onSync?.()}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition-colors placeholder-gray-400 dark:placeholder-gray-600 font-mono leading-relaxed"
          />
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1.5">
            This text will appear at the bottom of your invoice PDF. Preview auto-updates when you finish typing.
          </p>
        </div>
      )}
    </div>
  );
};
