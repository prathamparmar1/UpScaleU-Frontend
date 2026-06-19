# UpScaleU — AI-Powered Career Mentor Platform

> **"Students know they want a good job, but most don't know what skills they are missing, what to learn next, or how to reach their target role. UpScaleU bridges that gap."**

UpScaleU helps students and fresh graduates identify the right career path, analyze their skill gaps, and receive a personalized roadmap to become industry-ready — all powered by AI.

🌐 **Live Demo:** [upscaleu.vercel.app](https://upscaleu.vercel.app) &nbsp;|&nbsp; 📦 **Frontend Repo:** [UpScaleU-Frontend](https://github.com/prathamparmar1/UpScaleU-Frontend)

---

## 🧩 The Problem

- Students choose careers based on trends or peer influence, not fit
- No clarity on which role matches their actual interests and skills
- No visibility into what skills companies genuinely expect
- Career guidance is generic — not personalized to the individual

## ✅ How UpScaleU Solves It

### 1. Career Assessment Quiz
Users answer questions about their interests, existing skills, preferences, and career goals.

### 2. AI-Based Career Recommendation
The system analyzes quiz responses and recommends suitable career paths:
- Backend Developer
- Data Scientist
- AI/ML Engineer
- Cloud Engineer
- Cybersecurity Analyst

### 3. Skill Gap Analysis
Compares the user's current skills with what the target role actually requires.

**Example:**
| Current Skills | Target Role | Missing Skills |
|---|---|---|
| Python, SQL | AI Engineer | Machine Learning, Deep Learning, MLOps, Model Deployment |

### 4. Personalized Roadmap Generation
Generates a structured, month-by-month learning path tailored to the user.

```
Month 1 → Python Advanced, NumPy, Pandas
Month 2 → Machine Learning
Month 3 → Deep Learning
Month 4 → Projects & Deployment
```

### 5. Progress Tracking Dashboard
Users can track goals, completed skills, and career growth over time.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Django REST Framework |
| **Authentication** | JWT (JSON Web Tokens) |
| **Database** | PostgreSQL |
| **Frontend** | Next.js, Tailwind CSS |

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/prathamparmar1/UpScaleU-Backend.git
cd UpScaleU-Backend

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env
# Fill in your PostgreSQL credentials and secret key

# 5. Run migrations
python manage.py migrate

# 6. Start the development server
python manage.py runserver
```

---

## 🔑 Environment Variables

```env
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/upscaleu
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | User registration |
| POST | `/api/auth/login/` | JWT login |
| POST | `/api/quiz/submit/` | Submit assessment quiz |
| GET | `/api/career/recommendations/` | Get career recommendations |
| GET | `/api/roadmap/` | Get personalized roadmap |
| GET | `/api/dashboard/` | Progress tracking data |

---

## 📬 Contact

**Pratham Parmar** — [prathamparmar203@gmail.com](mailto:prathamparmar203@gmail.com) · [Portfolio](https://prathamparmar-portfolio.vercel.app/) · [LinkedIn](https://linkedin.com/in/prathamparmar1)
