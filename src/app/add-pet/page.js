// src/app/add-pet/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addPetProfile, auth } from "@/lib/firebase"; 

export default function AddPetPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  //  อัปเดต State ให้มีฟิลด์ครบถ้วน
  const [formData, setFormData] = useState({
    ownerName: "", 
    phone: "", 
    petName: "", 
    petType: "dog", 
    breed: "", 
    age: "", 
    additionalInfo: "",
    checkInDate: "", 
    checkOutDate: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //ระบบป้องกันเช็คว่าวันรับกลับ ต้องไม่ใช่วันที่ก่อนวันฝากเข้า
    if (new Date(formData.checkInDate) > new Date(formData.checkOutDate)) {
      alert("❌ วันรับกลับ ต้องอยู่หลังวันฝากเข้านะครับ กรุณาเลือกวันที่ใหม่");
      return;
    }

    setIsSubmitting(true);
    try {
      const petResult = await addPetProfile(formData);
      if (petResult.success) {
        alert("🎉 เพิ่มน้อง " + formData.petName + " และจองห้องพักสำเร็จ!");
        router.push("/dashboard");
      }
    } catch (error) {
      alert("❌ เกิดข้อผิดพลาด: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex justify-center items-center py-12">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold text-slate-800">เพิ่มสัตว์เลี้ยง 🐾</h1>
          <Link href="/dashboard" className="text-slate-500 hover:text-orange-500 font-semibold transition">กลับหน้าหลัก</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ข้อมูลเจ้าของ */}
          <section>
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span className="bg-orange-100 p-2 rounded-lg">👤</span> ข้อมูลเจ้าของ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="ชื่อ-นามสกุล" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="เบอร์โทรศัพท์" required />
            </div>
          </section>

          {/* ข้อมูลสัตว์เลี้ยง */}
          <section>
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span className="bg-orange-100 p-2 rounded-lg">🐶</span> ข้อมูลสัตว์เลี้ยง
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input type="text" name="petName" value={formData.petName} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="ชื่อน้อง..." required />
              </div>
              <select name="petType" value={formData.petType} onChange={handleChange} className="w-full border rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-orange-400">
                <option value="dog">สุนัข</option>
                <option value="cat">แมว</option>
              </select>
              <input type="text" name="breed" value={formData.breed} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="สายพันธุ์" required />
              
              {/* เพิ่มช่องอายุ */}
              <div className="md:col-span-2">
                <input type="text" name="age" value={formData.age} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="อายุ (เช่น 2 ปี, 5 เดือน)" required />
              </div>

              {/* เพิ่มช่องรายละเอียดเพิ่มเติม */}
              <div className="md:col-span-2">
                <textarea 
                  name="additionalInfo" 
                  value={formData.additionalInfo} 
                  onChange={handleChange} 
                  rows="2" 
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400 resize-none" 
                  placeholder="รายละเอียดเพิ่มเติม (เช่น แพ้อาหารไก่, มีโรคประจำตัว...)" 
                ></textarea>
              </div>
            </div>
          </section>

          {/* ข้อมูลการเข้าพัก */}
          <section>
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span className="bg-orange-100 p-2 rounded-lg">📅</span> ข้อมูลการเข้าพัก
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">วันฝากเข้า</label>
                <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">วันรับกลับ</label>
                <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" required />
              </div>
            </div>
          </section>

          <button type="submit" disabled={isSubmitting} className="w-full text-white font-bold py-4 rounded-xl shadow-md text-lg bg-orange-500 hover:bg-orange-600 transition">
            {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูลสัตว์เลี้ยง'}
          </button>
        </form>
      </div>
    </div>
  );
}