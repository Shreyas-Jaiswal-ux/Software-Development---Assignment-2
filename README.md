# Software-Development---Assignment-2

ACTIVITY 1 — Requirements / Creative Session (Custom Version for the Chat App)

1.1 Project Overview
This project is a real-time, mobile-friendly chat application designed for everyday communication. Unlike simple games like Hangman or Hide & Seek, a chat app has a wide range of real-world uses, making the project feel more practical and meaningful.

The application allows users to:
•	Enter a username
•	Send and receive messages instantly
•	View chat history
•	Experience a clean Twitter-inspired UI with optional dark/light mode
•	Use extra features like delete chat, auto-scroll, emoji support, and message colours
The goal is to create a lightweight tool that feels like something people could use daily.

1.2 Target Audience
The primary audience includes:
•	Students
•	Casual social media users
•	People who prefer simple, fast communication tools
They expect:
•	Quick message sending
•	Mobile responsiveness
•	A smooth UI like social media apps
•	A modern, familiar feel

1.3 User Profiles
User Profile 1 — Aarav, 17 (Student)
•	Uses social media daily
•	Prefers clean UI and fast messaging
•	Likes username-only identification
•	Needs an app that works on both mobile and desktop
•	Wants instant feedback after sending messages
User Profile 2 — Maya, 22 (Uni Student)
•	Communicates mainly through mobile
•	Prefers dark/light minimal layouts
•	Needs chat history to stay saved
•	Values message colours and readability
•	Appreciates auto-scroll and emoji support


1.4 Functional Requirements (What the app MUST do)
Core Requirements
•	Allow user to enter a username
•	Real-time message sending (instant display)
•	Scrollable chat window with auto-scroll
•	Store chat history using localStorage
•	Allow user to delete chat history
•	Support emojis inside message input
•	Colour-coded message bubbles
•	Timestamp for each message
•	Smooth performance on mobile and desktop
Real-Time Behaviour
•	Messages must appear instantly without page reload


1.5 Non-Functional Requirements (Usability & HCI)
•	Twitter-inspired clean UI
•	Light and dark mode option
•	Fast load time and smooth interactions
•	Mobile-responsive layout
•	Readable fonts and good spacing
•	Consistent message bubble colours
•	No layout break when using emojis
•	Stability of chat storage

1.7 Storyboard (User Journey)
1.	User opens the app
2.	Enters a username
3.	Navigates to the chat screen
4.	Views stored chat history
5.	Types and sends a message
6.	Message appears instantly
7.	Auto-scroll moves to the newest message
8.	User can delete chat
9.	On return, chat history is still available


1.8 Risk Analysis
Risk	Impact	Mitigation
Storage not working	High	Test localStorage early and keep data structures simple
Real-time behaviour not smooth	Medium	Update DOM immediately after sending messages
UI scaling issues	Medium	Use responsive CSS (flexbox/grid)
Emojis breaking layout	Low	Keep emoji input inside the text field
Accidental chat deletion	Low	Add confirmation prompt

1.9 Development Strategy
An iterative/Agile approach will be used.
Small features (username input → messaging → UI → storage → extra features) will be built one at a time and tested immediately.
This reduces bugs, improves debugging, and makes it easier to add features like:
•	Auto-scroll
•	Emoji support
•	Message colours
•	Delete chat



