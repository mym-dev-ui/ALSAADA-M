import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function FormField({ label, error, required, className, ...rest }: Props) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        {...rest}
        className={`w-full border rounded-xl px-4 py-3.5 text-sm text-right placeholder:text-gray-400 focus:outline-none bg-white transition-colors ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-[#0c6e3e]"
        } ${className ?? ""}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
