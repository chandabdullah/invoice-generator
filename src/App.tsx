import { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Download, FileText, RefreshCw, Moon, Sun } from 'lucide-react';
import { useInvoiceData } from './hooks/useInvoiceData';
import { InvoiceConfigForm } from './components/Form/InvoiceConfigForm';
import { DetailsForm } from './components/Form/DetailsForm';
import { LineItemsForm } from './components/Form/LineItemsForm';
import { SummaryForm } from './components/Form/SummaryForm';
import { NotesForm } from './components/Form/NotesForm';
import { InvoiceDocument } from './components/PDF/InvoiceDocument';
import type { InvoiceState } from './types';

function InvoiceEditor({ onSync }: { onSync: (state: InvoiceState) => void }) {
  const {
    state,
    updateSender,
    updateClient,
    updateData,
    addItem,
    updateItem,
    removeItem,
    handleLogoUpload,
  } = useInvoiceData();


  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize once
  useEffect(() => {
    onSync(state);

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="w-full lg:w-[45%] lg:h-screen lg:overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950 transition-colors">
      <div className="p-6 md:p-8 lg:p-10 max-w-2xl mx-auto">

        <header className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="text-blue-600 dark:text-blue-400" size={32} />
              NLS Invoice Generator
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Create professional, pro-grade invoices in seconds.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Quick update button for mobile/sticky */}
            <button
              onClick={() => onSync(state)}
              className="lg:hidden bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl shadow-sm"
              title="Update Preview"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </header>

        <InvoiceConfigForm
          data={state}
          updateData={updateData}
          handleLogoUpload={handleLogoUpload}
        />

        <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6 transition-colors">
          <DetailsForm
            data={state}
            updateSender={updateSender}
            updateClient={updateClient}
            updateData={updateData}
          />

          <LineItemsForm
            data={state}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
          />

          <SummaryForm
            data={state}
            updateData={updateData}
          />
        </div>

        {/* Notes / Bank Details */}
        <div className="mb-6">
          <NotesForm data={state} updateData={updateData} />
        </div>

        <div className="flex justify-end sticky bottom-6 z-10">
          <button
            onClick={() => onSync(state)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg border border-blue-700 dark:border-blue-500"
          >
            <RefreshCw size={20} />
            Update Preview
          </button>
        </div>

      </div>
    </div>
  );
}

function App() {
  const [activeState, setActiveState] = useState<InvoiceState | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col lg:flex-row font-sans transition-colors">

      {/* Left Panel: Form */}
      <InvoiceEditor onSync={setActiveState} />

      {/* Right Panel: Live PDF Preview */}
      <div className="w-full lg:w-[55%] flex flex-col h-screen bg-gray-900 dark:bg-black border-t lg:border-t-0 border-gray-800">

        {/* Preview Header / Actions */}
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 text-white shrink-0">
          <div className="font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Preview Document
          </div>

          {activeState && (
            <PDFDownloadLink
              document={<InvoiceDocument state={activeState} />}
              fileName={`${activeState.invoiceNumber || 'invoice'}.pdf`}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              {({ loading }) => (
                <>
                  <Download size={16} />
                  {loading ? 'Generating...' : 'Download PDF'}
                </>
              )}
            </PDFDownloadLink>
          )}
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden p-4 md:p-8 flex items-center justify-center">
          {activeState ? (
            <PDFViewer width="100%" height="100%" className="rounded-xl shadow-2xl border-0 bg-white">
              <InvoiceDocument state={activeState} />
            </PDFViewer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Initializing preview...
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
