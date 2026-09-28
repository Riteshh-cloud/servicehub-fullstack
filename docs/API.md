# ServiceHub API

Base URL: `/api`

## Authentication

### POST `/auth/register`
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "+91 9000000000"
}
```

### POST `/auth/login`
Returns a JWT token.

### GET `/auth/me`
Requires `Authorization: Bearer <token>`.

## Services

- `GET /services`
- `GET /services/:id`
- `GET /services/admin/all` — admin
- `POST /services` — admin
- `PUT /services/:id` — admin
- `DELETE /services/:id` — admin

## Bookings

- `POST /bookings`
- `GET /bookings/my`
- `GET /bookings/:id`
- `PATCH /bookings/:id/cancel`

## Admin

- `GET /admin/dashboard`
- `GET /admin/users`
- `GET /admin/bookings`
- `PATCH /admin/bookings/:id/status`
