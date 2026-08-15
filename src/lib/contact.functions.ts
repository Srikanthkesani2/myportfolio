import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255, "Email is too long"),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
});

const TO_EMAIL = "kesanisrikanthreddy5@gmail.com";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("Email service is not configured.");
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: data.email,
      subject: `New portfolio message from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New message from your portfolio</h2>

          <p>
            <strong>Name:</strong>
            ${escapeHtml(data.name)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(data.email)}
          </p>

          <p><strong>Message:</strong></p>

          <p>
            ${escapeHtml(data.message).replace(/\n/g, "<br />")}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Contact email error:", error);
      throw new Error("Message could not be sent right now.");
    }

    return {
      ok: true as const,
    };
  });