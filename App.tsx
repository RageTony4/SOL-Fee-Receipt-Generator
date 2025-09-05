
import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { ReceiptData, SchoolInfo } from './types';
import ReceiptForm from './components/ReceiptForm';
import ReceiptPreview from './components/ReceiptPreview';
import { DownloadIcon } from './components/Icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- Utility Functions ---

const generateRandomNumberString = (length: number): string => {
    return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

const modifyNumericId = (originalId: string, digitsToChange: number): string => {
    if (originalId.length <= digitsToChange) {
        return generateRandomNumberString(originalId.length);
    }
    const prefix = originalId.slice(0, -digitsToChange);
    const newSuffix = generateRandomNumberString(digitsToChange);
    return `${prefix}${newSuffix}`;
}

const generateRecentDate = (): Date => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - Math.floor(Math.random() * 90));
    return pastDate;
}

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const formatDateOfBirth = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


const generateRandomDOB = (): string => {
    const year = Math.random() > 0.5 ? 2004 : 2005;
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;
    return formatDateOfBirth(new Date(year, month, day));
}

const generateRandomPhone = (): string => {
    return `${Math.floor(Math.random() * 4) + 6}${generateRandomNumberString(9)}`;
}

// --- Data for Random Student Generation ---
const firstNames = ['Amit', 'Sunita', 'Rajesh', 'Priya', 'Vikram', 'Anjali', 'Sanjay', 'Pooja', 'Deepak', 'Neha', 'Rohan', 'Kavita'];
const femaleFirstNames = ['Sunita', 'Priya', 'Anjali', 'Pooja', 'Neha', 'Kavita', 'Meena', 'Rani', 'Sita', 'Gita'];
const lastNames = ['Sharma', 'Gupta', 'Singh', 'Kumar', 'Verma', 'Patel', 'Jain', 'Mehta', 'Chauhan', 'Yadav', 'Malhotra', 'Kapoor'];
const streetNames = ['Gandhi Marg', 'Nehru Road', 'Patel Nagar', 'Shastri Park', 'Lajpat Nagar', 'Subhash Galli', 'Azad Lane'];
const localities = ['Karol Bagh', 'Chandni Chowk', 'Connaught Place', 'Mayur Vihar', 'Dwarka', 'Rohini', 'Saket'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateRandomName = (isFemale: boolean = false): string => {
    const namePool = isFemale ? femaleFirstNames : firstNames;
    return `${getRandomElement(namePool)} ${getRandomElement(lastNames)}`;
};

const generateRandomAddress = (): string => {
    const houseNo = `H.No. ${Math.floor(Math.random() * 200) + 1}`;
    const street = getRandomElement(streetNames);
    const locality = getRandomElement(localities);
    const pinCode = `1100${Math.floor(Math.random() * 90) + 10}`;
    return `${houseNo}, ${street}, ${locality}, DELHI - ${pinCode}`;
};


const createInitialReceiptData = (): ReceiptData => {
    const recentDate = formatDate(generateRecentDate());
    const isMale = Math.random() > 0.5;
    return {
        barcodeNo: modifyNumericId('565823', 4),
        receiptNo: modifyNumericId('25-06-876823', 5),
        course: 'B.Com. - I',
        medium: 'English',
        user: modifyNumericId('200982', 3),
        sex: isMale ? 'Male' : 'Female',
        date: recentDate,
        solRollNo: `25-6-02-${generateRandomNumberString(6)}`,
        examCentre: 'DELHI (WEST Zone)',
        dateOfBirth: generateRandomDOB(),
        subjectOffered: 'Part I: BUSINESS ORGANISATION AND MANAGEMENT (A101);FINANCIAL ACCOUNTING (A102);BUSINESS AND INDUSTRIAL LAWS (A103);ECONOMICS PAPER1 PRINCIPLE OF ECONOMICS (A104);HINDI-B (A108)',
        payMode: 'DD',
        refNo: modifyNumericId('345266734', 5),
        dateOfIssue: recentDate,
        bank: 'SBI-DD-DU',
        amount: '3465',
        amountInWords: '(Rupees Three Thousand Four Hundred Sixty-Five And Zero Paise Only)',
        // User-provided fields
        name: generateRandomName(!isMale),
        fatherName: generateRandomName(false),
        motherName: generateRandomName(true),
        mailingAddress: generateRandomAddress(),
        emailId: 'firstname25602048878@sol.du.ac.in',
        phoneNo: generateRandomPhone(),
        barcodeImage: null,
    };
};


const App: React.FC = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData>(createInitialReceiptData());
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
      name: 'School of Open Learning',
      address1: '(Campus of Open Learning)',
      address2: 'University of Delhi',
      address3: 'Delhi-110007',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/University_of_Delhi.svg/1200px-University_of_Delhi.svg.png',
  });

  const receiptRef = useRef<HTMLDivElement>(null);

  const handleRandomize = useCallback(() => {
    const freshData = createInitialReceiptData();
    // Keep user-entered text fields, but randomize numbers and dates
    setReceiptData(prev => ({
        ...prev,
        barcodeNo: freshData.barcodeNo,
        receiptNo: freshData.receiptNo,
        user: freshData.user,
        date: freshData.date,
        solRollNo: freshData.solRollNo,
        dateOfBirth: freshData.dateOfBirth,
        refNo: freshData.refNo,
        dateOfIssue: freshData.dateOfIssue,
        phoneNo: freshData.phoneNo,
        barcodeImage: null, // Clear uploaded barcode on randomize
    }));
  }, []);

  const handleRandomizeStudentDetails = useCallback(() => {
      const isMale = Math.random() > 0.5;
      setReceiptData(prev => ({
          ...prev,
          name: generateRandomName(!isMale),
          fatherName: generateRandomName(false),
          motherName: generateRandomName(true),
          mailingAddress: generateRandomAddress(),
          sex: isMale ? 'Male' : 'Female',
      }))
  }, []);

  useEffect(() => {
    // Effect to update derived fields like email
    const nameParts = receiptData.name.split(' ');
    const firstName = nameParts[0]?.toLowerCase() || 'student';
    const cleanRollNo = receiptData.solRollNo.replace(/-/g, '');
    const newEmail = `${firstName}${cleanRollNo}@sol.du.ac.in`;
    
    if (newEmail !== receiptData.emailId) {
        setReceiptData(prev => ({ ...prev, emailId: newEmail }));
    }
  }, [receiptData.name, receiptData.solRollNo]);


  const handleDownload = async (format: 'png' | 'pdf') => {
    if (!receiptRef.current) return;
    
    window.scrollTo(0, 0);

    // FIX: The 'letterRendering' property is not a valid option for html2canvas and has been removed.
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const filename = `${receiptData.solRollNo}.${format}`;

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


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Fee Receipt Generator
          </h1>
          <p className="text-gray-400 mt-2">
            Customize the details below to generate a new fee receipt.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <ReceiptForm 
                receiptData={receiptData}
                setReceiptData={setReceiptData}
                schoolInfo={schoolInfo}
                setSchoolInfo={setSchoolInfo}
                onRandomize={handleRandomize}
                onRandomizeStudentDetails={handleRandomizeStudentDetails}
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center justify-start">
              <h2 className="text-2xl font-bold mb-4 text-center">Receipt Preview</h2>
              <div className="overflow-auto max-h-[calc(100vh-250px)] w-full p-2 bg-gray-700/50 rounded-md">
                 <ReceiptPreview ref={receiptRef} data={receiptData} schoolInfo={schoolInfo} />
              </div>
              <div className="mt-6 flex justify-center gap-4">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
