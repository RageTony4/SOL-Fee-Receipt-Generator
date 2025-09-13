
export interface ReceiptData {
  barcodeNo: string;
  receiptNo: string;
  course: string;
  medium: string;
  user: string;
  sex: string;
  date: string;
  name: string;
  enrollmentNo: string;
  fatherName: string;
  campus: string;
  motherName: string;
  dateOfBirth: string;
  mailingAddress: string;
  emailId: string;
  phoneNo: string;
  subjectOffered: string;
  payMode: string;
  refNo: string;
  dateOfIssue: string;
  bank: string;
  amount: string;
  amountInWords: string;
  barcodeImage?: string | null;
}

export interface SchoolInfo {
    name: string;
    address1: string;
    address2: string;
    address3: string;
    logo: string;
    affiliation: string;
}
