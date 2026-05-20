// src/app/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import { getPetsByOwner, getAllPets, logOut, auth } from "@/lib/firebase"; 
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomerDashboard() {
  const [myPets, setMyPets] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(""); 
  const [showQRModal, setShowQRModal] = useState(false); 
  
  const router = useRouter();
  const ALL_ROOMS = ["Normal-1", "Normal-2", "Normal-3", "Normal-4", "Normal-5", "VIP-1", "VIP-2", "VIP-3"];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const data = await getPetsByOwner(); 
        setMyPets(data);

        if (data.length > 0 && data[0].ownerName) {
          setUserName(data[0].ownerName);
        } else {
          setUserName(user.email.split('@')[0]);
        }

        const allData = await getAllPets();
        const occupiedRooms = allData.map(p => p.room).filter(Boolean);
        const vacancy = ALL_ROOMS.filter(room => !occupiedRooms.includes(room));
        setAvailableRooms(vacancy);

        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe(); 
  }, [router]);

  const handleLogOut = async () => {
    await logOut();
    router.push("/");
  };

  if (loading) return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="text-xl font-bold text-orange-500 animate-pulse">กำลังโหลดข้อมูล PetSpace... 🐾</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 relative">
      
      {/*  popup qr */}
      {showQRModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">💳</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">ชำระเงินผ่าน PromptPay</h3>
            <p className="text-sm text-slate-500 mb-6">สแกน QR Code ด้านล่างเพื่อชำระค่าบริการ</p>
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 inline-block">
              {/* เปลี่ยน 099xxxxxxx เป็นเบอร์พร้อมเพย์ของไนซ์ได้เลย */}
              <img 
                src="https://promptpay.io/0902389122.png" 
                alt="PromptPay QR Code" 
                className="w-48 h-48 mx-auto"
              />
            </div>

            <div className="text-sm text-slate-600 mb-6 bg-blue-50 p-3 rounded-xl border border-blue-100">
              เมื่อโอนเงินเสร็จแล้ว กรุณารอแอดมินตรวจสอบและอัปเดตสถานะในระบบประมาณ 10-15 นาทีครับ
            </div>

            <button 
              onClick={() => setShowQRModal(false)} 
              className="w-full bg-slate-200 text-slate-700 hover:bg-slate-300 p-4 rounded-xl font-bold transition"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}

      {/* 🧡 Navbar */}
      <nav className="bg-white border-b border-orange-100 p-4 flex justify-between items-center px-8 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <h1 className="text-xl font-bold text-slate-800">My PetSpace</h1>
        </div>
        <button onClick={handleLogOut} className="text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-xl transition">
          ออกจากระบบ
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-6 mt-6">
        
        {/*  Welcome  */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">
            Welcome, <span className="text-orange-500">{userName}</span> 👋
          </h2>
          <p className="text-slate-500 mt-2">ยินดีต้อนรับกลับสู่พื้นที่ความสุขของน้องๆ</p>
        </div>

        {/* Widget แสดงสถานะห้องว่าง */}
        <div className="bg-orange-100/50 border border-orange-200 p-5 rounded-3xl mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-orange-800 text-lg flex items-center gap-2">🏨 สถานะห้องพักวันนี้</h3>
              <p className="text-orange-700/70 text-sm">อัปเดตแบบ Real-time ตามคิวการจอง</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl border border-orange-200">
              <span className="text-orange-600 font-black text-xl">{availableRooms.length}</span>
              <span className="text-orange-800 font-bold ml-1">ห้องว่าง</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            {availableRooms.length > 0 ? (
              availableRooms.map(room => (
                <span key={room} className="bg-white border border-orange-100 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold shadow-sm">{room}</span>
              ))
            ) : (
              <span className="text-red-500 font-bold text-sm">ขออภัย วันนี้ห้องพักเต็มทุกห้องแล้วครับ 🔒</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">สัตว์เลี้ยงของฉัน</h2>
          <Link href="/add-pet" className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition shadow-sm">+ เพิ่มสัตว์เลี้ยง</Link>
        </div>

        <div className="space-y-4">
          {myPets.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-slate-200">
              <span className="text-6xl">🏚️</span>
              <p className="text-slate-500 mt-4 text-lg font-medium">ยังไม่มีข้อมูลสัตว์เลี้ยง ลองเพิ่มดูสิ!</p>
            </div>
          ) : (
            myPets.map((pet) => (
              <div 
                key={pet.id} 
                className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-4xl shadow-inner shrink-0">
                      {pet.petType === 'dog' ? '🐶' : pet.petType === 'cat' ? '🐱' : '🐰'}
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold text-slate-800">{pet.petName}</h2>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                        pet.currentStatus === 'รอตรวจสอบการชำระเงิน' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-green-100 text-green-700'
                      }`}>
                        {pet.currentStatus || 'ปกติ'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{pet.breed} • อายุ {pet.age}</p>
                    
                    {/*  Slot แจ้งเตือนชำระเงิน */}
                    {pet.currentStatus === 'รอตรวจสอบการชำระเงิน' && (
                      <div className="mt-5 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-orange-800 flex items-center gap-2">
                            <span>⏳</span> สถานะ: รอยืนยันการโอนเงิน
                          </p>
                          <p className="text-xs text-orange-600 mt-1">กรุณาชำระเงินมัดจำ/ค่าบริการ เพื่อยืนยันการจองห้องพักให้สำเร็จ</p>
                        </div>
                        <button 
                          onClick={() => setShowQRModal(true)}
                          className="bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-600 transition shrink-0 flex items-center justify-center gap-2"
                        >
                          💳 ชำระเงิน
                        </button>
                      </div>
                    )}

                    {/* แสดงข้อมูลห้องพัก และ Diary */}
                    <div className="mt-5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-500 w-2 h-2 rounded-full"></span>
                        <p className="text-sm font-bold text-slate-700">เลขห้อง: <span className="text-orange-600 font-bold">{pet.room || 'รอแอดมินจัดห้อง...'}</span></p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="bg-blue-500 w-2 h-2 rounded-full mt-1.5"></span>
                        <p className="text-sm font-bold text-slate-700 leading-relaxed">บันทึกประจำวัน: <span className="text-slate-600 font-normal italic">{pet.dailyUpdate || 'ยังไม่มีอัปเดตใหม่ครับ'}</span></p>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-wider">
                      อัปเดตล่าสุด: {pet.lastUpdatedAt ? new Date(pet.lastUpdatedAt.seconds * 1000).toLocaleString('th-TH') : 'ไม่มีข้อมูลการอัปเดต'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}