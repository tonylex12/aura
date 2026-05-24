import React from "react";

interface AuthInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  required?: boolean;
  error?: string;
}

export default function AuthInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  error,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[0.75rem] text-text-secondary font-bold uppercase tracking-wider pl-1 select-none">
        {label}
        {required && <span className="text-danger-color ml-1">*</span>}
      </label>
      
      <div className="relative">
        {/* Absolute Prefix Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text-muted transition-colors">
          <i className={`fa-solid ${icon} text-sm`}></i>
        </div>
        
        {/* Glassmorphic Input Field */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all duration-300 ${
            error 
              ? "border-danger-color focus:border-danger-color focus:ring-danger-color/20" 
              : "border-white/10"
          }`}
        />
      </div>
      
      {/* Error Message Tooltip/Label */}
      {error && (
        <span className="text-[0.7rem] text-danger-color font-semibold pl-1 animate-pulse">
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}
