import { expect, Page } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import selectors from 'selectors';

export default class ChatPage {
  page: Page;
  selectors = selectors;

  constructor(page: Page) {
    this.page = page;
  }

  async openChat() {
    const chatButton = await this.page.locator(this.selectors.chatButton)
    await chatButton.waitFor({ state: 'visible', timeout: 20000 })
    await chatButton.click()
    await expect(chatButton).toBeVisible()
  }

  async waitForChatWindow() {
    const chatWindow = await this.page.locator(this.selectors.chatWindow)
    await chatWindow.waitFor({ state: 'visible', timeout: 50000 })
    await expect(chatWindow).toBeVisible()
  }

  async openSidebar() {
    const bar = await this.page.locator(this.selectors.sidebarHeaderIcon)
    await bar.waitFor({ state: 'visible', timeout: 50000 })
    await bar.click()
  }

  async selectListType() {
    const listType = await this.page.locator(this.selectors.ListView)
    await listType.waitFor({ state: 'visible', timeout: 50000 })
    await listType.click()
  }

  async selectGroupType() {
    const groupType = await this.page.locator(this.selectors.groupView)
    await groupType.waitFor({ state: 'visible', timeout: 50000 })
    await groupType.click()
  }

  async goBack() {
    const backButton = await this.page.locator(this.selectors.backButton).nth(0)
    await backButton.click()
    await expect(this.page.locator(this.selectors.chatList)).toBeVisible()
  }

  async clickChannel() {
    const ChannelForDetails = await this.page.locator(this.selectors.ChannelForDetails)
    await ChannelForDetails.waitFor({ state: 'visible', timeout: 120000 })
    await ChannelForDetails.click()
  }

  async closeChat() {
    const closeButton = await this.page.locator(this.selectors.closeButton)
    await closeButton.waitFor({ state: 'visible', timeout: 50000 })
    await closeButton.click()
    await expect(closeButton).not.toBeVisible()
  }

  async sendMessage(message: string) {
    const sendButton = await this.page.locator(this.selectors.sendButton)
    const inputMessage = this.page.locator(this.selectors.inputMessage)
    if(await sendButton.isEnabled()){
      await inputMessage.clear()
    }

    const inputPlace = await this.page.locator(this.selectors.inputPlace)
    await inputPlace.waitFor({ state: 'visible', timeout: 10000 })
    await inputPlace.click()
    await inputPlace.click()

    await this.page.keyboard.type(message, { delay: 50 });
    await sendButton.click();

    // const smile = await this.page.locator(this.selectors.smile)
    // await smile.waitFor({ state: 'visible', timeout: 50000 })
    // await smile.click({ force: true })
    
    // const emojiButton = await this.page.locator(this.selectors.emojiButton)
    // await emojiButton.click()

    // const inputMessage = await this.page.locator(this.selectors.inputMessage)
    // await inputMessage.waitFor({ state: 'visible', timeout: 50000 })
    // await inputMessage.fill(message)
  }
  
  async attachMedia(){
    const addAttachButton = this.page.locator(this.selectors.addAttachButton)
    addAttachButton.click()
    const imagePath = path.resolve(__dirname, '../Files/Screen1.png')
    const addMediaAttachButton = this.page.locator(this.selectors.addMediaAttachButton)
    await addMediaAttachButton.click()
    await this.page.setInputFiles(this.selectors.addMediaAttachButton, imagePath)
  }

  async sendFile(file: string) {
    this.clickChannel()
    const smile = await this.page.locator(this.selectors.smile)
    await smile.waitFor({ state: 'visible', timeout: 50000 })
    await smile.click()
    
    const emojiButton = await this.page.locator(this.selectors.emojiButton)
    await emojiButton.click()

    const inputMessage = await this.page.locator(this.selectors.inputMessage)
    await inputMessage.waitFor({ state: 'visible', timeout: 50000 })
    await inputMessage.setInputFiles(file)

    const sendButton = await this.page.locator(this.selectors.sendButton)
    await sendButton.click();
  }

  async createBuffer(){
  const imagePath = path.resolve('Files/Screen1.png');
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  await page.evaluate((imageBase64) => {
    const dataTransfer = new DataTransfer();
    
    const byteCharacters = atob(imageBase64);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], 'image.jpg', { type: 'image/jpeg' });

    dataTransfer.items.add(file);

    const inputElement = document.querySelector('textarea') || document.activeElement;

    if (inputElement) {
      inputElement.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dataTransfer }));
    } else {
      throw new Error('Не удалось найти активное поле для вставки.');
    }
  }, base64Image);

  await page.click('button[type="submit"]');

  const sentImage = await page.locator('img[src*="image.jpg"]');
  await expect(sentImage).toBeVisible();
  }

  async verifySentMessage(expectedMessage: string) {
    const lastSendedMessage = await this.page.locator(this.selectors.lastSendedMessage).nth(0)
    await expect(lastSendedMessage).toHaveText(expectedMessage)
  }

  async openChatInfo() {
    const chatInfo = this.page.locator(this.selectors.chatInfo)
    await chatInfo.click()
  }
}
