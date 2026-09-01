# Fusion Deployment Guide

This project is a monorepo containing a React frontend (`client`) and an Express backend (`server`).

## Deploying to Vercel

The project is configured for a seamless deployment to Vercel using the provided `vercel.json` file.

### Prerequisites

1.  A [Vercel](https://vercel.com) account.
2.  The [Vercel CLI](https://vercel.com/docs/cli) installed (optional, but recommended).



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
