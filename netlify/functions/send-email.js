const { Resend } = require('resend');

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { to, subject, html } = JSON.parse(event.body || '{}');
        
        if (!to) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Recipient email is missing' }) };
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error: API key missing' }) };
        }

        const resend = new Resend(resendApiKey);

        const data = await resend.emails.send({
            from: 'Johnny Edge Limited <onboarding@resend.dev>',
            to: [to],
            subject: subject || 'SEO Audit Report',
            html: html || '<p>Your website SEO audit report is ready.</p>',
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Failed to send email' }),
        };
    }
}
