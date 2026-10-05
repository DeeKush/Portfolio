/**
 * Portfolio contact form -> Google Sheet (+ optional email).
 *
 * Setup (see README for screenshots-free steps):
 * 1. Create a Google Sheet, then Extensions > Apps Script, and paste this file.
 * 2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * 3. Copy the web app URL into client/.env as VITE_CONTACT_ENDPOINT.
 * After editing this file, use Deploy > Manage deployments > Edit > New version,
 * otherwise the old code keeps running.
 */

const SHEET_NAME = 'Messages';

// Each new message is also emailed here. Set to '' to only log to the sheet.
const NOTIFY_EMAIL = 'deepak.kushwaha171206@gmail.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Must match contact.form.topics in client/src/data/profile.js.
const TOPICS = ['Internship', 'Freelance project', 'Collaboration', 'Something else'];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Honeypot: real visitors never fill the hidden "website" field.
    if (data.website) return json({ ok: true });

    const errors = validate(data);
    if (Object.keys(errors).length) return json({ ok: false, error: 'Invalid input', errors: errors });

    const name = data.name.trim();
    const email = data.email.trim();
    const topic = data.topic;
    const message = data.message.trim();

    getSheet().appendRow([new Date(), safe(name), safe(email), topic, safe(message)]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: 'Portfolio: ' + topic + ' from ' + name,
        body: 'Name: ' + name + '\nEmail: ' + email + '\nTopic: ' + topic + '\n\n' + message,
      });
    }

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'Server error' });
  }
}

// Lets you open the URL in a browser to check the deployment is live.
function doGet() {
  return json({ ok: true, service: 'portfolio-contact' });
}

function validate(d) {
  const errors = {};
  const name = typeof d.name === 'string' ? d.name.trim() : '';
  const email = typeof d.email === 'string' ? d.email.trim() : '';
  const message = typeof d.message === 'string' ? d.message.trim() : '';

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email.';
  if (TOPICS.indexOf(d.topic) === -1) errors.topic = "Please choose what it's about.";
  if (message.length < 10) errors.message = 'Message must be at least 10 characters.';
  else if (message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.';
  return errors;
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Date', 'Name', 'Email', 'Topic', 'Message']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stops input like "=IMPORTXML(...)" from being run as a spreadsheet formula.
function safe(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
