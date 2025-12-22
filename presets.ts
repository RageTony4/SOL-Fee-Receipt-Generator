
import type { ReceiptData, UniversityInfo, UniversityPreset } from './types';

// --- NAME POOLS FOR >1000 UNIQUE COMBINATIONS ---

const usedNames = new Set<string>();

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateUniqueName = (firstNames: string[], lastNames: string[]): string => {
    let name = '';
    let attempts = 0;
    const maxAttempts = 100;

    // Try to find a unique name combination
    do {
        const first = getRandomItem(firstNames);
        const last = getRandomItem(lastNames);
        name = `${first} ${last}`;
        attempts++;
    } while (usedNames.has(name) && attempts < maxAttempts);

    // If we run out of attempts (pool exhausted or bad luck), add a random suffix
    if (usedNames.has(name)) {
        name = `${name} ${Math.floor(Math.random() * 1000)}`;
    }

    usedNames.add(name);
    return name;
};

// ~40 First x ~30 Last = ~1200 combinations per region
const ilFirstNames = ['Noam', 'Ariel', 'David', 'Daniel', 'Ori', 'Itay', 'Guy', 'Omer', 'Yonatan', 'Amit', 'Moshe', 'Yosef', 'Eitan', 'Tomer', 'Ido', 'Maor', 'Elad', 'Dor', 'Gilad', 'Yaniv', 'Maya', 'Noa', 'Tamar', 'Shira', 'Yael', 'Adi', 'Tal', 'Hila', 'Michal', 'Roni', 'Gal', 'Lior', 'Neta', 'Rotem', 'Stav', 'Yuval', 'Bar', 'Chen', 'Shir', 'Mor'];
const ilLastNames = ['Cohen', 'Levy', 'Mizrahi', 'Peretz', 'Biton', 'Dahan', 'Avraham', 'Friedman', 'Malka', 'Azulay', 'Katz', 'Yosef', 'Amar', 'Ohana', 'Hadad', 'Gabay', 'Ben-David', 'Adler', 'Klein', 'Vinograd', 'Shapira', 'Epstein', 'Levin', 'Schwartz', 'Bar-Lev', 'Golan', 'Tal', 'Sasson', 'Sharabi', 'Edri'];

const inFirstNames = ['Aarav', 'Vihaan', 'Aditya', 'Arjun', 'Sai', 'Reyansh', 'Aryan', 'Krishna', 'Ishaan', 'Shaurya', 'Rohan', 'Kabir', 'Vivaan', 'Ansh', 'Ayaan', 'Dhruv', 'Aadya', 'Diya', 'Saanvi', 'Ananya', 'Pari', 'Myra', 'Riya', 'Aarohi', 'Kiara', 'Anaisha', 'Prisha', 'Ishita', 'Sneha', 'Pooja', 'Neha', 'Rahul', 'Vikram', 'Suresh', 'Raj', 'Amit', 'Sanjay', 'Manish', 'Deepak', 'Vijay'];
const inLastNames = ['Sharma', 'Verma', 'Gupta', 'Malhotra', 'Singh', 'Kumar', 'Patel', 'Joshi', 'Mehta', 'Reddy', 'Nair', 'Kapoor', 'Khan', 'Bhatia', 'Chopra', 'Desai', 'Jain', 'Agarwal', 'Chatterjee', 'Das', 'Roy', 'Sinha', 'Chaudhary', 'Yadav', 'Mishra', 'Pandey', 'Tiwari', 'Dubey', 'Saxena', 'Rawat'];

const enFirstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Oliver', 'George', 'Harry', 'Jack', 'Jacob', 'Charlie', 'Thomas', 'Oscar', 'William', 'James'];
const enLastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter'];


// --- BAR-ILAN UNIVERSITY ---
const biuInfo: UniversityInfo = {
    name: 'Bar-Ilan University',
    address1: 'Max and Anna Webb Street',
    address2: 'Ramat Gan, 5290002',
    address3: 'Israel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bar_Ilan_University_Logo.svg/1024px-Bar_Ilan_University_Logo.svg.png',
    onlineProgramDirector: 'Prof. Arie Zaban, President',
};

