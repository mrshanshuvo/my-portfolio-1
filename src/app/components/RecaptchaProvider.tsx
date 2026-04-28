"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import type { ReactNode } from "react";

interface RecaptchaProviderProps {
  children: ReactNode;
}

export default function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
