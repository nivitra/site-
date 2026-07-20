"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  useCase: string;
  volume: string;
  message: string;
};

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  useCase: "",
  volume: "",
  message: "",
};

const useCases = [
  "Lead qualification / sales",
  "Collections & payment reminders",
  "COD / order confirmation",
  "Appointment booking",
  "Inbound support automation",
  "Surveys & feedback",
  "Something else",
];

const volumes = [
  "Under 5,000 calls/month",
  "5,000 – 25,000",
  "25,000 – 1,00,000",
  "1,00,000 – 5,00,000",
  "5,00,000+",
];

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-line-strong focus:ring-2 focus:ring-white/10";

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please tell us your name";
    if (!form.company.trim()) e.company = "Company name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid work email";
    if (!/^[+\d][\d\s-]{8,14}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.useCase) e.useCase = "Pick the closest use case";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card relative overflow-hidden rounded-3xl p-8 sm:p-10">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="brand-pill flex h-20 w-20 items-center justify-center rounded-full"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-semibold">You&apos;re on the list, {form.name.split(" ")[0]}!</h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Our team will call you within one working day — and yes, the first call
              you get might just be a Speaksy agent. See if you can tell.
            </p>
            <button
              onClick={() => {
                setForm(initial);
                setSubmitted(false);
              }}
              className="text-sm font-semibold text-brand-400 hover:text-brand-300"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="lead-name">
                  Name
                </label>
                <input
                  id="lead-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name *"
                  value={form.name}
                  onChange={set("name")}
                  className={inputCls}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label className="sr-only" htmlFor="lead-company">
                  Company
                </label>
                <input
                  id="lead-company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Company *"
                  value={form.company}
                  onChange={set("company")}
                  className={inputCls}
                />
                {errors.company && <p className="mt-1.5 text-xs text-red-400">{errors.company}</p>}
              </div>
              <div>
                <label className="sr-only" htmlFor="lead-email">
                  Email
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Work email *"
                  value={form.email}
                  onChange={set("email")}
                  className={inputCls}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label className="sr-only" htmlFor="lead-phone">
                  Phone
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone (+91…) *"
                  value={form.phone}
                  onChange={set("phone")}
                  className={inputCls}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div>
                <label className="sr-only" htmlFor="lead-usecase">
                  Use case
                </label>
                <select
                  id="lead-usecase"
                  name="useCase"
                  value={form.useCase}
                  onChange={set("useCase")}
                  className={`${inputCls} ${form.useCase ? "" : "text-muted/60"}`}
                >
                  <option value="" disabled>
                    Primary use case *
                  </option>
                  {useCases.map((u) => (
                    <option key={u} value={u} className="bg-surface text-foreground">
                      {u}
                    </option>
                  ))}
                </select>
                {errors.useCase && <p className="mt-1.5 text-xs text-red-400">{errors.useCase}</p>}
              </div>
              <div>
                <label className="sr-only" htmlFor="lead-volume">
                  Volume
                </label>
                <select
                  id="lead-volume"
                  name="volume"
                  value={form.volume}
                  onChange={set("volume")}
                  className={`${inputCls} ${form.volume ? "" : "text-muted/60"}`}
                >
                  <option value="" disabled>
                    Monthly call volume (optional)
                  </option>
                  {volumes.map((v) => (
                    <option key={v} value={v} className="bg-surface text-foreground">
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="sr-only" htmlFor="lead-message">
                Message
              </label>
              <textarea
                id="lead-message"
                name="message"
                placeholder="Tell us about your use case — language, script, current setup… (optional)"
                value={form.message}
                onChange={set("message")}
                rows={4}
                className={`${inputCls} resize-none`}
              />
            </div>
            {serverError && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {serverError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="brand-pill rounded-xl py-4 text-sm font-bold text-white shadow-[0_8px_32px_-8px_rgba(34,197,94,0.8)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? "Sending…" : "Book My Live Demo →"}
            </button>
            <p className="text-center text-xs text-muted">
              We respond within one working day. Your data stays in India and is never sold.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
