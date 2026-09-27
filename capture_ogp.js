const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const HTML_PATH = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
const OUTPUT_PATH = path.resolve(__dirname, 'assets/ogp.png');

async function capture() {
  console.log('Capturing real portal page to OGP image...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--hide-scrollbars']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.goto(HTML_PATH, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const hero = document.querySelector('.typewriter-hero');
    if (hero) hero.textContent = '言語学のためのツール';
    document.querySelectorAll('.slide-in-up').forEach(el => el.classList.add('is-visible'));
  });

  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: OUTPUT_PATH, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  console.log('Successfully captured:', OUTPUT_PATH);
}

capture().catch(console.error);
