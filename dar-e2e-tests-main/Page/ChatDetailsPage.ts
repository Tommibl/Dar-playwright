import { expect, Page } from '@playwright/test'
import selectors from 'selectors'

export default class ChatDetailsPage {
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

  async clickMediaButton() {
    const mediaButton = this.page.locator(this.selectors.media)
    await mediaButton.click()
    console.log('Кнопка "Медиа" нажата')
  }

  async clickFirstFoto() {
    const firstFoto = this.page.locator(this.selectors.firstFoto)
    await firstFoto.click()
  }

  async clickFotoDownloadButton() {
    const fotoDownloadButton = this.page.locator(this.selectors.fotoDownloadButton)
    await fotoDownloadButton.click()
  }

  async clickFilesButton() {
    const files = await this.page.locator(selectors.files)
    await files.click()
  }
  
  async fotoFullScreenCloseButton() {
    const fotoFullScreenCloseButton = await this.page.locator(selectors.fotoFullScreenCloseButton)
    await fotoFullScreenCloseButton.click()
  }
}
