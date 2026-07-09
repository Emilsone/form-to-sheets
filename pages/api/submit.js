export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
        return res.status(500).json({ message: 'Server configuration error.' });
    }

    try {
        const payload = {
            ...req.body,
            submittedAt: new Date().toISOString(),
        };

        const response = await fetch(scriptUrl, {
            method: 'POST',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const text = await response.text();

        if (!response.ok) {
            return res.status(500).json({ message: text || 'Request to Google Script failed.' });
        }

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return res.status(500).json({ message: 'Unexpected response format from Google Script.' });
        }

        let result;
        try {
            result = JSON.parse(text);
        } catch {
            return res.status(502).json({ message: 'Invalid response from Google Script.' });
        }

        if (result.result === 'success') {
            return res.status(200).json({ success: true });
        }

        return res.status(500).json({
            message: result.error || 'Google Apps Script request failed.',
        });

    } catch (error) {
        console.error(' Submit API error:', error.message);
        return res.status(500).json({ message: error.message });
    }
}