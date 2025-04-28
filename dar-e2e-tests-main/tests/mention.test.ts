import { test, expect, Page, BrowserContext } from '@playwright/test'
import Login from './Login'
import ChatPage from 'Page/ChatPage'
import MentionPage from 'Page/MentionPage'
import selectors from 'selectors'

test.describe('Mention', () => {
  let page: Page
  let login: Login
  let context: BrowserContext
  let chatPage: ChatPage
  let mensionPage: MentionPage

  test.beforeAll(async ({ browser }) => {
    try {
      context = await browser.newContext()
      page = await context.newPage()
      login = new Login(page)
      chatPage = new ChatPage(page)
      mensionPage = new MentionPage(page)

      await login.goto()
      await login.auth()
      await chatPage.openChat()
      await chatPage.waitForChatWindow()
      await chatPage.openSidebar()
      await chatPage.selectListType()
      await chatPage.goBack()
      await mensionPage.clickChannel()
    } catch (error) {
      console.error("Ошибка при выполнении предусловий:", error)
      throw error
    }
  }, 300000)

  test.afterAll(async () => {
    try {
      if (chatPage) await chatPage.closeChat()
      if (page) await page.close()
      if (context) await context.close()
    } catch (error) {
      console.error("Ошибка при очистке ресурсов:", error)
    }
  })

  test('Send one mention', async () => {
    await mensionPage.sendMention('@KamalAbdin', selectors.chooseKamalMention);
    const mentionKamalInHistory = await page.locator(selectors.mentionKamalInHistory).nth(0);
    await expect(mentionKamalInHistory).toBeVisible();
    await mensionPage.deleteMessage(mentionKamalInHistory);
  });

  test('Send two mentions', async () => {
    await mensionPage.sendTwoMentions('@KamalAbdin', selectors.chooseKamalMention, ' @DauletTokmukhanbet', selectors.chooseDauletMention);

    const mentionKamalInHistory = await page.locator(selectors.mentionKamalInHistory).nth(0);
    const parentElement = mentionKamalInHistory.locator('..')
    const mentionDauletInHistory = await parentElement.locator('a:nth-of-type(1)');
    await expect(mentionKamalInHistory).toBeVisible();
    await expect(mentionDauletInHistory).toBeVisible();
    await mensionPage.deleteMessage(mentionKamalInHistory);
  });

  test('Forward to mention', async () => {
    await mensionPage.sendMention('@KamalAbdin', selectors.chooseKamalMention);
    const mentionKamalInHistory = await page.locator(selectors.mentionKamalInHistory).nth(0);
    await expect(mentionKamalInHistory).toBeVisible();
    await mentionKamalInHistory.click();

    const callInDetails = await page.locator(selectors.callInDetails);
    await expect(callInDetails).toBeVisible();

    await mensionPage.clickChannel()
    await mensionPage.deleteMessage(mentionKamalInHistory)
  });
})
