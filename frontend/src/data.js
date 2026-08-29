export const suspects = [
  { id: "S001", name: "Rajesh Kumar Sharma", aliases: ["Raju", "RK"], age: 34, gender: "M", phone: ["+91 9876543210", "+91 8765432109"], addresses: ["12, Dharavi Cross Rd, Mumbai", "45, Jogeshwari East, Mumbai"], city: "Mumbai", vehicles: ["MH-01-AB-1234"], riskScore: 92, status: "wanted", linkedCases: ["FIR/2024/MH/001", "FIR/2024/MH/003"], community: 1, photo: null },
  { id: "S002", name: "Vikram Singh Rathore", aliases: ["Vicky", "Don"], age: 41, gender: "M", phone: ["+91 9988776655"], addresses: ["78, Chandni Chowk, Delhi"], city: "Delhi", vehicles: ["DL-03-CD-5678"], riskScore: 88, status: "arrested", linkedCases: ["FIR/2024/DL/001", "FIR/2024/DL/002"], community: 2, photo: null },
  { id: "S003", name: "Priya Mehta", aliases: ["PM", "Goldie"], age: 29, gender: "F", phone: ["+91 9112233445"], addresses: ["34, Bandra West, Mumbai"], city: "Mumbai", vehicles: ["MH-02-EF-9012"], riskScore: 75, status: "under_surveillance", linkedCases: ["FIR/2024/MH/001"], community: 1, photo: null },
  { id: "S004", name: "Arjun Patel", aliases: ["AJ"], age: 37, gender: "M", phone: ["+91 9223344556", "+91 7890123456"], addresses: ["56, SG Highway, Ahmedabad", "12, MG Road, Pune"], city: "Pune", vehicles: ["MH-12-GH-3456"], riskScore: 81, status: "wanted", linkedCases: ["FIR/2024/MH/003", "FIR/2024/PU/001"], community: 3, photo: null },
  { id: "S005", name: "Mohammed Irfan Sheikh", aliases: ["Irfan Bhai"], age: 45, gender: "M", phone: ["+91 9334455667"], addresses: ["89, Mohammed Ali Rd, Mumbai"], city: "Mumbai", vehicles: ["MH-01-IJ-7890"], riskScore: 95, status: "wanted", linkedCases: ["FIR/2024/MH/001", "FIR/2024/MH/002", "FIR/2024/MH/003"], community: 1, photo: null },
  { id: "S006", name: "Deepak Yadav", aliases: ["Deepu", "DY"], age: 31, gender: "M", phone: ["+91 9445566778"], addresses: ["23, Hazratganj, Lucknow"], city: "Lucknow", vehicles: ["UP-32-KL-1234"], riskScore: 67, status: "under_surveillance", linkedCases: ["FIR/2024/UP/001"], community: 4, photo: null },
  { id: "S007", name: "Sunita Devi", aliases: ["Soni"], age: 38, gender: "F", phone: ["+91 9556677889"], addresses: ["67, Aminabad, Lucknow"], city: "Lucknow", vehicles: [], riskScore: 58, status: "released", linkedCases: ["FIR/2024/UP/001"], community: 4, photo: null },
  { id: "S008", name: "Karan Malhotra", aliases: ["KM", "Goldy"], age: 28, gender: "M", phone: ["+91 9667788990", "+91 8901234567"], addresses: ["45, Connaught Place, Delhi"], city: "Delhi", vehicles: ["DL-05-MN-5678"], riskScore: 79, status: "wanted", linkedCases: ["FIR/2024/DL/001", "FIR/2024/DL/002"], community: 2, photo: null },
  { id: "S009", name: "Rohit Verma", aliases: ["Rohit Don"], age: 33, gender: "M", phone: ["+91 9778899001"], addresses: ["12, MI Road, Jaipur"], city: "Jaipur", vehicles: ["RJ-14-OP-9012"], riskScore: 72, status: "under_surveillance", linkedCases: ["FIR/2024/RJ/001"], community: 5, photo: null },
  { id: "S010", name: "Amit Tiwari", aliases: ["Amitabh"], age: 39, gender: "M", phone: ["+91 9889900112"], addresses: ["78, Gomti Nagar, Lucknow"], city: "Lucknow", vehicles: ["UP-32-QR-3456"], riskScore: 84, status: "wanted", linkedCases: ["FIR/2024/UP/001", "FIR/2024/MH/002"], community: 4, photo: null },
  { id: "S011", name: "Neha Gupta", aliases: ["Nehu"], age: 26, gender: "F", phone: ["+91 9990011223"], addresses: ["34, Lajpat Nagar, Delhi"], city: "Delhi", vehicles: ["DL-07-ST-7890"], riskScore: 63, status: "under_surveillance", linkedCases: ["FIR/2024/DL/002"], community: 2, photo: null },
  { id: "S012", name: "Sanjay Dubey", aliases: ["Sanju", "Baba"], age: 47, gender: "M", phone: ["+91 8801122334"], addresses: ["56, Koregaon Park, Pune"], city: "Pune", vehicles: ["MH-12-UV-1234"], riskScore: 90, status: "wanted", linkedCases: ["FIR/2024/PU/001", "FIR/2024/MH/003"], community: 3, photo: null },
  { id: "S013", name: "Rahul Chauhan", aliases: ["Rahu"], age: 30, gender: "M", phone: ["+91 8912233445"], addresses: ["89, Vaishali Nagar, Jaipur"], city: "Jaipur", vehicles: ["RJ-14-WX-5678"], riskScore: 69, status: "under_surveillance", linkedCases: ["FIR/2024/RJ/001"], community: 5, photo: null },
  { id: "S014", name: "Pooja Sharma", aliases: ["PJ"], age: 32, gender: "F", phone: ["+91 8023344556"], addresses: ["23, Andheri West, Mumbai"], city: "Mumbai", vehicles: ["MH-01-YZ-9012"], riskScore: 55, status: "released", linkedCases: ["FIR/2024/MH/001"], community: 1, photo: null },
  { id: "S015", name: "Manish Agarwal", aliases: ["Mani", "MA"], age: 43, gender: "M", phone: ["+91 8134455667", "+91 7012345678"], addresses: ["67, Sarojini Nagar, Delhi", "12, Karol Bagh, Delhi"], city: "Delhi", vehicles: ["DL-09-AB-3456"], riskScore: 86, status: "wanted", linkedCases: ["FIR/2024/DL/001", "FIR/2024/DL/002", "FIR/2024/MH/002"], community: 2, photo: null },
  { id: "S016", name: "Ravi Shankar Mishra", aliases: ["Pandit"], age: 50, gender: "M", phone: ["+91 8245566778"], addresses: ["45, Aliganj, Lucknow"], city: "Lucknow", vehicles: ["UP-32-CD-7890"], riskScore: 77, status: "arrested", linkedCases: ["FIR/2024/UP/001"], community: 4, photo: null },
  { id: "S017", name: "Aisha Khan", aliases: ["AK"], age: 27, gender: "F", phone: ["+91 8356677889"], addresses: ["78, Bani Park, Jaipur"], city: "Jaipur", vehicles: [], riskScore: 61, status: "under_surveillance", linkedCases: ["FIR/2024/RJ/001"], community: 5, photo: null },
  { id: "S018", name: "Vijay Patil", aliases: ["VP", "Dada"], age: 36, gender: "M", phone: ["+91 8467788990"], addresses: ["12, Viman Nagar, Pune"], city: "Pune", vehicles: ["MH-14-EF-1234"], riskScore: 83, status: "wanted", linkedCases: ["FIR/2024/PU/001", "FIR/2024/MH/003"], community: 3, photo: null },
  { id: "S019", name: "Suresh Reddy", aliases: ["Suri"], age: 40, gender: "M", phone: ["+91 8578899001"], addresses: ["34, Juhu, Mumbai"], city: "Mumbai", vehicles: ["MH-02-GH-5678"], riskScore: 71, status: "under_surveillance", linkedCases: ["FIR/2024/MH/002"], community: 1, photo: null },
  { id: "S020", name: "Ankit Joshi", aliases: ["Andy"], age: 25, gender: "M", phone: ["+91 8689900112"], addresses: ["56, Malviya Nagar, Jaipur"], city: "Jaipur", vehicles: ["RJ-14-IJ-9012"], riskScore: 64, status: "under_surveillance", linkedCases: ["FIR/2024/RJ/001"], community: 5, photo: null },
  { id: "S021", name: "Dinesh Saxena", aliases: ["Dinu"], age: 44, gender: "M", phone: ["+91 8790011223"], addresses: ["89, Indira Nagar, Lucknow"], city: "Lucknow", vehicles: ["UP-32-KL-5678"], riskScore: 73, status: "wanted", linkedCases: ["FIR/2024/UP/001", "FIR/2024/MH/002"], community: 4, photo: null },
  { id: "S022", name: "Neeraj Kapoor", aliases: ["NK", "Captain"], age: 35, gender: "M", phone: ["+91 8801234567"], addresses: ["23, Pitampura, Delhi"], city: "Delhi", vehicles: ["DL-11-MN-3456"], riskScore: 78, status: "wanted", linkedCases: ["FIR/2024/DL/001"], community: 2, photo: null },
  { id: "S023", name: "Geeta Rawat", aliases: ["Geet"], age: 31, gender: "F", phone: ["+91 8912345678"], addresses: ["67, Dadar West, Mumbai"], city: "Mumbai", vehicles: [], riskScore: 52, status: "released", linkedCases: ["FIR/2024/MH/001"], community: 1, photo: null },
  { id: "S024", name: "Harish Choudhary", aliases: ["Harry"], age: 42, gender: "M", phone: ["+91 9023456789"], addresses: ["45, Shivaji Nagar, Pune"], city: "Pune", vehicles: ["MH-12-OP-7890"], riskScore: 80, status: "wanted", linkedCases: ["FIR/2024/PU/001"], community: 3, photo: null },
  { id: "S025", name: "Farid Ahmed", aliases: ["Faridu"], age: 38, gender: "M", phone: ["+91 9134567890"], addresses: ["12, Charbagh, Lucknow"], city: "Lucknow", vehicles: ["UP-32-QR-1234"], riskScore: 66, status: "under_surveillance", linkedCases: ["FIR/2024/UP/001"], community: 4, photo: null },
  { id: "S026", name: "Lakshmi Iyer", aliases: ["Lucky"], age: 33, gender: "F", phone: ["+91 9245678901"], addresses: ["78, Powai, Mumbai"], city: "Mumbai", vehicles: ["MH-03-ST-5678"], riskScore: 59, status: "under_surveillance", linkedCases: ["FIR/2024/MH/002"], community: 1, photo: null },
  { id: "S027", name: "Bharat Singh Thakur", aliases: ["Bharu", "Tiger"], age: 46, gender: "M", phone: ["+91 9356789012"], addresses: ["34, Mansarovar, Jaipur"], city: "Jaipur", vehicles: ["RJ-14-UV-9012"], riskScore: 87, status: "wanted", linkedCases: ["FIR/2024/RJ/001", "FIR/2024/DL/001"], community: 5, photo: null },
  { id: "S028", name: "Pankaj Mishra", aliases: ["Pankaj Bhai"], age: 39, gender: "M", phone: ["+91 9467890123"], addresses: ["56, Aundh, Pune"], city: "Pune", vehicles: ["MH-14-WX-3456"], riskScore: 74, status: "under_surveillance", linkedCases: ["FIR/2024/PU/001", "FIR/2024/MH/003"], community: 3, photo: null },
];

