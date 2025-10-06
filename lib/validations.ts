import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must not exceed 100 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must not exceed 255 characters" }),
  company: z
    .string()
    .max(100, { message: "Company name must not exceed 100 characters" })
    .optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must not exceed 2000 characters" }),
  department: z.enum(["sales", "support", "press"], {
    message: "Please select a department",
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
