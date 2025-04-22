
const selectors = {
    chatButton: '#chat-section-id>span>button',
    chatWindow: '[class="chat-content"]',
    sidebarHeaderIcon: '[class="left-block-bottom"]',
    groupView: '[data-testid="menu-item-group"]',
    backButton: 'div.chat-header-icon',
    sidebarSection: '#aibot-chat-wrapper > div > div > main > div > section.chat-sidebar.css-1gncioj',
    ChannelForDetails: '[data-testid="chat-6797760d327af93d78029d32"]',
    ChannelForReply: '[data-testid="chat-67b2c629cda83273c805658b"]',
    ChannelForMention: '[data-testid="chat-67b2c7a7cda83273c80565a6"]',
    closeButton: 'button[aria-label="close-chat-icon"]',
    
    smile: '.button emoji-btn',
    emojiButton: '#root > div.scroll.flex-grow.padding-lr > div > div > div:nth-child(1) > div.relative > div:nth-child(1) > button:nth-child(2) > span > span',

    inputMessage: '[class="chat-input-editor css-1d29uvf"] span',
    inputPlace: '[class="is-empty is-editor-empty"]',
    sendButton: 'button[type="submit"]',

    blockType: '#aibot-chat-wrapper > div > div > main > div > section.chat-messages > div > div.css-1xqze23 > div.css-x5rxgr > div.menu-list > div.css-pi60kn',
    ListView: '[data-testid="menu-item-list"]',

    chatInfo: '#aibot-chat-wrapper > div > div > main > div.right-block > div > section.chat-messages > div > div.chatid-content > header > div',
    moreButton: '[data-testid="action-2"]',
    removeChannelButton: '[data-testid="context-item-remove_channel"]',
    removeChannelConfirmButton: '[data-testid="delete-button"]',
    removeChannelCancelButton: '[data-testid="cancel-button"]',
    directChatInfo: '[class="direct-header css-1x2fmhu"] > div:nth-child(1)',
    participants: '[data-testid="menu-item-0"]',
    media: '[data-testid="menu-item-1"]',
    files: '[data-testid="menu-item-2"]',
    firstFoto: '[data-testid="attachment-3688dd11-73b8-4d6b-92a7-fe59efaf360b"]',
    firstfileDownloadButton: 'button[aria-label="download-icon"]',
    fotoFullScreen: '[data-testid="attachment-view-bg"]',
    fotoFullScreenCloseButton: '[data-testid="cross-icon"]',
    fotoDownloadButton: '[data-testid="download-icon"]',

    backFromDetailsButton: 'div[aria-label="channel-details-caret-left"]',

    azaLikeChlen: '.channel-participant:has-text("Azamat Baishuakov") .user-options',
    optionButton: '.channel-participant:has-text("Azamat Baishuakov") .user-options a.three-dots-button',
    makeAdminButton: '[data-testid="option-0"]',
    //OkSnackBar: 'div.chatbot-snackbar',
    OkSnackBar: 'div.notistack-CollapseWrapper',
    OkSnackBarClose: '[data-testid="snackbar-cross-icon"]',
    dismissAdminButton: '[data-testid="option-1"]',
    removeMemberButton: '[data-testid="option-2"]',
    addMemberButton: 'div.add-member',
    inputToAddMember: 'input[placeholder="Select users"]',

    inviteMember: '.users-list',

    submitButton: '[data-testid="submit-button"]',
    editChannelNameButton: 'a.edit',
    editChannelNameInput: 'input[placeholder="Enter name"]',
    channelName: 'p.channel-name',

    addAttachButton: 'button[aria-label="add-attachment-icon"]',
    addMediaAttachButton: '[data-testid="context-item-image"]',
    addFileAttachButton: '[data-testid="context-item-file"]',
    
    chatList: '.chat-list',
    canalsGroupView: '[class="channels-container css-1v3me6k"]',
    allChatsOfListView: 'class="channels-chevron"',
    lastSendedMessage: '[class="pre-text message__text"] p',
    participantsDetails: '#switch-menu css-dnmhhy p',
    mediaDetails: '#switch-menu css-dnmhhy p:nth-child(1)',
    filesDetails: '#switch-menu css-dnmhhy p:nth-child(2)',
    moreButtonDetails: '#css-1xpx8mx',

    search: '.global-search-input',

    azaChat: '[data-testid="chat-679b5351c29a4c1f892fc641"]',
    azasPosition: '.profile-item-content:nth-child(1)',
    azasMail: '[data-testid="user-info-mail"]',
    azasPhone: '[data-testid="user-info-phone"]',

    newChatButton: '[data-testid="toggle-create-menu"]',
    newChannelButton: '[data-testid="create-channel"]',
    channelNameInput: '[data-testid="channel-name-input"]',
    selectUserForChannelInput: '[data-testid="select-user-input"]',
    firstChatInList: 'span:has-text("Taraz")',
    nameChatCreateCheck: 'p:has-text("Taraz")',

    mentionKamalInHistory: 'div.chat-messages-wrapper a.mention-link:has-text("@KamalAbdin")',
    chooseKamalMention: '[data-testid="user-4ff95662-4415-4d2f-a008-bfb71acd6faf"]',
    chooseDauletMention: '[data-testid="user-c4a04ddd-42d9-4852-847d-bae0cfbd2c3d"]',

    deleteMessage: '[data-testid="context-item-delete"]',
    deleteMessageConfirm: '[data-testid="delete-button"]',

    callInDetails: '[data-testid="action-1"]',

    messageForReplyInHistory: 'p[class="message__author chat-truncate"]',
    replyButton: '[data-testid="context-item-reply"]',
    replyMessageInHistory: 'p:has-text("Reply Message")',

    goToRepliedMessage: 'div[class*="highlighted-message"]',
    RepliedMessageInBase: 'div.message-replied-info',

    editMessage: '[data-testid="context-item-edit"]'
  }
  
  export default selectors
  