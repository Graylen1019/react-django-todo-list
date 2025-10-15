# Frontend (React + Vite) Documentation

The frontend is a small React single-page application built with Vite. Key points:

Project layout (relevant files)

- `frontend/package.json` — scripts and dependencies
- `frontend/vite.config.js` — Vite configuration
- `frontend/src/`
  - `main.jsx` — app bootstrap (ReactDOM render)
  - `App.jsx` — route definitions and protected route wrapper usage
  - `api.js` — Axios instance configured with `VITE_API_URL` and an interceptor to attach the access token
  - `constants.js` — localStorage key constants (ACCESS_TOKEN, REFRESH_TOKEN)
  - `components/`
    - `form.jsx` — login/register form component used by `pages/login` and `pages/register`
    - `notes.jsx` — presentational `Note` component
    - `protected-routes.jsx` — route guard which validates tokens and uses refresh when needed
    - `loading-indicator.jsx` — simple loading UI
  - `pages/` — `home.jsx`, `login.jsx`, `register.jsx`, `not-found.jsx`
  - `styles/` — CSS files for components

Auth flow

- Login (`/login`) posts credentials to `/api/token/` and stores `access` and `refresh` tokens in localStorage.
- `ProtectedRoute` checks the access token expiration using `jwt-decode`. If expired, it sends the refresh token to `/api/token/refresh/` to obtain a new access token. If refresh fails, it redirects to `/register`.

API integration

- The Axios instance in `src/api.js` sets `baseURL` from `import.meta.env.VITE_API_URL` and injects `Authorization: Bearer <token>` header when `ACCESS_TOKEN` is present in localStorage.
- The `Home` page uses `api.get('/api/notes/')`, `api.post('/api/notes/')` and `api.delete('/api/notes/delete/:id/')` to list, create, and delete notes.

Scripts

- `npm run dev` — development server (Vite)
- `npm run build` — production build
- `npm run preview` — preview built assets locally

Environment

- The frontend expects `VITE_API_URL` to be set during development or build time, for example:

```powershell
$env:VITE_API_URL = 'http://127.0.0.1:8000'
npm run dev
```

Potential improvements

- Add better error handling and user-friendly UI for auth errors.
- Replace localStorage token handling with secure httpOnly cookies (requires backend changes).
- Add client-side validation on forms and a component library for consistent styling.
