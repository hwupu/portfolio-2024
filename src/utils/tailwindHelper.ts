import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { type ClassValue };
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CLASS_TEXT_SIZE_SECONDARY = 'text-base/[2] sm:text-lg/[1.8]';
export const CLASS_TEXT_COLOR_SECONDARY = 'text-stone-600 dark:text-stone-400';
