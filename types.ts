export interface ChargeItem {
    description: string;
    quantity: number;
    unit: string;
    unitCost: number;
}

export interface PaymentItem {
    description:string;
    date: string;
    amount: number;
}

export interface ReceiptData {
    // Billing Info
    receiptNumber: string;

    // Student Info
    studentName: string;
    studentId: string;
    emailId: string;
    programOfStudy: string;
    department: string;
    schoolFaculty: string;
    admissionYear: string;
    graduationYear: string;
    yearOfStudy: string;
    courseStartDate: string;
    billingAddress: string;
    learningModality: 'Online/Remote' | 'Hybrid' | 'In-Person';

    // Dates
    receiptDate: string;
    dueDate: string;
    lateFeeDate: string;

    // Summary
    previousBalance: number;
    
    // Details
    charges: ChargeItem[];
    payments: PaymentItem[];

    // Payment Info
    paymentPortalUrl: string;
    billingOfficeInfo: string;
    supportContact: string;
    confidentialityNotice: string;
}

export interface UniversityInfo {
    name: string;
    address1: string;
    address2: string;
    address3: string;
    logo: string;
    onlineProgramDirector: string;
}

export interface VerificationResult {
    studentNameCheck: { verified: boolean; feedback: string };
    universityInfoCheck: { verified: boolean; feedback: string };
    dateCheck: { verified: boolean; feedback: string };
}
