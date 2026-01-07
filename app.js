// =====================
// Chat App (Improved MVP)
// =====================
// Features:
// - Username screen -> chat screen
// - Instant message display (front-end "real-time")
// - localStorage chat history
// - auto-scroll to newest message
// - delete chat (with confirmation)
// - theme toggle (light/dark)
// - message colours per username
// - timestamps
// - cross-tab sync via storage event (real-time-ish)
// - emoji picker button (Emoji Button CDN)
// =====================

/** Storage keys */
const STORAGE_KEYS = {
  THEME: "sd1_chat_theme",
  USER: "sd1_chat_username",
  MESSAGES: "sd1_chat_messages",
};

/** Helpers: DOM grab + safety */
function $(id) {
  return document.getElementById(id);
}

/** DOM */
const screenUsername = $("screen-username");
const screenChat = $("screen-chat");

const usernameForm = $("usernameForm");
const usernameInput = $("usernameInput");
const usernameError = $("usernameError");
const enterChatBtn = $("enterChatBtn"); // still exists, but form submit is primary

const currentUserLabel = $("currentUserLabel");
const messageInput = $("messageInput");
const sendBtn = $("sendBtn");
const messagesEl = $("messages");

const deleteChatBtn = $("deleteChatBtn");
const changeUserBtn = $("changeUserBtn");

const toggleThemeBtn = $("toggleThemeBtn");
const toggleThemeBtn2 = $("toggleThemeBtn2");

const emojiBtn = $("emojiBtn");

/** State */
let username = "";
let messages = [];

/* ---------------------
   Utility
--------------------- */
function nowTimeString() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function sanitizeText(text) {
  return (text || "").trim();
}

function sanitizeUsername(name) {
  const cleaned = sanitizeText(name).replace(/\s+/g, " ");
  return cleaned.slice(0, 20);
}

