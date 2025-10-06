import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";

const DEPARTMENT_EMAILS = {
  sales: process.env.SALES_EMAIL || "sales@clarik.app",
  support: process.env.SUPPORT_EMAIL || "support@clarik.app",
  press: process.env.PRESS_EMAIL || "press@clarik.app",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    const { name, email, company, message, department } = validatedData;

    // Get recipient email based on department
    const recipientEmail = DEPARTMENT_EMAILS[department];

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@clarik.app",
      to: recipientEmail,
      replyTo: email,
      subject: `New ${department} inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f4f4f4; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50; margin-top: 0;">New Contact Form Submission</h2>
            <p style="font-size: 14px; color: #7f8c8d; margin-bottom: 0;">Department: ${department.charAt(0).toUpperCase() + department.slice(1)}</p>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
            <h3 style="color: #2c3e50; margin-top: 0; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Contact Information</h3>
            
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Name:</strong><br/>
              ${name}
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Email:</strong><br/>
              <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
            </p>
            
            ${company ? `
              <p style="margin: 10px 0;">
                <strong style="color: #555;">Company:</strong><br/>
                ${company}
              </p>
            ` : ''}
            
            <h3 style="color: #2c3e50; margin-top: 30px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Message</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #ecf0f1; border-radius: 8px; font-size: 12px; color: #7f8c8d; text-align: center;">
            <p style="margin: 0;">This message was sent via the Clarik contact form.</p>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Department: ${department.charAt(0).toUpperCase() + department.slice(1)}

Contact Information:
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}

---
This message was sent via the Clarik contact form.
      `,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Your message has been sent successfully. We'll get back to you soon!" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
