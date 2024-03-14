import * as puppeteer from 'puppeteer';
import urls from './urls.json';

const delay = (time: number): Promise<void> => new Promise((res) => setTimeout(res, time));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized', '--kiosk', '--disable-infobars'],
  });

  const page = await browser.newPage();

  const context = browser.defaultBrowserContext();
  context.overridePermissions('https://your-url-here.com', ['notifications']);

  await page.goto('about:blank');
  const dimensions = await page.evaluate(() => {
    return {
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    };
  });

  const pages = await Promise.all(
    urls.map(async (url: string) => {
      const page = await browser.newPage();
      await page.setViewport({ width: dimensions.width, height: dimensions.height });
      await page.goto(url);
      await delay(10000);
      return page;
    })
  );

  const waitTime = 15000;

  while (true) {
    for (const page of pages) {
      await page.bringToFront();
      await delay(waitTime);
    }
  }
})();
