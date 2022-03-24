// ==UserScript==
// @name         AAC-Utils
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @copyright    2022, Reimu(https://openuserjs.org/users/Reimu)
// @license      MIT
// @description  (Perhaps not so) Small fixes and utility functions for Anime Academy
// @author       Nick S. aka. Slash
// @include      /^https?:\/\/(www\.)?anime\.academy\/chat/
// @icon         https://www.google.com/s2/favicons?domain=anime.academy
// @updateURL    https://openuserjs.org/meta/Reimu/AAC-Utils.meta.js
// @downloadURL  https://openuserjs.org/install/Reimu/AAC-Utils.user.js
// @supportURL   https://openuserjs.org/scripts/Reimu/AAC-Utils/issues
// @setupURL     https://openuserjs.org/install/Reimu/AAC-Utils.user.js
// @grant none
// ==/UserScript==

(async function () {
  'use strict';

  /************************************
   *
   *
   * CSS
   *
   *
   ************************************/

  function addGlobalStyle(css) {
    let head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
      return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  addGlobalStyle(
    '.autocomplete-flex {' +
      '  background-color: #484b52;' +
      '  font-weight: 600;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  gap: 10px;' +
      '  padding: 5px;' +
      '}' +
      '.autocomplete-flex:hover {' +
      '  background-color: #5f646e;' +
      '}' +
      '' +
      '.autocomplete-flex:focus {' +
      '  background-color: #5f646e;' +
      '}' +
      '' +
      '.name-link:hover {' +
      '  text-decoration: none;' +
      '}' +
      '.autocomplete-icon {' +
      '  width: 45px !important;' +
      '  height: 45px !important;' +
      '  border-radius: 50%;' +
      '}' +
      '.chatMessage {' +
      '  transition: padding 0.4s ease 0s;' +
      '}' +
      '.chatMessage:hover {' +
      '  padding-top: 5px;' +
      '  padding-bottom: 5px;' +
      '  position: relative;' +
      '  background-color: #5f646e !important;' +
      '  border-radius: 3px;' +
      '  transition: padding 0.4s ease 0s;' +
      '}' +
      '.messageIcons {' +
      '  display: flex;' +
      '  justify-content: center;' +
      '  align-items: center;' +
      '  height: 32px;' +
      '  width: 32px;' +
      '  background-color: #484b52;' +
      '  position: absolute;' +
      '  right: 0;' +
      '  top: -20px;' +
      '  display: none;' +
      '  border-radius: 3px;' +
      '}' +
      '.messageIcons:hover {' +
      '  background-color: #5f646e;' +
      '  filter: drop-shadow(5px 7px 14px black);' +
      '}' +
      '' +
      '.collapsible-wrap {' +
      '  margin: 10px 0 10px 0;' +
      '}' +
      '' +
      '.collapsible-button {' +
      '  cursor: pointer;' +
      '  padding: 18px;' +
      '  width: 100%;' +
      '  text-align: left;' +
      '  outline: none;' +
      '  font-size: 15px;' +
      '}' +
      '' +
      '.collapsible-button:focus {' +
      '  transition: background-color 0.5s ease;' +
      '  background-color: #3e1e80 !important;' +
      '}' +
      '' +
      '.collapsible-button:hover {' +
      '  transition: background-color 0.5s ease;' +
      '}' +
      '' +
      '.active {' +
      '  border-bottom-right-radius: 0 !important;' +
      '  border-bottom-left-radius: 0 !important;' +
      '  background-color: #3e1e80 !important;' +
      '}' +
      '' +
      '.collapsible-button:after {' +
      "  content: '\\002B';" +
      '  font-weight: bold;' +
      '  float: right;' +
      '  margin-left: 5px;' +
      '}' +
      '' +
      '.active:after {' +
      "  content: '\\2212';" +
      '}' +
      '' +
      '.collapsible-content {' +
      '  padding: 0 10px;' +
      '  max-height: 0;' +
      '  overflow: hidden;' +
      '  transition: max-height 0.2s ease-out;' +
      '  background-color: #2c2f33;' +
      '  border-bottom-left-radius: 3px;' +
      '  border-bottom-right-radius: 3px;' +
      '}' +
      '' +
      '.avatar-grid {' +
      '  width: 100%;' +
      '  display: grid;' +
      '  grid-template-columns: repeat(auto-fill, 8em);' +
      '  grid-gap: 10px 15px;' +
      '}' +
      '' +
      '.avatar-div {' +
      '  height: 80px;' +
      '  width: 80px;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  gap: 5px;' +
      '}' +
      '' +
      '.avatar-div:hover {' +
      '  background-color: #484b52;' +
      '  transition: background-color 0.5s ease;' +
      '  border-radius: 3px;' +
      '}' +
      '' +
      '.avatarIcon {' +
      '  height: 20px;' +
      '  width: 20px;' +
      '  background-color: #3e1e80;' +
      '  border-radius: 50%;' +
      '  display: none;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '}' +
      '' +
      '.avatarIcon:hover {' +
      '  background-color: #6b36d9;' +
      '  filter: drop-shadow(5px 7px 14px #2c2f33);' +
      '  transition: background-color 0.5s ease;' +
      '}' +
      '' +
      '.ionicon {' +
      '  width: 13px;' +
      '  height: 13px;' +
      '  fill: #ddd;' +
      '}' +
      '' +
      '.collection-selection {' +
      '  position: absolute;' +
      '  z-index: 10000;' +
      '  margin-left: auto;' +
      '  margin-right: auto;' +
      '  right: 0;' +
      '  left: 0;' +
      '  top: 80px;' +
      '  width: 300px;' +
      '  background-color: #484b52;' +
      '  padding: 10px;' +
      '  text-align: center;' +
      '  overflow: hidden scroll;' +
      '  border-radius: 3px;' +
      '  max-height: 200px;' +
      '}' +
      '' +
      '.collection-selectable {' +
      '  font-weight: 700;' +
      '  padding: 10px 0;' +
      '  margin-bottom: 5px;' +
      '}' +
      '' +
      '.collection-selectable:hover {' +
      '  background-color: #3e1e80;' +
      '  border-radius: 3px;' +
      '  transition: background-color 0.5s ease;' +
      '  filter: drop-shadow(5px 7px 14px #2c2f33);' +
      '}' +
      '' +
      '#createCollectionBtn {' +
      '  font-weight: 700;' +
      '}' +
      '' +
      '.removeCategory-btn {' +
      '  background-color: #fd2f2f;' +
      '}' +
      '' +
      '.request-delete-collection {' +
      '  position: absolute;' +
      '  z-index: 10000;' +
      '  margin-left: auto;' +
      '  margin-right: auto;' +
      '  right: 0;' +
      '  left: 0;' +
      '  top: 80px;' +
      '  width: 300px;' +
      '  background-color: #484b52;' +
      '  padding: 10px;' +
      '  text-align: center;' +
      '  overflow: hidden scroll;' +
      '  border-radius: 3px;' +
      '  max-height: 200px;' +
      '}' +
      '' +
      '.message-image {' +
      '  width: 100%;' +
      '  height: auto;' +
      '  border-radius: 3px;' +
      '}' +
      '' +
      '.message-image-container {' +
      '  margin-top: 5px;' +
      '}' +
      '' +
      '#username-results {' +
      '  border: none;' +
      '  max-height: 200px;' +
      '  overflow: hidden scroll;' +
      '  max-width: 30%;' +
      '  position: absolute;' +
      '  left: 0;' +
      '  right: 0;' +
      '  bottom: calc(100% + 8px);' +
      '  margin-left: 8px;' +
      '  border-radius: 5px;' +
      '}' +
      ''
  );

  // Necessary for autoreconnect
  window.onbeforeunload = null;

  const scope = angular.element(document.getElementById('topbar')).scope();

  /************************************
   *
   *
   * Global Socket Hook
   *
   *
   ************************************/

  const globalSocketReady = new Event('globalSocketReady');

  io.Socket.prototype.o_emit = io.Socket.prototype.o_emit || io.Socket.prototype.emit;
  io.Socket.prototype.emit = function (eventName, ...args) {
    if (!window.socket) {
      window.socket = this;
      window.dispatchEvent(globalSocketReady);
    }

    window.dispatchEvent(new CustomEvent('socketEmit', { detail: { eventName: eventName, args: [...args] } }));

    return this.o_emit(eventName, ...args);
  };

  /************************************
   *
   *
   * Autoreconnnect
   *
   *
   ************************************/

  const disconnectReasons = [
    'transport error',
    'transport close',
    'io client disconnect',
    'io server disconnect',
    'ping timeout',
  ];

  const disconnected = JSON.parse(localStorage.getItem('disconnected'));

  if (disconnected) {
    localStorage.setItem('disconnected', JSON.stringify(false));
    window.addEventListener('globalSocketReady', () => {
      setTimeout(() => {
        window.socket.emit('moveAvatar', JSON.parse(localStorage.getItem('avatarPosition')));
      }, 1500);
    });
  }

  window.addEventListener('socketEmit', (event) => {
    if (event.detail.eventName === 'moveAvatar') {
      localStorage.setItem('avatarPosition', JSON.stringify(event.detail.args[0]));
    }
    if (event.detail.eventName === 'disconnect' && disconnectReasons.includes(event.detail.args[0])) {
      localStorage.setItem('disconnected', JSON.stringify(true));
      location.reload();
    }
  });

  /************************************
   *
   *
   * Reload Chat History
   *
   *
   ************************************/

  const maxStoredMessagesPerRoom = 50;
  const maxMessageAge = 1000 * 60 * 30; // 30 Minutes

  window.addEventListener('globalSocketReady', () => {
    window.socket.on('updateChatLines', (data) => {
      const currentRoom = window.location.href.split('=')[1];

      let roomData;

      if (!localStorage.hasOwnProperty('rooms')) {
        localStorage.setItem('rooms', JSON.stringify({}));
      }
      if (!JSON.parse(localStorage.getItem('rooms')).hasOwnProperty(currentRoom)) {
        roomData = JSON.parse(localStorage.getItem('rooms'));
        roomData[currentRoom] = {
          messages: [],
        };
        roomData = JSON.stringify(roomData);
        localStorage.setItem('rooms', roomData);
      }

      roomData = JSON.parse(localStorage.getItem('rooms'));
      if (data.user !== 'System') roomData[currentRoom].messages.push(data);
      if (roomData[currentRoom].messages.length > maxStoredMessagesPerRoom) roomData[currentRoom].messages.splice(0, 1);

      roomData = JSON.stringify(roomData);
      localStorage.setItem('rooms', roomData);
    });

    window.addEventListener('socketEmit', (event) => {
      if (event.detail.eventName === 'changeRoom') {
        setTimeout(() => {
          restoreChatlogs();
        }, 100);
      }
    });

    restoreChatlogs();
  });

  function restoreChatlogs() {
    let currentRoomChatlogs = undefined;

    if (JSON.parse(localStorage.getItem('rooms'))) {
      if (JSON.parse(localStorage.getItem('rooms'))[window.location.href.split('=')[1]]) {
        currentRoomChatlogs = JSON.parse(localStorage.getItem('rooms'))[window.location.href.split('=')[1]].messages;
      }
    } else {
      return;
    }

    if (currentRoomChatlogs) {
      setTimeout(() => {
        for (const messageData of currentRoomChatlogs) {
          if (messageData.user !== 'System' && Date.now() - messageData.timestamp < maxMessageAge) {
            const message = {
              hasPremium: messageData.hasPremium,
              msg: messageData.chatLine,
              festername: messageData.festername,
              house: messageData.house ? messageData.house : null,
              color: undefined,
              user: messageData.user + ': ',
              timestamp: `${new Date(messageData.timestamp).toLocaleDateString('de-DE')} - ${new Date(
                messageData.timestamp
              )
                .toLocaleTimeString('de-DE')
                .slice(0, -3)} Uhr`,
            };

            scope.chatmsgs.push(message);
            document.getElementById('topbar').click(); // Yeah I have absolutely no fucking clue.
          }
        }
      }, 1500);
    }
  }

  /************************************
   *
   *
   * Chat History Garbage Collector
   *
   *
   ************************************/

  if (localStorage.hasOwnProperty('rooms')) {
    const chatLogs = JSON.parse(localStorage.getItem('rooms'));

    if (chatLogs) {
      for (const room in chatLogs) {
        const tooOldMessages = [];
        for (const message in chatLogs[room].messages) {
          if (Date.now() - chatLogs[room].messages[message].timestamp > maxMessageAge) {
            tooOldMessages.push(message);
          }
        }

        for (const index of tooOldMessages) {
          chatLogs[room].messages.splice(index, 1);
        }

        if (chatLogs[room].messages.length === 0) {
          delete chatLogs[room];
        }
      }
    }

    localStorage.setItem('rooms', JSON.stringify(chatLogs));
  }

  /************************************
   *
   *
   * Autocomplete Usernames
   *
   *
   ************************************/

  const chatArea = document.getElementById('graphicChatArea');
  chatArea.style.border = 'none';

  const messageForm = document.getElementsByName('chatMsgForm')[0];
  const messageInput = document.getElementById('chatline');

  messageInput.setAttribute('onKeyUp', 'showResults(this.value)');

  const resultDiv = document.createElement('div');
  resultDiv.setAttribute('id', 'username-results');

  messageForm.appendChild(resultDiv);

  function showResults(value) {
    const result = document.getElementById('username-results');

    result.style.display = 'block';

    if (!value.includes('@')) {
      result.style.display = 'none';
    }

    result.innerHTML = '';

    let list = '';

    const users = window.autocompleteMatch(value);

    for (const user in users) {
      list += `<a class="name-link"><div class="autocomplete-flex autocomplete-list" onclick="replaceName(this.children[1].innerHTML)" tabindex="0"><img class="autocomplete-icon" src="/img/publicimg/skinthumbnails/${
        users[user].imgthumb
      }"><div class="name-wrap">${users[user].username.split('@')[1]}</div></div></a>`;
    }

    result.innerHTML = `<ul style="padding: 0px; margin: 0px;">${list}</ul>`;

    const autocompleteListElements = document.getElementsByClassName('autocomplete-list');

    for (const element of autocompleteListElements) {
      element.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
          window.replaceName(this.children[1].innerHTML);
        }
      });
    }
  }

  function autocompleteMatch(input) {
    if (input === '') {
      return [];
    }

    const scope = angular.element(document.getElementById('topbar')).scope();
    const users = scope.chatterlist.filter((user) => user.room === scope.roomData.name);
    const userObjects = users.map((user) => {
      return { ...user, username: `@${user.username}` };
    });

    const reg = new RegExp(`\\B@(${input.split('@')[1]}.*)$`, 'i');
    return userObjects.filter((user) => {
      if (user.username.match(reg)) {
        return user;
      }
    });
  }

  function replaceName(username) {
    const scope = angular.element(document.getElementById('topbar')).scope();
    const messageInput = document.getElementById('chatline');

    scope.chatline = scope.chatline.replace(/\B@(\w*)$/, `${username} `);

    const resultDiv = document.getElementById('username-results');
    resultDiv.style.display = 'none';

    messageInput.focus();
  }

  window.replaceName = replaceName;
  window.showResults = showResults;
  window.autocompleteMatch = autocompleteMatch;

  /************************************
   *
   *
   * Save Enable-Video Preferences
   *
   *
   ************************************/

  const enableVideosInput = document.getElementById('checkAllowVideo');
  const enableVideos =
    JSON.parse(localStorage.getItem('enableVideos')) === undefined
      ? true
      : JSON.parse(localStorage.getItem('enableVideos'));

  scope.allowVideos = enableVideos;
  enableVideosInput.checked = enableVideos;

  enableVideosInput.addEventListener('change', function () {
    localStorage.setItem('enableVideos', JSON.stringify(this.checked));
  });

  /************************************
   *
   *
   * Save Microphone color
   *
   *
   ************************************/

  const microphoneBackgroundColor = JSON.parse(localStorage.getItem('microphoneBackgroundColor'));
  const microphoneTextColor = JSON.parse(localStorage.getItem('microphoneTextColor'));

  if (microphoneBackgroundColor && microphoneTextColor) {
    window.addEventListener('globalSocketReady', () => {
      setTimeout(() => {
        window.socket.emit('applyMicrophoneColor', {
          microphoneBackgroundColor: microphoneBackgroundColor,
          microphoneTextColor: microphoneTextColor,
        });
      }, 1500);
    });
  }

  window.addEventListener('socketEmit', (event) => {
    if (event.detail.eventName === 'applyMicrophoneColor') {
      localStorage.setItem('microphoneBackgroundColor', JSON.stringify(event.detail.args[0].microphoneBackgroundColor));
      localStorage.setItem('microphoneTextColor', JSON.stringify(event.detail.args[0].microphoneTextColor));
    }
  });

  /************************************
   *
   *
   * Fix Loading-DM Issue
   *
   *
   ************************************/

  window.addEventListener('globalSocketReady', () => {
    window.socket.on('getPNList', () => {
      const scope = angular.element(document.getElementById('topbar')).scope();
      scope.loading = false;
    });
  });

  /************************************
   *
   *
   * Reply-Message / View Images in chat
   *
   *
   ************************************/

  const messageDiv = document.getElementsByClassName('chatverlauf')[0];

  const messageObserverConfig = { childList: true };

  const messagesMutationCallback = function (mutationsList) {
    for (const mutation of mutationsList) {
      // Reply-Message

      if (mutation.addedNodes.length) {
        const message = mutation.addedNodes[0];
        const chatMessageDiv = message.querySelectorAll(`[ng-bind-html^='chatmsg.msg']`)[0];
        const messageContent = chatMessageDiv.textContent;
        const isSystemMessage = message.classList.contains('systemMsg');
        const isEmojiMessage = message.querySelectorAll(`[ng-if='chatmsg.emojiImage']`).length > 0;
        const isOwnMessage = messageContent.startsWith(': ');

        message.style.paddingLeft = '1px';

        if (isEmojiMessage) {
          continue;
        }

        if (isSystemMessage) {
          continue;
        }

        message.classList.add('chatMessage');

        const messageIconsDiv = document.createElement('div');

        messageIconsDiv.classList.add('messageIcons');
        messageIconsDiv.innerHTML =
          '<svg aria-hidden="true" class="svg-inline--fa fa-quote-right fa-w-16" focusable="false" data-prefix="fa" data-icon="quote-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="#d2d2d2" d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path></svg>';

        message.appendChild(messageIconsDiv);

        message.addEventListener('mouseover', function () {
          const iconDiv = this.children[this.children.length - 1];
          iconDiv.style.display = 'flex';
        });

        message.addEventListener('mouseout', function () {
          const iconDiv = this.children[this.children.length - 1];
          iconDiv.style.display = 'none';
        });

        messageIconsDiv.addEventListener('click', function () {
          const scope = angular.element(document.getElementById('topbar')).scope();
          const messageInput = document.getElementById('chatline');

          let username = '';

          if (!isOwnMessage) {
            username = chatMessageDiv.previousElementSibling.textContent.slice(0, -1);
          } else {
            username = chatMessageDiv.previousElementSibling.textContent;
          }

          if (scope.chatline === undefined) {
            scope.chatline = '';
          }

          if (!isOwnMessage) {
            scope.chatline += ` @${username} "${messageContent}" `;
          } else {
            scope.chatline += ` @${username} "${messageContent.split(': ')[1]}" `;
          }

          messageInput.focus();
        });

        // View Images in chat
        const imageUrlRegex = new RegExp(`(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|svg))`);
        const isImageUrl = messageContent.match(imageUrlRegex);

        if (isImageUrl) {
          const imageUrl = isImageUrl[0];
          const imageDiv = document.createElement('div');
          const imageElement = document.createElement('img');

          imageDiv.setAttribute('class', 'message-image-container');
          imageElement.setAttribute('class', 'message-image');

          imageElement.src = imageUrl;

          imageDiv.appendChild(imageElement);

          chatMessageDiv.appendChild(imageDiv);
        }
      }
    }
  };

  const messagesObserver = new MutationObserver(messagesMutationCallback);

  messagesObserver.observe(messageDiv, messageObserverConfig);

  /************************************
   *
   *
   * Avatar-Collections
   * I may have developed a severe depression while trying to implementing this.
   *
   ************************************/

  if (!localStorage.hasOwnProperty('collections')) {
    localStorage.setItem('collections', JSON.stringify({ 'Keine Kategorie': { isDefault: true } }));
  }
  if (!localStorage.hasOwnProperty('avatars')) {
    localStorage.setItem('avatars', JSON.stringify({}));
  }

  window.addEventListener('globalSocketReady', () => {
    window.socket.on('getAvatarcase', (data) => {
      const avatars = data.avatars;

      const storageAvatars = JSON.parse(localStorage.getItem('avatars'));

      for (const avatar of avatars) {
        if (!storageAvatars[avatar.avatarid]) {
          storageAvatars[avatar.avatarid] = {
            id: avatar.avatarid,
            img: avatar.img,
            imgthumb: avatar.imgthumb,
            collection: 'Keine Kategorie',
          };
        }
      }

      localStorage.setItem('avatars', JSON.stringify(storageAvatars));
    });
    window.socket.emit('getAvatarcase');
  });

  window.addEventListener('socketEmit', (event) => {
    if (event.detail.eventName === 'deleteAvatar') {
      // Remove Avatar properly in case it gets deleted
      const avatarID = event.detail.args[0].avatarid;
      const avatarDiv = document.querySelectorAll(`[id^='${avatarID}']`)[0];
      avatarDiv.remove();

      const storageAvatars = JSON.parse(localStorage.getItem('avatars'));

      delete storageAvatars[avatarID];

      localStorage.setItem('avatars', JSON.stringify(storageAvatars));
    }
  });

  window.addAvatarToCollection = function (avatarID, collection) {
    const collections = JSON.parse(localStorage.getItem('collections'));
    if (!collections[collection]) {
      console.log(`Collection '${collection}' doesn't exist!`);
      return false;
    }
    const storageAvatars = JSON.parse(localStorage.getItem('avatars'));

    if (!storageAvatars[avatarID]) {
      console.log(`Avatar '${avatarID}' doesn't exist!`);
      return false;
    }

    storageAvatars[avatarID].collection = collection;
    localStorage.setItem('avatars', JSON.stringify(storageAvatars));
    return true;
  };

  window.removeAvatarFromCollection = function (avatarID) {
    const storageAvatars = JSON.parse(localStorage.getItem('avatars'));
    if (!storageAvatars[avatarID]) {
      console.log(`Avatar '${avatarID}' doesn't exist!`);
      return false;
    }
    storageAvatars[avatarID].collection = 'Keine Kategorie';
    localStorage.setItem('avatars', JSON.stringify(storageAvatars));
    return true;
  };

  window.addCollection = function (collection) {
    const collections = JSON.parse(localStorage.getItem('collections'));
    if (collections[collection]) {
      console.log(`Collection ${collection} already exists!`);
      return false;
    }
    collections[collection] = {
      isDefault: false,
    };

    localStorage.setItem('collections', JSON.stringify(collections));
    return true;
  };

  window.deleteCollection = function (collection) {
    const collections = JSON.parse(localStorage.getItem('collections'));
    if (!collections[collection]) {
      console.log(`Collection '${collection}' doesn't exist!`);
      return false;
    }
    if (collections[collection].isDefault) {
      console.log(`Default collections such as '${collection}' must not be deleted!`);
      return false;
    }

    const storageAvatars = JSON.parse(localStorage.getItem('avatars'));

    for (const avatar in storageAvatars) {
      if (storageAvatars[avatar].collection === collection) {
        storageAvatars[avatar].collection = 'Keine Kategorie';
      }
    }

    localStorage.setItem('avatars', JSON.stringify(storageAvatars));

    delete collections[collection];

    localStorage.setItem('collections', JSON.stringify(collections));
    return true;
  };

  // View

  const avatarcaseObserverConfig = { childList: true };
  const avatarcaseDiv = document.querySelector('[ng-hide="disconnectedClient"]').children[1];

  const avatarcaseMutationCallback = function (mutationsList) {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (node.id === 'avatarcase') {
          const acSelfAvatarElements = document.querySelectorAll('[ng-repeat="ownedAva in ownedAvas track by $index"]');

          setTimeout(() => {
            for (const element of acSelfAvatarElements) {
              element.remove();
            }
          }, 1200);

          const collections = JSON.parse(localStorage.getItem('collections'));
          const avatarCaseDiv = document.getElementsByClassName('avatarcase_main')[0];

          for (const collection in collections) {
            const collapsibleWrap = createCategoryElement(collection, node, avatarCaseDiv);
            avatarCaseDiv.append(collapsibleWrap);
          }

          const newCollectionFormDiv = document.createElement('div');
          const newCollectionInput = document.createElement('input');
          const newCollectionSubmitButton = document.createElement('button');

          newCollectionSubmitButton.textContent = 'Neue Kategorie erstellen';
          newCollectionSubmitButton.id = 'createCollectionBtn';
          newCollectionInput.id = 'createCollectionInput';

          newCollectionFormDiv.appendChild(newCollectionInput);
          newCollectionFormDiv.appendChild(newCollectionSubmitButton);

          newCollectionSubmitButton.addEventListener('click', function () {
            const input = document.getElementById('createCollectionInput');
            if (input.value !== '') {
              const successfullyAdded = window.addCollection(input.value);

              if (successfullyAdded) {
                const collapsbileWrap = createCategoryElement(input.value, node);
                avatarCaseDiv.insertBefore(collapsbileWrap, newCollectionFormDiv);
              }
            }
          });

          avatarCaseDiv.appendChild(newCollectionFormDiv);
        }
      }
    }
  };

  function createCategoryElement(collection, node) {
    const scope = angular.element(document.getElementById('topbar')).scope();

    const collapsibleWrap = document.createElement('div');
    const collapsibleButton = document.createElement('button');
    const collapsibleContent = document.createElement('div');
    const avatarGrid = document.createElement('div');
    const removeCategoryButton = document.createElement('button');

    collapsibleWrap.setAttribute('class', 'collapsible-wrap');
    collapsibleWrap.setAttribute('id', collection);
    collapsibleButton.setAttribute('class', 'collapsible-button');
    collapsibleContent.setAttribute('class', 'collapsible-content');
    removeCategoryButton.setAttribute('class', 'removeCategory-btn');
    avatarGrid.setAttribute('class', 'avatar-grid');
    collapsibleButton.textContent = collection;
    removeCategoryButton.textContent = 'Kategorie löschen';

    removeCategoryButton.addEventListener('click', function () {
      window.selectedCollection = this.parentElement.parentElement.id;

      const requestDeleteCollectionDiv = document.createElement('div');
      const cancelRequestBtn = document.createElement('button');
      const acceptRequestBtn = document.createElement('button');

      requestDeleteCollectionDiv.setAttribute('class', 'request-delete-collection');

      requestDeleteCollectionDiv.textContent = `Kategorie "${window.selectedCollection}" wirklich löschen?`;
      acceptRequestBtn.textContent = 'löschen';
      cancelRequestBtn.textContent = 'abbrechen';

      acceptRequestBtn.addEventListener('click', function () {
        const deletionSuccessfull = window.deleteCollection(window.selectedCollection);

        if (deletionSuccessfull) {
          const defaultCategory = document.getElementById('Keine Kategorie');
          const selecetedCategory = document.getElementById(window.selectedCollection);

          for (const avatar of selecetedCategory.children[1].children[0].children) {
            avatar.children[avatar.childElementCount - 1].remove();
            createAddToCollectionIcon(avatar, node);
            defaultCategory.children[1].children[0].appendChild(avatar);
          }

          selecetedCategory.remove();
        }
        this.parentElement.remove();
      });

      cancelRequestBtn.addEventListener('click', function () {
        this.parentElement.remove();
      });

      requestDeleteCollectionDiv.appendChild(cancelRequestBtn);
      requestDeleteCollectionDiv.appendChild(acceptRequestBtn);

      node.appendChild(requestDeleteCollectionDiv);
    });

    collapsibleContent.appendChild(avatarGrid);

    if (collection !== 'Keine Kategorie') {
      collapsibleContent.appendChild(removeCategoryButton);
    }

    collapsibleWrap.appendChild(collapsibleButton);
    collapsibleWrap.appendChild(collapsibleContent);

    const avatars = JSON.parse(localStorage.getItem('avatars'));

    for (const avatar in avatars) {
      if (avatars[avatar].collection === collection) {
        const avatarDiv = document.createElement('div');
        const deleteIconDiv = document.createElement('div');
        const selectIconDiv = document.createElement('div');

        avatarDiv.id = `${avatars[avatar].id}-${avatars[avatar].img}`;
        avatarDiv.setAttribute('class', 'avatar-div');
        avatarDiv.style.backgroundImage = `url('/img/publicimg/skinthumbnails/${avatars[avatar].imgthumb}')`;

        deleteIconDiv.setAttribute('class', 'avatarIcon');
        selectIconDiv.setAttribute('class', 'avatarIcon');

        deleteIconDiv.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Trash</title><path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none"/><path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z"/></svg>';

        selectIconDiv.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Shirt</title><path d="M256 96c33.08 0 60.71-25.78 64-58 .3-3-3-6-6-6a13 13 0 00-4.74.9c-.2.08-21.1 8.1-53.26 8.1s-53.1-8-53.26-8.1a16.21 16.21 0 00-5.3-.9h-.06a5.69 5.69 0 00-5.38 6c3.35 32.16 31 58 64 58z"/><path d="M485.29 89.9L356 44.64a4 4 0 00-5.27 3.16 96 96 0 01-189.38 0 4 4 0 00-5.35-3.16L26.71 89.9A16 16 0 0016.28 108l16.63 88a16 16 0 0013.92 12.9l48.88 5.52a8 8 0 017.1 8.19l-7.33 240.9a16 16 0 009.1 14.94A17.49 17.49 0 00112 480h288a17.49 17.49 0 007.42-1.55 16 16 0 009.1-14.94l-7.33-240.9a8 8 0 017.1-8.19l48.88-5.52a16 16 0 0013.92-12.9l16.63-88a16 16 0 00-10.43-18.1z"/></svg>';

        avatarDiv.appendChild(deleteIconDiv);
        avatarDiv.appendChild(selectIconDiv);

        selectIconDiv.addEventListener('click', function () {
          scope.changeAvatarTexture(this.parentElement.id.split('-')[1]);
        });

        deleteIconDiv.addEventListener('click', function () {
          scope.requestDeleteAvatar({ avatarid: this.parentElement.id.split('-')[0] });
        });

        if (collection === 'Keine Kategorie') {
          createAddToCollectionIcon(avatarDiv, node);
        } else {
          createRemoveFromCollectionIcon(avatarDiv, node);
        }

        avatarDiv.addEventListener('mouseover', function () {
          for (const child of this.children) {
            child.style.display = 'flex';
          }
        });

        avatarDiv.addEventListener('mouseout', function () {
          for (const child of this.children) {
            child.style.display = 'none';
          }
        });

        avatarGrid.appendChild(avatarDiv);
      }
    }

    collapsibleButton.addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });

    return collapsibleWrap;
  }

  function createAddToCollectionIcon(avatarDiv, node) {
    const addToCollectionIcon = document.createElement('div');

    addToCollectionIcon.setAttribute('class', 'avatarIcon');
    addToCollectionIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Bag Add</title><path d="M454.66 169.4A31.86 31.86 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.78 31.78 0 00-9.34-22.6zM320 336h-48v48a16 16 0 01-32 0v-48h-48a16 16 0 010-32h48v-48a16 16 0 0132 0v48h48a16 16 0 010 32zm16-176H176v-16a80 80 0 01160 0z"/></svg>';

    addToCollectionIcon.addEventListener('click', function () {
      const collections = JSON.parse(localStorage.getItem('collections'));
      window.selectedAvatar = this.parentElement.id.split('-')[0];

      const collectionSelection = document.createElement('div');
      const cancelSelectionBtn = document.createElement('button');

      cancelSelectionBtn.textContent = 'abbrechen';

      collectionSelection.setAttribute('class', 'collection-selection');
      for (const collection in collections) {
        const collectionSelectable = document.createElement('div');
        collectionSelectable.setAttribute('class', 'collection-selectable');
        collectionSelectable.textContent = collection;
        collectionSelection.appendChild(collectionSelectable);
        collectionSelectable.addEventListener('click', function () {
          window.addAvatarToCollection(window.selectedAvatar, this.textContent);
          const avatarDiv = document.querySelectorAll(`[id^='${window.selectedAvatar}']`)[0];
          const newCollectionDiv = document.getElementById(this.textContent).children[1].children[0];

          avatarDiv.children[avatarDiv.childElementCount - 1].remove();

          createRemoveFromCollectionIcon(avatarDiv, node);

          for (const child of avatarDiv.children) {
            child.style.display = 'none';
          }

          newCollectionDiv.appendChild(avatarDiv);

          this.parentElement.remove();
        });
      }

      cancelSelectionBtn.addEventListener('click', function () {
        this.parentElement.remove();
      });

      collectionSelection.appendChild(cancelSelectionBtn);
      node.appendChild(collectionSelection);
    });

    avatarDiv.appendChild(addToCollectionIcon);
  }

  function createRemoveFromCollectionIcon(avatarDiv, node) {
    const removeFromCollectionIcon = document.createElement('div');
    removeFromCollectionIcon.setAttribute('class', 'avatarIcon');
    removeFromCollectionIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Bag Remove</title><path d="M454.66 169.4A31.86 31.86 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.78 31.78 0 00-9.34-22.6zM320 336H192a16 16 0 010-32h128a16 16 0 010 32zm16-176H176v-16a80 80 0 01160 0z"/></svg>';

    removeFromCollectionIcon.addEventListener('click', function () {
      const avatarDiv = this.parentElement;
      const newCollectionDiv = document.getElementById('Keine Kategorie').children[1].children[0];

      avatarDiv.children[avatarDiv.childElementCount - 1].remove();

      createAddToCollectionIcon(avatarDiv, node);

      for (const child of avatarDiv.children) {
        child.style.display = 'none';
      }

      window.removeAvatarFromCollection(avatarDiv.id.split('-')[0]);
      newCollectionDiv.appendChild(avatarDiv);
    });

    avatarDiv.appendChild(removeFromCollectionIcon);
  }

  const avatarcaseObserver = new MutationObserver(avatarcaseMutationCallback);

  avatarcaseObserver.observe(avatarcaseDiv, avatarcaseObserverConfig);
})();
