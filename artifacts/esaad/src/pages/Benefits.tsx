import { Link } from "wouter";
import { Check } from "lucide-react";

const categories = [
  {
    emoji: "🛍️",
    title: "التسوق",
    color: "#8B5CF6",
    bg: "from-purple-900/30 to-purple-950/20",
    border: "border-purple-500/30",
    items: [
      "خصم 10-50% في كبرى مراكز التسوق",
      "عروض حصرية في متاجر الأزياء العالمية",
      "خصومات على الإلكترونيات والأجهزة",
      "عروض الجمعة البيضاء طوال العام",
    ],
  },
  {
    emoji: "🏥",
    title: "الصحة والعافية",
    color: "#10B981",
    bg: "from-emerald-900/30 to-emerald-950/20",
    border: "border-emerald-500/30",
    items: [
      "خصومات على الخدمات الطبية والعيادات",
      "أسعار مخفضة في الصيدليات",
      "عروض مراكز اللياقة والسبا",
      "تأمين طبي تكميلي للأسرة",
    ],
  },
  {
    emoji: "✈️",
    title: "السفر والسياحة",
    color: "#3B82F6",
    bg: "from-blue-900/30 to-blue-950/20",
    border: "border-blue-500/30",
    items: [
      "خصم على حجوزات الفنادق العالمية",
      "تخفيضات على تذاكر الطيران",
      "عروض حصرية على رحلات العطلات",
      "خدمة الصالة الملكية في المطارات",
    ],
  },
  {
    emoji: "🎮",
    title: "الترفيه",
    color: "#F59E0B",
    bg: "from-amber-900/30 to-amber-950/20",
    border: "border-amber-500/30",
    items: [
      "دخول مخفض لدور السينما",
      "عروض حصرية في مناطق الترفيه",
      "خصومات على الاشتراكات الرقمية",
      "تذاكر الفعاليات والحفلات",
    ],
  },
  {
    emoji: "📚",
    title: "التعليم",
    color: "#06B6D4",
    bg: "from-cyan-900/30 to-cyan-950/20",
    border: "border-cyan-500/30",
    items: [
      "رسوم مدرسية مخفضة",
      "دورات تدريبية وتطويرية",
      "خصومات على الكتب والمستلزمات",
      "منح دراسية للأبناء المتميزين",
    ],
  },
  {
    emoji: "🍽️",
    title: "المطاعم",
    color: "#EF4444",
    bg: "from-red-900/30 to-red-950/20",
    border: "border-red-500/30",
    items: [
      "وجبة مجانية مع كل وجبة رئيسية",
      "خصومات في آلاف المطاعم",
      "عروض خاصة في المناسبات",
      "أولوية الحجز في المطاعم الفاخرة",
    ],
  },
];

export default function Benefits() {
  return (
    <div className="bg-[#0d1117] min-h-screen">
      {/* Header */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="text-[#FDC700] font-bold text-sm uppercase tracking-widest">ما الذي تحصل عليه</span>
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl mt-3 mb-4">
            مزايا بطاقة اسعاد
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            مئات المزايا الحصرية في مختلف القطاعات لك ولعائلتك الكريمة
          </p>
        </div>
      </div>

      {/* Highlight bar */}
      <div className="bg-[#1a5c2a]/20 border-y border-[#2d7a3a]/30 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { value: "+500", label: "شريك تجاري" },
              { value: "+200K", label: "أسرة مستفيدة" },
              { value: "%70", label: "توفير في المتوسط" },
              { value: "7", label: "إمارات مشمولة" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[#FDC700] font-extrabold text-2xl sm:text-3xl">{s.value}</p>
                <p className="text-white/50 text-xs sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-gradient-to-br ${cat.bg} border ${cat.border} p-6 hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{cat.emoji}</span>
                <h3 className="text-white font-bold text-xl">{cat.title}</h3>
              </div>
              <ul className="space-y-3">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/70 text-sm">
                    <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: cat.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Premium tier */}
      <section className="bg-[#060a0f] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-white font-extrabold text-3xl sm:text-4xl">باقات البطاقة</h2>
            <p className="text-white/50 mt-3">اختر الباقة التي تناسب أسرتك</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "الأساسية",
                price: "مجاناً",
                sub: "للأسر ذات طفل واحد",
                color: "#6B7280",
                features: ["50+ شريك", "خصومات أساسية", "دعم فني"],
              },
              {
                name: "العائلية",
                price: "مجاناً",
                sub: "للأسر ذات 2-4 أطفال",
                color: "#2d7a3a",
                featured: true,
                features: ["200+ شريك", "خصومات محسّنة", "تأمين صحي", "أولوية الدعم"],
              },
              {
                name: "الكبرى",
                price: "مجاناً",
                sub: "للأسر ذات 5+ أطفال",
                color: "#FDC700",
                features: ["500+ شريك", "خصومات قصوى", "تأمين شامل", "خدمة VIP", "مزايا حصرية"],
              },
            ].map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border text-center ${
                  tier.featured
                    ? "bg-[#1a5c2a]/30 border-[#2d7a3a] shadow-xl shadow-green-900/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {tier.featured && (
                  <span className="inline-block bg-[#FDC700] text-[#101828] font-bold text-xs px-3 py-1 rounded-full mb-4">
                    الأكثر شيوعاً
                  </span>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{tier.name}</h3>
                <p className="text-white/50 text-xs mb-4">{tier.sub}</p>
                <p className="font-extrabold text-3xl mb-6" style={{ color: tier.color }}>{tier.price}</p>
                <ul className="space-y-2 text-right mb-6">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-white/70 text-sm">
                      <Check size={14} style={{ color: tier.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/join"
                  className={`block w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    tier.featured
                      ? "bg-[#2d7a3a] hover:bg-[#3a9f4a] text-white"
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  اشترك الآن
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#1a5c2a] to-[#2d7a3a] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-white font-extrabold text-3xl mb-4">جاهز للانضمام؟</h2>
          <p className="text-white/80 mb-8">سجّل الآن واستمتع بمزاياك فوراً</p>
          <Link
            href="/join"
            className="inline-block bg-[#FDC700] hover:bg-[#e6b400] text-[#101828] font-bold px-10 py-4 rounded-2xl text-base transition-all hover:shadow-xl"
          >
            سجّل مجاناً
          </Link>
        </div>
      </section>
    </div>
  );
}
