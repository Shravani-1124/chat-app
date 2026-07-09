#  Real-Time Chat App

A modern real-time chat application built using **React**, **Vite**, and **Firebase**. This project is being developed incrementally, with new features added every week to learn modern frontend development, authentication, and real-time databases.

---

## Features Implemented (Weeks 1–4)

### Week 1 - Chat UI
- Designed a responsive chat application layout
- Built a sidebar with contacts
- Created the chat window interface
- Added a message input area and send button
- Styled the application using CSS

### Week 2 - DOM Manipulation
- Selected DOM elements using `document.querySelector()`
- Implemented message sending functionality
- Dynamically created message bubbles using `document.createElement()`
- Added timestamps to messages
- Cleared the input field after sending
- Enabled sending messages with the Enter key
- Implemented automatic scrolling to the latest message

### Week 3 - React Component Architecture
- Refactored the application into reusable React components
- Created:
  - `Sidebar`
  - `ChatWindow`
  - `MessageBubble`
  - `MessageInput`
- Improved project organization and maintainability
- Learned component composition and props

###  Week 4 – Firebase Authentication
- Integrated Firebase into the React project
- Configured Firebase SDK
- Implemented Google Sign-In authentication
- Created an `AuthContext` using React Context API
- Added a `ProtectedRoute` component
- Displayed authenticated user information in the sidebar
- Organized authentication logic into reusable components

### Week 5 - User Presence

- Integrated Firebase Realtime Database for user presence tracking
- Displayed real-time online/offline status in the sidebar
- Automatically updated user status on login and disconnect
- Created a Firestore users collection to manage user profiles
- Improved the chat experience with live presence indicators

### Week 6 - Typing Indicator

- Added real-time typing indicators using Firebase Realtime Database
- Tracked typing activity within individual chat rooms
- Displayed when other users are actively typing
- Synced typing status instantly across connected clients
- Enhanced the real-time messaging experience

### Week 7 - Emoji Support

- Integrated an emoji picker into the message input
- Added support for sending emojis within chat messages
- Implemented a toggleable emoji selection panel
- Improved user interaction and message personalization
- Enhanced the overall chat experience

### Week 8 - Deployment & Security

- Secured Firestore with authentication-based security rules
- Restricted message creation to authenticated users
- Moved Firebase configuration to environment variables
- Deployed the application using Firebase Hosting
- Published a live production version of the chat application

---

## Tech Stack

- React
- Vite
- Firebase Authentication
- React Context API
- CSS
- JavaScript (ES6+)
- Git & GitHub

---

##  Project Structure

```
src/
│
├── assets/
│
├── components/
│   ├── Sidebar.jsx
│   ├── ChatWindow.jsx
│   ├── MessageBubble.jsx
│   ├── MessageInput.jsx
│   ├── Login.jsx
│   └── ProtectedRoute.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── firebase.js
├── App.jsx
├── main.jsx
└── App.css
```

---
## Live Demo

https://chat-app-1e027.web.app

## Author

**Sai Shravani**

Second year B.Tech Physics student passionate about software development, UI/UX, and building scalable web applications.

GitHub: https://github.com/Shravani-1124

---

##  Learning Goals

This project is part of my journey to strengthen my React and Firebase skills by building a complete real-time application from scratch while following industry standard project structure and best practices.
