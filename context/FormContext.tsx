"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface FormData {
  name: string; phone: string; id_number: string;
  membership: string; emirate: string; delivery_date: string;
}

interface FormContextType {
  data: FormData; setField: (k: keyof FormData, v: string) => void; reset: () => void;
  docId: string | null; setDocId: (id: string) => void;
  confirmationCode: string; setConfirmationCode: (c: string) => void;
}

const empty: FormData = { name: "", phone: "", id_number: "", membership: "", emirate: "", delivery_date: "" };

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FormData>(empty);
  const [docId, setDocId] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState("");
  const setField = (k: keyof FormData, v: string) => setData((prev) => ({ ...prev, [k]: v }));
  const reset = () => { setData(empty); setDocId(null); setConfirmationCode(""); };
  return (
    <FormContext.Provider value={{ data, setField, reset, docId, setDocId, confirmationCode, setConfirmationCode }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormData must be inside FormProvider");
  return ctx;
}
