# API Reference

Base path: the backend mounts API routes under `/api/`.

Authentication

- The API uses JWT tokens. Obtain tokens by POSTing to `/api/token/` with `username` and `password`.
- The response contains `access` and `refresh` tokens.
- To refresh the access token POST to `/api/token/refresh/` with `refresh` in the body.

Headers

- Include `Authorization: Bearer <access_token>` for authenticated endpoints.

Endpoints

- POST `/api/token/`
  - Request: `{ "username": "<username>", "password": "<password>" }`
  - Response: `{ "refresh": "<token>", "access": "<token>" }`

- POST `/api/token/refresh/`
  - Request: `{ "refresh": "<refresh_token>" }`
  - Response: `{ "access": "<new_access_token>" }`

- POST `/api/user/register/`
  - Creates a new user.
  - Request: `{ "username": "name", "password": "pass" }`
  - Response: serialized `User` object (id, username)

- GET `/api/notes/`
  - Auth required.
  - Returns a list of notes for the authenticated user.
  - Response example: `[{ "id": 1, "title": "Todo", "content": "...", "created_at": "2025-10-14T..Z", "author": 2 }]`

- POST `/api/notes/`
  - Auth required.
  - Request: `{ "title": "...", "content": "..." }` (author is set server-side)
  - Response: created note object (201)

- DELETE `/api/notes/delete/<id>/`
  - Auth required.
  - Deletes a note belonging to the authenticated user. Returns 204 on success.

Curl examples

- Login and store tokens (bash example):

```bash
curl -X POST http://127.0.0.1:8000/api/token/ -H "Content-Type: application/json" -d '{"username":"user","password":"pass"}'
```

- Use an access token to list notes:

```bash
curl -H "Authorization: Bearer <access>" http://127.0.0.1:8000/api/notes/
```

- Refresh token:

```bash
curl -X POST http://127.0.0.1:8000/api/token/refresh/ -H "Content-Type: application/json" -d '{"refresh":"<refresh>"}'
```

Notes

- The API intentionally limits note queries and deletions to resources owned by the authenticated user.
- Consider adding permissions tests and schema documentation (OpenAPI) in future work.
