import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * دالة مساعدة لدمج وتنسيق أصناف Tailwind CSS بأمان دون تداخل أو تعارض.
 * @param {...(string|Object|Array)} inputs - الأصناف، الكائنات، أو الشروط المراد دمجها.
 * @returns {string} - سلسلة نصية تحتوي على الأصناف المدمجة النهائية.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}