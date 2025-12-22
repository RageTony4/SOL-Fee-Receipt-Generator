import React, { useState, useRef, useEffect } from 'react';
import type { ReceiptData, UniversityInfo, UniversityPreset } from './types';
import { universityPresets } from './presets';
import ReceiptForm from './components/ReceiptForm';
import ReceiptPreview from './components/ReceiptPreview';
import { DownloadIcon, SparklesIcon } from './components/Icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const App: React.FC = () => {
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>(universityPresets[0].id);
  const activePreset = universityPresets.find(p => p.id === selectedUniversityId) || universityPresets[0];

  const [receiptData, setReceiptData] = useState<ReceiptData>(activePreset.createInitialData());
  const [universityInfo, setUniversityInfo] = useState<UniversityInfo>(activePreset.info);

  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const admissionYearNum = parseInt(receiptData.admissionYear, 10);
    if (!isNaN(admissionYearNum) && String(admissionYearNum).length === 4) {
        const newGradYear = String(admissionYearNum + activePreset.duration);
        if (newGradYear !== receiptData.graduationYear) {
            setReceiptData(prev => ({ ...prev, graduationYear: newGradYear }));
        }
    }
  }, [receiptData.admissionYear, activePreset.duration, receiptData.graduationYear]);
  
  const handleUniversityChange = (id: string) => {
    const newPreset = universityPresets.find(p => p.id === id);
    if (newPreset) {
        setSelectedUniversityId(id);
        setUniversityInfo(newPreset.info);
        setReceiptData(newPreset.createInitialData());
    }
  };

  const handleDownload = async (format: 'png' | 'pdf') => {
    if (!receiptRef.current) return;
    window.scrollTo(0, 0);

    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
    
    const filename = `receipt_${receiptData.studentId.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;

    if (format === 'png') {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(filename);
    }
  };
  
  const handleGenerateSample = () => {
    setReceiptData(activePreset.createRandomData());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Tuition Fee Receipt Generator
          </h1>
          <p className="text-gray-400 mt-2">Professional receipt generation for global universities.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 h-fit">
            <ReceiptForm 
                receiptData={receiptData}
                setReceiptData={setReceiptData}
                universityInfo={universityInfo}
                setUniversityInfo={setUniversityInfo}
                onGenerateSample={handleGenerateSample}
                selectedUniversityId={selectedUniversityId}
                onUniversityChange={handleUniversityChange}
                universityOptions={universityPresets.map(p => ({ id: p.id, name: p.name }))}
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">Receipt Preview</h2>
              <div className="overflow-auto max-h-[70vh] w-full p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                 <ReceiptPreview 
                    ref={receiptRef} 
                    data={receiptData} 
                    universityInfo={universityInfo} 
                    currency={activePreset.currency}
                    locale={activePreset.locale}
                 />
              </div>
              <div className="mt-8 flex gap-4 flex-wrap justify-center">
                <button onClick={() => handleDownload('png')} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all">
                  <DownloadIcon className="w-5 h-5" /> PNG
                </button>
                <button onClick={() => handleDownload('pdf')} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all">
                  <DownloadIcon className="w-5 h-5" /> PDF
                </button>
              </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;