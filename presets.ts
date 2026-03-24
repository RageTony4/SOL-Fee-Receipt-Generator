import type { ReceiptData, UniversityInfo, ChargeItem, PaymentItem } from './types.ts';

export interface UniversityPreset {
    id: string;
    name: string;
    info: UniversityInfo;
    createInitialData: () => ReceiptData;
    createRandomData: () => ReceiptData;
    currency: 'INR' | 'USD' | 'GBP' | 'KES' | 'ILS';
    locale: 'en-IN' | 'en-US' | 'en-GB' | 'en-KE' | 'en-IL';
    duration: number;
}

const DEFAULT_LOGO = 'https://files.catbox.moe/60tw77.png';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const FIRST_NAMES = [
    'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth',
    'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen',
    'Charles', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Sandra', 'Mark', 'Margaret',
    'Donald', 'Ashley', 'Steven', 'Kimberly', 'Andrew', 'Emily', 'Paul', 'Donna', 'Joshua', 'Michelle',
    'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa', 'Timothy', 'Deborah',
    'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia',
    'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Anna',
    'Stephen', 'Brenda', 'Larry', 'Pamela', 'Justin', 'Nicole', 'Scott', 'Emma', 'Brandon', 'Helen',
    'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Gregory', 'Christine', 'Alexander', 'Debra', 'Frank', 'Rachel',
    'Patrick', 'Carolyn', 'Raymond', 'Janet', 'Jack', 'Catherine', 'Dennis', 'Maria', 'Jerry', 'Heather',
    'Tyler', 'Diane', 'Aaron', 'Ruth', 'Jose', 'Julie', 'Adam', 'Olivia', 'Nathan', 'Joyce',
    'Henry', 'Virginia', 'Douglas', 'Victoria', 'Zachary', 'Kelly', 'Peter', 'Lauren', 'Kyle', 'Christina',
    'Ethan', 'Joan', 'Walter', 'Evelyn', 'Harold', 'Judith', 'Jeremy', 'Megan', 'Christian', 'Andrea',
    'Keith', 'Cheryl', 'Roger', 'Hannah', 'Noah', 'Jacqueline', 'Gerald', 'Martha', 'Carl', 'Gloria',
    'Terry', 'Teresa', 'Sean', 'Ann', 'Arthur', 'Sara', 'Austin', 'Madison', 'Christian', 'Frances',
    'Aarav', 'Vihaan', 'Vivaan', 'Ananya', 'Diya', 'Advait', 'Ishani', 'Myra', 'Kabir', 'Saanvi',
    'Arjun', 'Sai', 'Aavya', 'Aaryan', 'Aavya', 'Ishaan', 'Aanya', 'Prisha', 'Rohan', 'Sia',
    'Otieno', 'Achieng', 'Ochieng', 'Anyango', 'Omondi', 'Atieno', 'Okwiri', 'Adhiambo', 'Oduor', 'Akoth',
    'Maina', 'Wanjiku', 'Kamau', 'Nanjala', 'Kipkorir', 'Chepkirui', 'Mutua', 'Mwikali', 'Njoroge', 'Wambui'
];

const LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
    'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
    'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
    'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
    'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
    'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez',
    'Sharma', 'Verma', 'Gupta', 'Malhotra', 'Mehra', 'Singh', 'Kaur', 'Reddy', 'Iyer', 'Nair',
    'Onyango', 'Kariuki', 'Mwangi', 'Kamau', 'Kiprono', 'Cheruiyot', 'Mulei', 'Waweru', 'Odhiambo', 'Okoth',
    'Nekesa', 'Wekesa', 'Barasa', 'Simiyu', 'Juma', 'Karanja', 'Githinji', 'Njuguna', 'Muthoni', 'Njeri'
];

const generateRandomName = () => {
    const first = getRandomItem(FIRST_NAMES);
    const last = getRandomItem(LAST_NAMES);
    return `${first} ${last}`.toUpperCase();
};

// --- PRINCETON UNIVERSITY ---
const princetonInfo: UniversityInfo = {
    name: 'Princeton University',
    address1: 'Princeton',
    address2: 'NJ 08544',
    address3: 'USA',
    logo: DEFAULT_LOGO,
    onlineProgramDirector: 'Christopher L. Eisgruber, President',
};

