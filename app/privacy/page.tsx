import { redirect } from "next/navigation";

export const metadata = {
  title: "Privacy Policy - Clarik",
  description: "Privacy policy for Clarik healthcare solutions",
};

export default function PrivacyPage() {
  return (
    redirect("https://www.estopia.net/privacymed")
  );
}