export const cases = [
  { id: "FIR/2024/MH/001", title: "Mumbai Theft Ring", type: "Organized Theft", date: "2024-03-15", status: "active", city: "Mumbai", description: "Organized theft ring operating across Mumbai's western suburbs, targeting high-value electronics and jewelry stores. Suspects use stolen vehicles and encrypted communication.", suspects: ["S001", "S003", "S005", "S014", "S023"], evidence: 12 },
  { id: "FIR/2024/MH/002", title: "Hawala Network - Mumbai-Lucknow", type: "Financial Fraud", date: "2024-05-22", status: "active", city: "Mumbai", description: "Cross-state hawala network facilitating illegal money transfers between Mumbai and Lucknow. Estimated ₹4.5 crore transferred through informal channels.", suspects: ["S005", "S010", "S015", "S019", "S021", "S026"], evidence: 8 },
  { id: "FIR/2024/MH/003", title: "Pune-Mumbai Drug Corridor", type: "Drug Trafficking", date: "2024-07-10", status: "active", city: "Mumbai", description: "Drug trafficking network operating between Pune and Mumbai. Contraband transported via private vehicles along the Mumbai-Pune Expressway.", suspects: ["S001", "S004", "S005", "S012", "S018", "S028"], evidence: 15 },
  { id: "FIR/2024/DL/001", title: "Delhi Cyber Fraud Ring", type: "Cyber Crime", date: "2024-04-08", status: "active", city: "Delhi", description: "Sophisticated cyber fraud ring operating fake call centers in Delhi, targeting elderly victims across India with tech support scams.", suspects: ["S002", "S008", "S015", "S022", "S027"], evidence: 20 },
  { id: "FIR/2024/DL/002", title: "Delhi Identity Theft Network", type: "Identity Theft", date: "2024-06-18", status: "active", city: "Delhi", description: "Network specializing in forging Aadhaar cards, PAN cards, and other identity documents for illegal immigrants and wanted criminals.", suspects: ["S002", "S008", "S011", "S015"], evidence: 10 },
  { id: "FIR/2024/UP/001", title: "Lucknow Extortion Syndicate", type: "Extortion", date: "2024-02-28", status: "active", city: "Lucknow", description: "Extortion syndicate targeting small business owners and shopkeepers in Lucknow. Operates through local enforcers and collects weekly 'protection money'.", suspects: ["S006", "S007", "S010", "S016", "S021", "S025"], evidence: 7 },
  { id: "FIR/2024/RJ/001", title: "Jaipur Arms Smuggling", type: "Arms Trafficking", date: "2024-08-05", status: "under_investigation", city: "Jaipur", description: "Illegal arms smuggling operation with connections to Rajasthan-border areas. Weapons sourced from neighboring states and sold through a network of intermediaries.", suspects: ["S009", "S013", "S017", "S020", "S027"], evidence: 11 },
  { id: "FIR/2024/PU/001", title: "Pune Real Estate Fraud", type: "Financial Fraud", date: "2024-09-12", status: "under_investigation", city: "Pune", description: "Large-scale real estate fraud involving fake property documents and land grabbing in Pune's emerging suburbs. Multiple victims reported losses exceeding ₹10 crore.", suspects: ["S004", "S012", "S018", "S024", "S028"], evidence: 14 },
];

