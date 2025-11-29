# 🌿 PostPlanner

**PostPlanner** is a modern, full-stack content planning and scheduling app that allows users to **register, log in, create posts, view upcoming posts, get notifications**, and more — built using **React.js (frontend)** and **Node.js + Express + MongoDB (backend)**.

This project is designed with clean UI, strong client-side validation, and reusable components for scalability and collaboration.

---

## 🚀 Features

### 🔐 **Authentication**
- Secure **Register** and **Login** system with JWT-based authentication.
- Client-side validation (email format, password match, field completeness).
- Error and success messages for better UX.
- Authenticated users are redirected to their **Dashboard**.

### 🏠 **Dashboard**
- Displays **Upcoming Posts**, **Recent Notifications**, and user-specific data.
- Light green accent theme with modern card layout.
- Reusable `Footer` and `Navbar` components across all pages.
- Smooth spacing and consistent typography for a professional feel.

### 🗓️ **Upcoming Posts**
- Shows posts scheduled by the user.
- Light background shade (greenish tone from `#287379`) for visual hierarchy.
- Each post is shown inside a well-designed card layout.

### 🔔 **Recent Notifications**
- Displays latest alerts and system updates.
- Separated by appropriate spacing for readability.

### 🧩 **Reusable Components**
- `Footer` component imported and rendered on all pages.
- Consistent design system for all UI elements.

### 🎨 **Modern UI/UX**
- Responsive, mobile-first layout.
- Background images with subtle blur and opacity layers.
- Attractive login/register cards with clean, glassy effects.
- Google Sign-In button for future OAuth expansion.

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, TailwindCSS, Axios, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Token) |
| Styling | Tailwind CSS + custom theme colors |
| Icons | Lucide-react / SVG icons |

---


---

## ⚙️ Installation & Setup

### 🧩 **Step 1 — Clone the Repository**
```bash
git clone https://github.com/Bunny-code77/Login-System-with-LocalStorage-and-without-Models---Quiz-1.git
cd social_media_planner
npm install

Create a .env file inside the Server folder:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/socialmedia
JWT_SECRET=yourStrongSecretKeyHere

## *Run in terminal*
Start the backend server:
cd social_media_planner/server
node server.js

## Setup Frontend
cd social_media_planner
npm install
npm run dev

## Navigation Guide
|*Page*|	 |*Path*|	        |*Description*|
| Home       (Dashboard)	   /dashboard	Displays upcoming posts & notifications
| Register	/register	        New users can sign up
| Login     /login	        Existing users can log in
| Logout	-Clears          JWT token and redirects to login
| Backend    API	/api/auth/	Routes for login/register


## 🧑‍💻 Usage Workflow
1 Register a new account using name, email, and password.
2 Automatically redirected to the Login page.
3 Login with your credentials to access your Dashboard.
4 View Upcoming Posts and Recent Notifications.
5 Use navigation and footer to explore the app.
6 Logout or close session (token removed from localStorage).


##💡 Author
Project Lead: [zeemal Farooq, Aown Abbas]
Roll NUM: [23021519-121, 23021519-054]
Frontend: React + TailwindCSS
Backend: Node.js + Express + MongoDB
📧 Contact: zimbunny77@gmail.com