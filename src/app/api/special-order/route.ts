import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteInfo } from "@/lib/siteInfo";

interface SpecialOrderPayload {
  name: string;
  email: string;
  phone: string;
  itemDescription: string;
  brand?: string;
  partNumber?: string;
  quantity?: string;
  neededBy?: string;
}

export async function POST(request: Request) {
  let body: SpecialOrderPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, itemDescription, brand, partNumber, quantity, neededBy } = body;

  if (!name || !email || !phone || !itemDescription) {
    return NextResponse.json(
      { error: "Name, email, phone, and item description are required." },
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "noreply@twinfallshardware-v2.worker-bee.app",
      to: siteInfo.email,
      replyTo: email,
      subject: `Special Order Request from ${name}`,
      html: `
        <h2>Special Order Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Item Description:</strong> ${itemDescription}</p>
        ${brand ? `<p><strong>Brand:</strong> ${brand}</p>` : ""}
        ${partNumber ? `<p><strong>Part Number:</strong> ${partNumber}</p>` : ""}
        ${quantity ? `<p><strong>Quantity Needed:</strong> ${quantity}</p>` : ""}
        ${neededBy ? `<p><strong>Needed By:</strong> ${neededBy}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit order request. Please call us directly." },
      { status: 500 }
    );
  }
}
