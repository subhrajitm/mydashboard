import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const glassEffect = {
  base: "backdrop-blur-xl transition-all duration-300",
  hover: "hover:backdrop-blur-2xl hover:bg-white/30 dark:hover:bg-gray-800/30",
  light: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
  dark: "dark:before:from-gray-800/20",
  border: "border border-white/10 dark:border-gray-700/10",
  shadow: "shadow-sm hover:shadow-[0_0_20px_rgba(255,79,89,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,173,40,0.1)]"
}

export const glassClassName = cn(
  glassEffect.base,
  glassEffect.hover,
  glassEffect.light,
  glassEffect.dark,
  glassEffect.border,
  glassEffect.shadow
)