const createInitialPrincetonData = (): ReceiptData => {
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    const lateFeeDate = new Date(); lateFeeDate.setDate(today.getDate() + 45);
    return {
        receiptNumber: `PU-RCPT-2025-10928`,
        studentName: 'JAMES ROBINSON',
        studentId: `965432109`,
        emailId: 'jrobinson@princeton.edu',
        programOfStudy: 'A.B. in Economics',
        department: 'Department of Economics',
        schoolFaculty: 'School of Public and International Affairs',
        admissionYear: '2025',
        graduationYear: '2029',
        yearOfStudy: 'Class of 2029, Fall Term',
        courseStartDate: '2025-09-02',
        currentEnrollmentTerm: 'Fall 2025',
        currentTerm: 'Fall 2025',
        enrollmentStatus: 'Active',
        learningModality: 'In-Person',
        billingAddress: 'Frist Campus Center, Princeton, NJ 08544',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: lateFeeDate.toISOString().split('T')[0],
        previousBalance: 0,
        charges: [
            { description: 'Undergraduate Tuition', quantity: 1, unit: 'semester', unitCost: 31000 },
            { description: 'Room Charge', quantity: 1, unit: 'semester', unitCost: 6500 },
            { description: 'Board (Unlimited Plan)', quantity: 1, unit: 'semester', unitCost: 4200 },
        ],
        payments: [
            { description: 'Princeton Grant', date: today.toISOString().split('T')[0], amount: 25000 },
        ],
        paymentPortalUrl: 'https://finance.princeton.edu/billing-payments',
        billingOfficeInfo: 'Student Accounts | (609) 258-6378 | studacct@princeton.edu',
        supportContact: 'For questions, contact the Office of Finance & Treasury.',
        confidentialityNotice: 'This document contains confidential financial information.'
    };
};

const createRandomPrincetonData = (): ReceiptData => {
    const data = createInitialPrincetonData();
    data.receiptNumber = `PU-RCPT-2025-${randomInt(10000, 99999)}`;
    data.studentId = String(randomInt(100000000, 999999999));
    data.studentName = generateRandomName();
    data.emailId = `${data.studentName.split(' ')[0].toLowerCase()}.${data.studentId.substring(0, 4)}@princeton.edu`;
    return data;
};

// --- LLOYD LAW COLLEGE ---
const lloydInfo: UniversityInfo = {
    name: 'Lloyd Law College',
    address1: 'Plot No. 11, Knowledge Park II,',
    address2: 'Greater Noida, Uttar Pradesh 201306',
    address3: 'India',
    logo: 'https://files.catbox.moe/4d0pkw.jpeg',
    onlineProgramDirector: 'Dr. Mohd. Salim, Director',
};

const createInitialLloydData = (): ReceiptData => {
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    return {
        receiptNumber: `LLC-RCPT-2025-00786`,
        studentName: 'AARAV SHARMA',
        studentId: `LLC/BALLB/2025/01234`,
        emailId: 'aarav.01234@lloydlawcollege.edu.in',
        programOfStudy: 'B.A. LL.B (5-Year Integrated Course)',
        department: 'Undergraduate Studies',
        schoolFaculty: 'School of Law',
        admissionYear: '2025',
        graduationYear: '2030',
        yearOfStudy: 'YEAR I, SEMESTER I',
        courseStartDate: '2025-08-15',
        currentEnrollmentTerm: 'Semester I, 2025-26',
        currentTerm: 'Semester I, 2025-26',
        enrollmentStatus: 'Active Enrollment',
        learningModality: 'Online/Remote',
        billingAddress: 'A-42, Sector 15, Noida, Uttar Pradesh 201301',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        previousBalance: 15000.00,
        charges: [
            { description: 'Tuition Fee (Semester 1)', quantity: 1, unit: 'semester', unitCost: 150000 },
            { description: 'Library & E-Resource Fee', quantity: 1, unit: 'flat rate', unitCost: 5000 },
        ],
        payments: [
            { description: 'Online Payment', date: today.toISOString().split('T')[0], amount: 75000 },
        ],
        paymentPortalUrl: 'https://lloydlawcollege.edu.in/pay-online',
        billingOfficeInfo: 'Accounts Office | accounts@lloydlawcollege.edu.in',
        supportContact: 'For questions, contact Admissions.',
        confidentialityNotice: 'Confidential document.'
    };
};

