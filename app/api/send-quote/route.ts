import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      companyName,
      contactPerson,
      email,
      phone,
      deliveryAddress,
      specialInstructions,
      deliveryDate,
      items,
      subtotal,
      totalItems,
    } = data;

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD,
      },
    });

    // Format items for email
    const itemsList = items.map((item: any, index: number) => {
      return `${index + 1}. ${item.name} (SKU: ${item.sku})\n   Quantity: ${item.quantity} x ${item.price} = ${item.unit}\n`;
    }).join('\n');

    // Email content
    const emailContent = `
      NEW QUOTE REQUEST

      Client Details:
      -----------------
      Company: ${companyName}
      Contact Person: ${contactPerson}
      Email: ${email}
      Phone: ${phone}
      Delivery Address: ${deliveryAddress}
      Preferred Delivery Date: ${deliveryDate || 'Not specified'}

      Quote Details:
      -----------------
      Total Items: ${totalItems}
      Estimated Subtotal: ${subtotal}

      Items Requested:
      -----------------
      ${itemsList}

      Special Instructions:
      -----------------
      ${specialInstructions || 'None provided'}

      Quote Reference: EDU-${Date.now().toString().slice(-6)}
      Date: ${new Date().toLocaleString('en-ZA')}
    `;

    // Send email to EDUCORE team
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'quotes@educore.co.za',
      to: process.env.QUOTE_RECIPIENT || 'bongani@educore.co.za, info@educore.co.za',
      subject: `New Quote Request from ${companyName} - EDU-${Date.now().toString().slice(-6)}`,
      text: emailContent,
      replyTo: email,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'quotes@educore.co.za',
      to: email,
      subject: `Quote Request Received - EDU-${Date.now().toString().slice(-6)}`,
      text: `
        Dear ${contactPerson},

        Thank you for your quote request from EDUCORE.

        We have received your request for ${totalItems} items and will get back to you within 24 hours.

        Quote Reference: EDU-${Date.now().toString().slice(-6)}
        Date: ${new Date().toLocaleString('en-ZA')}

        Items Requested:
        ${itemsList}

        Estimated Subtotal: ${subtotal}

        If you have any questions, please contact us at:
        Phone: 071 945 0220
        Email: info@educore.co.za

        Kind regards,
        The EDUCORE Team
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending quote:', error);
    return NextResponse.json(
      { error: 'Failed to send quote' },
      { status: 500 }
    );
  }
}
