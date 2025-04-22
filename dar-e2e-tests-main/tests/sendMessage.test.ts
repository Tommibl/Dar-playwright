import { test, expect, Page, BrowserContext } from '@playwright/test'
import Login from './Login'
import ChatPage from 'Page/ChatPage'

test.describe('Send Message', () => {
  let page: Page
  let login: Login
  let context: BrowserContext
  let chatPage: ChatPage

  test.beforeAll(async ({ browser }) => {
    try {
      context = await browser.newContext()
      page = await context.newPage()
      login = new Login(page)
      chatPage = new ChatPage(page)

      await login.goto()
      await login.auth()
      await chatPage.openChat()
      await chatPage.waitForChatWindow()
      await chatPage.openSidebar()
      await chatPage.selectListType()
      await chatPage.goBack()
      await chatPage.clickChannel()
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

  test("send text message", async () => {
    const message = 'Привет, мир!'
    await chatPage.sendMessage(message)
    await chatPage.verifySentMessage(message)
  })
})
