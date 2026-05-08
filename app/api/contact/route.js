import { Resend } from 'resend';

const TO_EMAIL = process.env.CONTACT_EMAIL || 'luisan.cabrera@gmail.com';

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder_configure_in_vercel');
  try {
    const body = await request.json();
    const { name, email, company, service, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no configurada. El email no se enviará en producción.');
      return Response.json({ ok: true, warning: 'Sin API key configurada' });
    }

    await resend.emails.send({
      from: 'Factoría de Ideas <noreply@factoriaideas.com>',
      to: TO_EMAIL,
      replyTo: email,
      subject: `🚀 Nuevo contacto: ${name}${company ? ' · ' + company : ''} — ${service || 'Sin servicio'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0C0C0E; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: #F5C300; padding: 24px 32px;">
            <h1 style="margin: 0; color: #0C0C0E; font-size: 22px; font-weight: 900;">🚀 NUEVO CLIENTE POTENCIAL</h1>
            <p style="margin: 4px 0 0; color: rgba(0,0,0,0.6); font-size: 13px;">Factoría de Ideas – Formulario de contacto</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; width: 120px;">Nombre</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F5C300;">${email}</td></tr>
              ${company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Empresa</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff;">${company}</td></tr>` : ''}
              ${service ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Servicio</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff;">${service}</td></tr>` : ''}
            </table>
            <div style="margin-top: 24px; background: rgba(245,195,0,0.08); border-left: 3px solid #F5C300; padding: 16px 20px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0 0 8px; color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Mensaje</p>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.6;">${message}</p>
            </div>
            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #F5C300; color: #0C0C0E; padding: 14px 32px; border-radius: 6px; font-weight: 900; font-size: 15px; text-decoration: none; letter-spacing: 0.04em;">RESPONDER A ${name.split(' ')[0].toUpperCase()}</a>
            </div>
          </div>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Error enviando email:', error);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
