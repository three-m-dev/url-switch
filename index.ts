import puppeteer from 'puppeteer';

const delay = (time: number) => new Promise((res) => setTimeout(res, time));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-fullscreen', '--kiosk'],
  });

  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1920, height: 1080 });
  await page1.goto(
    'https://3mtool-my.sharepoint.com/:x:/g/personal/jreppuhn_three-m_com/ET9Lsbi09LJGv9pQcQJoq-ABltLtwsO0UFYarttJ6C_K2w'
  );
  await delay(30000);

  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1920, height: 1080 });
  await page2.goto('https://dakboard.com/screen/uuid/611d7bad-117325-fd31-f280835381df');
  await delay(10000);

  const waitTime = 15000;

  while (true) {
    await page1.bringToFront();
    console.log(`Switching to the first tab`);
    await delay(waitTime);

    await page2.bringToFront();
    console.log(`Switching to the second tab`);
    await delay(waitTime);
  }
})();
