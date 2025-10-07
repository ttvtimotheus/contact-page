import { redirect } from "next/navigation";

export const metadata = {
  title: "Terms of Service - Clarik",
  description: "Terms of service for Clarik healthcare solutions",
};

export default function PrivacyPage() {
  return (
    redirect("https://www.estopia.net/termsmed")
  );
}