const createRandomLloydData = (): ReceiptData => {
    const data = createInitialLloydData();
    data.receiptNumber = `LLC-RCPT-2025-${randomInt(10000, 99999)}`;
    data.studentId = `LLC/BALLB/2025/${randomInt(10000, 99999)}`;
    data.studentName = generateRandomName();
    data.emailId = `${data.studentName.split(' ')[0].toLowerCase()}.${randomInt(10000, 99999)}@lloydlawcollege.edu.in`;
    return data;
};

// --- UNIVERSITY OF CHILD NUTRITION ---
const ucnInfo: UniversityInfo = {
    name: 'University of Child Nutrition',
    address1: '65 W. E. H. Lamar Loop',
    address2: 'University, MS 38677',
    address3: 'USA',
    logo: DEFAULT_LOGO,
    onlineProgramDirector: 'Aleshia Hall-Campbell, Ph.D.',
};

const createInitialUCNData = (): ReceiptData => {
    const today = new Date();
    return {
        receiptNumber: `UCN-RCPT-2025-94331`,
        studentName: 'EMMA WILSON',
        studentId: `UCN-SCN-2025-8821`,
        emailId: 'emma.wilson.8821@ucn-edu.org',
        programOfStudy: 'Certificate in School Nutrition',
        department: 'Professional Development',
        schoolFaculty: 'Institute of Child Nutrition',
        admissionYear: '2025',
        graduationYear: '2026',
        yearOfStudy: 'Fall Semester',
        courseStartDate: '2025-09-02',
        currentEnrollmentTerm: 'Fall 2025',
        currentTerm: 'Fall 2025',
        enrollmentStatus: 'Active',
        learningModality: 'Online/Remote',
        billingAddress: '123 Meadowbrook Road, Jackson, MS 39211',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: today.toISOString().split('T')[0],
        lateFeeDate: today.toISOString().split('T')[0],
        previousBalance: 0,
        charges: [
            { description: 'Program Tuition Fee', quantity: 1, unit: 'program', unitCost: 2500 },
        ],
        payments: [],
        paymentPortalUrl: 'https://theicn.org/payment-portal',
        billingOfficeInfo: 'Finance Dept | finance@theicn.org',
        supportContact: 'Contact helpdesk@theicn.org.',
        confidentialityNotice: 'Confidential.'
    };
};

const createRandomUCNData = (): ReceiptData => {
    const data = createInitialUCNData();
    data.receiptNumber = `UCN-RCPT-2025-${randomInt(10000, 99999)}`;
    data.studentId = `UCN-SCN-2025-${randomInt(1000, 9999)}`;
    data.studentName = generateRandomName();
    data.emailId = `${data.studentName.split(' ')[0].toLowerCase()}.${randomInt(1000, 9999)}@ucn-edu.org`;
    return data;
};

// --- PARK UNIVERSITY ---
const parkInfo: UniversityInfo = {
    name: 'Park University',
    address1: '8700 NW River Park Dr',
    address2: 'Parkville, MO 64152',
    address3: 'USA',
    logo: DEFAULT_LOGO,
    onlineProgramDirector: 'Brynn Bologna, Director of Financial Aid',
};

const createInitialParkData = (): ReceiptData => {
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    return {
        receiptNumber: `100055421`,
        studentName: 'LIAM MILLER',
        studentId: `1234567`,
        emailId: 'lmiller@park.edu',
        programOfStudy: 'B.S. in Business Administration',
        department: 'School of Business',
        schoolFaculty: 'College of Management',
        admissionYear: '2025',
        graduationYear: '2029',
        yearOfStudy: 'Freshman Year',
        courseStartDate: '2025-08-25',
        currentEnrollmentTerm: 'Fall 2025',
        currentTerm: 'Fall 2025',
        enrollmentStatus: 'Active Enrollment',
        learningModality: 'Online/Remote',
        billingAddress: '456 Oak Street, Kansas City, MO 64106',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        previousBalance: 0,
        charges: [
            { description: 'Undergraduate Tuition (Online)', quantity: 1, unit: 'credit hour', unitCost: 450 },
            { description: 'Technology Fee', quantity: 1, unit: 'semester', unitCost: 150 },
        ],
        payments: [
            { description: 'Initial Deposit', date: today.toISOString().split('T')[0], amount: 500 },
        ],
        paymentPortalUrl: 'https://www.park.edu/tuition-financial-aid/payment-options/',
        billingOfficeInfo: 'Student Accounts | (816) 584-6222 | studentaccounts@park.edu',
        supportContact: 'Contact the Office of the Registrar for academic questions.',
        confidentialityNotice: 'This document is for official university use only.'
    };
};

