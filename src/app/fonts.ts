import { Poppins, Righteous } from "next/font/google";

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-righteous",
});
