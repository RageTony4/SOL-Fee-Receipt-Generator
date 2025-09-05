
import React from 'react';
import type { ReceiptData, SchoolInfo } from '../types';
import { UploadIcon } from './Icons';

interface ReceiptFormProps {
  receiptData: ReceiptData;
  setReceiptData: React.Dispatch<React.SetStateAction<ReceiptData>>;
  schoolInfo: SchoolInfo;
  setSchoolInfo: React.Dispatch<React.SetStateAction<SchoolInfo>>;
  onRandomize: () => void;
  onRandomizeStudentDetails: () => void;
}

const ReceiptForm: React.FC<ReceiptFormProps> = ({ receiptData, setReceiptData, schoolInfo, setSchoolInfo, onRandomize, onRandomizeStudentDetails }) => {
  
  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReceiptData(prev => ({ ...prev, [name]: value }));
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchoolInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSchoolInfo(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleBarcodeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptData(prev => ({ ...prev, barcodeImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };


  const InputField: React.FC<{ name: keyof ReceiptData, label: string }> = ({ name, label }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <input 
            type="text" 
            id={name} 
            name={name} 
            value={receiptData[name]} 
            onChange={handleReceiptChange} 
            className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500"
        />
    </div>
  );

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      
      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">School Details</legend>
        <div className="space-y-4">
            <div>
                 <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-400 mb-1">School Logo</label>
                 <label htmlFor="logo-upload" className="relative flex items-center gap-4 w-full p-2 text-center border rounded-lg cursor-pointer border-gray-600 hover:border-indigo-500 bg-gray-700/50">
                    <img src={schoolInfo.logo} alt="School Logo" className="w-10 h-10 object-contain bg-white rounded-full p-1"/>
                    <span className="text-sm text-gray-300">Click to upload new logo</span>
                    <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={handleLogoChange} accept="image/*" />
                 </label>
            </div>
            <div>
                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-400 mb-1">School Name</label>
                <input type="text" id="schoolName" name="name" value={schoolInfo.name} onChange={handleSchoolChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                 <input type="text" name="address1" placeholder="Address Line 1" value={schoolInfo.address1} onChange={handleSchoolChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500" />
                 <input type="text" name="address2" placeholder="Address Line 2" value={schoolInfo.address2} onChange={handleSchoolChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500" />
                 <input type="text" name="address3" placeholder="Address Line 3" value={schoolInfo.address3} onChange={handleSchoolChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500" />
            </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">Student Details</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField name="name" label="Full Name" />
            <InputField name="fatherName" label="Father's Name" />
            <InputField name="motherName" label="Mother's Name" />
            <InputField name="sex" label="Sex" />
            <div className="sm:col-span-2">
                <label htmlFor="mailingAddress" className="block text-sm font-medium text-gray-400 mb-1">Mailing Address</label>
                <textarea id="mailingAddress" name="mailingAddress" value={receiptData.mailingAddress} onChange={handleReceiptChange} rows={3} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500"></textarea>
            </div>
        </div>
         <div className="mt-4">
            <button
                type="button"
                onClick={onRandomizeStudentDetails}
                className="w-full py-2 font-semibold text-white transition duration-300 rounded-lg bg-teal-600 hover:bg-teal-700"
            >
                Generate Random Student
            </button>
        </div>
      </fieldset>
      
      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">Receipt Numbers & Dates</legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <InputField name="barcodeNo" label="Barcode No." />
            <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Barcode Image (Optional)</label>
                <div className="flex items-center gap-2">
                    <label htmlFor="barcode-upload" className="relative flex items-center gap-2 flex-grow p-2 text-center border rounded-lg cursor-pointer border-gray-600 hover:border-indigo-500 bg-gray-700/50">
                        {receiptData.barcodeImage ? (
                            <img src={receiptData.barcodeImage} alt="Barcode Preview" className="w-auto h-8 object-contain bg-white p-1 rounded"/>
                        ) : (
                            <UploadIcon className="w-6 h-6 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-300">
                            {receiptData.barcodeImage ? 'Change barcode image' : 'Upload custom barcode'}
                        </span>
                        <input id="barcode-upload" name="barcode-upload" type="file" className="sr-only" onChange={handleBarcodeImageChange} accept="image/*" />
                    </label>
                    {receiptData.barcodeImage && (
                        <button
                            type="button"
                            onClick={() => setReceiptData(prev => ({...prev, barcodeImage: null}))}
                            className="p-2 text-gray-400 bg-gray-700 rounded-lg hover:bg-red-800 hover:text-white transition-colors"
                            aria-label="Clear barcode image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            <InputField name="receiptNo" label="Receipt No." />
            <InputField name="solRollNo" label="SOL Roll No." />
            <InputField name="refNo" label="Reference No." />
            <InputField name="dateOfBirth" label="Date of Birth" />
            <InputField name="date" label="Receipt Date" />
            <InputField name="phoneNo" label="Phone No." />
        </div>
        <div className="mt-4">
            <button
                type="button"
                onClick={onRandomize}
                className="w-full py-2 font-semibold text-white transition duration-300 rounded-lg bg-purple-600 hover:bg-purple-700"
            >
                Randomize Numbers & Dates
            </button>
        </div>
      </fieldset>

    </form>
  );
};

export default ReceiptForm;
