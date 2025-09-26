import nodemailer from "nodemailer";

/**
 * Verify Google reCAPTCHA v2 token
 * @param {string} token - reCAPTCHA token from client
 * @returns {Promise<boolean>} - true if human, false otherwise
 */
async function verifyRecaptcha(token) {
  try {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" }
    );
    const data = await res.json();

    if (!data.success) {
      console.warn("reCAPTCHA verification failed:", data["error-codes"]);
    }

    return data.success; // v2 only returns success/failure
  } catch (err) {
    console.error("Error verifying reCAPTCHA:", err);
    return false;
  }
}

/**
 * Contact API POST handler
 * Expects JSON: { name, email, message, honeypot, recaptchaToken }
 */
export async function POST(req) {
  try {
    const { name, email, message, honeypot, recaptchaToken } = await req.json();

    // ----------------- Spam protection -----------------
    if (honeypot) {
      // Bot detected via hidden field – silently accept
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (!recaptchaToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "reCAPTCHA token is missing.",
        }),
        { status: 400 }
      );
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

    // ----------------- Sanitize message -----------------
    const sanitizedMessage = message.replace(/<\/?[^>]+(>|$)/g, "");

    // ----------------- Nodemailer setup -----------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ----------------- Send email -----------------
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
      JSON.stringify({ success: false, error: "Internal server error." }),
      { status: 500 }
    );
  }
}