const createInitialBIUData = (): ReceiptData => {
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    const lateFeeDate = new Date(); lateFeeDate.setDate(today.getDate() + 45);
    const paymentDate = new Date(); paymentDate.setDate(today.getDate() - 10);
    const admissionYear = '2025';

    return {
        receiptNumber: `BIU-RCPT-${admissionYear}-00392`,
        studentName: 'NOAM COHEN',
        studentId: `BIU-${admissionYear}-88421`,
        emailId: 'noam.cohen@biu.ac.il',
        programOfStudy: 'B.Sc. in Computer Science',
        department: 'Department of Computer Science',
        schoolFaculty: 'Faculty of Exact Sciences',
        admissionYear,
        graduationYear: String(parseInt(admissionYear, 10) + 3),
        yearOfStudy: 'Year 1, Semester A',
        courseStartDate: '2025-10-14',
        learningModality: 'Online/Remote',
        billingAddress: 'Herzl St 15, Tel Aviv, 6688402, Israel',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: lateFeeDate.toISOString().split('T')[0],
        previousBalance: 0,
        charges: [
            { description: 'Annual Tuition Fee', quantity: 1, unit: 'year', unitCost: 14000 },
            { description: 'Security Fee', quantity: 1, unit: 'flat rate', unitCost: 450 },
            { description: 'Student Union Fee', quantity: 1, unit: 'flat rate', unitCost: 350 },
        ],
        payments: [
            { description: 'Credit Card Payment (Stripe)', date: paymentDate.toISOString().split('T')[0], amount: 5000 },
        ],
        paymentPortalUrl: 'https://biu.ac.il/en/payment',
        billingOfficeInfo: 'Tuition Dept | +972-3-531-8111 | tuition@biu.ac.il',
        supportContact: 'For queries, contact the Student Administration.',
        confidentialityNotice: 'This document is confidential and intended for the student.'
    };
};

