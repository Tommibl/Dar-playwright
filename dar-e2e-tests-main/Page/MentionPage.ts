import { expect, Page } from '@playwright/test'
import selectors from 'selectors'

export default class MentionPage {
  page: Page
  selectors = selectors

  constructor(page: Page) {
    this.page = page
  }

  async sendMessage(message: string) {
    const sendButton = await this.page.locator(selectors.sendButton);
    const inputMessage = this.page.locator(selectors.inputMessage);
    if (await sendButton.isEnabled()) {
      await inputMessage.clear();
    }

    const inputPlace = await this.page.locator(selectors.inputPlace);
    await inputPlace.waitFor({ state: 'visible', timeout: 50000 });
    await inputPlace.click();
    await inputPlace.click();

    await this.page.keyboard.type(message, { delay: 50 });
  }

  async sendMention(message: string, mentionSelector) {
    await this.sendMessage(message);
    const mentionOption = await this.page.locator(mentionSelector);
    await mentionOption.click();
    await this.page.locator(selectors.sendButton).click();
  }

  async sendTwoMentions(message1: string, mentionSelector1, message2: string, mentionSelector2) {
    await this.sendMessage(message1);
    const mentionOption1 = await this.page.locator(mentionSelector1);
    await mentionOption1.click();
    await this.page.keyboard.type(message2, { delay: 50 });
    const mentionOption2 = await this.page.locator(mentionSelector2);
    await mentionOption2.click();
    await this.page.locator(selectors.sendButton).click();
  }

  async clickChannel() {
    const ChannelForMention = await this.page.locator(this.selectors.ChannelForMention)
    await ChannelForMention.waitFor({ state: 'visible', timeout: 120000 })
    await ChannelForMention.click()
  }

  async deleteMessage(locator) {
    await locator.click({ button: 'right' });
    const deleteMessage = await this.page.locator(selectors.deleteMessage);
    await deleteMessage.click();
    const deleteMessageConfirm = await this.page.locator(selectors.deleteMessageConfirm);
    await deleteMessageConfirm.click();
    const OkSnackBar = await this.page.locator(selectors.OkSnackBar);
    await expect(OkSnackBar).toBeVisible();
    const OkSnackBarClose = await this.page.locator(selectors.OkSnackBarClose);
    await OkSnackBarClose.click();
  }

}
