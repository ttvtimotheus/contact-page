import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Clarik",
  description: "Privacy policy for Clarik healthcare solutions",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/contact">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contact
            </Link>
          </Button>

          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground">
                At Clarik, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Clinical-Grade Security</h2>
              <p className="text-muted-foreground">
                Your data is protected with clinical-grade security measures to ensure the highest level of privacy and compliance with healthcare regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us when you contact us, including your name, email address, company information, and message content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use your information to respond to your inquiries, provide support, and improve our services. We do not sell or share your personal information with third parties without your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:support@clarik.app" className="text-primary hover:underline">
                  support@clarik.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