const generateRandomBIUData = (): ReceiptData => {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    const lateFeeDate = new Date(); lateFeeDate.setDate(today.getDate() + 45);

    const programs = ['B.A. in Jewish Studies', 'B.Sc. in Life Sciences', 'LL.B. Law', 'B.Sc. in Electrical Engineering', 'B.A. in Psychology', 'M.Sc. in Brain Sciences', 'Ph.D. in Biblical Studies', 'B.A. in Political Science', 'B.Sc. in Mathematics', 'M.A. in English Literature'];
    const addresses = ['Jabotinsky St 45, Ramat Gan, 5244301', 'Dizengoff St 100, Tel Aviv, 6439611', 'Jaffa Rd 22, Jerusalem, 9414105', 'Weizmann St 10, Rehovot, 7628001', 'Ahuza St 90, Ra\'anana, 4345005', 'Herzl St 55, Rishon LeZion, 7520405'];
    
    const studentName = generateUniqueName(ilFirstNames, ilLastNames).toUpperCase();
    const admissionYear = '2025';
    const program = getRandomItem(programs);
    const studentIdSuffix = String(randomInt(10000, 99999));

    return {
        ...createInitialBIUData(),
        receiptNumber: `BIU-RCPT-${admissionYear}-${randomInt(10000, 99999)}`,
        studentName,
        programOfStudy: program,
        studentId: `BIU-${admissionYear}-${studentIdSuffix}`,
        emailId: `${studentName.toLowerCase().replace(/ /g, '.').replace(/[^a-z.]/g, '')}.${studentIdSuffix}@biu.ac.il`,
        graduationYear: String(parseInt(admissionYear, 10) + 3),
        billingAddress: getRandomItem(addresses),
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: lateFeeDate.toISOString().split('T')[0],
        charges: [
            { description: 'Annual Tuition Fee', quantity: 1, unit: 'year', unitCost: randomInt(11, 16) * 1000 },
            { description: 'Welfare Fee', quantity: 1, unit: 'flat rate', unitCost: 350 },
        ],
        payments: [{
            description: 'Online Payment',
            date: new Date(today.getTime() - randomInt(5, 25) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            amount: randomInt(20, 80) * 100
        }]
    };
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
    const lateFeeDate = new Date(); lateFeeDate.setDate(today.getDate() + 45);
    const paymentDate = new Date(); paymentDate.setDate(today.getDate() - 10);
    const admissionYear = '2025';

    return {
        receiptNumber: `LLC-RCPT-${admissionYear}-00786`,
        studentName: 'AARAV SHARMA',
        studentId: `LLC/BALLB/${admissionYear}/01234`,
        emailId: 'aarav.01234@lloydlawcollege.edu.in',
        programOfStudy: 'B.A. LL.B (5-Year Integrated Course)',
        department: 'Undergraduate Studies',
        schoolFaculty: 'School of Law',
        admissionYear,
        graduationYear: String(parseInt(admissionYear, 10) + 5),
        yearOfStudy: 'YEAR I, SEMESTER I',
        courseStartDate: '2025-08-15',
        learningModality: 'Online/Remote',
        billingAddress: 'A-42, Sector 15, Noida, Uttar Pradesh 201301',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: lateFeeDate.toISOString().split('T')[0],
        previousBalance: 15000.00,
        charges: [
            { description: 'Tuition Fee (Semester 1)', quantity: 1, unit: 'semester', unitCost: 150000 },
            { description: 'University Examination Fee', quantity: 1, unit: 'flat rate', unitCost: 3000 },
            { description: 'Library & E-Resource Fee', quantity: 1, unit: 'flat rate', unitCost: 5000 },
        ],
        payments: [
            { description: 'Online Payment via Portal', date: paymentDate.toISOString().split('T')[0], amount: 75000 },
        ],
        paymentPortalUrl: 'https://lloydlawcollege.edu.in/pay-online',
        billingOfficeInfo: 'Accounts Office | (0120) 612 9900 | accounts@lloydlawcollege.edu.in',
        supportContact: 'For questions, contact Admissions at admissions@lloydlawcollege.edu.in.',
        confidentialityNotice: 'This statement is confidential and intended solely for the recipient.'
    };
};

const generateRandomLloydData = (): ReceiptData => {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    const admissionYear = '2025';

    const studentName = generateUniqueName(inFirstNames, inLastNames).toUpperCase();
    const studentIdSuffix = String(randomInt(1000, 9999));

    return {
        ...createInitialLloydData(),
        receiptNumber: `LLC-RCPT-${admissionYear}-${randomInt(10000, 99999)}`,
        studentName,
        studentId: `LLC/LLB/${admissionYear}/${studentIdSuffix}`,
        emailId: `${studentName.split(' ')[0].toLowerCase()}.${studentName.split(' ')[1].toLowerCase()}.${randomInt(100, 999)}@lloydlawcollege.edu.in`,
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
    };
};


// --- UNIVERSITY OF CHILD NUTRITION ---
const ucnInfo: UniversityInfo = {
    name: 'University of Child Nutrition',
    address1: '65 W. E. H. Lamar Loop',
    address2: 'University, MS 38677',
    address3: 'USA',
    logo: 'https://files.catbox.moe/60tw77.png',
    onlineProgramDirector: 'Aleshia Hall-Campbell, Ph.D.',
};

const createInitialUCNData = (): ReceiptData => {
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    const lateFeeDate = new Date(); lateFeeDate.setDate(today.getDate() + 45);
    const admissionYear = '2025';

    return {
        receiptNumber: `UCN-RCPT-${admissionYear}-94331`,
        studentName: 'EMMA WILSON',
        studentId: `UCN-SCN-${admissionYear}-8821`,
        emailId: 'emma.wilson.8821@ucn-edu.org',
        programOfStudy: 'Certificate in School Nutrition',
        department: 'Professional Development',
        schoolFaculty: 'Institute of Child Nutrition',
        admissionYear,
        graduationYear: String(parseInt(admissionYear, 10) + 1),
        yearOfStudy: 'Certificate Program, Fall Semester',
        courseStartDate: '2025-09-02',
        learningModality: 'Online/Remote',
        billingAddress: '123 Meadowbrook Road, Jackson, MS 39211',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: lateFeeDate.toISOString().split('T')[0],
        previousBalance: 0,
        charges: [
            { description: 'Program Tuition Fee', quantity: 1, unit: 'program', unitCost: 2500 },
            { description: 'Digital Materials & Tech Fee', quantity: 1, unit: 'flat rate', unitCost: 150 },
        ],
        payments: [
            { description: 'State Agency Scholarship', date: new Date(today.getTime() - 864000000).toISOString().split('T')[0], amount: 500 },
        ],
        paymentPortalUrl: 'https://theicn.org/payment-portal',
        billingOfficeInfo: 'Finance Dept | (662) 915-7658 | finance@theicn.org',
        supportContact: 'For questions, contact Registration at helpdesk@theicn.org.',
        confidentialityNotice: 'This statement is confidential and intended solely for the recipient.'
    };
};

const generateRandomUCNData = (): ReceiptData => {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    const admissionYear = '2025';
    
    const studentName = generateUniqueName(enFirstNames, enLastNames).toUpperCase();
    const studentIdSuffix = String(randomInt(1000, 9999));

    return {
        ...createInitialUCNData(),
        receiptNumber: `UCN-RCPT-${admissionYear}-${randomInt(10000, 99999)}`,
        studentName,
        studentId: `UCN-SCN-${admissionYear}-${studentIdSuffix}`,
        emailId: `${studentName.split(' ')[0].toLowerCase()}.${studentName.split(' ')[1].toLowerCase()}.${randomInt(100, 999)}@ucn-edu.org`,
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
    };
};


// --- UNIVERSITY OF WARWICK ---
const warwickInfo: UniversityInfo = {
    name: 'University of Warwick',
    address1: 'Coventry',
    address2: 'CV4 7AL',
    address3: 'United Kingdom',
    logo: 'https://files.catbox.moe/pc7ikz.png',
    onlineProgramDirector: 'Prof. Stuart Croft, Vice-Chancellor',
};

const createInitialWarwickData = (): ReceiptData => {
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 21);
    const lateFeeDate = new Date(); lateFeeDate.setDate(today.getDate() + 35);
    const admissionYear = '2025';
    
    return {
        receiptNumber: `UW-RCPT-${admissionYear}-10562`,
        studentName: 'OLIVER SMITH',
        studentId: `21-12345`,
        emailId: 'o.smith.1@warwick.ac.uk',
        programOfStudy: 'MSc in Data Analytics (Online)',
        department: 'WMG',
        schoolFaculty: 'Faculty of Science',
        admissionYear,
        graduationYear: String(parseInt(admissionYear, 10) + 1),
        yearOfStudy: 'Postgraduate Taught, Year 1',
        courseStartDate: '2025-10-06',
        learningModality: 'Online/Remote',
        billingAddress: 'Flat 12, Kensington House, London, W8 4PL',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: lateFeeDate.toISOString().split('T')[0],
        previousBalance: 0,
        charges: [
            { description: 'Tuition Fee (Home)', quantity: 1, unit: 'academic year', unitCost: 9250 },
            { description: 'Administrative Fee', quantity: 1, unit: 'flat rate', unitCost: 250 },
        ],
        payments: [
            { description: 'Initial Deposit', date: new Date(today.getTime() - 864000000).toISOString().split('T')[0], amount: 1000 },
        ],
        paymentPortalUrl: 'https://warwick.ac.uk/services/finance/studentfinance/paymentmethods',
        billingOfficeInfo: 'Student Finance | +44 (0)24 7652 2298 | studentfinance@warwick.ac.uk',
        supportContact: 'For queries, contact the WMG Admissions Team.',
        confidentialityNotice: 'This is a confidential financial document for the named recipient only.'
    };
};

