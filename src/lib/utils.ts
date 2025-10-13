import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | null, currency: string | null = "PKR") {
  if (amount === null || amount === undefined) {
    return "N/A";
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || "PKR",
    minimumFractionDigits: 0,
  }).format(amount).replace("PKR", "Rs.");
}

export const createUrl = (pathname: string, params: URLSearchParams | Record<string, string | string[] | null>) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};
