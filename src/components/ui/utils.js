// utils/cn.js (or utils.js)
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  // note the spread into clsx
  return twMerge(clsx(inputs));
}
// src/components/ui/utils.js

