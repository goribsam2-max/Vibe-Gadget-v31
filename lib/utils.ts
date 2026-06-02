import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceBdt: number | string | undefined | null) {
  if (!priceBdt) return "৳0";
  const numPrice = typeof priceBdt === 'string' ? parseFloat(priceBdt) : priceBdt;
  
  if (typeof window !== 'undefined') {
    const region = localStorage.getItem('user_region');
    // BDT to INR approx 0.71
    if (region === 'IN') {
      const inr = Math.round(numPrice * 0.71);
      return `₹${inr.toLocaleString()}`;
    }
    // BDT to PKR approx 2.40
    if (region === 'PK') {
      const pkr = Math.round(numPrice * 2.40);
      return `Rs ${pkr.toLocaleString()}`;
    }
  }
  
  return `৳${numPrice.toLocaleString()}`;
}

