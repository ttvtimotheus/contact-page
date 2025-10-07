import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Legal Notice - Clarik",
  description: "Legal notice for Clarik healthcare solutions",
};

export default function LegalPage() {
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

            <h1 className="text-4xl font-bold mb-8">Legal Notice</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
                <p className="text-muted-foreground">
                  Clarik is a healthcare technology company dedicated to providing secure, compliant communication solutions for individuals, families, practices, and clinics.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content, trademarks, and intellectual property on this website are owned by or licensed to Clarik. Unauthorized use is prohibited.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Regulatory Compliance</h2>
                <p className="text-muted-foreground">
                  Clarik maintains compliance with applicable healthcare regulations and data protection laws to ensure the security and privacy of user information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <p className="text-muted-foreground">
                  The information provided on this website is for general informational purposes only and does not constitute professional medical or legal advice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  For legal inquiries, please contact us at{" "}
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
