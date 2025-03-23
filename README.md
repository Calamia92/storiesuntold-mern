# Stories Untold

> **Interactive, collaborative storytelling platform** built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🚀 Features

- **User authentication** (register / login) with JWT  
- **Profile management** (update username, email, password, delete account)  
- **Create, read, update & delete (CRUD) “stories”** (sessions)  
- **Contribute** text entries to a story by chapter  
- **Vote & unvote** on contributions (one vote per user)  
- **Comment** on contributions  
- **Tagging & search** stories by title, description or tags  
- **Role‑based access control** (only creators can edit/delete their own content)  

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Database | MongoDB (Mongoose ODM) |
| Backend | Node.js, Express, JWT, bcrypt |
| Frontend | React, React Router, Tailwind CSS |
| HTTP Client | Axios |

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ v16  
- npm or yarn  
- MongoDB (local or Atlas)

### Environment Variables

Create a `.env` file in the **backend** root:

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/stories-untold
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

And in the **frontend** root:

```ini
REACT_APP_API_URL=http://localhost:5000/api
```

### Installation

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Running Locally

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm start
```

Access the app at `http://localhost:3000`.

---

## 📂 Folder Structure

```
/backend
├── controllers/
├── middleware/
├── models/
├── routes/
├── app.js
└── server.js

/frontend
├── src/
│   ├── api/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   └── App.jsx
└── public/
```

---

## 📖 API Documentation

### Authentication

| Method | Route | Body | Description |
|--------|-------|------|-------------|
| POST | `/api/users/register` | `{ username, email, password }` | Register new user |
| POST | `/api/users/login` | `{ email, password }` | Login & get token |

### Users

| Method | Route | Body | Auth | Description |
|--------|-------|------|------|-------------|
| GET | `/api/users/me` | — | ✔️ | Get profile |
| PUT | `/api/users/:id` | `{ username, email, currentPassword, password? }` | ✔️ | Update profile |
| DELETE | `/api/users/:id` | — | ✔️ | Delete account |

### Sessions (Stories)

| Method | Route | Body | Auth | Description |
|--------|-------|------|------|-------------|
| GET | `/api/sessions` | — | ❌ | List all stories |
| GET | `/api/sessions/:id` | — | ❌ | Story detail (with contributions) |
| POST | `/api/sessions` | `{ titre, description, tags? }` | ✔️ | Create story |
| PUT | `/api/sessions/:id` | `{ titre, description, tags? }` | ✔️ | Update own story |
| DELETE | `/api/sessions/:id` | — | ✔️ | Delete own story |

### Contributions

| Method | Route | Body | Auth | Description |
|--------|-------|------|------|-------------|
| GET | `/api/contributions?sessionId=<id>` | — | ❌ | List contributions for story |
| GET | `/api/contributions?creator=<userId>` | — | ✔️ | List my contributions |
| POST | `/api/contributions` | `{ sessionId, chapitre, texte }` | ✔️ | Create contribution |
| PUT | `/api/contributions/:id` | `{ chapitre, texte }` | ✔️ | Edit own contribution |
| DELETE | `/api/contributions/:id` | — | ✔️ | Delete own contribution |
| POST | `/api/contributions/:id/vote` | — | ✔️ | Vote (increment) |
| POST | `/api/contributions/:id/unvote` | — | ✔️ | Remove vote |
| POST | `/api/contributions/:id/comment` | `{ texte }` | ✔️ | Add comment |

---

## 🎨 Frontend Routes

| Path | Component | Access |
|------|-----------|--------|
| `/` | Home | Public |
| `/stories` | Stories (list + search) | Public |
| `/stories/new` | CreateStory | Private |
| `/stories/:id` | StoryDetail | Public |
| `/stories/edit/:id` | EditStory | Private |
| `/contributions/new` | CreateContribution | Private |
| `/contributions/edit/:id` | EditContribution | Private |
| `/profile` | Profile | Private |
| `/edit-profile` | EditProfile | Private |
| `/login` | Login | Public |
| `/signup` | Signup | Public |

---

## ✅ Testing

Use Postman or Insomnia to hit the API endpoints under `http://localhost:5000/api`.

---

## 📄 License

MIT © Calamia92
