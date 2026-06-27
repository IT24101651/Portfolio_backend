# Paviththiran Portfolio Backend

Production-ready Node.js + Express.js + MongoDB backend for the portfolio site.

## Setup

1. Open this folder in a terminal.
2. Install dependencies:

```powershell
npm install
```

3. Copy `.env.example` to `.env` and fill in your real values.
4. Start the server:

```powershell
npm run dev
```

## Environment Variables

- `PORT`
- `NODE_ENV`
- `MONGO_URI`
- `CLIENT_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `PORTFOLIO_OWNER_EMAIL`
- `RESUME_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

## MongoDB URI Notes

- Use a real MongoDB connection string in `MONGO_URI`.
- If you are using MongoDB Atlas, make sure the cluster is reachable from your IP and that the username and password are correct.
- If the password contains reserved characters such as `:`, `@`, `/`, or `!`, percent-encode them before saving the URI.

## API Endpoints

### Public

- `POST /api/contact`
- `GET /api/projects`
- `GET /api/projects/:id`
- `GET /api/resume`
- `POST /api/visitor`
- `GET /api/health`

### Admin

- `POST /api/admin/login`
- `GET /api/admin/messages`
- `DELETE /api/admin/messages/:id`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`
- `GET /api/admin/analytics`

## Response Format

Successful responses use:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```
