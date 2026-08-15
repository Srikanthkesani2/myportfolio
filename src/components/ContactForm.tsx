import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendContactMessage } from "@/lib/contact.functions";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  message: z.string().trim().min(1, "Please write a message").max(2000, "Message is too long"),
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const send = useServerFn(sendContactMessage);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const field =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    try {
      await send({ data: parsed.data });
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "Message could not be sent. Please try again.",
      );
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          value={values.name}
          onChange={field("name")}
          maxLength={100}
          placeholder="Your name"
          className={inputClass}
        />
        {errors.name ? <p className="mt-2 text-xs text-brand-red">{errors.name}</p> : null}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={field("email")}
          maxLength={255}
          placeholder="you@example.com"
          className={inputClass}
        />
        {errors.email ? <p className="mt-2 text-xs text-brand-red">{errors.email}</p> : null}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={field("message")}
          maxLength={2000}
          rows={5}
          placeholder="What would you like to build together?"
          className={`${inputClass} resize-none`}
        />
        {errors.message ? <p className="mt-2 text-xs text-brand-red">{errors.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "SENDING…" : "SEND MESSAGE"}
      </button>

      {status === "sent" ? (
        <p className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
          Message sent — thanks for reaching out. I'll reply to your email soon.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-xl border border-brand-red/40 bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
