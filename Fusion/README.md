# Fusion Deployment Guide

This project is a monorepo containing a React frontend (`client`) and an Express backend (`server`).

## Deploying to Vercel

The project is configured for a seamless deployment to Vercel using the provided `vercel.json` file.

### Prerequisites

1.  A [Vercel](https://vercel.com) account.
2.  The [Vercel CLI](https://vercel.com/docs/cli) installed (optional, but recommended).

### Steps to Deploy

#### 1. Push to GitHub/GitLab/Bitbucket
The easiest way to deploy is to push your code to a repository and link it to Vercel.

#### 2. Create a New Project on Vercel
- Go to the Vercel Dashboard and click "Add New" -> "Project".
- Select your repository.
- Vercel should automatically detect the `vercel.json` configuration.

#### 3. Configure Environment Variables
In the Vercel project settings, add the following environment variables:

**For the Backend (Server):**
- `OPENAI_API_KEY`: Your OpenAI API Key.
- `CLAUDE_API_KEY`: Your Anthropic API Key.
- `GEMINI_API_KEY`: Your Google Gemini API Key.
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
- `JWT_SECRET`: A secret string for signing JWT tokens.
- `CLIENT_URL`: The URL of your deployed site (or leave blank to use the default).

**For the Frontend (Client):**
- `REACT_APP_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID (must match the backend).

#### 4. Deploy
Click "Deploy". Vercel will build the React app and set up the Node.js serverless functions.

---

## Important Note: Database Persistence

This project currently uses **SQLite** for the database. 

**On Vercel, the filesystem is read-only (except for `/tmp`) and stateless.** 
- Any data saved to the database will be lost when the Vercel function "goes cold" or is redeployed.
- The `server/db.js` has been configured to use `/tmp/database.sqlite` when running on Vercel so that it works, but it **will not persist**.

### For Production Persistence:
We recommend migrating to a hosted database:
1.  **PostgreSQL**: Use [Supabase](https://supabase.com) or [Railway](https://railway.app).
2.  **Update `server/db.js`**: Change the Sequelize dialect to `postgres` and provide a connection string via an environment variable (e.g., `DATABASE_URL`).

---

## Local Development

1.  **Install dependencies**:
    ```bash
    # In the root
    cd client && npm install
    cd ../server && npm install
    ```

2.  **Start the server**:
    ```bash
    cd server
    npm start
    ```

3.  **Start the client**:
    ```bash
    cd client
    npm start
    ```
    The client is configured to proxy API requests to `http://localhost:3001`.
