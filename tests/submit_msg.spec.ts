import { test, expect, Page, PlaywrightTestConfig } from '@playwright/test';
// const fs = require("fs/promises");
const fs = require("fs").promises;

test.beforeEach(async ({ page }, testInfo) => {
  // await page.goto('https://manage.dev.gosecure.net/CentralAdministration/Default.aspx');
  testInfo.setTimeout(testInfo.timeout + 30000000);
});

const config: PlaywrightTestConfig = {
  timeout: 3000 * 60 * 100000,
};


export default config;
test.describe.configure({ mode: 'serial' });
const serverLink = 'https://manage.dev.gosecure.net/CentralAdministration/Default.aspx';
const mailbox = 'system'
const password = process.env.passwordLogin;
// SPAM $###spam###$ VIRUS $###virus###$ PORN $###porn###$ PHISH $###phish###$ JUNK $###junk###$ SUSPICIOUS $###suspicious###$
const classification_token = [' $###virus###$', '$###spam###$', '$###porn###$', '$###phish###$', '$###junk###$', '$###suspicious###$']
const mailboxOutlook = "ews7@manage2gsdev.onmicrosoft.com";

const NUMBER_EMAIL = 1;
const FILE_NAME = "../test.txt" ;
const FILE_LOG = "..//test.txt"
const START = 0;
const STEP = 1;
const TIMEOUT = Number(3000);
const OFFSET = Number(process.env.offset) || 0;
let page: Page;

