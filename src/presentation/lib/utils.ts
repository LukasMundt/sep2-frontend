import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "universal-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function isAuthenticatedSimple() {
  // achtung: checkt nur, ob access token existiert. Müsste eigentlich reichen, weil Daten ja eh nur geladen werden, wenn der access token auch funktioniert
  return new Cookies().get("accessToken") != undefined;
}