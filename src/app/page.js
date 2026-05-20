import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* 🧡 Header / Navigation */}
      <nav className="bg-white sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-bold text-slate-800">Pet<span className="text-orange-500">Space</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-orange-500 transition">
              เข้าสู่ระบบ
            </Link>
            <Link href="/register" className="bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition shadow-sm">
              สมัครสมาชิกใหม่
            </Link>
          </div>
        </div>
      </nav>

      {/* 🚀 Hero Section (ส่วนหัวดึงดูดสายตา) */}
      <header className="bg-white py-20 md:py-32 border-b border-orange-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ✨ โรงแรมและรับฝากสัตว์เลี้ยงอันดับ 1 ในใจคุณ
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            ให้ <span className="text-orange-500">PetSpace</span> ดูแลเพื่อนรักของคุณ
            <br />ในวันที่คุณไม่สะดวก
          </h1>
          <p className="text-xl text-slate-600 mt-8 max-w-3xl mx-auto leading-relaxed">
            บริการรับฝากสัตว์เลี้ยงรายวันและค้างคืน สะอาด ปลอดภัย มีพี่เลี้ยงดูแลใกล้ชิด 
            พร้อมอัปเดตสถานะผ่าน Diary ออนไลน์ ให้คุณหมดห่วง 100%
          </p>
          <div className="mt-12 flex gap-4 justify-center">
            <Link href="/register" className="bg-orange-500 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-orange-600 transition shadow-lg flex items-center gap-2">
              <span className="text-xl">📝</span> จองห้องพักให้น้อง
            </Link>
            <Link href="/about" className="bg-slate-100 text-slate-800 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-200 transition">
              ดูรายละเอียดบริการ
            </Link>
          </div>
        </div>
      </header>

      {/* 🌟 Features Section (จุดเด่นของร้าน) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">ทำไมต้องเลือก PetSpace? 🤔</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 transition hover:shadow-xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🏨</div>
            <h3 className="text-2xl font-bold text-slate-800">ห้องพักส่วนตัว</h3>
            <p className="text-slate-600 mt-3 leading-relaxed">สะอาด ปลอดภัย แยกโซนชัดเจน มีเครื่องปรับอากาศ และกล้อง CCTV ดูแลตลอด 24 ชม.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 transition hover:shadow-xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">👩‍⚕️</div>
            <h3 className="text-2xl font-bold text-slate-800">พี่เลี้ยงมืออาชีพ</h3>
            <p className="text-slate-600 mt-3 leading-relaxed">ทีมงานรักสัตว์ ผ่านการอบรมการดูแลสัตว์เลี้ยงโดยเฉพาะ พร้อมให้ความรักและเอาใจใส่อย่างดี</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 transition hover:shadow-xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6">📸</div>
            <h3 className="text-2xl font-bold text-slate-800">อัปเดตรายวัน (Diary)</h3>
            <p className="text-slate-600 mt-3 leading-relaxed">เจ้าของสามารถเช็คสถานะ, ดูรูปภาพ และวิดีโอของน้องๆ ผ่านหน้าเว็บได้ทุกวัน ให้คุณสบายใจ</p>
          </div>

        </div>
      </section>

      {/* 📞 Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-bold text-white text-xl mb-4">🐾 PetSpace - โรงแรมสัตว์เลี้ยงที่คุณไว้วางใจ</p>
          <p>📍 123 ถนนเพ็ทเลิฟเวอร์ แขวงน้องหมา เขตน้องแมว กรุงเทพฯ 10XXX</p>
          <p>📞 โทร: 02-XXX-XXXX | 📱 Line: @petspace</p>
          <p className="mt-8 text-sm">© 2026 PetSpace Co., Ltd. All rights reserved. | CS Student Project v2</p>
        </div>
      </footer>

    </div>
  )
}