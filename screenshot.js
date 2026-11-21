const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
  await page.goto('http://127.0.0.1:3459/research/knowledge-commons-in-the-ai-agent-era', { waitUntil: 'networkidle', timeout: 60000 });
  await page.screenshot({ path: '/tmp/pr-screenshot.png', fullPage: false });
  console.log('Done');
  await browser.close();
})();
