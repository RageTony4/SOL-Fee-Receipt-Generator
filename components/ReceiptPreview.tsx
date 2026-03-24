import React, { forwardRef } from 'react';
import type { ReceiptData, UniversityInfo } from '../types';
import { StampIcon } from './Icons';

interface ReceiptPreviewProps {
  data: ReceiptData;
  universityInfo: UniversityInfo;
  currency: 'INR' | 'USD' | 'GBP' | 'KES' | 'ILS';
  locale: 'en-IN' | 'en-US' | 'en-GB' | 'en-KE' | 'en-IL';
}

const InfoItem: React.FC<{ label: string; value: string; className?: string; labelWidth?: string }> = ({ label, value, className = '', labelWidth = 'w-32' }) => (
    <div className={`flex flex-nowrap items-baseline border-b border-gray-50 py-1 ${className}`}>
        <p className={`font-bold uppercase ${labelWidth} flex-shrink-0 text-[7px] text-gray-400 tracking-wider`}>{label}:</p>
        <p className="uppercase break-words text-[10px] font-bold text-gray-900 leading-none flex-grow">{value}</p>
    </div>
);

const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(({ data, universityInfo, currency, locale }, ref) => {

    const newChargesTotal = data.charges.reduce((acc, charge) => acc + (charge.quantity * charge.unitCost), 0);
    const paymentsTotal = data.payments.reduce((acc, p) => acc + p.amount, 0);
    const totalAmountDue = data.previousBalance + newChargesTotal - paymentsTotal;

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return '';
        return new Date(`${dateString}T00:00:00`).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

  return (
    <div ref={ref} className="relative bg-white text-black p-16 statement-font w-[210mm] min-h-[297mm] mx-auto text-sm flex flex-col overflow-hidden shadow-2xl" style={{boxSizing: 'border-box'}}>
      
      {/* Subtle Paper Texture/Border - Integrated */}
      <div className="absolute inset-0 border-[1px] border-gray-100 pointer-events-none"></div>

      {/* Watermark - Extremely subtle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.01] select-none rotate-[-35deg]">
        <h1 className="text-[80px] font-bold text-center leading-none uppercase whitespace-nowrap">
            {universityInfo.name}<br/>OFFICIAL FINANCIAL RECORD
        </h1>
      </div>

      <div className="relative z-10 flex-grow">
        {/* Header - Integrated and Symmetrical with strict margins */}
        <header className="pb-12 border-b-2 border-gray-900">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="align-middle w-1/2">
                  <div className="flex gap-6 items-center">
                    <img 
                        src={universityInfo.logo} 
                        alt="University Logo" 
                        className="w-24 h-24 object-contain"
                    />
                    <div className="border-l-2 border-gray-900 pl-6">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tighter uppercase leading-none mb-1">{universityInfo.name}</h1>
                        <div className="text-[8px] text-gray-500 uppercase leading-tight font-bold tracking-widest">
                            <p>{universityInfo.address1}</p>
                            <p>{universityInfo.address2}</p>
                            <p>{universityInfo.address3}</p>
                        </div>
                    </div>
                  </div>
                </td>
                <td className="text-right align-middle w-1/2">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-3">
                    Student Financial Services
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 uppercase tracking-tighter leading-none">Tuition Receipt</h2>
                  <div className="mt-6">
                    <table className="ml-auto border-collapse">
                        <tbody>
                            <tr>
                                <td className="text-[8px] font-bold text-gray-400 uppercase pr-4 py-0.5">Statement Number:</td>
                                <td className="font-mono text-xs font-bold text-gray-900 py-0.5">{data.receiptNumber}</td>
                            </tr>
                            <tr>
                                <td className="text-[8px] font-bold text-gray-400 uppercase pr-4 py-0.5">Date of Issue:</td>
                                <td className="text-xs font-bold text-gray-900 py-0.5">{formatDate(data.receiptDate)}</td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </header>
        
        {/* Student Info Section - Hard-coded grid alignment */}
        <section className="my-14">
            <table className="w-full border-collapse">
                <tbody>
                    <tr>
                        <td className="align-top w-3/5">
                            <h3 className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6 border-b-2 border-gray-900 pb-1 w-fit pr-10">Student Identification</h3>
                            <div className="space-y-0">
                                <InfoItem label="Full Name" value={data.studentName} />
                                <InfoItem label="Student ID" value={data.studentId} />
                                <InfoItem label="Academic Program" value={data.programOfStudy} />
                                <InfoItem label="Department" value={data.department} />
                                <InfoItem label="Faculty/School" value={data.schoolFaculty} />
                                <div className="grid grid-cols-2 gap-x-8 mt-2">
                                    <InfoItem label="Current Enrollment Term" value={data.currentEnrollmentTerm} className="border-r border-gray-50 pr-4" />
                                    <InfoItem label="Current Term" value={data.currentTerm} className="pl-4" />
                                </div>
                                <div className="grid grid-cols-2 gap-x-8">
                                    <InfoItem label="Enrollment Status" value={data.enrollmentStatus} className="border-r border-gray-50 pr-4" />
                                    <InfoItem label="Admission Year" value={data.admissionYear} className="pl-4" />
                                </div>
                                <div className="grid grid-cols-2 gap-x-8">
                                    <InfoItem label="Expected Graduation" value={data.graduationYear} className="border-r border-gray-50 pr-4" />
                                    <div className="pl-4"></div>
                                </div>
                            </div>
                        </td>
                        <td className="align-top w-2/5 text-right pl-16">
                            <div className="inline-block border-2 border-gray-900 p-2 bg-white mb-6">
                                {/* Simulated System Barcode - More authentic than a generic QR */}
                                <div className="w-40 h-14 bg-white flex items-center justify-center relative overflow-hidden">
                                    <div className="flex gap-[1px] h-full items-center">
                                        {Array.from({length: 60}).map((_, i) => (
                                            <div key={i} className="bg-black" style={{ width: `${Math.random() > 0.8 ? 3 : Math.random() > 0.4 ? 2 : 1}px`, height: `${70 + Math.random() * 30}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[8px] text-center font-mono font-bold text-gray-900 mt-1 tracking-[0.5em]">{data.receiptNumber}</p>
                            </div>
                            <div className="text-[7px] text-gray-400 font-mono uppercase leading-tight tracking-tighter">
                                <p className="mb-1">Internal Verification Hash:</p>
                                <p className="break-all opacity-60">{btoa(data.receiptNumber + data.studentId + data.receiptDate).substring(0, 48)}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        
        {/* Account Summary - Integrated, No Floating Boxes */}
        <section className="my-14">
            <div className="border-2 border-gray-900 p-10">
                <h3 className="font-bold text-gray-900 uppercase tracking-[0.4em] text-[10px] mb-8 text-center">Statement Account Summary</h3>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr className="text-[11px] text-gray-600">
                            <td className="py-2 uppercase font-bold tracking-widest">Previous Outstanding Balance</td>
                            <td className="py-2 text-right font-mono font-bold text-gray-900">{formatCurrency(data.previousBalance)}</td>
                        </tr>
                        <tr className="text-[11px] text-gray-600">
                            <td className="py-2 uppercase font-bold tracking-widest">Total Current Period Charges</td>
                            <td className="py-2 text-right font-mono font-bold text-gray-900">{formatCurrency(newChargesTotal)}</td>
                        </tr>
                        <tr className="text-[11px] text-gray-600">
                            <td className="py-2 uppercase font-bold tracking-widest">Total Payments and Credits Applied</td>
                            <td className="py-2 text-right font-mono font-bold text-gray-900">({formatCurrency(paymentsTotal)})</td>
                        </tr>
                        <tr className="border-t-2 border-gray-900 mt-4">
                            <td className="pt-6 uppercase font-bold text-sm text-gray-900 tracking-[0.2em]">Total Net Balance Due</td>
                            <td className="pt-6 text-right font-mono font-bold text-2xl text-gray-900">{formatCurrency(totalAmountDue)}</td>
                        </tr>
                    </tbody>
                </table>
                {paymentsTotal > 0 && totalAmountDue <= 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <div className="inline-flex items-center gap-3 border-2 border-gray-900 text-gray-900 px-10 py-2 font-bold text-[11px] uppercase tracking-[0.5em]">
                            <StampIcon className="w-5 h-5" />
                            Account Fully Settled
                        </div>
                    </div>
                )}
            </div>
        </section>

        {/* Detailed Charges - Strict Alignment */}
        <section className="mb-14">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-900 mb-6 border-b-2 border-gray-900 pb-1 w-fit pr-10">Itemized Transaction Details</h3>
            <table className="w-full text-[11px] border-collapse">
                <thead>
                    <tr className="text-gray-400 uppercase text-[8px] tracking-[0.3em] border-b-2 border-gray-900">
                        <th className="py-3 text-left font-bold w-1/2">Description of Service/Fee</th>
                        <th className="py-3 text-center font-bold w-16">Qty</th>
                        <th className="py-3 text-left font-bold w-28">Unit Type</th>
                        <th className="py-3 text-right font-bold w-36">Unit Rate</th>
                        <th className="py-3 text-right font-bold w-36">Total Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y border-b-2 border-gray-900">
                    {data.charges.length > 0 ? data.charges.map((charge, index) => (
                        <tr key={index}>
                            <td className="py-4 font-bold text-gray-900 uppercase tracking-tight">{charge.description}</td>
                            <td className="py-4 text-center text-gray-700 font-bold">{charge.quantity}</td>
                            <td className="py-4 text-gray-500 uppercase text-[8px] font-bold tracking-widest">{charge.unit}</td>
                            <td className="py-4 text-right text-gray-700 font-mono font-bold">{formatCurrency(charge.unitCost)}</td>
                            <td className="py-4 text-right font-bold text-gray-900 font-mono">{formatCurrency(charge.quantity * charge.unitCost)}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="text-center py-12 text-gray-400 italic uppercase text-[10px] tracking-[0.4em]">No transactions recorded for this period.</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4} className="py-6 text-right font-bold uppercase text-[9px] tracking-[0.3em] text-gray-400">Current Period Subtotal</td>
                        <td className="py-6 text-right font-bold text-xl text-gray-900 font-mono">{formatCurrency(newChargesTotal)}</td>
                    </tr>
                </tfoot>
            </table>
        </section>

        {/* Payments & Credits - Strict Alignment */}
        <section className="mb-14">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-900 mb-6 border-b-2 border-gray-900 pb-1 w-fit pr-10">Payment & Credit History</h3>
             <table className="w-full text-[11px] border-collapse">
                <thead>
                    <tr className="text-gray-400 uppercase text-[8px] tracking-[0.3em] border-b-2 border-gray-900">
                        <th className="py-3 text-left font-bold">Transaction Description</th>
                        <th className="py-3 text-center font-bold w-36">Post Date</th>
                        <th className="py-3 text-right font-bold w-36">Credit Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y border-b-2 border-gray-900">
                    {data.payments.length > 0 ? data.payments.map((payment, index) => (
                        <tr key={index}>
                            <td className="py-4 font-bold text-gray-900 uppercase tracking-tight">{payment.description}</td>
                            <td className="py-4 text-center text-gray-600 font-mono font-bold">{formatDate(payment.date)}</td>
                            <td className="py-4 text-right font-bold text-gray-900 font-mono">-{formatCurrency(payment.amount)}</td>
                        </tr>
                    )) : (
                         <tr>
                            <td colSpan={3} className="text-center py-8 text-gray-400 italic uppercase text-[10px] tracking-[0.4em]">No payment activity recorded.</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr className="font-bold text-gray-900">
                        <td colSpan={2} className="py-6 text-right uppercase text-[9px] tracking-[0.3em] text-gray-400">Total Credits Applied</td>
                        <td className="py-6 text-right text-lg font-mono">{formatCurrency(paymentsTotal)}</td>
                    </tr>
                </tfoot>
            </table>
        </section>
        
        {/* Verification & Signature - Flattened and Integrated */}
        <section className="mt-auto pt-12 border-t-2 border-gray-900">
            <table className="w-full border-collapse">
                <tbody>
                    <tr>
                        <td className="align-top w-2/3 pr-20">
                            <div className="text-[9px] text-gray-500 leading-relaxed uppercase font-bold tracking-widest">
                                <p className="text-gray-900 mb-3 text-[10px]">Certification of Enrollment & Financial Status</p>
                                <p className="opacity-80">
                                    This electronic document serves as formal verification of enrollment and financial standing for 
                                    <span className="text-gray-900"> {data.studentName}</span>. 
                                    The University certifies that the student's primary mode of instruction for the specified academic period 
                                    is <span className="text-gray-900">{data.learningModality}</span>.
                                </p>
                                <p className="mt-4 text-[7px] italic opacity-60">
                                    This is a system-generated document. Digital verification is embedded in the document metadata and internal tracking systems.
                                </p>
                            </div>
                        </td>
                        <td className="align-bottom text-center w-80">
                            <div className="relative pb-4">
                                {/* Signature - Integrated into the document layer with consistent weight */}
                                <p className="font-serif italic text-3xl text-gray-900 opacity-90 select-none mb-2" style={{fontFamily: "'Dancing Script', cursive"}}>
                                    {universityInfo.onlineProgramDirector.split(',')[0]}
                                </p>
                                <div className="border-t-2 border-gray-900 w-full mx-auto"></div>
                            </div>
                            <div className="mt-1">
                                <p className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em]">{universityInfo.onlineProgramDirector}</p>
                                <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Authorized University Official</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

      </div>

      {/* Footer - System Metadata Style */}
      <footer className="pt-12 mt-14 border-t-2 border-gray-900 text-[8px] relative z-10">
          <table className="w-full table-fixed border-collapse">
            <tbody>
              <tr>
                <td className="align-top pr-12">
                  <h4 className="font-bold uppercase tracking-[0.3em] mb-4 text-gray-900">Compliance & Deadlines</h4>
                  <div className="space-y-2 text-gray-500 font-bold uppercase tracking-widest">
                    <p className="flex justify-between"><span>Statement Date:</span> <span className="text-gray-900">{formatDate(data.receiptDate)}</span></p>
                    <p className="flex justify-between"><span>Payment Due:</span> <span className="text-gray-900">{formatDate(data.dueDate)}</span></p>
                    <p className="flex justify-between"><span>Late Fee Applied After:</span> <span className="text-gray-900">{formatDate(data.lateFeeDate)}</span></p>
                  </div>
                </td>
                <td className="align-top pr-12">
                  <h4 className="font-bold uppercase tracking-[0.3em] mb-4 text-gray-900">Payment Administration</h4>
                  <p className="mb-2 text-gray-500 font-bold uppercase tracking-widest">Remit payments via the secure portal:</p>
                  <p className="font-mono text-[9px] text-gray-900 break-all bg-gray-50 p-4 border-2 border-gray-900">{data.paymentPortalUrl}</p>
                </td>
                <td className="align-top">
                  <h4 className="font-bold uppercase tracking-[0.3em] mb-4 text-gray-900">Contact Information</h4>
                  <p className="leading-relaxed text-gray-500 font-bold uppercase tracking-widest">{data.billingOfficeInfo}</p>
                  <p className="mt-3 font-bold text-gray-900 uppercase tracking-[0.2em]">{data.supportContact}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-12 pt-6 border-t border-gray-100 text-center">
            <p className="text-[8px] text-gray-400 uppercase tracking-[0.6em] font-bold">
                {data.confidentialityNotice} — System Generated Document ID: {data.receiptNumber}-{Date.now().toString().slice(-6)}
            </p>
          </div>
      </footer>

    </div>
  );
});

export default ReceiptPreview;