function generateCDR() {
  const records = [];
  const connections = [
    ["S001","S003"],["S001","S005"],["S001","S014"],["S003","S005"],["S005","S010"],
    ["S005","S019"],["S005","S012"],["S002","S008"],["S002","S015"],["S008","S015"],
    ["S008","S011"],["S015","S022"],["S015","S011"],["S006","S007"],["S006","S010"],
    ["S006","S016"],["S010","S021"],["S010","S016"],["S016","S025"],["S007","S025"],
    ["S009","S013"],["S009","S027"],["S013","S020"],["S017","S020"],["S027","S020"],
    ["S004","S012"],["S004","S018"],["S012","S018"],["S012","S028"],["S018","S024"],
    ["S024","S028"],["S001","S012"],["S005","S015"],["S002","S027"],["S010","S005"],
    ["S021","S005"],["S019","S026"],["S015","S010"],["S022","S008"],["S006","S021"],
  ];
  const towers = [
    "MUM-AND-01","MUM-BAN-02","MUM-JUH-03","MUM-DAD-04","DEL-CP-01","DEL-LN-02",
    "DEL-PIT-03","LKN-HAZ-01","LKN-GOM-02","LKN-ALI-03","JAI-MI-01","JAI-VN-02",
    "JAI-MAN-03","PUN-KP-01","PUN-VN-02","PUN-AUN-03"
  ];
  let id = 1;
  for (let month = 1; month <= 12; month++) {
    for (const [from, to] of connections) {
      const count = Math.floor(Math.random() * 4) + 1;
      for (let c = 0; c < count; c++) {
        const day = Math.floor(Math.random() * 28) + 1;
        const hour = Math.floor(Math.random() * 24);
        const min = Math.floor(Math.random() * 60);
        records.push({
          id: `CDR${String(id++).padStart(5, "0")}`,
          from, to,
          timestamp: `2024-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}T${String(hour).padStart(2,"0")}:${String(min).padStart(2,"0")}:00`,
          duration: Math.floor(Math.random() * 1800) + 10,
          tower: towers[Math.floor(Math.random() * towers.length)],
          type: Math.random() > 0.2 ? "voice" : "sms"
        });
      }
    }
  }
  return records.sort((a,b) => b.timestamp.localeCompare(a.timestamp));
}

