"use client";

import { PillScene } from "@/components/three/pill-scene";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SlideButton } from "@/components/ui/slide-button";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Clock, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      department: "sales",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        toast({
          title: "Message sent successfully!",
          description: result.message,
        });
        setTimeout(() => {
          reset();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
        toast({
          title: "Failed to send message",
          description: result.error || "Please try again later.",
          variant: "destructive",
        });
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 2000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Clarik makes contact simple
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  For individuals, families, practices, and clinics
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a href="#contact-form">
                    Contact us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#contact-cards">Book a demo</a>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Privacy at clinical level</span>
              </div>
            </div>

            {/* Right Column - Three.js Pill */}
            <div className="relative h-[400px] lg:h-[600px]">
              <PillScene className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Subtle background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]" />
      </section>

      {/* Contact Cards */}
      <section id="contact-cards" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Sales Card */}
            <Card className="group hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sales</CardTitle>
                <CardDescription>
                  Discover how Clarik can transform your practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href="mailto:sales@clarik.app"
                      className="hover:text-primary transition-colors"
                    >
                      sales@clarik.app
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Response within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="group hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Support</CardTitle>
                <CardDescription>
                  Get help with technical issues or questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href="mailto:support@clarik.app"
                      className="hover:text-primary transition-colors"
                    >
                      support@clarik.app
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Response within 12 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Press Card */}
            <Card className="group hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Press</CardTitle>
                <CardDescription>
                  Media inquiries and partnership opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href="mailto:press@clarik.app"
                      className="hover:text-primary transition-colors"
                    >
                      press@clarik.app
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Response within 48 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Send us a message
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you as soon as possible
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {/* Department Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <select
                      id="department"
                      {...register("department")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      aria-label="Select department"
                    >
                      <option value="sales">Sales</option>
                      <option value="support">Support</option>
                      <option value="press">Press</option>
                    </select>
                    {errors.department && (
                      <p className="text-sm text-destructive">
                        {errors.department.message}
                      </p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      {...register("name")}
                      aria-label="Your full name"
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email")}
                      aria-label="Your email address"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company (Optional) */}
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      Company <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your company name"
                      {...register("company")}
                      aria-label="Your company name (optional)"
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      {...register("message")}
                      aria-label="Your message"
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Privacy Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      {...register("privacyConsent")}
                      className="mt-1 h-4 w-4 rounded border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label="Privacy consent"
                      aria-invalid={errors.privacyConsent ? "true" : "false"}
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="privacyConsent"
                        className="text-sm font-normal cursor-pointer"
                      >
                        I agree to the{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and consent to the processing of my personal data
                      </Label>
                      {errors.privacyConsent && (
                        <p className="text-sm text-destructive">
                          {errors.privacyConsent.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <SlideButton
                      onSubmit={handleSubmit(onSubmit)}
                      status={submitStatus}
                      disabled={isSubmitting}
                      aria-label="Slide to send message"
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="text-xs text-center text-muted-foreground">
                    <Shield className="inline h-3 w-3 mr-1" />
                    Your information is protected with clinical-grade security
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 lg:p-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to experience Clarik?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of healthcare professionals who trust Clarik for secure,
              compliant communication
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="#contact-form">Get started today</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <a href="mailto:sales@clarik.app">Talk to sales</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Clarik. All rights reserved.
            </div>
            <nav className="flex gap-6" aria-label="Footer navigation">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Legal Notice
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
