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
// =====================

/** Storage keys */
const STORAGE_KEYS = {
  THEME: "sd1_chat_theme",
  USER: "sd1_chat_username",
  MESSAGES: "sd1_chat_messages"
};

/** Helpers: DOM grab + safety */
function $(id) {
  return document.getElementById(id);
}

/** DOM */
const screenUsername = $("screen-username");
const screenChat = $("screen-chat");

const usernameInput = $("usernameInput");
const usernameError = $("usernameError");
const enterChatBtn = $("enterChatBtn");

const currentUserLabel = $("currentUserLabel");
const messageInput = $("messageInput");
const sendBtn = $("sendBtn");
const messagesEl = $("messages");

const deleteChatBtn = $("deleteChatBtn");
const changeUserBtn = $("changeUserBtn");

const toggleThemeBtn = $("toggleThemeBtn");
const toggleThemeBtn2 = $("toggleThemeBtn2");

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
  // Remove extra spaces inside too, and cap length for safety
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
  // Safe auto-scroll
  const chatArea = document.querySelector(".chat-area");
  if (!chatArea) return;
  chatArea.scrollTop = chatArea.scrollHeight;
}

function setActiveScreen(which) {
  // Safe screen switching even if one screen missing
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
function setUsername() {
  const input = sanitizeUsername(usernameInput ? usernameInput.value : "");

  if (!input) {
    if (usernameError) usernameError.textContent = "Please enter a username.";
    return;
  }

  if (input.length < 2) {
    if (usernameError) usernameError.textContent = "Username must be at least 2 characters.";
    return;
  }

  username = input;
  localStorage.setItem(STORAGE_KEYS.USER, username);

  // Load history then show chat
  messages = loadMessages();
  showChatScreen();
  renderAllMessages();
}

function sendMessage() {
  const text = sanitizeText(messageInput ? messageInput.value : "");
  if (!text) return; // ignore empty messages

  // Optional: stop ultra-long spam
  const safeText = text.slice(0, 300);

  const msg = {
    user: username || "user",
    text: safeText,
    time: nowTimeString()
  };

  messages.push(msg);
  saveMessages();

  // Render just this new message (faster than re-rendering everything)
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
  });
}

/* ---------------------
   Init
--------------------- */
function init() {
  // Theme
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
  setTheme(savedTheme);

  // Clear username error as user types (nice UX)
  if (usernameInput && usernameError) {
    usernameInput.addEventListener("input", () => {
      usernameError.textContent = "";
    });
  }

  // Events (safe binding)
  if (enterChatBtn) enterChatBtn.addEventListener("click", setUsername);
  if (usernameInput) {
    usernameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setUsername();
      }
    });
  }

  if (sendBtn) sendBtn.addEventListener("click", sendMessage);
  if (messageInput) {
    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  if (deleteChatBtn) deleteChatBtn.addEventListener("click", deleteChat);

  if (changeUserBtn) {
    changeUserBtn.addEventListener("click", () => {
      showUsernameScreen();
    });
  }

  if (toggleThemeBtn) toggleThemeBtn.addEventListener("click", toggleTheme);
  if (toggleThemeBtn2) toggleThemeBtn2.addEventListener("click", toggleTheme);

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