export const cdrRecords = generateCDR();

export const transactions = [
  { id: "TXN001", from: "S005", to: "S010", amount: 450000, date: "2024-03-20", type: "hawala", bank: "Cash Transfer", description: "Informal channel - Mumbai to Lucknow" },
  { id: "TXN002", from: "S010", to: "S021", amount: 275000, date: "2024-03-22", type: "hawala", bank: "Cash Transfer", description: "Lucknow internal distribution" },
  { id: "TXN003", from: "S015", to: "S005", amount: 890000, date: "2024-04-15", type: "bank", bank: "HDFC Bank", description: "Suspicious large deposit - shell company account" },
  { id: "TXN004", from: "S001", to: "S012", amount: 320000, date: "2024-05-10", type: "hawala", bank: "Cash Transfer", description: "Mumbai to Pune - suspected drug proceeds" },
  { id: "TXN005", from: "S012", to: "S018", amount: 180000, date: "2024-05-12", type: "upi", bank: "PhonePe", description: "Multiple small UPI transfers aggregated" },
  { id: "TXN006", from: "S002", to: "S008", amount: 560000, date: "2024-06-01", type: "bank", bank: "SBI", description: "Wire transfer - cyber fraud proceeds" },
  { id: "TXN007", from: "S008", to: "S015", amount: 340000, date: "2024-06-05", type: "bank", bank: "ICICI Bank", description: "Layered transfer through multiple accounts" },
  { id: "TXN008", from: "S006", to: "S016", amount: 125000, date: "2024-07-20", type: "cash", bank: "Cash", description: "Extortion collection - weekly aggregate" },
  { id: "TXN009", from: "S009", to: "S027", amount: 750000, date: "2024-08-15", type: "hawala", bank: "Cash Transfer", description: "Arms purchase payment - Jaipur to border" },
  { id: "TXN010", from: "S027", to: "S002", amount: 410000, date: "2024-08-20", type: "bank", bank: "Axis Bank", description: "Cross-state transfer - Jaipur to Delhi" },
  { id: "TXN011", from: "S004", to: "S024", amount: 1200000, date: "2024-09-15", type: "bank", bank: "Kotak Mahindra", description: "Real estate fraud - forged property sale" },
  { id: "TXN012", from: "S019", to: "S026", amount: 95000, date: "2024-04-28", type: "upi", bank: "Google Pay", description: "Frequent small transfers" },
  { id: "TXN013", from: "S021", to: "S015", amount: 670000, date: "2024-05-30", type: "hawala", bank: "Cash Transfer", description: "Lucknow to Delhi - multi-hop transfer" },
  { id: "TXN014", from: "S018", to: "S028", amount: 230000, date: "2024-10-05", type: "upi", bank: "Paytm", description: "Drug logistics payment" },
  { id: "TXN015", from: "S022", to: "S027", amount: 580000, date: "2024-09-01", type: "bank", bank: "PNB", description: "Delhi to Jaipur - arms network funding" },
];

