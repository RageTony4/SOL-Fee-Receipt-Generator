import React, { useState, useRef, useEffect } from 'react';
import type { ReceiptData, UniversityInfo, VerificationResult } from './types.ts';
import ReceiptForm from './components/ReceiptForm.tsx';
import ReceiptPreview from './components/ReceiptPreview.tsx';
import VerificationResults from './components/VerificationResults.tsx';
import { DownloadIcon, SparklesIcon, LoaderIcon } from './components/Icons.tsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { verifyReceipt } from './services/geminiService.ts';
import { universityPresets } from './presets.ts';

const App: React.FC = () => {
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>(universityPresets[0].id);
  
  const activePreset = universityPresets.find(p => p.id === selectedUniversityId) || universityPresets[0];

  const [receiptData, setReceiptData] = useState<ReceiptData>(activePreset.createInitialData());
  const [universityInfo, setUniversityInfo] = useState<UniversityInfo>(activePreset.info);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const receiptRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.45);

  useEffect(() => {
    if (!previewContainerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        // A4 is 210mm wide. We want to fit it into the container width with some padding.
        // 210mm is roughly 794px at 96dpi.
        const targetWidth = 794;
        const padding = 64; // p-8 on both sides
        const availableWidth = width - padding;
        const newScale = Math.min(availableWidth / targetWidth, 0.8); // Cap at 0.8 for quality
        setPreviewScale(newScale);
      }
    });

    resizeObserver.observe(previewContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const admissionYearNum = parseInt(receiptData.admissionYear, 10);
    if (!isNaN(admissionYearNum) && String(admissionYearNum).length === 4) {
        const programDuration = activePreset.duration || 4;
        const newGradYear = String(admissionYearNum + programDuration);
        if (newGradYear !== receiptData.graduationYear) {
            setReceiptData(prev => ({ ...prev, graduationYear: newGradYear }));
        }
    }
  }, [receiptData.admissionYear, activePreset.duration]);
  
  const handleUniversityChange = (id: string) => {
    const newPreset = universityPresets.find(p => p.id === id);
    if (newPreset) {
        setSelectedUniversityId(id);
        setUniversityInfo(newPreset.info);
        setReceiptData(newPreset.createInitialData());
        setVerificationResult(null);
        setVerificationError(null);
    }
  };

  const handleDownload = async (format: 'png' | 'pdf') => {
    const element = downloadRef.current;
    if (!element) return;
    
    // Ensure fonts are loaded and layout is stable
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for better print quality
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: true,
      windowWidth: 1200, // Force a wider viewport for the clone to ensure layout stability
    });
    
    const cleanedStudentId = receiptData.studentId.replace(/[^a-zA-Z0-9]/g, '_');
    const firstName = receiptData.studentName.split(' ')[0]?.toLowerCase() || 'student';
    const filename = `receipt_${cleanedStudentId}_${firstName}.${format}`;

    if (format === 'png') {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(filename);
    }
  };
  
  const handleGenerateSample = () => {
    setReceiptData(activePreset.createRandomData());
    setVerificationResult(null);
    setVerificationError(null);
  };
  
  const handleVerify = async () => {
    const element = downloadRef.current;
    if (!element) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    setVerificationError(null);

    try {
        const canvas = await html2canvas(element, {
            scale: 1.5,
            useCORS: true,
            backgroundColor: '#ffffff',
        });
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const base64Data = dataUrl.split(',')[1];

        const result = await verifyReceipt(base64Data);
        setVerificationResult(result);

    } catch (error) {
        console.error("Verification failed:", error);
        setVerificationError("Sorry, the AI verification failed. Please try again.");
    } finally {
        setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-10 px-4">
      {/* Hidden high-quality capture container */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none opacity-0 overflow-hidden">
        <ReceiptPreview 
            ref={downloadRef} 
            data={receiptData} 
            universityInfo={universityInfo} 
            currency={activePreset.currency as any}
            locale={activePreset.locale as any}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Tuition Fee Receipt Generator
          </h1>
          <p className="text-gray-400 mt-2">
            Select a university and customize the details to generate a professional tuition fee receipt.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
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

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center justify-start overflow-hidden">
              <h2 className="text-2xl font-bold mb-4 text-center">Receipt Preview</h2>
              <div ref={previewContainerRef} className="relative w-full flex-grow bg-gray-900/50 rounded-xl border border-gray-700 overflow-y-auto flex items-start justify-center p-8 min-h-[600px] max-h-[850px]">
                 {/* Scaling wrapper to fit A4 (210mm wide) into the UI */}
                 <div style={{ width: `calc(210mm * ${previewScale})`, height: `calc(297mm * ${previewScale})` }}>
                    <div className="origin-top-left transition-transform duration-300 ease-in-out" style={{ transform: `scale(${previewScale})` }}>
                        <div className="shadow-2xl">
                            <ReceiptPreview 
                                ref={receiptRef} 
                                data={receiptData} 
                                universityInfo={universityInfo} 
                                currency={activePreset.currency as any}
                                locale={activePreset.locale as any}
                            />
                        </div>
                    </div>
                 </div>
                 
                 <div className="absolute bottom-4 right-4 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-gray-400 border border-gray-700 pointer-events-none">
                    Preview Scale: {Math.round(previewScale * 100)}%
                 </div>
              </div>
              <div className="mt-8 flex justify-center items-center gap-4 flex-wrap w-full">
                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
                >
                    {isVerifying ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <SparklesIcon className="w-5 h-5" />}
                    Verify with AI
                </button>
                <button
                  onClick={() => handleDownload('png')}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download PNG
                </button>
                <button
                  onClick={() => handleDownload('pdf')}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
              <div className="mt-6 w-full max-w-2xl mx-auto">
                <VerificationResults result={verificationResult} error={verificationError} />
              </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;