import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  useCase?: string;
  volume?: string;
  message?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isPhone(v: string) {
  return /^[+\d][\d\s-]{8,14}$/.test(v);
}

/**
 * Demo lead endpoint. In production, forward to HubSpot / LeadSquared / Slack.
 * For now we validate, log, and return success so the form is fully wired.
 */
export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const company = (body.company ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const phone = (body.phone ?? "").trim();
  const useCase = (body.useCase ?? "").trim();

  if (!name || !company || !isEmail(email) || !isPhone(phone) || !useCase) {
    return NextResponse.json(
      { error: "Missing or invalid required fields" },
      { status: 400 }
    );
  }

  const lead = {
    name,
    company,
    email,
    phone,
    useCase,
    volume: (body.volume ?? "").trim() || null,
    message: (body.message ?? "").trim() || null,
    receivedAt: new Date().toISOString(),
    source: "speaksy.in/contact",
  };

  // Replace this log with your CRM webhook:
  // await fetch(process.env.LEAD_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(lead) })
  console.info("[lead]", JSON.stringify(lead));

  return NextResponse.json({ ok: true, id: `lead_${Date.now()}` });
}
