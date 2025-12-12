# Software-Development---Assignment-2

# ACTIVITY 1 — Requirements / Creative Session (Custom Version for the Chat App)

---

## **1.1 Project Overview**

This project is a **real-time, mobile-friendly chat application** designed for everyday communication.  
Unlike simple games like Hangman or Hide & Seek, a chat app has a wide range of real-world uses, making the project feel more practical and meaningful.

The app allows users to:

- Enter a username  
- Send and receive messages instantly  
- View chat history  
- Use a Twitter-inspired UI (light/dark mode)  
- Access extra features such as delete chat, auto-scroll, emoji support, and message colours  

The goal is to create a lightweight chat tool that feels like something users could realistically use daily.

---

## **1.2 Target Audience**

The target users include:

- Students  
- Casual social media users  
- People who want quick, simple messaging tools  

These users expect:

- Fast message sending  
- A responsive mobile-friendly interface  
- Smooth typing and sending experience  
- A clean, familiar UI similar to social media platforms  

---

## **1.3 User Profiles**

### **User Profile 1 — Aarav, 17 (Student)**

- Uses social media daily  
- Prefers clean UI and fast interactions  
- Likes username-only identification  
- Needs the app to work on both mobile and desktop  
- Wants instant feedback after sending messages  

### **User Profile 2 — Maya, 22 (Uni Student)**

- Communicates mainly through mobile  
- Prefers minimal layouts (light/dark mode)  
- Needs chat history to stay saved  
- Values message colours and readability  
- Appreciates extra features like auto-scroll and emoji support  

---

## **1.4 Functional Requirements (What the app MUST do)**

### **Core Functionalities**

- Allow user to enter a username  
- Real-time message sending (instant display)  
- Scrollable chat window with auto-scroll  
- Store chat history using localStorage  
- Allow user to delete chat history  
- Support emojis inside message input  
- Colour-coded message bubbles  
- Timestamp for each message  
- Smooth performance on mobile and desktop  

### **Real-Time Behaviour**

- Messages must appear instantly without page reload  

---

## **1.5 Non-Functional Requirements (Usability & HCI)**

- Clean UI inspired by Twitter  
- Light and dark mode support  
- Fast load time and smooth interactions  
- Mobile-responsive layout  
- Readable fonts and good spacing  
- Consistent message bubble colours  
- No layout break when using emojis  
- Stable storage for chat history  

---

## **1.6 UI Mockups (Planned Layout)**

**Screen 1 — Username Page**
- Username input field  
- “Enter Chat” button  

**Screen 2 — Main Chat**
- Header showing username  
- Scrollable chat area  
- Auto-scroll behaviour  
- Message bubble colours  
- Input bar with:
  - Text field  
  - Emoji icon  
  - Send button  

**Theme:** Twitter-like clean white + optional dark mode.

*(Mockups will be added later.)*

---

## **1.7 Storyboard (User Journey)**

1. User opens the app  
2. Enters a username  
3. Navigates to the chat screen  
4. Views stored chat history  
5. Types and sends a message  
6. Message appears instantly  
7. Auto-scroll moves to newest message  
8. User can delete chat  
9. On return, chat history is still available  

---

## **1.8 Risk Analysis**

| **Risk** | **Impact** | **Mitigation** |
|----------|------------|----------------|
| Storage not working | High | Test localStorage early and keep data simple |
| Real-time behaviour not smooth | Medium | Update DOM immediately after sending |
| UI scaling issues | Medium | Use responsive CSS (flexbox/grid) |
| Emojis breaking layout | Low | Keep emoji input inside text field |
| Accidental chat deletion | Low | Add confirmation prompt |

---

## **1.9 Development Strategy**

An **iterative/Agile approach** will be used.

Small features (username input → messaging → UI → storage → extra features) will be built and tested one at a time.

This reduces bugs, improves debugging, and makes it easier to add features like:

- Auto-scroll  
- Emoji support  
- Message colours  
- Delete chat  

---

## **1.10 Initial Test Plan**

| **Test Case** | **Expected Result** |
|---------------|---------------------|
| Enter username | User moves to chat screen |
| Send message | Message appears instantly |
| Emoji input | Emoji displays correctly |
| Auto-scroll | Chat jumps to latest message |
| Delete chat | Chat clears and storage resets |
| Refresh page | Chat history persists |
| Desktop view | Layout adjusts correctly |
| Mobile view | Smooth typing + responsive UI |

---

# ACTIVITY 2 — Design Analysis Session

---

## **2.1 Refinement of Requirements**

Based on the initial plan from Activity 1, the requirements were reviewed and simplified to ensure the chat app remains achievable within the project timeline.

### **Refined Functional Requirements**
- Simple username entry (no sign-up system)
- Instant message display using front-end logic
- Auto-scroll behavior for smooth chat experience
- LocalStorage-based message history
- Delete chat button with confirmation pop-up
- Support for emojis inside the message input field
- Clean UI inspired by Twitter (light/dark themes optional)

### **Refined Non-Functional Requirements**
- Strong focus on mobile responsiveness  
- Fast and smooth DOM updates  
- Layout should not break when emojis or long messages are used  
- Consistent styling for all message bubbles  

---
## **2.2 Pseudocode for Core Functions**

Below is the high-level pseudocode describing how the main chat features will work.

### **Function: Set Username**
```pseudo
FUNCTION setUsername():
    username = value from username input field
    IF username is empty:
        show error message
    ELSE:
        save username to sessionStorage
        redirect to chat screen


FUNCTION sendMessage():
    messageText = value from message input
    IF messageText is empty:
        return (do nothing)

    messageObject = {
        user: username,
        text: messageText,
        time: current timestamp
    }

    append messageObject to messageArray
    save messageArray to localStorage
    display message on screen
    clear message input
    scrollToBottom()



FUNCTION loadChatHistory():
    IF "messages" exists in localStorage:
        messageArray = parse stored JSON
        FOR each message in messageArray:
            display message on screen
    scrollToBottom()


FUNCTION deleteChat():
    show confirmation popup
    IF user confirms:
        clear localStorage
        clear messageArray
        refresh message display area

FUNCTION scrollToBottom():
    chatWindow.scrollTop = chatWindow.scrollHeight

[Start]
   |
   v
[Enter Username] ---> (Empty?) ---> [Show Error] ---> back to username input
   |
   v
[Save Username]
   |
   v
[Open Chat Screen]
   |
   v
[Load Chat History]
   |
   v
[User Types Message]
   |
   v
[Send Message] ---> (Empty?) ---> ignore
   |
   v
[Display Message + Save to Storage]
   |
   v
[Auto-Scroll]
   |
   v
[User Chooses to Delete Chat?] --Yes--> [Clear Storage + Reset UI]
   |
   v
-------------------------
|   Continues Looping   |
-------------------------

```