test('test', async ({ page }) => {
  console.log("current timeout: ", TIMEOUT)
  page.on('crash', () => {
    console.log(`==========PAGE RELOAD=========`)
    page.reload({ timeout: 30000, waitUntil: "load" })
  })
  test.slow();
  // Go to https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000002-0000-0ff1-ce00-000000000000&redirect_uri=https%3a%2f%2foutlook.office.com%2fowa%2f&resource=00000002-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid&msafed=1&msaredir=1&client-request-id=110b7622-a047-8ba3-66fa-a672e43a06c5&protectedtoken=true&claims=%7b%22id_token%22%3a%7b%22xms_cc%22%3a%7b%22values%22%3a%5b%22CP1%22%5d%7d%7d%7d&nonce=637910307782614335.c63456d7-bc6b-4eea-9901-0fede1adfccf&state=DctBFoAgCABRrNdxSAyDPI4iblt2_Vj82U0CgD1sIVEEVFhbISbV55JSme_ThOstU3GYDKzuHVujgrR8eulzma0U75Hfr-cf&sso_reload=true
  await page.goto('https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000002-0000-0ff1-ce00-000000000000&redirect_uri=https%3a%2f%2foutlook.office.com%2fowa%2f&resource=00000002-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid&msafed=1&msaredir=1&client-request-id=110b7622-a047-8ba3-66fa-a672e43a06c5&protectedtoken=true&claims=%7b%22id_token%22%3a%7b%22xms_cc%22%3a%7b%22values%22%3a%5b%22CP1%22%5d%7d%7d%7d&nonce=637910307782614335.c63456d7-bc6b-4eea-9901-0fede1adfccf&state=DctBFoAgCABRrNdxSAyDPI4iblt2_Vj82U0CgD1sIVEEVFhbISbV55JSme_ThOstU3GYDKzuHVujgrR8eulzma0U75Hfr-cf&sso_reload=true');
  // Click [placeholder="Email\, phone\, or Skype"]
  await page.locator('[placeholder="Email\\, phone\\, or Skype"]').click();
  // Fill [placeholder="Email\, phone\, or Skype"]
  await page.locator('[placeholder="Email\\, phone\\, or Skype"]').fill(mailboxOutlook);
  // Click text=Next
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000002-0000-0ff1-ce00-000000000000&redirect_uri=https%3a%2f%2foutlook.office.com%2fowa%2f&resource=00000002-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid&msafed=1&msaredir=1&client-request-id=110b7622-a047-8ba3-66fa-a672e43a06c5&protectedtoken=true&claims=%7b%22id_token%22%3a%7b%22xms_cc%22%3a%7b%22values%22%3a%5b%22CP1%22%5d%7d%7d%7d&nonce=637910307782614335.c63456d7-bc6b-4eea-9901-0fede1adfccf&state=DctBFoAgCABRrNdxSAyDPI4iblt2_Vj82U0CgD1sIVEEVFhbISbV55JSme_ThOstU3GYDKzuHVujgrR8eulzma0U75Hfr-cf&sso_reload=true' }*/),
    page.locator('text=Next').click()
  ]);
  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill("bl@ckr0ck");
  // Click text=Sign in
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://login.microsoftonline.com/common/login' }*/),
    page.locator('text=Sign in').click()
  ]);
  // Click text=Yes
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://outlook.office.com/mail/' }*/),
    page.locator('text=Yes').click()
  ]);
  sleep(1200);
  for (var i = START; i < NUMBER_EMAIL; i += STEP) {
    try {
      let fileContent = await fs.readFile(FILE_NAME, 'utf8');
      let listLine = fileContent.split('\n');
      var subject = listLine[i];
      console.log(`${getTime()} | ${START + 1}:${i + 1 + OFFSET} submitting ${subject}`);
      // Click [placeholder="Search"]
      await page.locator('[aria-label="Search for email\, meetings\, files and more\."]').click({ timeout: 30000 });
      
      // Fill [placeholder="Search"]
      let searchBar = page.locator('[aria-label="Search for email\, meetings\, files and more\."]');
      await searchBar.fill(subject);
      await page.keyboard.press('Enter');
      // Click [aria-label="Unread Tony Solano send multi message to reviewer 7\:48 PM No preview is available\."] >> text=No preview is available.

      let spanSubject = page.locator('div[aria-label="Message list"] >> span >> text="' + subject + '" >> nth=0')
      await spanSubject.first().click({ delay: 1000, timeout: 30000 });

      // Click text=LikeReplyReply allForwardMore actions >> [aria-label="More mail actions"]
      await page.locator('id=read_ellipses_menu').click({ timeout: 60000 });


      // Click [aria-label="GoSecure IDR - Submit email for analysis"]
      await page.locator('button[role="menuitem"]:has-text("GoSecure IDR")').first().click({ timeout: TIMEOUT });

      // Click button:has-text("Submit email for analysis")
      await page.frameLocator('xpath=//iframe[@title="Office Add-in GoSecure IDR"]')
        .locator('button:has-text("Submit email for analysis")').click({ timeout: TIMEOUT });

      // let hasError = false;
      // let cnt = 0;
      // while (await page.isVisible('xpath=//iframe[@title="Office Add-in GoSecure IDR"]')) {
      //   // setTimeout(()=>{},1000);
      //   await sleep(1000);
      //   cnt++;
      //   if (cnt > 300) break;
      //   // if (await page.frameLocator('xpath=//iframe[@title="Office Add-in GoSecure IDR"]')
      //   // .locator('text="Oops"').isVisible()) {
      //   //   let date = getTime();
      //   //   console.log(`${getTime()} | ${START+1}:${i+1+OFFSET} FAILED ${subject}` );
      //   //   fs.appendFile(FILE_LOG, `${date} | ${subject} | Error plugin\n`);
      //   //   hasError = true;
      //   //   break;
      //   // }
      // }
      // if (cnt < 300){
        console.log(`${getTime()} | ${START + 1}:${i + 1 + OFFSET} submitted ${subject}`);
        fs.appendFile('../temp.log', `${getTime()} | ${START + 1}:${i + 1 + OFFSET} submitted ${subject}\n`);
        // fs.appendFile('../temp.log', `${getTime()} | ${START + 1}:${i + 1 + OFFSET} submitted ${subject} | time waiting disapear iframe: ${cnt} \n`);
      //   }
      // else{
      //   let date = getTime();
      //   console.log(`${getTime()} | ${START+1}:${i+1+OFFSET} FAILED ${subject}` );
      //   fs.appendFile(FILE_LOG, `${date} | ${subject} | Error plugin\n`);
      //   fs.appendFile('../temp.log', `${date} | ${subject} | Error plugin | time waiting disapear iframe: ${cnt} \n`);
      // }

      // setTimeout(()=>{},30000);
      // if (await page.frameLocator('xpath=//iframe[@title="Office Add-in GoSecure IDR"]')
      //   .locator('text="Oops"').isVisible()) {
      //   let date = getTime();
      //   console.log(`${getTime()} | ${START + 1}:${i + 1 + OFFSET} FAILED ${subject}`);
      //   fs.appendFile(FILE_LOG, `${date} | ${subject} | Error plugin\n`);
      //   break;
      // }
      // else
      //   console.log(`${getTime()} | ${START + 1}:${i + 1 + OFFSET} submitted ${subject}`);

    } catch (e) {
      // if (e.name == 'TimeoutError') continue;
      // else console.log(e);
      console.log(e);
      let date = getTime();
      fs.appendFile(FILE_LOG, `${date} | ${subject} | ${e.name}:${e}\n`);
      continue;
    }
  }
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getTime() {
  let date = new Date();
  let str = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2)
    + "-" + ('0' + date.getDate()).slice(-2) + " " +
    + ('0' + date.getHours()).slice(-2)
    + ":" + ('0' + date.getMinutes()).slice(-2)
    + ":" + ('0' + date.getSeconds()).slice(-2);
  return str;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}