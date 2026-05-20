"use client";
import { useState } from "react";
import { logIn } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      router.push("/dashboard"); // Login สำเร็จไปหน้า Dashboard
    } catch (error) {
      alert("เข้าสู่ระบบไม่สำเร็จ: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">ยินดีต้อนรับกลับมา! 🐾</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="อีเมล" 
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <input 
            type="password" placeholder="รหัสผ่าน" 
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setPassword(e.target.value)} required 
          />
          <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-xl font-bold">เข้าสู่ระบบ</button>
        </form>
        <p className="mt-4 text-center text-slate-600">
          ยังไม่มีบัญชี? <Link href="/register" className="text-orange-500 font-bold">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}