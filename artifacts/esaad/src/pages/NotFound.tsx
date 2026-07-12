import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="bg-[#0d1117] min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[#2d7a3a] font-extrabold text-9xl mb-4 opacity-30">404</p>
        <h1 className="text-white font-extrabold text-3xl mb-3">الصفحة غير موجودة</h1>
        <p className="text-white/50 text-base mb-8">الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <Link
          href="/"
          className="inline-block bg-[#2d7a3a] hover:bg-[#3a9f4a] text-white font-bold px-8 py-3.5 rounded-2xl text-base transition-all hover:shadow-xl"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
}
