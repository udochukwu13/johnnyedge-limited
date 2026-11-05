// netlify/functions/scrape.js
export async function handler(event) {
    const targetUrl = event.queryStringParameters?.url;

    if (!targetUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing 'url' query parameter" }),
        };
    }

    try {
        // Format URL correctly
        const formattedUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
        
        // Fetch external website HTML securely from the server side (bypassing CORS)
        const response = await fetch(formattedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SiteAuditorBot/1.0'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch target site: ${response.statusText}`);
        }

        const htmlContent = await response.text();

        // Universal Email Regex Pattern
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = htmlContent.match(emailRegex);

        // Filter out junk file extensions or common false positives
        const validEmails = matches ? [...new Set(matches)].filter(email => 
            !email.match(/\.(png|jpg|jpeg|gif|svg|webp|css|js|woff|ico)$/i) &&
            !email.includes('example.com') &&
            !email.includes('yourdomain')
        ) : [];

        const bestEmail = validEmails.length > 0 ? validEmails[0] : `contact@${new URL(formattedUrl).hostname.replace('www.', '')}`;

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: bestEmail, foundCount: validEmails.length }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message, email: 'johnnyedgelimited@gmail.com' }),
        };
    }
}
