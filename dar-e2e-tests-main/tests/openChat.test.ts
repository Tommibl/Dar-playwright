import { test, expect, Page, BrowserContext } from '@playwright/test'
import Login from './Login'
import ChatPage from 'Page/ChatPage'

test.describe('Opening Chat', () => {
  let page: Page
  let login: Login
  let chatPage: ChatPage
  let context: BrowserContext

  test.beforeAll(async ({ browser }) => {
    try {
      context = await browser.newContext()
      page = await context.newPage()
      login = new Login(page)
      chatPage = new ChatPage(page)

      console.log("Переход на страницу логина...")
      await login.goto()

      console.log("Авторизация...")
      await login.auth()

      console.log("Авторизация успешна!")
    } catch (error) {
      console.error("Ошибка при выполнении предусловий:", error)
      throw error
    }
  }, 200000)

  test.beforeEach(async () => {
    if (chatPage) {
      await chatPage.openChat()
    }
  })

  test.afterEach(async () => {
    if (chatPage) {
      await chatPage.closeChat()
    }
  })

  test.afterAll(async () => {
    if (page) await page.close()
    if (context) await context.close()
  })

  test('View of chat 1', async () => {
    await chatPage.waitForChatWindow()
    await chatPage.openSidebar()
    await chatPage.selectListType()
    await chatPage.goBack()
    const chats = await page.locator(chatPage.selectors.chatList)
    await expect(chats).toBeVisible()
  })

  test('Chat details', async () => {
    await chatPage.clickChannel()
    await chatPage.openChatInfo()
    const participants = await page.locator(chatPage.selectors.participants)
    await expect(participants).toBeVisible()
  })

  test('View of chat 2', async () => {
    await chatPage.waitForChatWindow()
    await chatPage.openSidebar()
    await chatPage.selectGroupType()
    await chatPage.goBack()
    const canalsGroupView = await page.locator(chatPage.selectors.canalsGroupView)
    await expect(canalsGroupView).toBeVisible()
  })
})