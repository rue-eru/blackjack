import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "gold" | "emerald";
}

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = "primary" 
}: ButtonProps) => {
  const baseStyles = `
    font-bold py-2 px-4 rounded-lg 
    border border-b-4 
    shadow-md 
    transition-all duration-150 
    active:border-b-2 active:translate-y-0.5 
    focus:outline-none focus:ring-2 
    cursor-pointer w-full h-12
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-emerald-800 hover:bg-emerald-900 
      border-emerald-600 
      shadow-emerald-950/80 
      focus:ring-emerald-400 
      text-amber-100
    `,
    danger: `
      bg-rose-800 hover:bg-rose-900 
      border-rose-600 
      shadow-rose-950/80 
      focus:ring-rose-400 
      text-amber-100
    `,
    gold: `
      bg-amber-600 hover:bg-amber-700 
      border-amber-500 
      shadow-amber-950/80 
      focus:ring-amber-300 
      text-amber-100
      text-nowrap
    `,
    emerald: `
      bg-emerald-700 hover:bg-emerald-800 
      border-emerald-300 
      shadow-amber-950/80 
      focus:ring-emerald-100 
      text-amber-100
      text-nowrap
    `
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;