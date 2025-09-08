import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ message: "Faltan campos obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: "Formato de correo electrónico no válido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Get environment variables
    const apiKey = import.meta.env.SENDGRID_API_KEY;
    const senderEmail =
      import.meta.env.SENDER_EMAIL || "noreply@mejoresfinanzas.com";
    const recipientEmail =
      import.meta.env.RECIPIENT_EMAIL || "info@mejoresfinanzas.com";

    if (!apiKey) {
      console.error("Falta la clave de API de SendGrid");
      return new Response(
        JSON.stringify({ message: "Error de configuración del servidor" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // Configure nodemailer with SendGrid
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: apiKey,
      },
    });

    // Email HTML template
    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; }
          h1 { color: #4A90E2; margin-bottom: 20px; }
          .info-row { margin-bottom: 10px; }
          .label { font-weight: bold; margin-right: 10px; }
          .message-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #e0e0e0; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Nuevo Envío de Formulario de Contacto</h1>
          <div class="info-row"><span class="label">Nombre:</span> ${name}</div>
          <div class="info-row"><span class="label">Correo Electrónico:</span> ${email}</div>
          <div class="info-row"><span class="label">Asunto:</span> ${subject}</div>
          <div class="message-box">
            <span class="label">Mensaje:</span>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
          <div class="footer">Este correo fue enviado desde el formulario de contacto del sitio.</div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Contacto del Sitio" <${senderEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `Formulario de Contacto: ${subject}`,
      text: `
        Recibiste un nuevo mensaje de tu formulario de contacto:

        Nombre: ${name}
        Correo Electrónico: ${email}
        Asunto: ${subject}

        Mensaje:
        ${message}
      `,
      html: htmlMessage,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "¡Mensaje enviado con éxito!" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error al procesar el formulario de contacto:", error);
    return new Response(
      JSON.stringify({ message: "Error al enviar el mensaje" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
