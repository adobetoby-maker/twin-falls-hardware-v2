import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteInfo } from "@/lib/siteInfo";

interface ContractorPayload {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  trade: string;
  monthlySpend?: string;
  notes?: string;
}

export async function POST(request: Request) {
  let body: ContractorPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { businessName, contactName, email, phone, trade, monthlySpend, notes } = body;

  if (!businessName || !contactName || !email || !phone || !trade) {
    return NextResponse.json(
      { error: "Business name, contact, email, phone, and trade are required." },
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "noreply@twinfallshardware-v2.worker-bee.app",
      to: siteInfo.email,
      replyTo: email,
      subject: `Net-30 Application: ${businessName}`,
      html: `
        <h2>Contractor Net-30 Account Application</h2>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Trade / Specialty:</strong> ${trade}</p>
        ${monthlySpend ? `<p><strong>Est. Monthly Spend:</strong> ${monthlySpend}</p>` : ""}
        ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit application. Please call us directly." },
      { status: 500 }
    );
  }
}
