import React, { useState } from 'react';
import type { ReceiptData, UniversityInfo, ChargeItem, PaymentItem } from '../types';
import { SparklesIcon, ClipboardIcon, ClipboardCheckIcon } from './Icons';

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; endAdornment?: React.ReactNode }> = ({ label, id, endAdornment, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    <div className="relative">
        <input
        id={id}
        {...props}
        className={`bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500 disabled:bg-gray-800 disabled:cursor-not-allowed ${endAdornment ? 'pr-10' : ''}`}
        />
        {endAdornment && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {endAdornment}
            </div>
        )}
    </div>
  </div>
);

const TextAreaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <textarea
        id={id}
        {...props}
        className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500"
      />
    </div>
  );

interface ReceiptFormProps {
  receiptData: ReceiptData;
  setReceiptData: React.Dispatch<React.SetStateAction<ReceiptData>>;
  universityInfo: UniversityInfo;
  setUniversityInfo: React.Dispatch<React.SetStateAction<UniversityInfo>>;
  onGenerateSample: () => void;
  selectedUniversityId: string;
  onUniversityChange: (id: string) => void;
  universityOptions: { id: string, name: string }[];
}

const ReceiptForm: React.FC<ReceiptFormProps> = ({ 
    receiptData, 
    setReceiptData, 
    universityInfo, 
    setUniversityInfo, 
    onGenerateSample,
    selectedUniversityId,
    onUniversityChange,
    universityOptions
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (textToCopy: string, fieldName: string) => {
    if (!navigator.clipboard || !textToCopy) {
        return;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedField(fieldName);
        setTimeout(() => {
            setCopiedField(null);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReceiptData(prev => ({ ...prev, [name]: value as any }));
  };
  
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiptData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUniversityInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUniversityInfo(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  function handleItemChange(index: number, field: keyof ChargeItem, value: string | number, itemType: 'charges'): void;
  function handleItemChange(index: number, field: keyof PaymentItem, value: string | number, itemType: 'payments'): void;
  function handleItemChange(
    index: number, 
    field: keyof ChargeItem | keyof PaymentItem, 
    value: string | number, 
    itemType: 'charges' | 'payments'
  ) {
    setReceiptData(prev => {
        if (itemType === 'charges') {
            const items = [...prev.charges];
            items[index] = { ...items[index], [field as keyof ChargeItem]: value };
            return { ...prev, charges: items };
        } else {
            const items = [...prev.payments];
            items[index] = { ...items[index], [field as keyof PaymentItem]: value };
            return { ...prev, payments: items };
        }
    });
  };

  const addItem = (itemType: 'charges' | 'payments') => {
      if (itemType === 'charges') {
          const newCharge: ChargeItem = { description: '', quantity: 1, unit: 'flat rate', unitCost: 0 };
          setReceiptData(prev => ({ ...prev, charges: [...prev.charges, newCharge] }));
      } else {
          const newPayment: PaymentItem = { description: '', date: new Date().toISOString().split('T')[0], amount: 0 };
          setReceiptData(prev => ({ ...prev, payments: [...prev.payments, newPayment] }));
      }
  };
  
  const removeItem = (index: number, itemType: 'charges' | 'payments') => {
      setReceiptData(prev => ({
          ...prev,
          [itemType]: prev[itemType].filter((_, i) => i !== index),
      }));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      
      <div className="space-y-4">
        <div>
            <label htmlFor="university-select" className="block text-sm font-medium text-gray-400 mb-1">Select University Template</label>
            <select
                id="university-select"
                value={selectedUniversityId}
                onChange={(e) => onUniversityChange(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded-lg w-full text-base transition-colors focus:outline-none focus:border-indigo-500"
                aria-label="Select University Template"
            >
                {universityOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
        <button
          type="button"
          onClick={onGenerateSample}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          aria-label="Generate Sample Data"
        >
          <SparklesIcon className="w-5 h-5" />
          Generate New Sample Data
        </button>
      </div>
      
      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">University Details</legend>
        <div className="space-y-4">
            <div>
                 <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-400 mb-1">University Logo</label>
                 <label htmlFor="logo-upload" className="relative flex items-center gap-4 w-full p-2 text-center border rounded-lg cursor-pointer border-gray-600 hover:border-indigo-500 bg-gray-700/50">
                    <img src={universityInfo.logo} alt="University Logo" className="w-10 h-10 object-contain bg-white rounded-full p-1"/>
                    <span className="text-sm text-gray-300">Click to upload new logo</span>
                    <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={handleLogoChange} accept="image/*" />
                 </label>
            </div>
            <InputField label="University Name" id="uniName" name="name" value={universityInfo.name} onChange={handleUniversityChange} />
            <InputField label="Online Program Director" id="onlineProgramDirector" name="onlineProgramDirector" value={universityInfo.onlineProgramDirector} onChange={handleUniversityChange} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                 <input type="text" name="address1" placeholder="Address Line 1" value={universityInfo.address1} onChange={handleUniversityChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500" />
                 <input type="text" name="address2" placeholder="Address Line 2" value={universityInfo.address2} onChange={handleUniversityChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500" />
                 <input type="text" name="address3" placeholder="Address Line 3" value={universityInfo.address3} onChange={handleUniversityChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500" />
            </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">Student Information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField 
                label="Full Name" 
                id="studentName" 
                name="studentName" 
                value={receiptData.studentName} 
                onChange={handleReceiptChange}
                endAdornment={
                    <button
                        type="button"
                        onClick={() => handleCopy(receiptData.studentName, 'studentName')}
                        className="text-gray-400 hover:text-white focus:outline-none"
                        aria-label="Copy full name"
                    >
                        {copiedField === 'studentName' 
                            ? <ClipboardCheckIcon className="w-5 h-5 text-green-400" /> 
                            : <ClipboardIcon className="w-5 h-5" />}
                    </button>
                } 
            />
            <InputField label="Reg No" id="studentId" name="studentId" value={receiptData.studentId} onChange={handleReceiptChange} />
            <InputField label="Programme" id="programOfStudy" name="programOfStudy" value={receiptData.programOfStudy} onChange={handleReceiptChange} />
            <InputField label="Department" id="department" name="department" value={receiptData.department} onChange={handleReceiptChange} />
            <InputField label="School/Faculty" id="schoolFaculty" name="schoolFaculty" value={receiptData.schoolFaculty} onChange={handleReceiptChange} />
            <InputField label="Admission Year" id="admissionYear" name="admissionYear" value={receiptData.admissionYear} onChange={handleReceiptChange} type="number" pattern="\d{4}" />
            <InputField label="Graduation Year (Est.)" id="graduationYear" name="graduationYear" value={receiptData.graduationYear} readOnly disabled />
            <InputField label="Year of Study" id="yearOfStudy" name="yearOfStudy" value={receiptData.yearOfStudy} onChange={handleReceiptChange} />
            <InputField label="Course Start Date" id="courseStartDate" name="courseStartDate" type="date" value={receiptData.courseStartDate} onChange={handleReceiptChange} />
            <InputField 
                label="Email ID" 
                id="emailId" 
                name="emailId" 
                type="email" 
                value={receiptData.emailId} 
                onChange={handleReceiptChange}
                endAdornment={
                    <button
                        type="button"
                        onClick={() => handleCopy(receiptData.emailId, 'emailId')}
                        className="text-gray-400 hover:text-white focus:outline-none"
                        aria-label="Copy email ID"
                    >
                        {copiedField === 'emailId' 
                            ? <ClipboardCheckIcon className="w-5 h-5 text-green-400" /> 
                            : <ClipboardIcon className="w-5 h-5" />}
                    </button>
                } 
            />
             <div>
              <label htmlFor="learningModality" className="block text-sm font-medium text-gray-400 mb-1">Learning Modality</label>
              <select
                id="learningModality"
                name="learningModality"
                value={receiptData.learningModality}
                onChange={handleReceiptChange}
                className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm transition-colors focus:outline-none focus:border-indigo-500 h-[42px]"
              >
                <option value="Online/Remote">Online/Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>
            <div className="sm:col-span-2">
                <InputField label="Previous Balance" id="previousBalance" name="previousBalance" type="number" value={receiptData.previousBalance} onChange={handleNumericChange} />
            </div>
            <div className="sm:col-span-2">
                <TextAreaField label="Billing Address" id="billingAddress" name="billingAddress" value={receiptData.billingAddress} onChange={handleReceiptChange} rows={3} />
            </div>
        </div>
      </fieldset>
      
      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">Important Dates & Details</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InputField label="Receipt Number" id="receiptNumber" name="receiptNumber" value={receiptData.receiptNumber} onChange={handleReceiptChange} />
            <InputField label="Receipt Date" id="receiptDate" name="receiptDate" type="date" value={receiptData.receiptDate} onChange={handleReceiptChange} />
            <InputField label="Due Date" id="dueDate" name="dueDate" type="date" value={receiptData.dueDate} onChange={handleReceiptChange} />
            <InputField label="Late Fee Date" id="lateFeeDate" name="lateFeeDate" type="date" value={receiptData.lateFeeDate} onChange={handleReceiptChange} />
        </div>
      </fieldset>

      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">Detailed Charges</legend>
        <div className="space-y-3">
            {receiptData.charges.map((charge, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end p-2 border border-gray-700 rounded-md">
                    <div className="col-span-12 sm:col-span-4"><InputField label="Description" id={`charge-desc-${index}`} value={charge.description} onChange={(e) => handleItemChange(index, 'description', e.target.value, 'charges')} /></div>
                    <div className="col-span-3 sm:col-span-2"><InputField label="Qty" id={`charge-qty-${index}`} type="number" value={charge.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0, 'charges')} /></div>
                    <div className="col-span-5 sm:col-span-3"><InputField label="Unit" id={`charge-unit-${index}`} value={charge.unit} onChange={(e) => handleItemChange(index, 'unit', e.target.value, 'charges')} /></div>
                    <div className="col-span-4 sm:col-span-2"><InputField label="Unit Cost" id={`charge-cost-${index}`} type="number" value={charge.unitCost} onChange={(e) => handleItemChange(index, 'unitCost', parseFloat(e.target.value) || 0, 'charges')} /></div>
                    <button onClick={() => removeItem(index, 'charges')} className="col-span-12 sm:col-span-1 h-10 text-red-400 hover:text-white hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">✕</button>
                </div>
            ))}
        </div>
        <button onClick={() => addItem('charges')} className="mt-4 w-full py-2 font-semibold text-white transition duration-300 rounded-lg bg-indigo-600 hover:bg-indigo-700">+ Add Charge</button>
      </fieldset>

      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">Payments & Credits</legend>
         <div className="space-y-3">
            {receiptData.payments.map((payment, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end p-2 border border-gray-700 rounded-md">
                    <div className="col-span-12 sm:col-span-5"><InputField label="Description" id={`payment-desc-${index}`} value={payment.description} onChange={(e) => handleItemChange(index, 'description', e.target.value, 'payments')} /></div>
                    <div className="col-span-6 sm:col-span-3"><InputField label="Date" id={`payment-date-${index}`} type="date" value={payment.date} onChange={(e) => handleItemChange(index, 'date', e.target.value, 'payments')} /></div>
                    <div className="col-span-6 sm:col-span-3"><InputField label="Amount" id={`payment-amount-${index}`} type="number" value={payment.amount} onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value) || 0, 'payments')} /></div>
                    <button onClick={() => removeItem(index, 'payments')} className="col-span-12 sm:col-span-1 h-10 text-red-400 hover:text-white hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">✕</button>
                </div>
            ))}
        </div>
        <button onClick={() => addItem('payments')} className="mt-4 w-full py-2 font-semibold text-white transition duration-300 rounded-lg bg-teal-600 hover:bg-teal-700">+ Add Payment/Credit</button>
      </fieldset>

    </form>
  );
};

export default ReceiptForm;
