# Deepak Kushwaha - Portfolio

Vite + React, React Router, plain CSS, GSAP + ScrollTrigger, Lenis, Manrope (@fontsource).
No backend: projects are a local data file, and the contact form sends to a Google Apps Script
that logs each message to a Google Sheet and emails you.

## Run it

```bash
npm run install:all
cp client/.env.example client/.env      # then paste your Apps Script URL (below)
npm run dev                             # http://localhost:5173
npm run build                           # production build in client/dist
```

## Connect the contact form (one-time, ~5 minutes)

1. Create a new Google Sheet (any name).
2. In the sheet: **Extensions > Apps Script**. Delete the sample code and paste in `apps-script/Code.gs`.
   `NOTIFY_EMAIL` at the top is where each message is emailed; set it to `''` to only log to the sheet.
3. Click **Deploy > New deployment**, choose type **Web app**, set
   **Execute as: Me** and **Who has access: Anyone**, then **Deploy**.
   Google asks you to authorise access to your sheet and Gmail the first time.
4. Copy the **Web app URL** (ends in `/exec`) into `client/.env`:
   `VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/.../exec`
5. Restart `npm run dev`. Submissions now appear in a `Messages` tab in the sheet.

Opening the `/exec` URL in a browser should show `{"ok":true,"service":"portfolio-contact"}`.
After editing `Code.gs`, use **Deploy > Manage deployments > Edit > Version: New version**,
otherwise Google keeps serving the old code. When you host the site, add the same
`VITE_CONTACT_ENDPOINT` variable in your host's settings.

Until the URL is set, the form tells visitors to email you directly.

## Where things live

- Site copy, links, "What I do", Journey: `client/src/data/profile.js`
- Projects: `client/src/data/projects.js`
- Images: `client/src/assets/images/`
  - `projects/` screenshots, referenced by file name in each project's `images` array
  - `services/` "What I do" cards and `journey/` Journey hover cards, referenced from `profile.js`
- Resume: `client/public/resume.pdf`

## Hosting note

The site uses client-side routes (`/work/:slug`). On static hosts, rewrite unknown paths to
`index.html` (Netlify: a `_redirects` file with `/* /index.html 200`; Vercel handles Vite SPAs
with a rewrite in `vercel.json`).
