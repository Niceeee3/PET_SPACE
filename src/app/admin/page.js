// src/app/admin/page.js
"use client";

import { useState, useEffect } from "react";
import { getAllPets, updatePetInfoAdmin, deletePetProfileAdmin, auth, logOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const ROOMS = ["Normal-1", "Normal-2", "Normal-3", "Normal-4", "Normal-5", "VIP-1", "VIP-2", "VIP-3"];

  const fetchAllPets = async () => {
    const data = await getAllPets();
    setAllPets(data);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchAllPets();
      else router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  const handleInlineUpdate = async (petId, field, value) => {
    await updatePetInfoAdmin(petId, field, value);
    fetchAllPets(); 
  };

  const handleDelete = async (petId, petName) => {
    if (window.confirm(`⚠️ คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลของน้อง ${petName}?`)) {
      const result = await deletePetProfileAdmin(petId);
      if (result.success) {
        alert("🗑️ ลบข้อมูลเรียบร้อยแล้ว");
        fetchAllPets();
      } else {
        alert("❌ เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  const handleLogOut = async () => {
    await logOut();
    router.push("/");
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center font-bold text-slate-500">กำลังโหลดระบบจัดการ...</div>;

  const occupiedRooms = allPets.map(pet => pet.room).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-slate-900 p-4 flex justify-between items-center px-8 shadow-md">
        <h1 className="text-xl font-bold text-white">⚙️ PetSpace Admin Panel</h1>
        <button onClick={handleLogOut} className="text-red-400 font-bold hover:text-red-300 transition">ออกจากระบบ</button>
      </nav>

      <main className="max-w-7xl mx-auto p-8 mt-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">ระบบจัดการสัตว์เลี้ยง (Admin)</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="p-4 font-semibold w-1/5">ชื่อสัตว์เลี้ยง</th>
                <th className="p-4 font-semibold w-1/6">สถานะปัจจุบัน</th>
                <th className="p-4 font-semibold w-1/6">ห้องพัก (Room)</th>
                <th className="p-4 font-semibold w-1/4">ข้อความอัปเดต (Diary)</th>
                <th className="p-4 font-semibold w-24 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {allPets.map((pet) => (
                <tr key={pet.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-bold text-slate-800 text-lg">{pet.petType === 'dog' ? '🐶' : '🐱'} {pet.petName}</div>
                    <div className="text-sm text-slate-500">เจ้าของ: {pet.ownerName}</div>
                  </td>
                  
                  <td className="p-4">
                    <select 
                      className="border border-slate-300 rounded-lg p-2 text-sm w-full outline-none"
                      value={pet.currentStatus || "รอรับน้อง"}
                      onChange={(e) => handleInlineUpdate(pet.id, "currentStatus", e.target.value)}
                    >
                      <option value="รอรับน้อง">รอรับน้อง</option>
                      <option value="รอตรวจสอบการชำระเงิน">รอตรวจสอบการชำระเงิน 💳</option>
                      <option value="กำลังพักผ่อน">กำลังพักผ่อน 💤</option>
                      <option value="กำลังวิ่งเล่น">กำลังวิ่งเล่น 🎾</option>
                      <option value="อาบน้ำ/ตัดขน">อาบน้ำ/ตัดขน 🛁</option>
                      <option value="รอเจ้าของรับกลับ">รอเจ้าของรับกลับ 🚗</option>
                      <option value="กลับบ้านแล้ว">กลับบ้านแล้ว 🏠</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <select 
                      className="border border-slate-300 rounded-lg p-2 text-sm w-full outline-none cursor-pointer"
                      value={pet.room || ""}
                      onChange={(e) => handleInlineUpdate(pet.id, "room", e.target.value)}
                    >
                      <option value="">-- ยังไม่จัดห้อง --</option>
                      {ROOMS.map(room => {
                        const isOccupied = occupiedRooms.includes(room) && pet.room !== room;
                        return (
                          <option key={room} value={room} disabled={isOccupied} className={isOccupied ? "text-red-400" : ""}>
                            {room} {isOccupied ? "(เต็มแล้ว)" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </td>

                  <td className="p-4">
                    <input 
                      type="text" 
                      placeholder="อัปเดตอาการวันนี้..."
                      defaultValue={pet.dailyUpdate || ""}
                      onBlur={(e) => handleInlineUpdate(pet.id, "dailyUpdate", e.target.value)}
                      className="border border-slate-200 rounded-lg p-2 w-full text-sm outline-none"
                    />
                  </td>

                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleDelete(pet.id, pet.petName)}
                      className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition"
                    >
                      🗑️ ลบ
                    </button>
                  </td>
                </tr>
              ))}
              {allPets.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500 font-medium">ไม่มีข้อมูลสัตว์เลี้ยงในระบบ</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}