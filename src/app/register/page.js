// src/app/register/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, addPetProfile } from "@/lib/firebase"; 

export default function RegisterProfile() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ✨ เพิ่ม checkInDate และ checkOutDate ใน State
  const [formData, setFormData] = useState({
    email: "", password: "", ownerName: "", phone: "", 
    petName: "", petType: "dog", breed: "", age: "", additionalInfo: "",
    checkInDate: "", checkOutDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // เช็คว่าวันรับกลับ ต้องไม่ใช่วันที่ก่อนวันฝากเข้า
    if (new Date(formData.checkInDate) > new Date(formData.checkOutDate)) {
      alert("❌ วันรับกลับ ต้องอยู่หลังวันฝากเข้านะครับ กรุณาเลือกวันที่ใหม่");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(formData.email, formData.password);
      const { email, password, ...petDataToSave } = formData;
      const petResult = await addPetProfile(petDataToSave);

      if (petResult.success) {
        alert("🎉 สมัครสมาชิกและจองคิวให้น้อง " + formData.petName + " สำเร็จ!");
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
        <h1 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-6">สมัครสมาชิกใหม่ 🐾</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ข้อมูลบัญชี */}
          <section>
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2"><span className="bg-orange-100 p-2 rounded-lg">🔐</span> ข้อมูลบัญชี</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="อีเมล" required />
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="รหัสผ่าน (6 ตัวขึ้นไป)" required />
            </div>
          </section>

          {/* ข้อมูลเจ้าของ */}
          <section>
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2"><span className="bg-orange-100 p-2 rounded-lg">👤</span> ข้อมูลเจ้าของ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="ชื่อ-นามสกุล" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="เบอร์โทรศัพท์" required />
            </div>
          </section>

          {/* ข้อมูลสัตว์เลี้ยง */}
          <section>
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2"><span className="bg-orange-100 p-2 rounded-lg">🐶</span> ข้อมูลสัตว์เลี้ยง</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input type="text" name="petName" value={formData.petName} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="ชื่อสัตว์เลี้ยง" required />
              </div>
              <select name="petType" value={formData.petType} onChange={handleChange} className="w-full border rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-orange-400">
                <option value="dog">สุนัข</option>
                <option value="cat">แมว</option>
              </select>
              <input type="text" name="breed" value={formData.breed} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="สายพันธุ์" required />
              
              <div className="md:col-span-2">
                <input type="text" name="age" value={formData.age} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="อายุ (เช่น 2 ปี, 5 เดือน)" required />
              </div>

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

          {/* ข้อมูลการเข้าพัก (ใหม่ล่าสุด) */}
          <section>
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2"><span className="bg-orange-100 p-2 rounded-lg">📅</span> ข้อมูลการเข้าพัก</h2>
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
            {isSubmitting ? 'กำลังดำเนินการ...' : 'สมัครสมาชิกและจองห้องพัก'}
          </button>
          <p className="text-center text-slate-600 mt-4">มีบัญชีอยู่แล้ว? <Link href="/login" className="text-orange-500 font-bold hover:underline">เข้าสู่ระบบ</Link></p>
        </form>
      </div>
    </div>
  );
}