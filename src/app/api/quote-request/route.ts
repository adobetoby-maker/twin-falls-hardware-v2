import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteInfo } from "@/lib/siteInfo";

interface QuoteItem {
  name: string;
  quantity: number;
  price: number;
}

interface QuotePayload {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  items: QuoteItem[];
  total: number;
}

export async function POST(request: Request) {
  let body: QuotePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, items, total, phone, notes } = body;

  if (!name || !email || !items?.length) {
    return NextResponse.json(
      { error: "Name, email, and cart items are required." },
      { status: 400 }
    );
  }

  const itemRows = items
    .map(
      (i: QuoteItem) =>
        `<tr><td style="padding:4px 8px">${i.name}</td><td style="padding:4px 8px;text-align:right">${i.quantity}</td><td style="padding:4px 8px;text-align:right">$${(i.price * i.quantity).toFixed(2)}</td></tr>`
    )
    .join("");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "noreply@twinfallshardware-v2.worker-bee.app",
      to: siteInfo.email,
      replyTo: email,
      subject: `Quote Request from ${name} — Twin Falls Hardware`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <h3>Items</h3>
        <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
          <thead><tr><th style="padding:4px 8px;text-align:left">Item</th><th style="padding:4px 8px">Qty</th><th style="padding:4px 8px">Subtotal</th></tr></thead>
          <tbody>${itemRows}</tbody>
          <tfoot><tr><td colspan="2" style="padding:4px 8px;text-align:right;font-weight:bold">Total</td><td style="padding:4px 8px;text-align:right;font-weight:bold">$${total.toFixed(2)}</td></tr></tfoot>
        </table>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send quote. Please call us directly." },
      { status: 500 }
    );
  }
}