export const locationCheckins = [
  { suspectId: "S001", location: "Dharavi, Mumbai", lat: 19.0430, lng: 72.8567, date: "2024-06-15", time: "14:30" },
  { suspectId: "S005", location: "Dharavi, Mumbai", lat: 19.0435, lng: 72.8570, date: "2024-06-15", time: "14:45" },
  { suspectId: "S003", location: "Dharavi, Mumbai", lat: 19.0432, lng: 72.8565, date: "2024-06-15", time: "15:00" },
  { suspectId: "S001", location: "Pune Station, Pune", lat: 18.5285, lng: 73.8743, date: "2024-07-20", time: "10:00" },
  { suspectId: "S012", location: "Pune Station, Pune", lat: 18.5290, lng: 73.8740, date: "2024-07-20", time: "10:15" },
  { suspectId: "S002", location: "Connaught Place, Delhi", lat: 28.6315, lng: 77.2167, date: "2024-05-10", time: "19:00" },
  { suspectId: "S008", location: "Connaught Place, Delhi", lat: 28.6318, lng: 77.2170, date: "2024-05-10", time: "19:20" },
  { suspectId: "S015", location: "Connaught Place, Delhi", lat: 28.6312, lng: 77.2165, date: "2024-05-10", time: "19:30" },
  { suspectId: "S006", location: "Hazratganj, Lucknow", lat: 26.8500, lng: 80.9460, date: "2024-04-05", time: "16:00" },
  { suspectId: "S010", location: "Hazratganj, Lucknow", lat: 26.8505, lng: 80.9465, date: "2024-04-05", time: "16:10" },
  { suspectId: "S016", location: "Hazratganj, Lucknow", lat: 26.8502, lng: 80.9462, date: "2024-04-05", time: "16:20" },
  { suspectId: "S009", location: "MI Road, Jaipur", lat: 26.9157, lng: 75.8010, date: "2024-08-01", time: "11:00" },
  { suspectId: "S027", location: "MI Road, Jaipur", lat: 26.9160, lng: 75.8015, date: "2024-08-01", time: "11:15" },
  { suspectId: "S005", location: "CST, Mumbai", lat: 18.9398, lng: 72.8355, date: "2024-09-10", time: "09:00" },
  { suspectId: "S015", location: "CST, Mumbai", lat: 18.9400, lng: 72.8358, date: "2024-09-10", time: "09:30" },
  { suspectId: "S004", location: "Shivaji Nagar, Pune", lat: 18.5308, lng: 73.8475, date: "2024-09-20", time: "13:00" },
  { suspectId: "S018", location: "Shivaji Nagar, Pune", lat: 18.5310, lng: 73.8478, date: "2024-09-20", time: "13:15" },
  { suspectId: "S024", location: "Shivaji Nagar, Pune", lat: 18.5305, lng: 73.8472, date: "2024-09-20", time: "13:30" },
];

