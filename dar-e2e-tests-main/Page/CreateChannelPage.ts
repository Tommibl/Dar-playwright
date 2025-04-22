import { expect, Page } from '@playwright/test'
import selectors from 'selectors'

export default class CreateChannelPage {
  page: Page
  selectors = selectors

  constructor(page: Page) {
    this.page = page
  }

  async openChatInfo() {
    const chatInfo = this.page.locator(this.selectors.chatInfo)
    await chatInfo.waitFor({ state: 'visible', timeout: 50000 })
    await chatInfo.click()
  }
  async openDirectChatInfo() {
    const directChatInfo = this.page.locator(this.selectors.directChatInfo)
    await directChatInfo.waitFor({ state: 'visible', timeout: 50000 })
    await directChatInfo.click()
  }

  async openDirectChat(){
    try {
      const azaChat = this.page.locator(this.selectors.azaChat)
      await azaChat.waitFor({ state: 'visible', timeout: 50000 })
      await azaChat.click()
  } catch (error) {
      console.error("Ошибка при открытии чата:", error)
  }
  }

  async clickAndWaitForElement(selector, options = {}) {
    const element = await this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout: 10000, ...options });
    await element.click();
    return element;
  }
  
  async typeInInput(selector, text) {
    const input = await this.page.locator(selector);
    await input.click();
    await this.page.keyboard.type(text, { delay: 100 });
    return input;
  }
  
  async closeSnackBar() {
    const OkSnackBar = await this.page.locator(selectors.OkSnackBar);
    await expect(OkSnackBar).toBeVisible();
    const OkSnackBarClose = await this.page.locator(selectors.OkSnackBarClose);
    await OkSnackBarClose.click();
  }
}
