import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#060a0f] border-t border-white/10 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
                  <text x="50" y="42" textAnchor="middle" fontFamily="Almarai, sans-serif" fontSize="28" fontWeight="700" fill="#1a5c2a">اسعاد</text>
                  <text x="50" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fill="#2d7a3a">esaad</text>
                  <path d="M 25 72 Q 50 85 75 72" stroke="#2d7a3a" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-lg">اسعاد</p>
                <p className="text-white/50 text-xs">esaad</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              بطاقة اسعاد هي بطاقة ممتازة للمواطنين والمقيمين في الإمارات العربية المتحدة، مربوطة بعدد الأبناء.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">الصفحات</h4>
            <ul className="space-y-2">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "المزايا", href: "/benefits" },
                { label: "الشركاء", href: "/partners" },
                { label: "كيفية الانضمام", href: "/join" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 hover:text-[#FDC700] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">الدعم</h4>
            <ul className="space-y-2">
              {[
                { label: "تواصل معنا", href: "/contact" },
                { label: "الأسئلة الشائعة", href: "/contact" },
                { label: "سياسة الخصوصية", href: "/" },
                { label: "الشروط والأحكام", href: "/" },
              ].map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-white/60 hover:text-[#FDC700] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <span className="text-[#2d7a3a]">📧</span>
                info@esaad.ae
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <span className="text-[#2d7a3a]">📞</span>
                800-ESAAD
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <span className="text-[#2d7a3a]">📍</span>
                دبي، الإمارات العربية المتحدة
              </li>
            </ul>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-5">
              {["𝕏", "f", "in", "📷"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2d7a3a] flex items-center justify-center text-white/70 hover:text-white text-xs font-bold transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} بطاقة اسعاد. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">الإمارات العربية المتحدة</span>
            <span>🇦🇪</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
