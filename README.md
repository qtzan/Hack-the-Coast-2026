# BridgeCare - Hack the Coast 2026

BridgeCare is an AI-powered telehealth platform that enables patients to complete medical intakes through an AI chatbot, which doctors can then review and take action on (prescribe, advise, or schedule follow-ups).

## Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** (for the AI chat feature)

## Setup Instructions

### 1. Clone the Repository

**Mac/Linux:**
```bash
git clone https://github.com/YOUR_REPO/Hack-the-Coast-2026.git
cd Hack-the-Coast-2026
```

**Windows (Command Prompt or PowerShell):**
```cmd
git clone https://github.com/YOUR_REPO/Hack-the-Coast-2026.git
cd Hack-the-Coast-2026
```

### 2. Install Dependencies

**Mac/Linux:**
```bash
cd server && npm install && cd ../client && npm install && cd ..
```

**Windows:**
```cmd
cd server && npm install && cd ..\client && npm install && cd ..
```

### 3. Configure Environment Variables

Create or edit the file `server/.env`:

**Mac/Linux:**
```bash
echo "OPENAI_API_KEY=your-openai-api-key-here" > server/.env
```

**Windows (PowerShell):**
```powershell
Set-Content -Path server\.env -Value "OPENAI_API_KEY=your-openai-api-key-here"
```

**Windows (Command Prompt):**
```cmd
echo OPENAI_API_KEY=your-openai-api-key-here > server\.env
```

Replace `your-openai-api-key-here` with your actual OpenAI API key.

### 4. Start the Server

Open a terminal and run:

**Mac/Linux/Windows:**
```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001`.

### 5. Start the Client

Open a **second** terminal and run:

**Mac/Linux/Windows:**
```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`. Open this URL in your browser.

## Demo Accounts

| Role    | Email              | Password    |
|---------|--------------------|-------------|
| Patient | patient@demo.com   | patient123  |
| Doctor  | doctor@demo.com    | doctor123   |

## Doctor Registration Codes

To register as a doctor, you need a valid registration code. Available codes:

- `BRIDGE2026`
- `DOCTOR001`
- `DOCTOR002`
- `DOCTOR003`
- `MEDSTAFF01`

## Features

- **Patient Portal**: AI-powered medical intake chat, history, medication lookup, appointments, profile
- **Doctor Portal**: Dashboard with pending intakes, patient review, prescribe/advise/schedule actions, patient list
- **AI Chat**: Powered by OpenAI GPT-4o-mini with structured medical intake
- **Medication Database**: 100+ searchable medications with uses, side effects, and interactions
- **Authentication**: JWT-based auth with role-based access control

## Tech Stack

- **Frontend**: React 18, React Router v7, Tailwind CSS, Motion (animations), Lucide Icons
- **Backend**: Express.js, TypeScript, SQLite (better-sqlite3), OpenAI API
- **Auth**: JWT + bcryptjs

## Project Structure

```
Hack-the-Coast-2026/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── pages/           # Patient & Doctor portal pages
│       ├── components/      # Shared components
│       ├── context/         # Auth context
│       └── lib/             # API wrapper
├── server/                  # Express backend
│   └── src/
│       ├── routes/          # API routes
│       ├── db/              # Database schema & seed
│       ├── middleware/       # Auth middleware
│       └── services/        # OpenAI integration
├── medication.json          # Medication database
└── README.md
```

## Troubleshooting

- **Chat not working**: Make sure your OpenAI API key is set in `server/.env`
- **Server won't start**: Ensure Node.js v18+ is installed (`node --version`)
- **Port already in use**: Kill existing processes on ports 3001/5173 or change the port in the config
- **CORS errors**: Make sure the client is running on `http://localhost:5173`
