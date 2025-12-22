import React, { forwardRef } from 'react';
import type { ReceiptData, UniversityInfo } from '../types';

interface ReceiptPreviewProps {
  data: ReceiptData;
  universityInfo: UniversityInfo;
  currency: 'INR' | 'USD' | 'GBP' | 'KES' | 'ILS';
  locale: 'en-IN' | 'en-US' | 'en-GB' | 'en-KE' | 'en-IL';
}

const InfoItem: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className = '' }) => (
    <div className={`flex flex-nowrap items-start mb-1.5 ${className}`}>
        <p className="font-bold uppercase w-48 flex-shrink-0 text-sm tracking-wide">{label}:</p>
        <p className="uppercase break-words text-sm">{value}</p>
    </div>
);

const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(({ data, universityInfo, currency, locale }, ref) => {

    const newChargesTotal = data.charges.reduce((acc, charge) => acc + (charge.quantity * charge.unitCost), 0);
    const paymentsTotal = data.payments.reduce((acc, p) => acc + p.amount, 0);
    const totalAmountDue = data.previousBalance + newChargesTotal - paymentsTotal;

    const formatCurrency = (amount: number): string => {
        try {
            return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
        } catch (e) {
            return `${currency} ${amount.toFixed(2)}`;
        }
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return '';
        try {
            return new Date(`${dateString}T00:00:00`).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (e) {
            return dateString;
        }
    };

  return (
    <div ref={ref} className="bg-white text-black p-8 statement-font w-[210mm] min-h-[297mm] mx-auto text-sm flex flex-col shadow-2xl" style={{boxSizing: 'border-box'}}>
      
      <div className="flex-grow">
        {/* Header */}
        <header className="flex justify-between items-start pb-4 border-b-2 border-gray-800">
          <div className="max-w-[60%]">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">{universityInfo.name}</h1>
            <p className="text-gray-600 mt-1">{universityInfo.address1}</p>
            <p className="text-gray-600">{universityInfo.address2}</p>
            <p className="text-gray-600">{universityInfo.address3}</p>
          </div>
          <div className="text-right flex flex-col items-end">
             <img src={universityInfo.logo} alt="University Logo" className="w-24 h-24 object-contain mb-2"/>
             <h2 className="text-2xl font-bold text-gray-700">Tuition Fee Receipt</h2>
             <p className="font-semibold text-gray-500 mt-1">Receipt #: {data.receiptNumber}</p>
          </div>
        </header>
        
        {/* Student Info */}
        <section className="my-6">
            <div className="grid grid-cols-2 gap-x-8">
                <div>
                    <InfoItem label="Student Name" value={data.studentName} />
                    <InfoItem label="Programme" value={data.programOfStudy} />
                    <InfoItem label="Department" value={data.department} />
                    <InfoItem label="School/Faculty" value={data.schoolFaculty} />
                </div>
                <div>
                    <InfoItem label="Reg No" value={data.studentId} />
                    <InfoItem label="Admission Year" value={data.admissionYear} />
                    <InfoItem label="Graduation Year" value={data.graduationYear} />
                    <InfoItem label="Year of Study" value={data.yearOfStudy} />
                </div>
            </div>
        </section>
        
        {/* Billing Info & Summary */}
        <section className="grid grid-cols-2 gap-x-8 gap-y-4 my-6">
            <div>
                <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-2">Billing Information</h3>
                <p><span className="font-semibold">Email ID:</span> {data.emailId}</p>
                <p><span className="font-semibold">Modality:</span> {data.learningModality}</p>
                <p className="mt-2 text-gray-600 whitespace-pre-line leading-relaxed">{data.billingAddress}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-3">Account Summary</h3>
                <div className="space-y-2">
                    <div className="flex justify-between"><span>Previous Balance:</span> <span>{formatCurrency(data.previousBalance)}</span></div>
                    <div className="flex justify-between"><span>New Charges:</span> <span>{formatCurrency(newChargesTotal)}</span></div>
                    <div className="flex justify-between border-b border-gray-300 pb-2"><span>Payments & Credits:</span> <span>({formatCurrency(paymentsTotal)})</span></div>
                    <div className="flex justify-between font-bold text-lg pt-1"><span>Total Amount Due:</span> <span>{formatCurrency(totalAmountDue)}</span></div>
                </div>
            </div>
        </section>

        {/* Detailed Charges */}
        <section className="mb-6">
            <h3 className="text-xl font-bold border-b border-gray-400 pb-1 mb-2">Detailed Charges</h3>
            <table className="w-full table-auto text-left">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="py-2">Description</th>
                        <th className="py-2 text-center">Qty</th>
                        <th className="py-2">Unit</th>
                        <th className="py-2 text-right">Unit Cost</th>
                        <th className="py-2 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.charges.length > 0 ? data.charges.map((charge, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-2 text-gray-900">{charge.description}</td>
                            <td className="py-2 text-center text-gray-900">{charge.quantity}</td>
                            <td className="py-2 text-gray-900">{charge.unit}</td>
                            <td className="py-2 text-right text-gray-900">{formatCurrency(charge.unitCost)}</td>
                            <td className="py-2 text-right font-medium text-gray-900">{formatCurrency(charge.quantity * charge.unitCost)}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500 italic">No charges for this period.</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr className="font-bold">
                        <td colSpan={4} className="py-3 text-right">Total New Charges:</td>
                        <td className="py-3 text-right">{formatCurrency(newChargesTotal)}</td>
                    </tr>
                </tfoot>
            </table>
        </section>

        {/* Payments & Credits */}
        <section className="mb-6">
             <h3 className="text-xl font-bold border-b border-gray-400 pb-1 mb-2">Payments & Account Activity</h3>
             <table className="w-full table-auto text-left">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="py-2 w-2/3">Description</th>
                        <th className="py-2 text-center">Date</th>
                        <th className="py-2 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.payments.length > 0 ? data.payments.map((payment, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-2 text-gray-900">{payment.description}</td>
                            <td className="py-2 text-center text-gray-900">{formatDate(payment.date)}</td>
                            <td className="py-2 text-right text-gray-900">{formatCurrency(payment.amount)}</td>
                        </tr>
                    )) : (
                         <tr>
                            <td colSpan={3} className="text-center py-4 text-gray-500 italic">No payments or credits for this period.</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr className="font-bold">
                        <td colSpan={2} className="py-3 text-right">Total Payments/Credits:</td>
                        <td className="py-3 text-right">{formatCurrency(paymentsTotal)}</td>
                    </tr>
                </tfoot>
            </table>
        </section>
        
        {/* Verification of Remote Learning */}
        {data.learningModality === 'Online/Remote' && (
            <section className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-700">
                <h4 className="font-bold text-gray-800 uppercase tracking-wider mb-2">Verification of Remote Learning</h4>
                <p className="italic leading-relaxed">
                    This receipt serves to confirm that {data.studentName} (ID: {data.studentId}) is enrolled in the {data.programOfStudy} at {universityInfo.name} for the period covered by this receipt, with their primary mode of instruction designated as {data.learningModality}. 
                    This receipt reflects charges and payments associated with their remote learning program.
                </p>
                <div className="mt-8 text-right">
                    <div className="inline-block text-center">
                        <p className="border-t border-gray-400 pt-2 px-8 font-semibold">{universityInfo.onlineProgramDirector}</p>
                    </div>
                </div>
            </section>
        )}

      </div>

      {/* Footer */}
      <footer className="pt-4 mt-auto border-t-2 border-gray-800 text-xs">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-2">Important Dates</h4>
              <p><span className="font-semibold">Receipt Date:</span> {formatDate(data.receiptDate)}</p>
              <p className="text-red-600 font-bold"><span className="font-semibold">Payment Due Date:</span> {formatDate(data.dueDate)}</p>
              <p><span className="font-semibold">Late Fee Application:</span> {formatDate(data.lateFeeDate)}</p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-2">Payment Methods</h4>
              <p>Pay online at: <a href={data.paymentPortalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.paymentPortalUrl}</a></p>
              <p>{data.billingOfficeInfo}</p>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-gray-300 text-center text-gray-500">
            <p>{data.supportContact}</p>
            <p className="italic">{data.confidentialityNotice}</p>
          </div>
      </footer>

    </div>
  );
});

export default ReceiptPreview;