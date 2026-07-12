import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المزايا", href: "/benefits" },
  { label: "الشركاء", href: "/partners" },
  { label: "كيفية الانضمام", href: "/join" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0d1117]/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-green-500/30 transition-shadow duration-300">
              <EsaadLogoMark size={28} />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl tracking-wide hidden xs:block">
              اسعاد
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  location === link.href
                    ? "text-[#FDC700] bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/join"
              className="bg-[#FDC700] hover:bg-[#e6b400] text-[#101828] font-bold px-5 py-2.5 rounded-2xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/30"
            >
              سجّل الآن
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="القائمة"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mobile-menu-open bg-[#0d1117]/98 backdrop-blur-md border-t border-white/10 pb-4 rounded-b-2xl">
            <nav className="flex flex-col gap-1 px-2 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    location === link.href
                      ? "text-[#FDC700] bg-white/10"
                      : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/join"
                className="mt-2 bg-[#FDC700] text-[#101828] font-bold px-4 py-3 rounded-2xl text-sm text-center"
              >
                سجّل الآن
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function EsaadLogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="42" textAnchor="middle" fontFamily="Almarai, sans-serif" fontSize="28" fontWeight="700" fill="#1a5c2a">
        اسعاد
      </text>
      <text x="50" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="400" fill="#2d7a3a">
        esaad
      </text>
      <path d="M 25 72 Q 50 85 75 72" stroke="#2d7a3a" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