const generateRandomWarwickData = (): ReceiptData => {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 21);
    const admissionYear = '2025';

    const studentName = generateUniqueName(enFirstNames, enLastNames).toUpperCase();
    const studentIdSuffix = String(randomInt(10000, 99999));

    return {
        ...createInitialWarwickData(),
        receiptNumber: `UW-RCPT-${admissionYear}-${randomInt(10000, 99999)}`,
        studentName,
        studentId: `21-${studentIdSuffix}`,
        emailId: `${studentName.split(' ')[0][0].toLowerCase()}.${studentName.split(' ')[1].toLowerCase()}.${randomInt(10, 99)}@warwick.ac.uk`,
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
    };
};


// --- COLUMBIA GORGE COMMUNITY COLLEGE ---
const columbiaGorgeInfo: UniversityInfo = {
    name: 'Columbia Gorge Community College',
    address1: '400 E Scenic Dr',
    address2: 'The Dalles, OR 97058',
    address3: 'USA',
    logo: 'https://files.catbox.moe/mrnnqw.png',
    onlineProgramDirector: 'Dr. Marta Yera Cronin, President',
};

const createInitialColumbiaGorgeData = (): ReceiptData => {
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    const lateFeeDate = new Date(); lateFeeDate.setDate(today.getDate() + 45);
    const admissionYear = '2025';

    return {
        receiptNumber: `CGCC-RCPT-${admissionYear}-54321`,
        studentName: 'SOPHIA MILLER',
        studentId: `CGCC-01987-${admissionYear}`,
        emailId: 'smiller1987@student.cgcc.edu',
        programOfStudy: 'Associate of Arts Oregon Transfer',
        department: 'General Studies',
        schoolFaculty: 'Arts & Sciences Division',
        admissionYear,
        graduationYear: String(parseInt(admissionYear, 10) + 2),
        yearOfStudy: 'YEAR I, FALL QUARTER',
        courseStartDate: '2025-09-22',
        learningModality: 'Online/Remote',
        billingAddress: '555 River View Dr, Hood River, OR 97031',
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        lateFeeDate: lateFeeDate.toISOString().split('T')[0],
        previousBalance: 0,
        charges: [
            { description: 'Tuition (15 Credits)', quantity: 15, unit: 'credit', unitCost: 125 },
            { description: 'Technology Fee', quantity: 1, unit: 'flat rate', unitCost: 100 },
        ],
        payments: [
            { description: 'Financial Aid - Pell Grant', date: new Date(today.getTime() - 864000000).toISOString().split('T')[0], amount: 1000 },
        ],
        paymentPortalUrl: 'https://www.cgcc.edu/admissions/paying-for-college',
        billingOfficeInfo: 'Student Services | (541) 506-6000 | studentservices@cgcc.edu',
        supportContact: 'For questions, contact the Business Office at businessoffice@cgcc.edu.',
        confidentialityNotice: 'This statement is confidential and intended solely for the recipient.'
    };
};

