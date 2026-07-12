import { useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";

const allPartners = [
  // Retail
  { name: "ماكدونالدز", category: "مطاعم", emoji: "🍔", discount: "20%" },
  { name: "كارفور", category: "تجزئة", emoji: "🛒", discount: "15%" },
  { name: "لولو هايبر ماركت", category: "تجزئة", emoji: "🏪", discount: "10%" },
  { name: "نون", category: "تسوق إلكتروني", emoji: "📦", discount: "25%" },
  { name: "زارا", category: "أزياء", emoji: "👗", discount: "30%" },
  { name: "H&M", category: "أزياء", emoji: "👔", discount: "25%" },
  { name: "نايكي", category: "رياضة", emoji: "👟", discount: "20%" },
  { name: "أديداس", category: "رياضة", emoji: "⚽", discount: "25%" },
  // Health
  { name: "مستشفى ميدكير", category: "صحة", emoji: "🏥", discount: "15%" },
  { name: "صيدليات ليفا", category: "صحة", emoji: "💊", discount: "10%" },
  { name: "ترفيه وصحة", category: "لياقة", emoji: "💪", discount: "30%" },
  { name: "نادي الصحة", category: "لياقة", emoji: "🏋️", discount: "40%" },
  // Travel
  { name: "طيران الإمارات", category: "سفر", emoji: "✈️", discount: "10%" },
  { name: "العربية للطيران", category: "سفر", emoji: "🛫", discount: "15%" },
  { name: "هيلتون", category: "فنادق", emoji: "🏨", discount: "20%" },
  { name: "ماريوت", category: "فنادق", emoji: "🏩", discount: "15%" },
  // Entertainment
  { name: "فوكس سينما", category: "ترفيه", emoji: "🎬", discount: "50%" },
  { name: "VOX سينما", category: "ترفيه", emoji: "🎭", discount: "40%" },
  { name: "فيرارى ورلد", category: "ترفيه", emoji: "🎢", discount: "25%" },
  { name: "وارنر براذرز", category: "ترفيه", emoji: "🎡", discount: "20%" },
  // Food
  { name: "بيتزا هت", category: "مطاعم", emoji: "🍕", discount: "30%" },
  { name: "ستاربكس", category: "مقاهي", emoji: "☕", discount: "15%" },
  { name: "كوستا كوفي", category: "مقاهي", emoji: "🥤", discount: "20%" },
  { name: "الباحة", category: "مطاعم", emoji: "🍖", discount: "25%" },
];

const categories = ["الكل", "مطاعم", "تجزئة", "صحة", "سفر", "ترفيه", "أزياء", "رياضة", "لياقة", "فنادق", "مقاهي", "تسوق إلكتروني"];

export default function Partners() {
  const [active, setActive] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = allPartners.filter((p) => {
    const matchCat = active === "الكل" || p.category === active;
    const matchSearch = p.name.includes(search) || p.category.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#0d1117] min-h-screen">
      {/* Header */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-50" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="text-[#FDC700] font-bold text-sm uppercase tracking-widest">شركاؤنا</span>
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl mt-3 mb-4">
            +500 شريك تجاري
          </h1>
          <p className="text-white/60 text-lg">
            استمتع بالخصومات لدى أبرز الشركاء في الإمارات وحول العالم
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {/* Search */}
        <div className="relative mb-6 max-w-md mx-auto">
          <Search className="absolute top-1/2 -translate-y-1/2 right-4 text-white/40" size={18} />
          <input
            type="text"
            placeholder="ابحث عن شريك..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/8 border border-white/15 rounded-2xl py-3 px-5 pr-12 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#2d7a3a]/60 transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                active === cat
                  ? "bg-[#2d7a3a] text-white shadow-lg shadow-green-900/40"
                  : "bg-white/8 text-white/60 hover:bg-white/12 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Partners grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filtered.map((partner, i) => (
              <div
                key={i}
                className="bg-white/6 border border-white/10 hover:border-[#2d7a3a]/50 hover:bg-white/10 rounded-2xl p-4 text-center partner-card cursor-pointer transition-all duration-200"
              >
                <div className="text-4xl mb-3">{partner.emoji}</div>
                <h3 className="text-white font-bold text-sm mb-1 leading-tight">{partner.name}</h3>
                <span className="inline-block bg-[#1a5c2a]/40 text-[#3a9f4a] text-xs font-bold px-2 py-1 rounded-full">
                  خصم {partner.discount}
                </span>
                <p className="text-white/40 text-xs mt-2">{partner.category}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-white/50 text-lg">لا توجد نتائج</p>
            <p className="text-white/30 text-sm mt-2">جرّب البحث بكلمة أخرى</p>
          </div>
        )}

        {/* Become a partner */}
        <div className="mt-16 bg-gradient-to-r from-[#1a5c2a]/30 to-[#2d7a3a]/20 border border-[#2d7a3a]/30 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-white font-extrabold text-2xl sm:text-3xl mb-3">هل تريد الانضمام كشريك؟</h2>
          <p className="text-white/60 text-base mb-6 max-w-lg mx-auto">
            انضم إلى شبكة شركاء اسعاد وتواصل مع مئات الآلاف من حاملي البطاقة
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#FDC700] hover:bg-[#e6b400] text-[#101828] font-bold px-8 py-3.5 rounded-2xl text-sm transition-all hover:shadow-xl"
          >
            تواصل معنا للانضمام
          </Link>
        </div>
      </div>
    </div>
  );
}
