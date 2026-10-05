// The contact form posts to a Google Apps Script web app (see apps-script/Code.gs),
// which appends the message to a Google Sheet and emails you.
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export const contactConfigured = Boolean(CONTACT_ENDPOINT);

export class ContactError extends Error {
  constructor(kind, errors = null) {
    super(kind);
    this.kind = kind; // 'offline' | 'invalid' | 'server' | 'not-configured'
    this.errors = errors;
  }
}

export async function sendMessage(data) {
  if (!CONTACT_ENDPOINT) throw new ContactError('not-configured');

  let res;
  try {
    // text/plain keeps this a "simple" request, so the browser skips the CORS
    // preflight that Apps Script can't answer.
    res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new ContactError('offline');
  }

  const body = await res.json().catch(() => null);
  if (!res.ok || !body) throw new ContactError('server');
  if (!body.ok) throw new ContactError(body.errors ? 'invalid' : 'server', body.errors);
  return body;
}
