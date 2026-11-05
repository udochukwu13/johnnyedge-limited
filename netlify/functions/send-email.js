import { Resend } from 'resend';

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const toEmail = body.to || body.email;
        const subject = body.subject || 'SEO Audit Report';
        const htmlContent = body.html || '<p>Your website SEO audit report is ready.</p>';

        if (!toEmail) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Recipient email is missing' }) };
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            return { statusCode: 500, body: JSON.stringify({ error: 'API key missing in environment variables' }) };
        }

        const resend = new Resend(resendApiKey);

        const data = await resend.emails.send({
            from: 'Johnny Edge Limited <audit@johnnyedgelimited.com>',
            to: [toEmail],
            subject: subject,
            html: htmlContent,
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
