<h1 align="center">
  <br>
  🧠 PolyMind
  <br>
</h1>

<h4 align="center">A full-stack AI platform where you can generate text, images, videos, and music with multiple AI models.</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
 🇬🇧 English | <a href="./README_TR.md">🇹🇷 Türkçe</a>
</p>

---

## 📌 Features

- 🤖 **Multi-LLM Support** — Use Google Gemini, OpenAI GPT, DeepSeek, and Perplexity models from the same interface
- 🖼️ **Image Generation** — Generate images from text using AI
- 🎬 **Video Generation** — Produce video content from text
- 🎵 **Music Generation** — Create AI-powered music
- 🔮 **Prompt Wizard** — Automatic prompt enhancer for better results
- 💬 **Chat History** — All conversations are saved, model selection is preserved
- 💳 **Subscription System** — Payment infrastructure with Iyzipay integration
- 🔐 **JWT Authentication** — Secure user registration and login
- 📱 **Mobile Compatible** — Android app support via Capacitor

---

## 🏗️ Project Structure

```
PolyMind/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── pages/
│       │   ├── home/        # Main chat screen
│       │   ├── login/       # Login page
│       │   ├── register/    # Register page
│       │   ├── payment/     # Payment page
│       │   ├── image/       # Image generation
│       │   ├── video/       # Video generation
│       │   └── music/       # Music generation
│       ├── components/      # Reusable components
│       ├── context/         # React Context (global state)
│       └── router/          # React Router definitions
│
└── server/                  # Express.js backend
    └── src/
        ├── app.js           # Application entry point
        ├── routes/          # API routes
        │   ├── auth.route.js
        │   ├── chat.route.js
        │   └── payment.route.js
        ├── controllers/     # Business logic
        │   ├── auth/        # Register & login
        │   ├── chat/        # AI chat, media generation
        │   └── payment/     # Iyzipay payment processing
        ├── middlewares/
        │   ├── checkToken.js           # JWT verification
        │   └── checkSubscriptionDate.js # Subscription check
        ├── Models/
        │   ├── db.js                   # MongoDB connection
        │   └── schemas/
        │       ├── user.schema.js
        │       ├── chat.schema.js
        │       └── message.schema.js
        └── utils/
            ├── LLM/
            │   ├── gemini.js       # Google Gemini wrapper
            │   ├── gpt.js          # OpenAI GPT wrapper
            │   ├── deepseek.js     # DeepSeek wrapper
            │   └── perplexity.js   # Perplexity wrapper
            ├── generateImage.js
            ├── generateVideo.js
            ├── generateMusic.js
            ├── generateTitle.js
            ├── generateToken.js
            └── isValidEmail.js
```

---

## 🌐 API Endpoints

### 🔐 Auth — `/auth`

| Method | Endpoint         | Description                     | Auth |
|--------|------------------|---------------------------------|------|
| POST   | `/auth/register` | Register a new user             | ❌   |
| POST   | `/auth/login`    | User login (returns JWT)        | ❌   |
| GET    | `/auth/me`       | Get current user info           | ✅   |

### 💬 Chat — `/chat`

| Method | Endpoint                  | Description                                | Auth | Subscription |
|--------|---------------------------|--------------------------------------------|------|--------------|
| GET    | `/chat/`                  | Get chat list                              | ✅   | ❌           |
| GET    | `/chat/:chatID`           | Get chat history                           | ✅   | ❌           |
| POST   | `/chat/message`           | Send a new message (get LLM response)      | ✅   | ✅           |
| POST   | `/chat/select`            | Select model and save response             | ✅   | ✅           |
| POST   | `/chat/prompt`            | Enhance prompt with Prompt Wizard          | ✅   | ✅           |
| DELETE | `/chat/delete/:chatID`    | Delete a chat                              | ✅   | ❌           |
| POST   | `/chat/generate-image`    | Generate an image with AI                  | ✅   | ✅           |
| POST   | `/chat/generate-video`    | Generate a video with AI                   | ✅   | ✅           |
| POST   | `/chat/music`             | Generate music with AI                     | ✅   | ✅           |
| GET    | `/chat/music/:taskId`     | Query music generation status              | ✅   | ❌           |
| POST   | `/chat/music/callback`    | Music generation webhook callback          | ❌   | ❌           |

### 💳 Payment — `/payment`

| Method | Endpoint    | Description                  | Auth |
|--------|-------------|------------------------------|------|
| POST   | `/payment/` | Initiate payment via Iyzipay | ✅   |

> ✅ = required, ❌ = not required

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- API keys (Gemini, OpenAI, etc.)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/polymind.git
cd polymind
```

### 2. Backend Setup

```bash
cd server
npm install
```

Copy `.env.example` and rename it to `.env`:

```bash
cp .env.example .env
```

Fill in `.env` with your credentials:

```env
PORT=8084
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/polymind
SECRET_KEY=your_secret_key
IYZIPAY_API_URI=https://sandbox-api.iyzipay.com
IYZIPAY_API_KEY=iyzipay_api_key
GEMINI_API_KEY=gemini_api_key
OPENAI_API_KEY=openai_api_key
GEMINI_MODEL=gemini-2.5-flash
OPENAI_MODEL=gpt-5-nano-2025-08-07
DEEPSEEK_API_KEY=deepseek_api_key
DEEPSEEK_MODEL=deepseek-chat
PERPLEXITY_API_KEY=perplexity_api_key
PERPLEXITY_MODEL=sonet
POYO_API_KEY=poyo_api_key
```

Start the backend:

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The application runs on these addresses by default:
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:8084`

---

## 🛠️ Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | React 19, Vite, TailwindCSS 4, React Router 7       |
| Backend    | Node.js, Express 5, Mongoose                        |
| Database   | MongoDB                                             |
| AI Models  | Google Gemini, OpenAI GPT, DeepSeek, Perplexity     |
| Payment    | Iyzipay                                             |
| Auth       | JWT (jsonwebtoken), bcrypt                          |
| Mobile     | Capacitor (Android)                                 |
| Testing    | Jest, Supertest, Cypress                            |

---

## 📄 License

This project is licensed under the [ISC](./LICENSE) license.

---

## 📬 Contact

**Abdullah "daxer" Yirik**

Feel free to reach out for questions, suggestions, or collaboration:

- 🌐 Portfolio: [daxer.dev](https://daxer.dev)
- 📧 Email: [contact@daxer.dev](mailto:contact@daxer.dev)

---

<p align="center">⭐ If you like the project, don't forget to give it a star!</p>
