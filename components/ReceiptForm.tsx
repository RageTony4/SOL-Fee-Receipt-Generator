import React, { useState } from 'react';
import type { ReceiptData, UniversityInfo, ChargeItem, PaymentItem } from '../types.ts';
import { SparklesIcon, ClipboardIcon, ClipboardCheckIcon } from './Icons.tsx';

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
    if (!navigator.clipboard || !textToCopy) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
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

  const handleItemChange = (index: number, field: string, value: string | number, itemType: 'charges' | 'payments') => {
    setReceiptData(prev => {
        const items = [...(prev[itemType] as any[])];
        items[index] = { ...items[index], [field]: value };
        return { ...prev, [itemType]: items };
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
                className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded-lg w-full text-base focus:border-indigo-500 focus:outline-none"
            >
                {universityOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
        <button
          type="button"
          onClick={onGenerateSample}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
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
                 <label htmlFor="logo-upload" className="relative flex items-center gap-4 w-full p-2 border rounded-lg cursor-pointer border-gray-600 hover:border-indigo-500 bg-gray-700/50">
                    <img src={universityInfo.logo} alt="Logo" className="w-10 h-10 object-contain bg-white rounded-full p-1"/>
                    <span className="text-sm text-gray-300">Upload Logo</span>
                    <input id="logo-upload" type="file" className="sr-only" onChange={handleLogoChange} accept="image/*" />
                 </label>
            </div>
            <InputField label="University Name" name="name" value={universityInfo.name} onChange={handleUniversityChange} />
            <InputField label="Authorized Signatory" name="onlineProgramDirector" value={universityInfo.onlineProgramDirector} onChange={handleUniversityChange} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                 <input type="text" name="address1" placeholder="Address 1" value={universityInfo.address1} onChange={handleUniversityChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg text-sm" />
                 <input type="text" name="address2" placeholder="Address 2" value={universityInfo.address2} onChange={handleUniversityChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg text-sm" />
                 <input type="text" name="address3" placeholder="Address 3" value={universityInfo.address3} onChange={handleUniversityChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg text-sm" />
            </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">Student Information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField 
                label="Full Name" 
                name="studentName" 
                value={receiptData.studentName} 
                onChange={handleReceiptChange} 
                endAdornment={
                    <button 
                        type="button" 
                        onClick={() => handleCopy(receiptData.studentName, 'studentName')}
                        className="text-gray-400 hover:text-indigo-400 transition-colors"
                        title="Copy Name"
                    >
                        {copiedField === 'studentName' ? <ClipboardCheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
                    </button>
                }
            />
            <InputField label="Reg No" name="studentId" value={receiptData.studentId} onChange={handleReceiptChange} />
            <InputField label="Programme" name="programOfStudy" value={receiptData.programOfStudy} onChange={handleReceiptChange} />
            <InputField label="Admission Year" name="admissionYear" value={receiptData.admissionYear} onChange={handleReceiptChange} type="number" />
            <InputField label="Graduation Year" name="graduationYear" value={receiptData.graduationYear} readOnly disabled />
            <InputField label="Current Enrollment Term" name="currentEnrollmentTerm" value={receiptData.currentEnrollmentTerm} onChange={handleReceiptChange} />
            <InputField label="Current Term" name="currentTerm" value={receiptData.currentTerm} onChange={handleReceiptChange} />
            <InputField label="Enrollment Status" name="enrollmentStatus" value={receiptData.enrollmentStatus} onChange={handleReceiptChange} />
            <InputField 
                label="Email ID" 
                name="emailId" 
                type="email" 
                value={receiptData.emailId} 
                onChange={handleReceiptChange} 
                endAdornment={
                    <button 
                        type="button" 
                        onClick={() => handleCopy(receiptData.emailId, 'emailId')}
                        className="text-gray-400 hover:text-indigo-400 transition-colors"
                        title="Copy Email"
                    >
                        {copiedField === 'emailId' ? <ClipboardCheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
                    </button>
                }
            />
             <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Modality</label>
              <select name="learningModality" value={receiptData.learningModality} onChange={handleReceiptChange} className="bg-gray-700 border border-gray-600 text-gray-200 p-2 rounded-lg w-full text-sm">
                <option value="Online/Remote">Online/Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>
            <div className="sm:col-span-2">
                <TextAreaField label="Billing Address" name="billingAddress" value={receiptData.billingAddress} onChange={handleReceiptChange} rows={2} />
            </div>
        </div>
      </fieldset>

      <fieldset className="border border-gray-700 p-4 rounded-lg">
        <legend className="text-xl font-semibold text-indigo-400 px-2">Charges & Payments</legend>
        <div className="space-y-4">
             <button onClick={() => addItem('charges')} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-bold">+ Add Charge Item</button>
             {receiptData.charges.map((charge, index) => (
                <div key={index} className="flex gap-2 items-end">
                    <div className="flex-grow"><InputField label="Description" value={charge.description} onChange={(e) => handleItemChange(index, 'description', e.target.value, 'charges')} /></div>
                    <div className="w-20"><InputField label="Cost" type="number" value={charge.unitCost} onChange={(e) => handleItemChange(index, 'unitCost', parseFloat(e.target.value) || 0, 'charges')} /></div>
                    <button onClick={() => removeItem(index, 'charges')} className="h-10 px-3 text-red-400 hover:bg-red-900/30 rounded-lg">✕</button>
                </div>
            ))}
        </div>
      </fieldset>
    </form>
  );
};

export default ReceiptForm;