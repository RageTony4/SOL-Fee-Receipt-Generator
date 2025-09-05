
import React, { forwardRef } from 'react';
import type { ReceiptData, SchoolInfo } from '../types';

// Base64 encoded background texture to prevent cross-origin loading issues.
const backgroundTexture = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACcCAYAAADqF8MjAAAA/UlEQVR42u3RoQEAAAgDoGly/z426ECgZgE+25sA5wR4E2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k2AuBbiTYC4FeBNgLgW4k-wYAAAADklEQVR42mP8/58BDABi5AKfC4XEdAAAAABJRU5ErkJggg==';

interface ReceiptPreviewProps {
  data: ReceiptData;
  schoolInfo: SchoolInfo;
}

const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(({ data, schoolInfo }, ref) => {

  const DetailRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <>
      <div className="font-bold text-xs whitespace-nowrap">{label}</div>
      <div className="text-xs">:</div>
      <div className="text-xs break-words">{value || ''}</div>
    </>
  );

  return (
    <div ref={ref} className="bg-white text-black p-6 receipt-font w-[210mm] min-h-[297mm] mx-auto" style={{boxSizing: 'border-box', letterSpacing: 'normal', wordSpacing: 'normal'}}>
      <div className="relative border-2 border-black p-4 h-full" style={{backgroundImage: `url('${backgroundTexture}')`, backgroundBlendMode: 'soft-light', backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
      
      <div className="absolute inset-4 bg-white opacity-95" style={{
          backgroundImage: `url(${schoolInfo.logo})`,
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center', 
          backgroundSize: 'contain',
          opacity: 0.1,
      }}></div>
      
      <div className="relative z-10">
        <header className="text-center mb-4">
            <div className="flex justify-center items-center gap-4">
                <img src={schoolInfo.logo} alt="School Logo" className="w-16 h-16 object-contain"/>
                <div>
                    <h1 className="text-xl font-bold">{schoolInfo.name}</h1>
                    <p className="text-sm">{schoolInfo.address1}</p>
                    <p className="text-sm">{schoolInfo.address2}</p>
                    <p className="text-sm">{schoolInfo.address3}</p>
                </div>
            </div>
            <h2 className="text-lg font-bold underline mt-4">Fee Receipt</h2>
        </header>

        {/* Barcode and Receipt No */}
        <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col items-center">
                {data.barcodeImage ? (
                    <img src={data.barcodeImage} alt="Barcode" className="h-10 object-contain" style={{maxWidth: '200px'}} />
                ) : (
                    /* Simulated Barcode */
                    <div className="flex items-end h-10">
                        {[...Array(40)].map((_, i) => (
                            <div key={i} className="bg-black" style={{ width: `${Math.random() * 2 + 0.5}px`, height: `${Math.random() * 30 + 10}px` }}></div>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 text-xs mt-1">
                    <span className="font-bold">Barcode No</span>
                    <span>:</span>
                    <span>{data.barcodeNo}</span>
                </div>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 text-xs">
                <span className="font-bold">Receipt No</span>
                <span>:</span>
                <span>{data.receiptNo}</span>
            </div>
        </div>

        {/* Student Details */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm mb-4">
            <div className="grid grid-cols-[100px_auto_1fr] gap-x-2">
                <DetailRow label="Course" value={data.course} />
                <DetailRow label="Name" value={data.name} />
                <DetailRow label="Father's Name" value={data.fatherName} />
                <DetailRow label="Mother's Name" value={data.motherName} />
                <DetailRow label="Mailing Address" value={data.mailingAddress} />
                <DetailRow label="Email Id" value={data.emailId} />
            </div>
            <div className="grid grid-cols-[100px_auto_1fr] gap-x-2">
                <DetailRow label="Medium" value={data.medium} />
                <DetailRow label="User" value={data.user} />
                <DetailRow label="Sex" value={data.sex} />
                <DetailRow label="Date" value={data.date} />
                <DetailRow label="SOL Roll No." value={data.solRollNo} />
                <DetailRow label="Exam Centre" value={data.examCentre} />
                <DetailRow label="Date of Birth" value={data.dateOfBirth} />
                <DetailRow label="Phone No" value={data.phoneNo} />
            </div>
        </div>

        {/* Subject Offered */}
        <div className="grid grid-cols-[118px_1fr] gap-x-2 text-sm mb-4">
            <div className="font-bold text-xs">Subject Offered :</div>
            <div className="text-xs break-words">{data.subjectOffered}</div>
        </div>

        {/* Payment Details */}
        <div className="mt-6">
            <h3 className="text-md font-bold underline mb-2">Payment Details</h3>
            <div className="grid grid-cols-5 gap-4 border-t-2 border-b-2 border-black py-2 text-xs font-bold text-center">
                <div>Pay Mode</div>
                <div>Refe.No.</div>
                <div>Date of Issue</div>
                <div>Bank</div>
                <div>Amount</div>
            </div>
            <div className="grid grid-cols-5 gap-4 py-2 text-xs text-center">
                <div>{data.payMode}</div>
                <div>{data.refNo}</div>
                <div>{data.dateOfIssue}</div>
                <div>{data.bank}</div>
                <div className="font-bold">{data.amount}</div>
            </div>
            <div className="flex justify-between items-center border-t-2 border-black pt-2">
              <span className="text-xs italic">{data.amountInWords}</span>
              <span className="text-xs font-bold">{data.amount}</span>
            </div>
        </div>

        {/* Notes */}
        <div className="mt-8 text-xs space-y-2 leading-relaxed">
            <p className="break-words"><span className="font-bold">Note1:</span> Admission is provisional subject to the verification of original documents by the office. Since this is computer generated receipt, no seal/signature are required. It is advised to check the details on the receipt. In case of any discrepancy, please Contact SOL Office.</p>
            <p className="break-words"><span className="font-bold">Note2:</span> Students opting for North Campus can collect study material from <span className="font-bold">SOL-North</span> and those opting for South can collect it only from <span className="font-bold">SOL-South Moti bagh</span></p>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-xs mt-10 text-center border-t border-dashed border-black pt-2 break-words">
          Please note that in future you will get all information through Mail <span className="font-semibold">{data.emailId}</span> and Phone No <span className="font-semibold">{data.phoneNo}</span>
        </div>
      </div>
      </div>
    </div>
  );
});

export default ReceiptPreview;
