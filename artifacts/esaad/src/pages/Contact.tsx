import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-[#0d1117] min-h-screen">
      {/* Header */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-50" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="text-[#FDC700] font-bold text-sm uppercase tracking-widest">تواصل معنا</span>
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl mt-3 mb-4">
            نحن هنا لمساعدتك
          </h1>
          <p className="text-white/60 text-lg">
            تواصل مع فريق الدعم لدينا وسنكون سعيدين بمساعدتك
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: <Phone size={22} className="text-[#2d7a3a]" />,
                title: "الهاتف",
                lines: ["800-ESAAD (800-37223)", "متاح طوال أيام الأسبوع"],
              },
              {
                icon: <Mail size={22} className="text-[#2d7a3a]" />,
                title: "البريد الإلكتروني",
                lines: ["info@esaad.ae", "support@esaad.ae"],
              },
              {
                icon: <MapPin size={22} className="text-[#2d7a3a]" />,
                title: "العنوان",
                lines: ["مبنى اسعاد، شارع الشيخ زايد", "دبي، الإمارات العربية المتحدة"],
              },
              {
                icon: <Clock size={22} className="text-[#2d7a3a]" />,
                title: "ساعات العمل",
                lines: ["الأحد – الخميس: 8ص – 8م", "الجمعة – السبت: 10ص – 6م"],
              },
            ].map((info, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:border-[#2d7a3a]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2d7a3a]/20 flex items-center justify-center flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{info.title}</h3>
                  {info.lines.map((line, j) => (
                    <p key={j} className="text-white/55 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-3">تابعنا على</h3>
              <div className="flex gap-3">
                {[
                  { label: "تويتر", emoji: "𝕏" },
                  { label: "فيسبوك", emoji: "f" },
                  { label: "إنستغرام", emoji: "📷" },
                  { label: "يوتيوب", emoji: "▶" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#2d7a3a] flex items-center justify-center text-white text-xs font-bold transition-all duration-200"
                    title={s.label}
                  >
                    {s.emoji}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#1a5c2a]/30 border border-[#2d7a3a]/40 flex items-center justify-center mb-5">
                  <CheckCircle size={40} className="text-[#3a9f4a]" />
                </div>
                <h2 className="text-white font-extrabold text-2xl mb-3">تم إرسال رسالتك!</h2>
                <p className="text-white/60 mb-6 text-base">
                  شكراً على تواصلك معنا. سيرد عليك فريقنا خلال 24-48 ساعة.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="text-[#2d7a3a] hover:text-[#3a9f4a] font-bold text-sm transition-colors underline"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5"
              >
                <h2 className="text-white font-bold text-xl mb-2">أرسل لنا رسالة</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ContactField label="الاسم الكامل" name="name" value={form.name} onChange={handleChange} placeholder="أدخل اسمك" required />
                  <ContactField label="رقم الجوال" name="phone" value={form.phone} onChange={handleChange} placeholder="+971 XX XXX XXXX" type="tel" />
                </div>

                <ContactField label="البريد الإلكتروني" name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" type="email" required />

                <div>
                  <label className="block text-white/80 font-bold text-sm mb-2">الموضوع <span className="text-red-400">*</span></label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/8 border border-white/15 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#2d7a3a]/60 transition-colors"
                  >
                    <option value="" className="bg-[#0d1117]">اختر الموضوع</option>
                    <option value="registration" className="bg-[#0d1117]">التسجيل في البطاقة</option>
                    <option value="benefits" className="bg-[#0d1117]">الاستفسار عن المزايا</option>
                    <option value="partner" className="bg-[#0d1117]">الانضمام كشريك</option>
                    <option value="complaint" className="bg-[#0d1117]">تقديم شكوى</option>
                    <option value="other" className="bg-[#0d1117]">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 font-bold text-sm mb-2">الرسالة <span className="text-red-400">*</span></label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    required
                    className="w-full bg-white/8 border border-white/15 rounded-xl py-3 px-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#2d7a3a]/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2d7a3a] hover:bg-[#3a9f4a] text-white font-bold py-4 rounded-2xl text-base transition-all hover:shadow-xl hover:shadow-green-900/40"
                >
                  إرسال الرسالة
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-white font-extrabold text-2xl sm:text-3xl text-center mb-8">الأسئلة الشائعة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: "من يحق له التقديم؟", a: "المواطنون الإماراتيون والمقيمون في الدولة الذين لديهم أطفال." },
              { q: "كم يستغرق الحصول على البطاقة؟", a: "يتم مراجعة الطلب خلال 3-5 أيام عمل وإرسال البطاقة بعدها." },
              { q: "هل البطاقة مجانية؟", a: "نعم، بطاقة اسعاد مجانية تماماً لجميع المستحقين." },
              { q: "ماذا لو أردت إضافة طفل جديد؟", a: "يمكنك تحديث بياناتك عبر التطبيق أو بالتواصل معنا مباشرة." },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-2">{faq.q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactField({
  label, name, value, onChange, placeholder, type = "text", required
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-white/80 font-bold text-sm mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white/8 border border-white/15 rounded-xl py-3 px-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#2d7a3a]/60 transition-colors"
      />
    </div>
  );
}
