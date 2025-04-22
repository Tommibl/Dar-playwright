import { test, expect, Page, BrowserContext } from '@playwright/test'
import Login from './Login'
import ChatPage from 'Page/ChatPage'
import ChatDetailsPage from 'Page/ChatDetailsPage'
import selectors from 'selectors'

test.describe('Chat Details', () => {
  let page: Page
  let login: Login
  let chatPage: ChatPage
  let chatDetailsPage: ChatDetailsPage
  let context: BrowserContext

  test.beforeAll(async ({ browser }) => {
    try {
      context = await browser.newContext()
      page = await context.newPage()
      login = new Login(page)
      chatPage = new ChatPage(page)
      chatDetailsPage = new ChatDetailsPage(page)

      console.log("Переход на страницу логина...")
      await login.goto()
      
      console.log("Авторизация...")
      await login.auth()

      console.log("Авторизация успешна!")
      await chatPage.openChat()
    } catch (error) {
      console.error("Ошибка при выполнении предусловий:", error)
      throw error
    }
  }, 200000)

  test.afterAll(async () => {
    try {
      if (page) await page.close()
      if (context) await context.close()
    } catch (error) {
      console.error("Ошибка при очистке ресурсов:", error)
    }
  })

  test('Media', async () => {
    await chatPage.clickChannel()
    await chatDetailsPage.openChatInfo()
    const media = await page.locator(selectors.media)
    await media.click()
    const firstFoto = await page.locator(selectors.firstFoto)
    await expect(firstFoto).toBeVisible()
  })

  test('Files', async () => {
    await chatPage.clickChannel()
    await chatDetailsPage.openChatInfo()
    await chatDetailsPage.clickFilesButton()
    const firstFileDownloadButton = await page.locator(selectors.firstfileDownloadButton).nth(0)
    await firstFileDownloadButton.waitFor({ state: 'visible', timeout: 50000 })
    await expect(firstFileDownloadButton).toBeVisible()
  })
  
  test('Foto view in full screen', async () => {
    await chatPage.clickChannel()
    await chatDetailsPage.openChatInfo()
    await chatDetailsPage.clickMediaButton()
    await chatDetailsPage.clickFirstFoto()
    const fotoFullScreen = await page.locator(selectors.fotoFullScreen)
    await expect(fotoFullScreen).toBeVisible()
    await chatDetailsPage.fotoFullScreenCloseButton()
  })
  
  test('Foto download', async () => {
    await chatPage.clickChannel()
    await chatDetailsPage.openChatInfo()
    await chatDetailsPage.clickMediaButton()
    await chatDetailsPage.clickFirstFoto()
    await chatDetailsPage.clickFotoDownloadButton()
    // Не придумал, как проверить, произошло ли скачивание.
    await chatDetailsPage.fotoFullScreenCloseButton()
  })

  test('User info in details of direct chat', async () => {
    await chatDetailsPage.openDirectChat()
    await chatDetailsPage.openDirectChatInfo()
    const mail = await page.locator(selectors.azasMail)
    await expect(mail).toHaveText('aza@rnm.dev')
    const phone = await page.locator(selectors.azasPhone)
    await expect(phone).toHaveText('+7 707 727-77-77')
  })

  let isFirstTestPassed = false
  test('Make admin', async () => {
    await chatPage.clickChannel()
    await chatDetailsPage.openChatInfo()
    const chlen = await page.locator(selectors.azaLikeChlen)
    await chlen.click()
    const makeAdminButton = await page.locator(selectors.makeAdminButton)
    await makeAdminButton.click()
    const OkSnackBar = await page.locator(selectors.OkSnackBar)
    await expect(OkSnackBar).toBeVisible()
    const OkSnackBarClose = await page.locator(selectors.OkSnackBarClose)
    await OkSnackBarClose.click()
    isFirstTestPassed = true
  })

  let isSecondTestPassed = false
  test('Dismiss admin', async () => {
    if (isFirstTestPassed) {
      const optionButton = await page.locator(selectors.optionButton)
      await optionButton.click()
      const dismissAdminButton = await page.locator(selectors.dismissAdminButton)
      await dismissAdminButton.click()
      const OkSnackBar = await page.locator(selectors.OkSnackBar)
      await expect(OkSnackBar).toBeVisible()
      const OkSnackBarClose = await page.locator(selectors.OkSnackBarClose)
      await OkSnackBarClose.click()
      isSecondTestPassed = true
    }
  })

  let isThirdTestPassed = false
  test('Delete user from Channel', async () => {
    if (isSecondTestPassed) {
      const optionButton = await page.locator(selectors.optionButton)
      await optionButton.click()
      const removeMemberButton = await page.locator(selectors.removeMemberButton)
      await removeMemberButton.click()
      const OkSnackBar = await page.locator(selectors.OkSnackBar)
      await expect(OkSnackBar).toBeVisible()
      const OkSnackBarClose = await page.locator(selectors.OkSnackBarClose)
      await OkSnackBarClose.click()
      isThirdTestPassed = true
    }
  })

  test('Add user to Channel', async () => {
    if (isThirdTestPassed) {
      const addMemberButton = await page.locator(selectors.addMemberButton)
      await addMemberButton.click()
      const inputToAddMember = await page.locator(selectors.inputToAddMember)
      await inputToAddMember.click()
      await page.keyboard.type('Azamat Baishuakov', { delay: 100 })
      const inviteMember = await page.locator(selectors.inviteMember)
      await inviteMember.click()
      const addMemberConfirmButton = await page.locator(selectors.submitButton)
      await addMemberConfirmButton.click()
      const OkSnackBar = await page.locator(selectors.OkSnackBar)
      await expect(OkSnackBar).toBeVisible()
      const OkSnackBarClose = await page.locator(selectors.OkSnackBarClose)
      await OkSnackBarClose.click()
    }
  })

  test('Edit Channel Name', async () => {
    await chatPage.clickChannel()
    await chatDetailsPage.openChatInfo()
    const editChannelNameButton = await page.locator(selectors.editChannelNameButton)
    await editChannelNameButton.click()
    const editChannelNameInput = await page.locator(selectors.editChannelNameInput)
    await editChannelNameInput.fill('Edited')
    const submitButton = await page.locator(selectors.submitButton)
    await submitButton.click()
    const channelName = await page.locator(selectors.channelName)
    await expect(channelName).toHaveText('Edited')

    await editChannelNameButton.click()
    await editChannelNameInput.fill('Details')
    await submitButton.click()
    await expect(channelName).toHaveText('Details')
  })
})
