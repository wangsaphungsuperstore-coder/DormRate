function doGet() {
  // ฟังก์ชันหลักที่รันเมื่อมีการเปิด Web App
  return HtmlService.createTemplateFromFile('index').evaluate();
}

/**
 * ฟังก์ชันสำหรับรับข้อมูลที่จำเป็นไปแสดงผลบนหน้าเว็บ
 * @return {object} ข้อมูลวันที่ปัจจุบัน, ค่าปรับ, และตารางอัตราค่าปรับ
 */
function getFineData() {
  const today = new Date();
  const todayDate = today.getDate(); // วันที่ของวันนี้ (1-31)
  const fineRate = 50; // อัตราค่าปรับต่อวัน

  // ----------------------------------------------------
  // 1. คำนวณค่าปรับสำหรับวันที่ปัจจุบัน
  // ----------------------------------------------------
  let currentFine = 0;
  let fineDays = 0;

  // เริ่มคิดค่าปรับตั้งแต่วันที่ 9 เป็นต้นไป
  if (todayDate >= 9) {
    // วันที่ 8 คือวันสุดท้ายที่ชำระได้ (0 วันปรับ)
    // ดังนั้น จำนวนวันปรับ = วันที่ปัจจุบัน - 8
    fineDays = todayDate - 8;
    currentFine = fineDays * fineRate;
  }
  
  // ----------------------------------------------------
  // 2. สร้างข้อมูลตารางอัตราค่าปรับอ้างอิง (วันที่ 9 ถึง 16)
  // ----------------------------------------------------
  const referenceTable = [];
  const startDay = 9;
  const endDay = 16;
  
  for (let day = startDay; day <= endDay; day++) {
    const daysLate = day - 8;
    const fineAmount = daysLate * fineRate;
    
    referenceTable.push({
      day: day,
      fine: fineAmount
    });
  }

  // ----------------------------------------------------
  // 3. จัดรูปแบบวันที่ปัจจุบันให้สวยงาม
  // ----------------------------------------------------
  const formatter = new Intl.DateTimeFormat('th-TH', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });
  
  const formattedDate = formatter.format(today);

  return {
    formattedDate: formattedDate,
    currentFine: currentFine,
    referenceTable: referenceTable
  };
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