const createRandomParkData = (): ReceiptData => {
    const data = createInitialParkData();
    data.receiptNumber = String(randomInt(100000000, 999999999));
    data.studentId = String(randomInt(1000000, 9999999));
    data.studentName = generateRandomName();
    data.emailId = `${data.studentName.split(' ')[0].toLowerCase()}.${data.studentId.substring(0, 4)}@park.edu`;
    return data;
};

// --- MASENO UNIVERSITY ---
const masenoInfo: UniversityInfo = {
    name: 'Maseno University',
    address1: 'Private Bag',
    address2: 'Maseno, Kisumu-Busia Road',
    address3: 'Kenya',
    logo: 'https://files.catbox.moe/60tw77.png', // Placeholder logo
    onlineProgramDirector: 'Prof. Julius O. Nyabundi, Vice-Chancellor',
};

const createInitialMasenoData = (): ReceiptData => {
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    return {
        receiptNumber: `MSU/RCPT/2025/${randomInt(1000, 9999)}`,
        studentName: 'KEVIN OTIENO',
        studentId: `BIT/00123/025`,
        emailId: 'kotieno@maseno.ac.ke',
        programOfStudy: 'B.Sc. in Information Technology',
        department: 'Department of IT',
        schoolFaculty: 'School of Computing and Informatics',
        admissionYear: '2025',
        graduationYear: '2029',
        yearOfStudy: 'Year 1, Semester 1',
        courseStartDate: '2025-09-08',
        currentEnrollmentTerm: 'Sept-Dec 2025',
        currentTerm: 'Sept-Dec 2025',
        enrollmentStatus: 'Active',
        learningModality: 'In-Person',
        billingAddress: 'P.O. Box 333, Maseno, Kenya',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        previousBalance: 0,
        charges: [
            { description: 'Tuition Fee', quantity: 1, unit: 'semester', unitCost: 45000 },
            { description: 'Examination Fee', quantity: 1, unit: 'semester', unitCost: 5000 },
            { description: 'Activity Fee', quantity: 1, unit: 'semester', unitCost: 2000 },
            { description: 'Medical Fee', quantity: 1, unit: 'semester', unitCost: 3000 },
        ],
        payments: [
            { description: 'HELB Loan Disbursement', date: today.toISOString().split('T')[0], amount: 30000 },
        ],
        paymentPortalUrl: 'https://portal.maseno.ac.ke/payment',
        billingOfficeInfo: 'Finance Department | +254 57 351622 | finance@maseno.ac.ke',
        supportContact: 'Contact the Registrar (Academic Affairs) for registration queries.',
        confidentialityNotice: 'This is an official financial record of Maseno University.'
    };
};

const createRandomMasenoData = (): ReceiptData => {
    const data = createInitialMasenoData();
    data.receiptNumber = `MSU/RCPT/2025/${randomInt(1000, 9999)}`;
    data.studentId = `BIT/${randomInt(10000, 99999)}/025`;
    data.studentName = generateRandomName();
    data.emailId = `${data.studentName.split(' ')[0].toLowerCase()}@maseno.ac.ke`;
    return data;
};

export const universityPresets: UniversityPreset[] = [
    { id: 'princeton', name: 'Princeton University', info: princetonInfo, createInitialData: createInitialPrincetonData, createRandomData: createRandomPrincetonData, currency: 'USD', locale: 'en-US', duration: 4 },
    { id: 'lloyd', name: 'Lloyd Law College', info: lloydInfo, createInitialData: createInitialLloydData, createRandomData: createRandomLloydData, currency: 'INR', locale: 'en-IN', duration: 5 },
    { id: 'ucn', name: 'University of Child Nutrition', info: ucnInfo, createInitialData: createInitialUCNData, createRandomData: createRandomUCNData, currency: 'USD', locale: 'en-US', duration: 1 },
    { id: 'park', name: 'Park University', info: parkInfo, createInitialData: createInitialParkData, createRandomData: createRandomParkData, currency: 'USD', locale: 'en-US', duration: 4 },
    { id: 'maseno', name: 'Maseno University', info: masenoInfo, createInitialData: createInitialMasenoData, createRandomData: createRandomMasenoData, currency: 'KES', locale: 'en-KE', duration: 4 },
];