export const networkEdges = [
  { source: "S001", target: "S003", type: "phone", weight: 45, label: "45 calls" },
  { source: "S001", target: "S005", type: "phone", weight: 67, label: "67 calls" },
  { source: "S001", target: "S014", type: "phone", weight: 23, label: "23 calls" },
  { source: "S001", target: "S012", type: "financial", weight: 320000, label: "₹3.2L transferred" },
  { source: "S003", target: "S005", type: "phone", weight: 34, label: "34 calls" },
  { source: "S005", target: "S010", type: "financial", weight: 450000, label: "₹4.5L hawala" },
  { source: "S005", target: "S010", type: "phone", weight: 89, label: "89 calls" },
  { source: "S005", target: "S015", type: "phone", weight: 56, label: "56 calls" },
  { source: "S005", target: "S019", type: "phone", weight: 31, label: "31 calls" },
  { source: "S005", target: "S012", type: "phone", weight: 42, label: "42 calls" },
  { source: "S005", target: "S021", type: "financial", weight: 670000, label: "₹6.7L via S010" },
  { source: "S002", target: "S008", type: "phone", weight: 78, label: "78 calls" },
  { source: "S002", target: "S008", type: "financial", weight: 560000, label: "₹5.6L wire" },
  { source: "S002", target: "S015", type: "phone", weight: 52, label: "52 calls" },
  { source: "S002", target: "S027", type: "phone", weight: 38, label: "38 calls" },
  { source: "S008", target: "S015", type: "phone", weight: 61, label: "61 calls" },
  { source: "S008", target: "S015", type: "financial", weight: 340000, label: "₹3.4L layered" },
  { source: "S008", target: "S011", type: "phone", weight: 44, label: "44 calls" },
  { source: "S008", target: "S022", type: "phone", weight: 37, label: "37 calls" },
  { source: "S015", target: "S022", type: "phone", weight: 29, label: "29 calls" },
  { source: "S015", target: "S011", type: "phone", weight: 33, label: "33 calls" },
  { source: "S015", target: "S010", type: "financial", weight: 670000, label: "₹6.7L via hawala" },
  { source: "S006", target: "S007", type: "phone", weight: 56, label: "56 calls" },
  { source: "S006", target: "S010", type: "phone", weight: 41, label: "41 calls" },
  { source: "S006", target: "S016", type: "phone", weight: 63, label: "63 calls" },
  { source: "S006", target: "S016", type: "financial", weight: 125000, label: "₹1.25L extortion" },
  { source: "S006", target: "S021", type: "phone", weight: 35, label: "35 calls" },
  { source: "S010", target: "S021", type: "phone", weight: 48, label: "48 calls" },
  { source: "S010", target: "S021", type: "financial", weight: 275000, label: "₹2.75L hawala" },
  { source: "S010", target: "S016", type: "phone", weight: 39, label: "39 calls" },
  { source: "S016", target: "S025", type: "phone", weight: 27, label: "27 calls" },
  { source: "S007", target: "S025", type: "phone", weight: 22, label: "22 calls" },
  { source: "S009", target: "S013", type: "phone", weight: 51, label: "51 calls" },
  { source: "S009", target: "S027", type: "phone", weight: 44, label: "44 calls" },
  { source: "S009", target: "S027", type: "financial", weight: 750000, label: "₹7.5L arms" },
  { source: "S013", target: "S020", type: "phone", weight: 36, label: "36 calls" },
  { source: "S017", target: "S020", type: "phone", weight: 28, label: "28 calls" },
  { source: "S027", target: "S020", type: "phone", weight: 32, label: "32 calls" },
  { source: "S027", target: "S002", type: "financial", weight: 410000, label: "₹4.1L bank" },
  { source: "S004", target: "S012", type: "phone", weight: 58, label: "58 calls" },
  { source: "S004", target: "S018", type: "phone", weight: 47, label: "47 calls" },
  { source: "S004", target: "S024", type: "financial", weight: 1200000, label: "₹12L fraud" },
  { source: "S012", target: "S018", type: "phone", weight: 65, label: "65 calls" },
  { source: "S012", target: "S018", type: "financial", weight: 180000, label: "₹1.8L UPI" },
  { source: "S012", target: "S028", type: "phone", weight: 43, label: "43 calls" },
  { source: "S018", target: "S024", type: "phone", weight: 38, label: "38 calls" },
  { source: "S018", target: "S028", type: "phone", weight: 41, label: "41 calls" },
  { source: "S018", target: "S028", type: "financial", weight: 230000, label: "₹2.3L UPI" },
  { source: "S024", target: "S028", type: "phone", weight: 29, label: "29 calls" },
  { source: "S019", target: "S026", type: "phone", weight: 35, label: "35 calls" },
  { source: "S019", target: "S026", type: "financial", weight: 95000, label: "₹95K UPI" },
  { source: "S022", target: "S027", type: "financial", weight: 580000, label: "₹5.8L arms fund" },
  { source: "S001", target: "S005", type: "location", weight: 3, label: "3 shared locations" },
  { source: "S001", target: "S003", type: "location", weight: 2, label: "2 shared locations" },
  { source: "S001", target: "S012", type: "location", weight: 1, label: "Pune Station meetup" },
  { source: "S002", target: "S008", type: "location", weight: 2, label: "2 shared locations" },
  { source: "S002", target: "S015", type: "location", weight: 1, label: "CP meetup" },
  { source: "S006", target: "S010", type: "location", weight: 2, label: "Hazratganj meetups" },
  { source: "S006", target: "S016", type: "location", weight: 1, label: "Hazratganj meetup" },
  { source: "S009", target: "S027", type: "location", weight: 1, label: "MI Road meetup" },
  { source: "S005", target: "S015", type: "location", weight: 1, label: "CST meetup" },
  { source: "S004", target: "S018", type: "location", weight: 1, label: "Shivaji Nagar meetup" },
  { source: "S018", target: "S024", type: "location", weight: 1, label: "Shivaji Nagar meetup" },
  { source: "S023", target: "S001", type: "case", weight: 1, label: "FIR/2024/MH/001" },
  { source: "S014", target: "S003", type: "case", weight: 1, label: "FIR/2024/MH/001" },
];