const generateRandomColumbiaGorgeData = (): ReceiptData => {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const today = new Date();
    const dueDate = new Date(); dueDate.setDate(today.getDate() + 30);
    const admissionYear = '2025';

    const studentName = generateUniqueName(enFirstNames, enLastNames).toUpperCase();
    const studentIdSuffix = String(randomInt(10000, 99999));

    return {
        ...createInitialColumbiaGorgeData(),
        receiptNumber: `CGCC-RCPT-${admissionYear}-${randomInt(10000, 99999)}`,
        studentName,
        studentId: `CGCC-${studentIdSuffix}`,
        emailId: `${studentName.split(' ')[0][0].toLowerCase()}${studentName.split(' ')[1].toLowerCase()}${randomInt(10, 99)}@student.cgcc.edu`,
        receiptDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
    };
};

// --- EXPORT PRESETS ---

export const universityPresets: UniversityPreset[] = [
    { id: 'biu', name: 'Bar-Ilan University', info: biuInfo, createInitialData: createInitialBIUData, createRandomData: generateRandomBIUData, currency: 'ILS', locale: 'en-IL', duration: 3 },
    { id: 'lloyd', name: 'Lloyd Law College', info: lloydInfo, createInitialData: createInitialLloydData, createRandomData: generateRandomLloydData, currency: 'INR', locale: 'en-IN', duration: 5 },
    { id: 'ucn', name: 'University of Child Nutrition', info: ucnInfo, createInitialData: createInitialUCNData, createRandomData: generateRandomUCNData, currency: 'USD', locale: 'en-US', duration: 1 },
    { id: 'warwick', name: 'University of Warwick', info: warwickInfo, createInitialData: createInitialWarwickData, createRandomData: generateRandomWarwickData, currency: 'GBP', locale: 'en-GB', duration: 1 },
    { id: 'cgcc', name: 'Columbia Gorge Community College', info: columbiaGorgeInfo, createInitialData: createInitialColumbiaGorgeData, createRandomData: generateRandomColumbiaGorgeData, currency: 'USD', locale: 'en-US', duration: 2 },
];
