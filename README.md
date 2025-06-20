# eBank Frontend

This project represents the **frontend** of the eBank application, developed using **React.js**.  
It provides a modern, responsive web interface allowing users (CLIENT and AGENT_GUICHET) to manage their banking operations efficiently.



## Technologies Used

- React.js (with Hooks)
- Tailwind CSS (responsive design)
- Axios (API calls)
- React Router DOM (page navigation)
- JWT (authentication and request security)



## Project Structure
src/
├── components/          → Reusable components (Header, Footer)
├── pages/               → Main pages (Login, Dashboards, Transfers, etc.)
├── App.jsx              → Route definitions and redirections
└── main.jsx             → Application entry point




---

## User Roles

### AGENT_GUICHET

- Add new clients  
- Create bank accounts  
- Secure access via JWT token  

### CLIENT

- Access personal dashboard  
- View account list and balances  
- Make transfers to other RIBs  
- View the 10 most recent transactions with pagination  
- Change password securely  


## Security

- JWT-based authentication (stored in `localStorage`)  
- Automatic redirection to `/login` if token is missing or expired  
- Role-based access control (`CLIENT` or `AGENT_GUICHET`)  


## Getting Started Locally

1. **Clone the repository**
   
   git clone https://github.com/Hibanj8/ebank_frontend



## Running the Project Locally

### Install dependencies

cd ebank-frontend
npm install

### Start the development server

npm run dev

### Open in browser

http://localhost:5173/

## Features Implemented

- ogin with JWT authentication
- Dashboard tailored to user role (CLIENT or AGENT)
- Client and account creation (AGENT only)
- View accounts, balances, and transaction history (CLIENT)
- Secure bank transfers
- Password update functionality


## Authors

This project was developed as part of an academic mini-project.

- 👨‍🎓 Salma El Hani & Hiba Naji
- 📅 June 2025

