import nodemailer from "nodemailer";

// Helper: verify Google reCAPTCHA v2
async function verifyRecaptcha(token) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    { method: "POST" }
  );
  const data = await res.json();
  if (!data.success) {
    console.error("reCAPTCHA verification failed:", data["error-codes"]);
  }
  return data.success; // v2 only checks success
}

export async function POST(req) {
  try {
    const { name, email, message, honeypot, recaptchaToken } = await req.json();

    // ----------------- Spam protection -----------------
    if (honeypot) {
      // Bot detected via hidden field
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "reCAPTCHA verification failed.",
        }),
        { status: 400 }
      );
    }

    // ----------------- Input validation -----------------
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required." }),
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email address." }),
        { status: 400 }
      );
    }

    // Sanitize message (basic)
    const sanitizedMessage = message.replace(/<\/?[^>]+(>|$)/g, "");

    // ----------------- Nodemailer setup -----------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${sanitizedMessage}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
