import puppeteer from 'puppeteer';
import urls from './urls.json';

const delay = (time: number): Promise<void> => new Promise((res) => setTimeout(res, time));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-fullscreen', '--kiosk'],
  });

  const pages = await Promise.all(
    urls.map(async (url: string) => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
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
