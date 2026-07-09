export async function submitToSheets(data) {
    const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message || 'Submission failed');
    }

    return json;
}
