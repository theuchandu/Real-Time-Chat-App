# 💬 Real-Time Chat App

A modern, responsive real-time chat application built using **Laravel** (API backend) and **React** (frontend) with **Socket.IO / Laravel Echo** for live message streaming. This project demonstrates full-stack development with user authentication, message persistence, live typing indicators, and clean UI design.

## 🚀 Features

- 🔐 User authentication (Login/Register)
- 💬 Real-time messaging (no refresh)
- 🧠 Typing indicators
- 📄 Chat history with timestamps
- 📱 Responsive UI
- 👥 One-to-one and group chat support (coming soon)
- 📦 RESTful API built with Laravel
- ⚛️ Frontend built with React + Axios + TailwindCSS
- 🧪 Unit-tested backend (PHPUnit) and frontend (Jest)

## 🛠️ Tech Stack

**Frontend:**  
- React + Vite  
- TailwindCSS  
- Socket.IO-client  
- Axios

**Backend:**  
- Laravel 10.x  
- Laravel Echo + Pusher/Socket.IO  
- Sanctum / Passport (for API Auth)  
- MySQL

---

## 🖼️ Preview

![Chat Preview](./screenshots/chat-ui-preview.png)

*(You can upload your own screenshot in a `screenshots/` folder)*

---

## 🔧 Setup Instructions

### Backend (Laravel)
```bash
git clone https://github.com/yourusername/chat-backend-laravel.git
cd chat-backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
