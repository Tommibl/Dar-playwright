import { expect, Page } from '@playwright/test'
import selectors from 'selectors'

export default class ReplyPage {
  page: Page
  selectors = selectors

  constructor(page: Page) {
    this.page = page
  }

  async sendMessage(message: string) {
    const sendButton = await this.page.locator(selectors.sendButton)
    const inputMessage = this.page.locator(selectors.inputMessage)
    if (await sendButton.isEnabled()) {
      await inputMessage.clear()
    }

    const inputPlace = await this.page.locator(selectors.inputPlace)
    await inputPlace.waitFor({ state: 'visible', timeout: 50000 })
    await inputPlace.click()
    await inputPlace.click()
    await inputPlace.click()

    await this.page.keyboard.type(message, { delay: 100 })
    await sendButton.click()
  }

  async clickChannel() {
    const ChannelForReply = await this.page.locator(this.selectors.ChannelForReply)
    await ChannelForReply.waitFor({ state: 'visible', timeout: 120000 })
    await ChannelForReply.click()
  }

  async deleteMessage(locator) {
    await locator.click({ button: 'right' })
    const deleteMessage = await this.page.locator(selectors.deleteMessage)
    await deleteMessage.click()
    const deleteMessageConfirm = await this.page.locator(selectors.deleteMessageConfirm)
    await deleteMessageConfirm.click()
    // const OkSnackBar = await this.page.locator(selectors.OkSnackBar)
    // if(await expect(OkSnackBar).toBeVisible({ timeout: 5000 })){
    //   const OkSnackBarClose = await this.page.locator(selectors.OkSnackBarClose)
    //   await OkSnackBarClose.click()
    // }
    
    await expect(locator).toHaveCount(0)
  }
}
