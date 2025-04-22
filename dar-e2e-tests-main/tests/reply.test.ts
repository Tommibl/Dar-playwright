import { test, expect, Page, BrowserContext } from '@playwright/test'
import Login from './Login'
import ChatPage from 'Page/ChatPage'
import ReplyPage from 'Page/ReplyPage'
import selectors from 'selectors'

test.describe('Reply Message', () => {
  let page: Page
  let login: Login
  let context: BrowserContext
  let chatPage: ChatPage
  let replyPage: ReplyPage

  test.beforeAll(async ({ browser }) => {
    try {
      context = await browser.newContext()
      page = await context.newPage()
      login = new Login(page)
      chatPage = new ChatPage(page)
      replyPage = new ReplyPage(page)

      await login.goto()
      await login.auth()
      await chatPage.openChat()
      await chatPage.waitForChatWindow()
      await chatPage.openSidebar()
      await chatPage.selectListType()
      await chatPage.goBack()
      await replyPage.clickChannel()
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

  test('Reply for alien message', async () => {
    const messageForReplyInHistory = await page.locator(selectors.messageForReplyInHistory)
    await messageForReplyInHistory.click({ button: 'right' })
    await page.locator(selectors.replyButton).click()

    await replyPage.sendMessage('Reply Message')

    const replyMessageInHistory = await page.locator(selectors.replyMessageInHistory)
    await expect(replyMessageInHistory).toBeVisible()
    await replyPage.deleteMessage(replyMessageInHistory)
  });

  test('Reply for my message', async () => {
    await replyPage.sendMessage('Message 99999')
    const messageForReplyInHistory = await page.locator('p:has-text("Message 99999")')
    await messageForReplyInHistory.click({ button: 'right' })
    await page.locator(selectors.replyButton).click()

    await replyPage.sendMessage('American Boy')
    const replyMessageInHistory = await page.locator('p:has-text("American Boy")')
    await expect(replyMessageInHistory).toBeVisible()
    await replyPage.deleteMessage(replyMessageInHistory)
    await replyPage.deleteMessage(messageForReplyInHistory)
  });

  test('Go to the message that was replied to', async () => {
    await replyPage.sendMessage('Message 8888')
    const messageForReplyInHistory = await page.locator('p:has-text("Message 8888")')
    await messageForReplyInHistory.click({ button: 'right' })
    await page.locator(selectors.replyButton).click()

    await replyPage.sendMessage('American Boy')
    const replyMessageInHistory = await page.locator('p:has-text("American Boy")')
    await expect(replyMessageInHistory).toBeVisible()

    const repliedMessageInBase = await page.locator(selectors.RepliedMessageInBase)
    await repliedMessageInBase.click()

    const goToRepliedMessage = await page.locator(selectors.goToRepliedMessage)
    await expect(goToRepliedMessage).toBeVisible()

    await replyPage.deleteMessage(replyMessageInHistory)
    await replyPage.deleteMessage(messageForReplyInHistory)
  });

  test('Update message that was replied to', async () => {
    await replyPage.sendMessage('Message 8888')
    const messageForReplyInHistory = await page.locator('p:has-text("Message 8888")')
    await messageForReplyInHistory.click({ button: 'right' })
    await page.locator(selectors.replyButton).click()

    await replyPage.sendMessage('American Boy')
    const replyMessageInHistory = await page.locator('p:has-text("American Boy")')
    await expect(replyMessageInHistory).toBeVisible()

    const editingMessage = 'This message was updated'

    const repliedMessageInBase = await page.locator(selectors.RepliedMessageInBase)
    await repliedMessageInBase.click()

    const goToRepliedMessage = await page.locator(selectors.goToRepliedMessage)
    await goToRepliedMessage.click({ button: 'right' })
    const editMessage = await page.locator(selectors.editMessage)
    await editMessage.click()

    const inputMessage = page.locator('div[class="tiptap ProseMirror"] div')
    await inputMessage.clear()

    await page.keyboard.type(editingMessage, { delay: 50 })

    await replyPage.deleteMessage(replyMessageInHistory)
    await replyPage.deleteMessage(messageForReplyInHistory)
  });
})
