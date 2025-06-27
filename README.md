# 💳 eBank Frontend

This is the frontend part of the **eBank application** — a modern web banking platform for managing clients, accounts, transfers, and transaction history.  
The frontend is built with **React** and communicates with the **Spring Boot backend** via secure RESTful APIs.

---

## 📦 Technologies Used

  - React 19
  - React Router DOM v7  
  - Axios  
  - Tailwind CSS  
  - Lucide Icons  
  - Vite (Build Tool)  
  - ESLint (Development)

---

## 🚀 Getting Started

Follow these instructions to set up and run the frontend locally.

### Prerequisites

Make sure you have:

- Node.js (v18 or higher)  
- npm or yarn installed

### Installation

Clone the repository:

```bash
git clone https://github.com/Hibanj8/ebank_frontend
cd ebank-frontend
```
Install dependencies:
npm install

### Configure the backend API base URL (if needed)
Edit src/api/axios.js or the environment file to set the correct backend URL (e.g., http://localhost:9090).

### Run the App Locally
Start the development server:

npm run dev
The application will run on: http://localhost:5173

### Authentication
JWT tokens received after login are stored and automatically sent in Authorization headers for protected routes using Axios interceptors.

### Features
  -Login system with role-based access
  -Client creation (agent)
  -Account creation
  -Dashboard with account details and recent transactions
  -New transfer (virement) functionality
  -Pagination of transactions
  -Secure communication with backend API

  ### Folder Structure
  src/
├── api/           → Axios instance and JWT setup
├── components/    → Reusable UI components
├── pages/         → Page components (Login, Dashboard, Virement, etc.)
├── routes/        → React Router config
├── App.jsx
├── main.jsx

### License
This project is for educational and demonstration purposes. Feel free to fork and adapt it for your own use
