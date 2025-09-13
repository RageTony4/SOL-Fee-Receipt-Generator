
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
const streetNames = ['Main Road', 'Knowledge Park Road', 'Surajpur-Kasna Road', 'Yamuna Expressway Service Road'];
const localities = ['Alpha Commercial Belt', 'Knowledge Park II', 'Sector 18', 'Sector 62', 'Pari Chowk'];
const pinCodes = ['201306', '201308', '201310'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateRandomName = (isFemale: boolean = false): string => {
    const namePool = isFemale ? femaleFirstNames : firstNames;
    return `${getRandomElement(namePool)} ${getRandomElement(lastNames)}`;
};

const generateRandomAddress = (): string => {
    const houseNo = `H.No. ${Math.floor(Math.random() * 200) + 1}`;
    const street = getRandomElement(streetNames);
    const locality = getRandomElement(localities);
    const pinCode = getRandomElement(pinCodes);
    return `${houseNo}, ${street}, ${locality}, GREATER NOIDA - ${pinCode}`;
};

const lawCourses = ['B.A. LL.B. - 1st Year', 'B.A. LL.B. - 2nd Year', 'B.A. LL.B. - 3rd Year', 'LL.B. - 1st Year', 'LL.B. - 2nd Year'];

const createInitialReceiptData = (): ReceiptData => {
    const recentDate = formatDate(generateRecentDate());
    const isMale = Math.random() > 0.5;
    const currentYear = new Date().getFullYear();
    return {
        barcodeNo: modifyNumericId('789123', 4),
        receiptNo: `LLC/${currentYear}/${generateRandomNumberString(6)}`,
        course: getRandomElement(lawCourses),
        medium: 'English',
        user: modifyNumericId('202382', 3),
        sex: isMale ? 'Male' : 'Female',
        date: recentDate,
        enrollmentNo: `LLC${generateRandomNumberString(7)}`,
        campus: 'Greater Noida Campus',
        dateOfBirth: generateRandomDOB(),
        subjectOffered: 'Part I: CONSTITUTIONAL LAW; LAW OF TORTS; CONTRACT LAW; LEGAL METHODS; POLITICAL SCIENCE',
        payMode: 'Online Transfer',
        refNo: modifyNumericId('456123789', 5),
        dateOfIssue: recentDate,
        bank: 'HDFC Bank',
        amount: '185500',
        amountInWords: '(Rupees One Lakh Eighty-Five Thousand Five Hundred And Zero Paise Only)',
        // User-provided fields
        name: generateRandomName(!isMale),
        fatherName: generateRandomName(false),
        motherName: generateRandomName(true),
        mailingAddress: generateRandomAddress(),
        emailId: 'student.placeholder@lloydlawcollege.edu.in',
        phoneNo: generateRandomPhone(),
        barcodeImage: null,
    };
};


const App: React.FC = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData>(createInitialReceiptData());
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
      name: 'Lloyd Law College',
      address1: 'Plot No. 11, Knowledge Park-II',
      address2: 'Greater Noida, Uttar Pradesh',
      address3: 'Pin: 201306',
      logo: 'https://www.lloydlawcollege.edu.in/images/lloyd-law-college-logo.png',
      affiliation: 'Affiliated to Chaudhary Charan Singh University, Meerut',
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
        enrollmentNo: freshData.enrollmentNo,
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
    const cleanEnrollmentNo = receiptData.enrollmentNo.replace(/-/g, '');
    const newEmail = `${firstName}.${cleanEnrollmentNo}@lloydlawcollege.edu.in`;
    
    if (newEmail !== receiptData.emailId) {
        setReceiptData(prev => ({ ...prev, emailId: newEmail }));
    }
  }, [receiptData.name, receiptData.enrollmentNo]);


  const handleDownload = async (format: 'png' | 'pdf') => {
    if (!receiptRef.current) return;
    
    window.scrollTo(0, 0);

    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const filename = `${receiptData.enrollmentNo}.${format}`;

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
