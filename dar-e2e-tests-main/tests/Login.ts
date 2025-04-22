import { Page, expect } from '@playwright/test';

export default class Login {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  languageEng = async () => {
    await this.page.locator('button').click()
    await this.page.locator('li[data-lang="en"]').click()
  }

  LogClick = async () => {
    await this.page.locator('button[type="submit"]').click();
  };

  async goto() {
    await this.page.goto('https://dms.dar-dev.zone/', { waitUntil: 'domcontentloaded' });
  }

  async auth() {
    //await this.languageEng();

    const element = this.page.locator('text=Welcome back to Darlean!');
    await element.waitFor({ state: 'visible', timeout: 120000 });
    await expect(element).toBeVisible();

    await this.page.locator('#username').fill('dtokmukhanbet@rnm.dev');
    await this.LogClick();
    await this.page.locator('#password').fill('Qwerty123!');
    await this.LogClick();
    
    const overview = await this.page.locator('#chat-section-id>span>button');
    await overview.waitFor({ state: 'visible', timeout: 120000 });
    await expect(overview).toBeVisible();
  }
}
