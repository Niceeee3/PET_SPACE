// src/app/services/page.js
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* 🧡 Header */}
        <div className="bg-orange-500 p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">🐾 รายละเอียดและค่าบริการ</h1>
          <p className="text-orange-100 text-sm md:text-base">
            PetSpace ยินดีให้บริการดูแลน้องๆ ของคุณด้วยความรัก ความปลอดภัย และความใส่ใจสูงสุด
          </p>
        </div>

        {/* 📋 Content */}
        <div className="p-6 md:p-10 space-y-10">
          
          {/* หมวดหมู่: ประเภทห้องพัก */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              🏨 ประเภทห้องพัก (Boarding Rooms)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Standard Room */}
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-orange-700">Standard Room</h3>
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">ฮิต!</span>
                </div>
                <ul className="text-slate-600 space-y-2 mb-6 text-sm list-disc list-inside">
                  <li>ห้องส่วนตัวขนาดมาตรฐาน ทำความสะอาดทุกวัน</li>
                  <li>ระบบปรับอากาศเย็นสบาย 24 ชั่วโมง</li>
                  <li>มีพี่เลี้ยงพาวิ่งเล่นออกกำลังกายวันละ 2 ครั้ง</li>
                  <li>อัปเดตสถานะผ่านสมุดพก (Diary) วันละ 1 ครั้ง</li>
                </ul>
                <div className="border-t border-orange-200 pt-4 mt-auto">
                  <p className="text-slate-500 text-sm">ราคาเริ่มต้น</p>
                  <p className="text-2xl font-black text-slate-800">350 <span className="text-base font-normal text-slate-500">บาท / คืน</span></p>
                </div>
              </div>

              {/* VIP Room */}
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-blue-700">VIP Room</h3>
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">กว้างขวาง</span>
                </div>
                <ul className="text-slate-600 space-y-2 mb-6 text-sm list-disc list-inside">
                  <li>ห้องส่วนตัวขนาดใหญ่พิเศษ พื้นที่เดินเล่นกว้างขวาง</li>
                  <li>ระบบปรับอากาศ 24 ชั่วโมง พร้อมเครื่องฟอกอากาศ</li>
                  <li>พาวิ่งเล่นออกกำลังกายแบบ Private วันละ 3 ครั้ง</li>
                  <li>อัปเดตสถานะแบบ Real-time ตามความต้องการ</li>
                </ul>
                <div className="border-t border-blue-200 pt-4 mt-auto">
                  <p className="text-slate-500 text-sm">ราคาเริ่มต้น</p>
                  <p className="text-2xl font-black text-slate-800">550 <span className="text-base font-normal text-slate-500">บาท / คืน</span></p>
                </div>
              </div>

            </div>
          </section>

          {/* หมวดหมู่: บริการเสริม */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              ✨ บริการเสริมอื่นๆ (Extra Services)
            </h2>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <ul className="text-slate-600 space-y-4">
                <li className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200 pb-3">
                  <span className="font-medium text-slate-700">🛁 อาบน้ำและเป่าขน (สุนัข/แมว)</span>
                  <span className="font-bold text-orange-600 mt-1 sm:mt-0">เริ่มต้น 150 บาท</span>
                </li>
                <li className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200 pb-3">
                  <span className="font-medium text-slate-700">✂️ บริการตัดแต่งขน (เฉพาะสุนัข)</span>
                  <span className="font-bold text-orange-600 mt-1 sm:mt-0">เริ่มต้น 300 บาท</span>
                </li>
                <li className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <span className="font-medium text-slate-700">🚗 บริการรับ-ส่งน้องๆ (ระยะทางไม่เกิน 10 กม.)</span>
                  <span className="font-bold text-orange-600 mt-1 sm:mt-0">เที่ยวละ 100 บาท</span>
                </li>
              </ul>
            </div>
          </section>

          {/* ข้อควรระวัง / หมายเหตุ */}
          <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200 text-sm text-yellow-800">
            <p className="font-bold mb-2 flex items-center gap-2"><span>📌</span> สิ่งที่ต้องเตรียมมาด้วย:</p>
            <ul className="list-disc list-inside space-y-1 ml-1 text-yellow-700">
              <li>สมุดวัคซีน (น้องๆ ต้องได้รับวัคซีนครบถ้วนและไม่มีเห็บหมัด)</li>
              <li>อาหารที่น้องทานประจำ (เพื่อป้องกันอาการแพ้หรือท้องเสียจากการเปลี่ยนอาหาร)</li>
              <li>ของเล่นชิ้นโปรด หรือผ้าห่มที่มีกลิ่นเจ้าของ (ช่วยลดความเครียด)</li>
            </ul>
          </div>

        </div>

        {/* 🔙 Footer / Back Button */}
        <div className="p-8 border-t border-slate-100 flex justify-center bg-slate-50">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-slate-800 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-slate-700 hover:scale-105 transition-all"
          >
            ⬅️ กลับหน้า Home
          </Link>
        </div>

      </div>
    </div>
  );
}