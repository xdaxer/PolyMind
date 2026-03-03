<h1 align="center">
  <br>
  🧠 PolyMind
  <br>
</h1>

<h4 align="center">Çoklu yapay zeka modelleriyle metin, görsel, video ve müzik üretebileceğiniz full-stack AI platformu.</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
 <a href="./README.md">🇬🇧 English</a> | 🇹🇷 Türkçe 
</p>

---

## 📌 Özellikler

- 🤖 **Çoklu LLM Desteği** — Google Gemini, OpenAI GPT, DeepSeek ve Perplexity modellerini aynı arayüzden kullanın
- 🖼️ **Görsel Üretimi** — Yapay zeka ile metinden görsel oluşturun
- 🎬 **Video Üretimi** — Metinden video içerik üretin
- 🎵 **Müzik Üretimi** — Yapay zeka destekli müzik oluşturun
- 🔮 **Prompt Wizard** — Daha iyi sonuçlar için otomatik prompt geliştirici
- 💬 **Sohbet Geçmişi** — Tüm konuşmalarınız kaydedilir ve model seçimi korunur
- 💳 **Abonelik Sistemi** — Iyzipay entegrasyonu ile ödeme altyapısı
- 🔐 **JWT Kimlik Doğrulama** — Güvenli kullanıcı kaydı ve girişi
- 📱 **Mobil Uyumlu** — Capacitor ile Android uygulama desteği

---

## 🏗️ Proje Yapısı

```
PolyMind/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── pages/
│       │   ├── home/        # Ana sohbet ekranı
│       │   ├── login/       # Giriş sayfası
│       │   ├── register/    # Kayıt sayfası
│       │   ├── payment/     # Ödeme sayfası
│       │   ├── image/       # Görsel üretim
│       │   ├── video/       # Video üretim
│       │   └── music/       # Müzik üretim
│       ├── components/      # Yeniden kullanılabilir bileşenler
│       ├── context/         # React Context (global state)
│       └── router/          # React Router tanımları
│
└── server/                  # Express.js backend
    └── src/
        ├── app.js           # Uygulama giriş noktası
        ├── routes/          # API rotaları
        │   ├── auth.route.js
        │   ├── chat.route.js
        │   └── payment.route.js
        ├── controllers/     # İş mantığı
        │   ├── auth/        # Kayıt & giriş
        │   ├── chat/        # AI sohbet, medya üretimi
        │   └── payment/     # Iyzipay ödeme işlemleri
        ├── middlewares/
        │   ├── checkToken.js           # JWT doğrulama
        │   └── checkSubscriptionDate.js # Abonelik kontrolü
        ├── Models/
        │   ├── db.js                   # MongoDB bağlantısı
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

| Method | Endpoint         | Açıklama                    | Auth |
|--------|------------------|-----------------------------|------|
| POST   | `/auth/register` | Yeni kullanıcı kaydı        | ❌   |
| POST   | `/auth/login`    | Kullanıcı girişi (JWT alır) | ❌   |
| GET    | `/auth/me`       | Aktif kullanıcı bilgisi     | ✅   |

### 💬 Chat — `/chat`

| Method | Endpoint                  | Açıklama                               | Auth | Abonelik |
|--------|---------------------------|----------------------------------------|------|----------|
| GET    | `/chat/`                  | Sohbet listesini getir                 | ✅   | ❌        |
| GET    | `/chat/:chatID`           | Sohbet geçmişini getir                 | ✅   | ❌        |
| POST   | `/chat/message`           | Yeni mesaj gönder (LLM yanıtı al)      | ✅   | ✅        |
| POST   | `/chat/select`            | Model seç ve yanıtı kaydet             | ✅   | ✅        |
| POST   | `/chat/prompt`            | Prompt Wizard ile prompt geliştir      | ✅   | ✅        |
| DELETE | `/chat/delete/:chatID`    | Sohbeti sil                            | ✅   | ❌        |
| POST   | `/chat/generate-image`    | Yapay zeka ile görsel üret             | ✅   | ✅        |
| POST   | `/chat/generate-video`    | Yapay zeka ile video üret              | ✅   | ✅        |
| POST   | `/chat/music`             | Yapay zeka ile müzik üret              | ✅   | ✅        |
| GET    | `/chat/music/:taskId`     | Müzik üretim durumunu sorgula          | ✅   | ❌        |
| POST   | `/chat/music/callback`    | Müzik üretim webhook callback          | ❌   | ❌        |

### 💳 Payment — `/payment`

| Method | Endpoint    | Açıklama                    | Auth |
|--------|-------------|-----------------------------|------|
| POST   | `/payment/` | Iyzipay ile ödeme başlat    | ✅   |

> ✅ = gerekli, ❌ = gerekli değil

---

## ⚡ Hızlı Başlangıç

### Gereksinimler

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local veya Atlas)
- API anahtarları (Gemini, OpenAI, vb.)

### 1. Repoyu Klonla

```bash
git clone https://github.com/kullanici-adiniz/polymind.git
cd polymind
```

### 2. Backend Kurulumu

```bash
cd server
npm install
```

`.env.example` dosyasını kopyalayıp `.env` olarak düzenle:

```bash
cp .env.example .env
```

`.env` dosyasını kendi bilgilerinle doldur:

```env
PORT=8084
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/polymind
SECRET_KEY=gizli_anahtar_buraya
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

Backend'i başlat:

```bash
# Geliştirme modu (nodemon ile)
npm run dev

# Production modu
npm start
```

### 3. Frontend Kurulumu

```bash
cd client
npm install
npm run dev
```

Uygulama varsayılan olarak şu adreslerde çalışır:
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:8084`

---

## 🛠️ Teknoloji Yığını

| Katman      | Teknoloji                                          |
|-------------|-----------------------------------------------------|
| Frontend    | React 19, Vite, TailwindCSS 4, React Router 7       |
| Backend     | Node.js, Express 5, Mongoose                        |
| Veritabanı  | MongoDB                                             |
| AI Modeller | Google Gemini, OpenAI GPT, DeepSeek, Perplexity     |
| Ödeme       | Iyzipay                                             |
| Auth        | JWT (jsonwebtoken), bcrypt                          |
| Mobil       | Capacitor (Android)                                 |
| Test        | Jest, Supertest, Cypress                            |

---

## 📄 Lisans

Bu proje [ISC](./LICENSE) lisansı ile lisanslanmıştır.

---

## 📬 İletişim

**Abdullah "daxer" Yirik**

Proje hakkında soru, öneri veya iş birliği için iletişime geçebilirsiniz:

- 🌐 Portfolio Sayfam: [daxer.dev](https://daxer.dev)
- 📧 E-posta: [contact@daxer.dev](mailto:contact@daxer.dev)

---

<p align="center">⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!</p>
