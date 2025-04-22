# Test info

- Name: Create Channel >> Create New Channel
- Location: C:\Users\tabi\IdeaProjects\Dar-playwright\dar-e2e-tests-main\tests\createChannel.test.ts:43:5

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('#chat-section-id>span>button') to be visible

    at Login.auth (C:\Users\tabi\IdeaProjects\Dar-playwright\dar-e2e-tests-main\tests\Login.ts:36:20)
    at C:\Users\tabi\IdeaProjects\Dar-playwright\dar-e2e-tests-main\tests\createChannel.test.ts:27:7
```

# Test source

```ts
   1 | import { Page, expect } from '@playwright/test';
   2 |
   3 | export default class Login {
   4 |   page: Page;
   5 |
   6 |   constructor(page: Page) {
   7 |     this.page = page;
   8 |   }
   9 |
  10 |   languageEng = async () => {
  11 |     await this.page.locator('button').click()
  12 |     await this.page.locator('li[data-lang="en"]').click()
  13 |   }
  14 |
  15 |   LogClick = async () => {
  16 |     await this.page.locator('button[type="submit"]').click();
  17 |   };
  18 |
  19 |   async goto() {
  20 |     await this.page.goto('https://dms.dar-dev.zone/', { waitUntil: 'domcontentloaded' });
  21 |   }
  22 |
  23 |   async auth() {
  24 |     //await this.languageEng();
  25 |
  26 |     const element = this.page.locator('text=Welcome back to Darlean!');
  27 |     await element.waitFor({ state: 'visible', timeout: 120000 });
  28 |     await expect(element).toBeVisible();
  29 |
  30 |     await this.page.locator('#username').fill('dtokmukhanbet@rnm.dev');
  31 |     await this.LogClick();
  32 |     await this.page.locator('#password').fill('Qwerty123!');
  33 |     await this.LogClick();
  34 |     
  35 |     const overview = await this.page.locator('#chat-section-id>span>button');
> 36 |     await overview.waitFor({ state: 'visible', timeout: 120000 });
     |                    ^ Error: locator.waitFor: Target page, context or browser has been closed
  37 |     await expect(overview).toBeVisible();
  38 |   }
  39 | }
  40 |
```