import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  str = str.toLowerCase(); // Convert the string to lowercase
  str = str.replace(/\s+/g, "-"); // Replace spaces with hyphens
  str = str.replace(/[^a-z0-9-]/g, ""); // Remove special characters and non-alphanumeric characters
  str = str.replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
  str = str.replace(/^-+|-+$/g, ""); // Remove hyphens from the beginning and end
  return str;
}
