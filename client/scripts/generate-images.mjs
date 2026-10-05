// Regenerates the share image and the Apple touch icon:
//   npm run images
// Uses your installed Chrome (set CHROME_PATH if it isn't found automatically).
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = (file) => path.join(root, 'public', file);

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const executablePath = chromeCandidates.find((p) => existsSync(p));
if (!executablePath) {
  console.error('Chrome not found. Set CHROME_PATH to your Chrome/Chromium executable.');
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--allow-file-access-from-files'] });
try {
  const page = await browser.newPage();

  // 1. Open Graph / Twitter share image
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(pathToFileURL(path.join(root, 'scripts/og/og-template.html')).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out('og-image.png') });
  console.log('wrote public/og-image.png');

  // 2. Apple touch icon from the SVG favicon
  const svg = await readFile(out('favicon.svg'), 'utf8');
  await page.setViewport({ width: 180, height: 180 });
  await page.setContent(
    `<body style="margin:0;background:#fff">${svg.replace('<svg ', '<svg width="180" height="180" ')}</body>`
  );
  await page.screenshot({ path: out('apple-touch-icon.png') });
  console.log('wrote public/apple-touch-icon.png');
} finally {
  await browser.close();
}
