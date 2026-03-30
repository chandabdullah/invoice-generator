import { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Download, FileText, RefreshCw } from 'lucide-react';
import { useInvoiceData } from './hooks/useInvoiceData';
import { InvoiceConfigForm } from './components/Form/InvoiceConfigForm';
import { DetailsForm } from './components/Form/DetailsForm';
import { LineItemsForm } from './components/Form/LineItemsForm';
import { SummaryForm } from './components/Form/SummaryForm';
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

  // Initialize once
  useEffect(() => {
    onSync(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full lg:w-[45%] lg:h-screen lg:overflow-y-auto border-r border-gray-200 bg-gray-50/50">
      <div className="p-6 md:p-8 lg:p-10 max-w-2xl mx-auto">
        
        <header className="mb-8 pb-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="text-indigo-600" size={32} />
              NLS Invoice Generator
            </h1>
            <p className="text-gray-500 mt-2">Create professional, pro-grade invoices in seconds.</p>
          </div>
          {/* Quick update button for mobile/sticky */}
          <button
            onClick={() => onSync(state)}
            className="lg:hidden bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg shadow-sm"
            title="Update Preview"
          >
            <RefreshCw size={20} />
          </button>
        </header>

        <InvoiceConfigForm
          data={state}
          updateData={updateData}
          handleLogoUpload={handleLogoUpload}
        />

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-6">
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

        <div className="flex justify-end sticky bottom-6 z-10">
          <button
            onClick={() => onSync(state)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg border border-indigo-700"
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
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
      
      {/* Left Panel: Form */}
      <InvoiceEditor onSync={setActiveState} />

      {/* Right Panel: Live PDF Preview */}
      <div className="w-full lg:w-[55%] flex flex-col h-screen bg-gray-900 border-t lg:border-t-0 border-gray-800">
        
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
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
        <div className="flex-1 overflow-hidden p-4 md:p-8">
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
