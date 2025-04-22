import { test as baseTest, expect  } from '@playwright/test';
import Login from './Login';

type MyFixtures = {
  login: Login;
};

export const test = baseTest.extend<MyFixtures>({
  login: async ({ page }, use) => {
    const login = new Login(page);
    await login.goto();
    await login.auth();

    try {
      await use(login);
    } finally {
      const exitbutton = page.locator('header.css-zyi4ky div:nth-of-type(2) svg:nth-of-type(1)')
      await expect(exitbutton).toBeVisible()
      await exitbutton.click()
    }
  },
});

export { expect } from '@playwright/test';