function hashStringToHue(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

function saveMessages() {
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
}

function loadMessages() {
  const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function scrollToBottom() {
  const chatArea = document.querySelector(".chat-area");
  if (!chatArea) return;
  chatArea.scrollTop = chatArea.scrollHeight;
}

function setActiveScreen(which) {
  if (screenUsername) screenUsername.classList.remove("active");
  if (screenChat) screenChat.classList.remove("active");

  if (which === "username" && screenUsername) screenUsername.classList.add("active");
  if (which === "chat" && screenChat) screenChat.classList.add("active");
}

/* ---------------------
   Screens
--------------------- */
function showUsernameScreen() {
  setActiveScreen("username");

  if (usernameInput) usernameInput.value = "";
  if (usernameError) usernameError.textContent = "";

  username = "";
  localStorage.removeItem(STORAGE_KEYS.USER);
}

function showChatScreen() {
  setActiveScreen("chat");

  if (currentUserLabel) currentUserLabel.textContent = username;
  if (messageInput) messageInput.focus();
}

/* ---------------------
   Rendering
--------------------- */
function renderMessage(msg) {
  if (!messagesEl) return;

  const item = document.createElement("div");
  item.className = "msg";

  const isMe = msg.user === username;
  if (isMe) item.classList.add("me");

  // Colour per username
  const hue = hashStringToHue(msg.user);
  item.style.borderColor = `hsla(${hue}, 85%, 55%, 0.35)`;
  item.style.background = `hsla(${hue}, 85%, 55%, 0.10)`;

  const top = document.createElement("div");
  top.className = "msg-top";

  const userEl = document.createElement("div");
  userEl.className = "msg-user";
  userEl.textContent = msg.user;

  const timeEl = document.createElement("div");
  timeEl.className = "msg-time";
  timeEl.textContent = msg.time;

  top.appendChild(userEl);
  top.appendChild(timeEl);

  const textEl = document.createElement("div");
  textEl.className = "msg-text";
  textEl.textContent = msg.text;

  item.appendChild(top);
  item.appendChild(textEl);

  messagesEl.appendChild(item);
}

function renderAllMessages() {
  if (!messagesEl) return;
  messagesEl.innerHTML = "";
  messages.forEach(renderMessage);
  scrollToBottom();
}

/* ---------------------
   Core Actions
--------------------- */
function setUsernameFromInput() {
  const input = sanitizeUsername(usernameInput ? usernameInput.value : "");

  if (!input) {
    if (usernameError) usernameError.textContent = "Please enter a username.";
    return false;
  }

  if (input.length < 2) {
    if (usernameError) usernameError.textContent = "Username must be at least 2 characters.";
    return false;
  }

  username = input;
  localStorage.setItem(STORAGE_KEYS.USER, username);

  // Load history then show chat
  messages = loadMessages();
  showChatScreen();
  renderAllMessages();
  return true;
}

function sendMessage() {
  // Don’t allow sending unless logged in (keeps state sane)
  if (!username) return;

  const text = sanitizeText(messageInput ? messageInput.value : "");
  if (!text) return;

  const safeText = text.slice(0, 300);

  const msg = {
    user: username,
    text: safeText,
    time: nowTimeString(),
  };

  messages.push(msg);
  saveMessages();

  renderMessage(msg);

  if (messageInput) {
    messageInput.value = "";
    messageInput.focus();
  }

  scrollToBottom();
}

function deleteChat() {
  const ok = confirm("Delete all chat messages? This cannot be undone.");
  if (!ok) return;

  messages = [];
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  renderAllMessages();
}

/* ---------------------
   Emoji Picker
--------------------- */
function setupEmojiPicker() {
  // Requires the Emoji Button CDN loaded before app.js runs
  if (!emojiBtn || !messageInput) return;
  if (typeof EmojiButton === "undefined") return;

  const picker = new EmojiButton({
    position: "top-start",
    theme: "auto",
  });

  emojiBtn.addEventListener("click", () => {
    picker.togglePicker(emojiBtn);
  });

  picker.on("emoji", (emoji) => {
    // Simple insert at end (assignment-friendly)
    messageInput.value += emoji;
    messageInput.focus();
    picker.hidePicker();
  });
}

/* ---------------------
   Real-time-ish sync (across tabs)
--------------------- */
function setupStorageSync() {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEYS.MESSAGES) {
      messages = loadMessages();
      renderAllMessages();
    }

    if (e.key === STORAGE_KEYS.THEME) {
      const newTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
    }

    if (e.key === STORAGE_KEYS.USER) {
      // If user changed in another tab, stay consistent
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) {
        username = sanitizeUsername(savedUser);
        if (currentUserLabel) currentUserLabel.textContent = username;
      } else {
        showUsernameScreen();
      }
    }
  });
}

/* ---------------------
   Init
--------------------- */
function init() {
  // Theme
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
  setTheme(savedTheme);

  // Clear username error as user types
  if (usernameInput && usernameError) {
    usernameInput.addEventListener("input", () => {
      usernameError.textContent = "";
    });
  }

  // Username form submit (primary)
  if (usernameForm) {
    usernameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      setUsernameFromInput();
    });
  }

  // Backwards compatibility: click still works if button is type="button"
  if (enterChatBtn) {
    enterChatBtn.addEventListener("click", () => {
      setUsernameFromInput();
    });
  }

  // Send actions
  if (sendBtn) sendBtn.addEventListener("click", sendMessage);
  if (messageInput) {
    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Delete / change user
  if (deleteChatBtn) deleteChatBtn.addEventListener("click", deleteChat);

  if (changeUserBtn) {
    changeUserBtn.addEventListener("click", () => {
      showUsernameScreen();
    });
  }

  // Theme toggles
  if (toggleThemeBtn) toggleThemeBtn.addEventListener("click", toggleTheme);
  if (toggleThemeBtn2) toggleThemeBtn2.addEventListener("click", toggleTheme);

  // Emoji picker
  setupEmojiPicker();

  // Cross-tab sync
  setupStorageSync();

  // Auto-login if user exists
  const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
  if (savedUser) {
    username = sanitizeUsername(savedUser);
    messages = loadMessages();
    showChatScreen();
    renderAllMessages();
  } else {
    showUsernameScreen();
  }
}

init();