export const alerts = [
  { id: "ALT001", severity: "critical", title: "Large Hawala Transfer Detected", description: "₹8.9L transferred from S005 (Irfan Sheikh) to S015 (Manish Agarwal) via shell company account. Pattern matches known hawala routing.", suspects: ["S005", "S015"], case: "FIR/2024/MH/002", timestamp: "2024-10-28T14:30:00", read: false },
  { id: "ALT002", severity: "critical", title: "Cross-State Arms Network Link", description: "New connection identified between Jaipur arms network (S027) and Delhi cyber ring (S002). Financial transfer of ₹4.1L detected.", suspects: ["S027", "S002"], case: "FIR/2024/RJ/001", timestamp: "2024-10-27T09:15:00", read: false },
  { id: "ALT003", severity: "warning", title: "Unusual Call Pattern Spike", description: "Call frequency between S001 (Rajesh Sharma) and S005 (Irfan Sheikh) increased 340% in last 48 hours. 67 calls recorded.", suspects: ["S001", "S005"], case: "FIR/2024/MH/001", timestamp: "2024-10-26T18:45:00", read: false },
  { id: "ALT004", severity: "critical", title: "New Suspect Identified in Drug Network", description: "S028 (Pankaj Mishra) identified as logistics coordinator in Pune-Mumbai drug corridor. Multiple financial and phone links confirmed.", suspects: ["S028", "S012", "S018"], case: "FIR/2024/MH/003", timestamp: "2024-10-25T11:20:00", read: true },
  { id: "ALT005", severity: "warning", title: "Suspicious Location Overlap", description: "Three suspects from Lucknow syndicate (S006, S010, S016) detected at same location within 20-minute window in Hazratganj.", suspects: ["S006", "S010", "S016"], case: "FIR/2024/UP/001", timestamp: "2024-10-24T16:30:00", read: true },
  { id: "ALT006", severity: "info", title: "Community Structure Update", description: "Network analysis reveals 5 distinct criminal communities. Community 1 (Mumbai) and Community 2 (Delhi) show increasing inter-connectivity.", suspects: [], case: null, timestamp: "2024-10-24T08:00:00", read: true },
  { id: "ALT007", severity: "warning", title: "Real Estate Fraud Escalation", description: "Total losses in Pune real estate fraud case now exceed ₹10 crore. New victims identified. S004 and S024 primary operators.", suspects: ["S004", "S024"], case: "FIR/2024/PU/001", timestamp: "2024-10-23T13:45:00", read: true },
  { id: "ALT008", severity: "critical", title: "Encrypted Communication Detected", description: "S005 (Irfan Sheikh) switched to encrypted messaging. Last 72 hours show zero regular calls but data usage spiked 500%.", suspects: ["S005"], case: "FIR/2024/MH/001", timestamp: "2024-10-22T20:10:00", read: true },
  { id: "ALT009", severity: "info", title: "Monthly Network Analysis Complete", description: "October analysis shows 156 active connections, 28 suspects tracked, 8 active cases. Network density increased 12% from September.", suspects: [], case: null, timestamp: "2024-10-22T06:00:00", read: true },
  { id: "ALT010", severity: "warning", title: "Vehicle Spotted Across State Lines", description: "Vehicle MH-01-AB-1234 (registered to S001) spotted in Pune. Suspect may be coordinating with Pune drug network.", suspects: ["S001"], case: "FIR/2024/MH/003", timestamp: "2024-10-21T15:30:00", read: true },
  { id: "ALT011", severity: "info", title: "CDR Analysis Update", description: "Processed 1,847 new CDR records. 12 new communication patterns identified. 3 previously unknown connections discovered.", suspects: [], case: null, timestamp: "2024-10-20T07:30:00", read: true },
  { id: "ALT012", severity: "warning", title: "Financial Pattern Alert", description: "Multiple UPI transactions between S018 and S028 follow structured deposit pattern (amounts just below ₹50,000 reporting threshold).", suspects: ["S018", "S028"], case: "FIR/2024/PU/001", timestamp: "2024-10-19T12:00:00", read: true },
];

