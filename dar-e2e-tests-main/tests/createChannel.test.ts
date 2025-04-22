import { test, expect, Page, BrowserContext } from '@playwright/test'
import Login from './Login'
import ChatPage from 'Page/ChatPage'
import CreateChannelPage from 'Page/CreateChannelPage'
import selectors from 'selectors'

test.describe.serial('Create Channel', () => {
  let page: Page
  let login: Login
  let chatPage: ChatPage
  let createChannelPage: CreateChannelPage
  let context: BrowserContext
  let isFirstTestPassed = false

  test.beforeAll(async ({ browser }) => {
    try {
      context = await browser.newContext()
      page = await context.newPage()
      login = new Login(page)
      chatPage = new ChatPage(page)
      createChannelPage = new CreateChannelPage(page)

      console.log('Переход на страницу логина...')
      await login.goto()

      console.log('Авторизация...')
      await login.auth()

      console.log('Авторизация успешна!')

      await chatPage.openChat()
    } catch (error) {
      console.error('Ошибка при выполнении предусловий:', error)
      throw error
    }
  }, 200000)

  test.afterAll(async () => {
    if (page) await page.close()
    if (context) await context.close()
  });

test('Create New Channel', async () => {
  await createChannelPage.clickAndWaitForElement(selectors.newChatButton);
  await createChannelPage.clickAndWaitForElement(selectors.newChannelButton);

  await createChannelPage.typeInInput(selectors.channelNameInput, 'Taraz');
  await createChannelPage.typeInInput(selectors.selectUserForChannelInput, 'Azamat Baishuakov');

  const submitButton = await page.locator(selectors.submitButton);
  await submitButton.click();

  await createChannelPage.closeSnackBar();

  const firstChatInList = await page.locator(selectors.firstChatInList);
  await firstChatInList.click();

  const nameChatCreateCheck = await page.locator(selectors.nameChatCreateCheck);
  await expect(nameChatCreateCheck).toBeVisible();

  isFirstTestPassed = true;
});

test('Delete Channel Cancel', async () => {
  if (!isFirstTestPassed) test.skip();

  await createChannelPage.openChatInfo();
  await createChannelPage.clickAndWaitForElement(selectors.moreButton);

  await createChannelPage.clickAndWaitForElement(selectors.removeChannelButton);

  const removeChannelCancelButton = await page.locator(selectors.removeChannelCancelButton);
  await removeChannelCancelButton.click();

  await expect(page.locator(selectors.moreButton)).toBeVisible();
});

test('Delete Channel', async () => {
  if (!isFirstTestPassed) test.skip();

  await createChannelPage.clickAndWaitForElement(selectors.moreButton);
  
  await createChannelPage.clickAndWaitForElement(selectors.removeChannelButton);

  const removeChannelConfirmButton = await page.locator(selectors.removeChannelConfirmButton);
  await removeChannelConfirmButton.click();

  await createChannelPage.closeSnackBar();

  const firstChatInList = await page.locator(selectors.firstChatInList);
  await expect(firstChatInList).toHaveCount(0);
});

});