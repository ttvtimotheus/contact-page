import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service - Clarik",
  description: "Terms of service for Clarik healthcare solutions",
};

export default function TermsPage() {
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

          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Clarik&apos;s services, you agree to be bound by these
                Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
              <p className="text-muted-foreground">
                You agree to use our services only for lawful purposes and in accordance with
                these Terms. You must not use our services in any way that violates any
                applicable laws or regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Healthcare Compliance</h2>
              <p className="text-muted-foreground">
                Our services are designed to meet healthcare industry standards and regulations.
                Users are responsible for ensuring their use of our services complies with
                applicable healthcare laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the fullest extent permitted by law, Clarik shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at{" "}
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
