import { useState } from "react";
import { CheckCircle, ChevronLeft, AlertCircle } from "lucide-react";

const steps = [
  {
    num: "١",
    title: "إنشاء الحساب",
    desc: "أنشئ حسابك بمعلوماتك الشخصية",
  },
  {
    num: "٢",
    title: "بيانات الأسرة",
    desc: "أدخل معلومات الزوج/الزوجة والأطفال",
  },
  {
    num: "٣",
    title: "الوثائق المطلوبة",
    desc: "ارفع الوثائق اللازمة للتحقق",
  },
  {
    num: "٤",
    title: "الموافقة وإصدار البطاقة",
    desc: "انتظر مراجعة طلبك وإصدار بطاقتك",
  },
];

export default function Join() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", emiratesId: "", phone: "", email: "",
    city: "", children: "1",
    spouseName: "", spouseId: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleNext() {
    if (step < 3) setStep(step + 1);
    else setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[#0d1117] min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-24 h-24 rounded-full bg-[#1a5c2a]/30 border border-[#2d7a3a]/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-[#3a9f4a]" />
          </div>
          <h1 className="text-white font-extrabold text-3xl mb-3">تم إرسال طلبك!</h1>
          <p className="text-white/60 text-lg mb-2">رقم الطلب: <span className="text-[#FDC700] font-bold">#ESAAD-{Math.floor(Math.random()*90000)+10000}</span></p>
          <p className="text-white/50 text-base mb-8">
            سيتم مراجعة طلبك خلال 3-5 أيام عمل. ستتلقى رسالة نصية وبريد إلكتروني بالتحديثات.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-right">
            <h3 className="text-white font-bold mb-3">ما الذي يحدث الآن؟</h3>
            {[
              "يتم مراجعة بياناتك ووثائقك",
              "إشعار خلال 3-5 أيام عمل",
              "إرسال البطاقة على عنوانك",
              "تفعيل البطاقة والاستمتاع بالمزايا",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <span className="w-6 h-6 rounded-full bg-[#2d7a3a]/40 text-[#3a9f4a] text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-white/60 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setForm({ name: "", emiratesId: "", phone: "", email: "", city: "", children: "1", spouseName: "", spouseId: "" }); }}
            className="text-white/50 hover:text-white text-sm transition-colors underline"
          >
            إرسال طلب جديد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <span className="text-[#FDC700] font-bold text-sm uppercase tracking-widest">الانضمام</span>
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl mt-3 mb-3">
          سجّل في اسعاد
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto">
          انضم إلى مئات الآلاف من الأسر الإماراتية المستفيدة
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Step progress */}
        <div className="flex items-center justify-center mb-10 gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  i < step
                    ? "bg-[#2d7a3a] text-white"
                    : i === step
                    ? "bg-[#FDC700] text-[#101828]"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {i < step ? <CheckCircle size={16} /> : s.num}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-14 h-0.5 mx-1 transition-all ${i < step ? "bg-[#2d7a3a]" : "bg-white/15"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step title */}
        <div className="text-center mb-8">
          <h2 className="text-white font-bold text-xl">{steps[step].title}</h2>
          <p className="text-white/50 text-sm mt-1">{steps[step].desc}</p>
        </div>

        {/* Form card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
          {/* Step 0 - Personal info */}
          {step === 0 && (
            <div className="space-y-4">
              <FormField label="الاسم الكامل" name="name" value={form.name} onChange={handleChange} placeholder="أدخل اسمك الكامل" required />
              <FormField label="رقم الهوية الإماراتية" name="emiratesId" value={form.emiratesId} onChange={handleChange} placeholder="784-XXXX-XXXXXXX-X" required />
              <FormField label="رقم الجوال" name="phone" value={form.phone} onChange={handleChange} placeholder="+971 XX XXX XXXX" type="tel" required />
              <FormField label="البريد الإلكتروني" name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" type="email" required />
              <div>
                <label className="block text-white/80 font-bold text-sm mb-2">الإمارة</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full bg-white/8 border border-white/15 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#2d7a3a]/60 transition-colors"
                >
                  <option value="">اختر الإمارة</option>
                  {["دبي", "أبوظبي", "الشارقة", "عجمان", "رأس الخيمة", "الفجيرة", "أم القيوين"].map((c) => (
                    <option key={c} value={c} className="bg-[#0d1117]">{c}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 1 - Family info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 font-bold text-sm mb-2">عدد الأطفال</label>
                <select
                  name="children"
                  value={form.children}
                  onChange={handleChange}
                  className="w-full bg-white/8 border border-white/15 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#2d7a3a]/60 transition-colors"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1} className="bg-[#0d1117]">{i + 1} {i === 0 ? "طفل" : "أطفال"}</option>
                  ))}
                </select>
              </div>
              <FormField label="اسم الزوج/الزوجة" name="spouseName" value={form.spouseName} onChange={handleChange} placeholder="الاسم الكامل" />
              <FormField label="رقم هوية الزوج/الزوجة" name="spouseId" value={form.spouseId} onChange={handleChange} placeholder="784-XXXX-XXXXXXX-X" />

              <div className="bg-[#FDC700]/10 border border-[#FDC700]/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-[#FDC700] mt-0.5 flex-shrink-0" />
                  <p className="text-[#FDC700]/80 text-sm">
                    كلما زاد عدد الأطفال، كلما ازدادت مزايا بطاقتك!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Documents */}
          {step === 2 && (
            <div className="space-y-4">
              {[
                { label: "صورة من الهوية الإماراتية (الأمام والخلف)", req: true },
                { label: "صورة من جواز السفر", req: true },
                { label: "صورة من دفتر العائلة أو شهادات الميلاد", req: true },
                { label: "صورة شخصية حديثة", req: false },
              ].map((doc, i) => (
                <div key={i} className="border-2 border-dashed border-white/20 rounded-xl p-5 text-center hover:border-[#2d7a3a]/50 transition-colors cursor-pointer group">
                  <div className="text-3xl mb-2">📄</div>
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">{doc.label}</p>
                  {doc.req && <span className="text-[#EF4444] text-xs">* مطلوب</span>}
                  <p className="text-white/30 text-xs mt-1">اضغط لاختيار الملف (PDF, JPG, PNG)</p>
                </div>
              ))}
              <p className="text-white/40 text-xs text-center">الحجم الأقصى: 5MB لكل ملف</p>
            </div>
          )}

          {/* Step 3 - Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">مراجعة البيانات</h3>
              <div className="space-y-3">
                {[
                  { label: "الاسم الكامل", value: form.name || "—" },
                  { label: "رقم الهوية", value: form.emiratesId || "—" },
                  { label: "رقم الجوال", value: form.phone || "—" },
                  { label: "البريد الإلكتروني", value: form.email || "—" },
                  { label: "الإمارة", value: form.city || "—" },
                  { label: "عدد الأطفال", value: form.children },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/50 text-sm">{row.label}</span>
                    <span className="text-white font-bold text-sm">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 accent-[#2d7a3a]" />
                  <span className="text-white/60 text-sm leading-relaxed">
                    أقر بأن جميع البيانات المقدمة صحيحة وأوافق على{" "}
                    <span className="text-[#2d7a3a] underline">الشروط والأحكام</span>{" "}
                    وسياسة الخصوصية.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 gap-4">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold transition-colors"
              >
                <ChevronLeft size={16} className="rotate-180" />
                السابق
              </button>
            ) : <div />}
            <button
              onClick={handleNext}
              className="flex-1 sm:flex-none bg-[#2d7a3a] hover:bg-[#3a9f4a] text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-green-900/40"
            >
              {step === 3 ? "إرسال الطلب" : "التالي"}
            </button>
          </div>
        </div>

        {/* Info note */}
        <p className="text-white/30 text-xs text-center mt-6">
          البطاقة مجانية تماماً • يستغرق الاعتماد 3-5 أيام عمل
        </p>
      </div>
    </div>
  );
}

function FormField({
  label, name, value, onChange, placeholder, type = "text", required
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-white/80 font-bold text-sm mb-2">
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/8 border border-white/15 rounded-xl py-3 px-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#2d7a3a]/60 transition-colors"
      />
    </div>
  );
}