export const evidenceTrail = [
  { id: "EVD001", type: "CDR Records", description: "Call detail records batch - Mumbai suspects", hash: "a1b2c3d4e5f6789012345678abcdef01234567890abcdef1234567890abcdef12", case: "FIR/2024/MH/001", timestamp: "2024-10-28T10:00:00", status: "verified", addedBy: "System Auto-Capture" },
  { id: "EVD002", type: "Financial Records", description: "HDFC Bank transaction records - Shell company", hash: "b2c3d4e5f67890123456789abcdef012345678901bcdef12345678901bcdef123", case: "FIR/2024/MH/002", timestamp: "2024-10-27T14:30:00", status: "verified", addedBy: "SI Rajendra Patil" },
  { id: "EVD003", type: "Surveillance Photo", description: "CCTV footage - Dharavi meeting point", hash: "c3d4e5f678901234567890abcdef0123456789012cdef123456789012cdef1234", case: "FIR/2024/MH/001", timestamp: "2024-10-26T16:45:00", status: "verified", addedBy: "Constable Amit Shah" },
  { id: "EVD004", type: "Location Data", description: "Cell tower triangulation data - Lucknow suspects", hash: "d4e5f6789012345678901bcdef01234567890123def1234567890123def12345", case: "FIR/2024/UP/001", timestamp: "2024-10-25T09:20:00", status: "verified", addedBy: "System Auto-Capture" },
  { id: "EVD005", type: "Digital Evidence", description: "Recovered WhatsApp messages - Encrypted device", hash: "e5f67890123456789012cdef012345678901234ef12345678901234ef123456", case: "FIR/2024/DL/001", timestamp: "2024-10-24T11:00:00", status: "pending", addedBy: "Cyber Cell - Delhi" },
  { id: "EVD006", type: "Document", description: "Forged Aadhaar cards recovered from raid", hash: "f678901234567890123def0123456789012345f1234567890123456f1234567", case: "FIR/2024/DL/002", timestamp: "2024-10-23T08:15:00", status: "verified", addedBy: "Inspector Meera Singh" },
  { id: "EVD007", type: "Financial Records", description: "Hawala transaction ledger - Physical notebook", hash: "7890123456789012345ef01234567890123456012345678901234560123456789", case: "FIR/2024/MH/002", timestamp: "2024-10-22T13:30:00", status: "verified", addedBy: "ACP Suresh Kumar" },
  { id: "EVD008", type: "Weapon", description: "Seized firearms - 3 pistols, 50 rounds", hash: "890123456789012345f012345678901234567123456789012345671234567890", case: "FIR/2024/RJ/001", timestamp: "2024-10-21T17:00:00", status: "verified", addedBy: "DSP Vikram Rathod" },
  { id: "EVD009", type: "Vehicle", description: "Seized vehicle MH-01-AB-1234 with contraband", hash: "90123456789012346012345678901234568234567890123456823456789012345", case: "FIR/2024/MH/003", timestamp: "2024-10-20T14:45:00", status: "verified", addedBy: "PI Anil Deshmukh" },
  { id: "EVD010", type: "Property Document", description: "Forged property sale deeds - Pune suburbs", hash: "0123456789012347123456789012345679345678901234567934567890123456", case: "FIR/2024/PU/001", timestamp: "2024-10-19T10:30:00", status: "pending", addedBy: "Land Records Office" },
  { id: "EVD011", type: "CDR Records", description: "Inter-state call records - Delhi-Jaipur corridor", hash: "123456789012348234567890123456780456789012345678045678901234567", case: "FIR/2024/DL/001", timestamp: "2024-10-18T12:00:00", status: "verified", addedBy: "System Auto-Capture" },
  { id: "EVD012", type: "Digital Evidence", description: "Cloned hard drive - Fake call center server", hash: "23456789012349345678901234567891567890123456789156789012345678", case: "FIR/2024/DL/001", timestamp: "2024-10-17T09:00:00", status: "verified", addedBy: "Forensic Lab - Delhi" },
];

export const communities = [
  { id: 1, name: "Mumbai Syndicate", color: "#10B981", members: ["S001","S003","S005","S014","S019","S023","S026"], leader: "S005" },
  { id: 2, name: "Delhi Cyber Ring", color: "#3B82F6", members: ["S002","S008","S011","S015","S022"], leader: "S015" },
  { id: 3, name: "Pune Network", color: "#F59E0B", members: ["S004","S012","S018","S024","S028"], leader: "S012" },
  { id: 4, name: "Lucknow Syndicate", color: "#EF4444", members: ["S006","S007","S010","S016","S021","S025"], leader: "S010" },
  { id: 5, name: "Jaipur Arms Group", color: "#14B8A6", members: ["S009","S013","S017","S020","S027"], leader: "S027" },
];
