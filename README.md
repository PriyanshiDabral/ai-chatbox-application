## Live Demo

https://ai-chatbox-application.vercel.app/

# AI Chatbox Application

A real-time conversational AI chat application built using React.js, Redux Toolkit, Node.js, and AI APIs.

The project simulates a ChatGPT-style interface where users can send prompts and receive AI-generated responses with smooth asynchronous state handling and responsive UI interactions.

This project was built to explore scalable frontend architecture, centralized state management, async API workflows, and secure AI integration patterns using a backend proxy server.

---

## Features

- Real-time conversational AI interface
- Responsive chat UI for desktop and mobile
- Redux Toolkit global state management
- Async API handling using `createAsyncThunk`
- Backend proxy server for API security
- Loading and typing indicators
- Error handling for failed API responses
- Clean component-based architecture

---

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- CSS Modules
- Vite

### Backend
- Node.js
- Express.js

### AI Integration
- OpenAI / OpenRouter API

---

## Project Architecture

```text
User → React UI → Redux Store → createAsyncThunk → Backend Proxy → AI API → Redux Update → UI Render
```

---

## Folder Structure

```bash
src/
 ├── components/
 ├── redux/
 ├── services/

backend/
 ├── server.js

public/
```

---

## State Management

Redux Toolkit is used for centralized and scalable state management.

### Why Redux Toolkit?

- Cleaner async handling
- Predictable state updates
- Better scalability
- Centralized loading and error states

### createAsyncThunk

`createAsyncThunk` is used to manage async API requests and automatically handle:

- pending
- fulfilled
- rejected

This keeps async logic separated from UI components and improves maintainability.

---

## Backend Proxy

A Node.js + Express backend proxy server is used to:

- Secure API keys
- Prevent exposing secrets in the frontend
- Avoid CORS issues
- Create a scalable API layer for future improvements

---

## Setup Instructions

### Install Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

### Start Backend

```bash
node backend/server.js
```

---

## Environment Variables

Create a `.env` file in the backend folder:

```env
AI_API_KEY=your_api_key_here
PORT=5000
```

---

## Key Technical Decisions

### Redux Toolkit over Context API

Redux Toolkit was chosen because the application contains asynchronous chat flows, loading states, and centralized conversation management. It provides better scalability and cleaner async handling compared to prop drilling or local component state.

### Backend Proxy Architecture

Instead of calling AI APIs directly from the frontend, a backend proxy layer was implemented to securely manage API keys and make the application production-ready.

---

## Challenges Solved

- Managing asynchronous chat responses cleanly
- Handling loading and error states
- Securing AI API credentials
- Designing a responsive and scalable chat interface
- Separating UI logic from async business logic

---

## Future Improvements

- Horizontal scaling for concurrent users
- Chat history persistence using database storage
- Streaming AI responses (real-time token rendering)
- Authentication and user sessions
- Multi-conversation support
- Voice input/output integration
- Rate limiting and monitoring
- Redis caching for optimization

---

## Scalability Considerations

Future production scaling plans include:

- Stateless backend architecture
- Horizontal scaling with multiple backend instances
- Redis-based caching and session management
- Database persistence for conversations
- Queue systems for handling large AI request loads

---

## Learnings

- Real-world Redux Toolkit architecture
- Async workflow management using `createAsyncThunk`
- Secure backend proxy implementation
- Designing scalable frontend applications
- AI API orchestration and response handling

---

## Author

**Priyanshi Dabral**
