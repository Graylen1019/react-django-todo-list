# Backend (Django) Documentation

This document describes the Django backend used by the project.

Project layout (relevant files)

- `backend/` — Django project folder
  - `manage.py` — Django management entrypoint
  - `backend/settings.py` — main settings file (database, JWT, CORS)
  - `backend/urls.py` — project URL router
  - `backend/wsgi.py`, `backend/asgi.py` — WSGI/ASGI entrypoints
- `backend/api/` — Django app providing the REST API
  - `models.py` — `Note` model
  - `serializers.py` — `UserSerializer`, `NoteSerializer`
  - `views.py` — class-based views for notes and user creation
  - `urls.py` — API routes for notes

Models

- Note
  - Fields: `title` (CharField, max 100), `content` (TextField), `created_at` (DateTimeField, auto_now_add=True), `author` (ForeignKey to `auth.User` with CASCADE and related_name `notes`).

Serializers

- `UserSerializer` — exposes `id`, `username`, and `password` (write-only). Implements `create()` to call `User.objects.create_user()` so passwords are hashed.
- `NoteSerializer` — exposes `id`, `title`, `content`, `created_at`, and `author`. `author` is read-only in the serializer.

Views / Endpoints

- `NoteListCreate` (ListCreateAPIView)
  - URL: `/api/notes/` (registered in `api/urls.py`)
  - Permissions: `IsAuthenticated`
  - Behavior: `GET` returns notes filtered to the current user; `POST` creates a note and sets `author` to the authenticated user.
- `NoteDelete` (DestroyAPIView)
  - URL: `/api/notes/delete/<int:pk>/`
  - Permissions: `IsAuthenticated`
  - Behavior: Deletes a note for the requesting user (queryset limited to user's notes).
- User creation is handled by `CreateUserView` (CreateAPIView) registered separately in project URLs for `/api/user/register/`.

Authentication

- The project uses JWT tokens via `djangorestframework-simplejwt`.
- Settings in `backend/settings.py` configure `REST_FRAMEWORK` to use `rest_framework_simplejwt.authentication.JWTAuthentication` as the default authentication class. Token lifetimes are set in `SIMPLE_JWT`.

Database

- The default database in development is SQLite (file `db.sqlite3`). `dj_database_url` is used, so a `DATABASE_URL` environment variable can be provided for PostgreSQL or other databases in production.

CORS and static files

- `CORS_ALLOW_ALL_ORIGINS` is set to `True` in settings for development convenience.
- Whitenoise is configured to serve static files when deployed.

Environment variables (used in `settings.py`)

- `DJANGO_SECRET_KEY` — overrides the default SECRET_KEY
- `DEBUG` — set to `True` or `False` (string `'True'` is interpreted as True)
- `RENDER_EXTERNAL_HOSTNAME` — used to populate `ALLOWED_HOSTS` on Render
- `DATABASE_URL` — optional database connection string parsed by `dj_database_url`

Running locally

1. Create and activate a venv and install the requirements from `backend/requirements.txt`.
2. Run migrations: `python manage.py migrate`.
3. Create a superuser (optional): `python manage.py createsuperuser`.
4. Run the server: `python manage.py runserver`.

Testing and migrations

- The migrations directory exists with an initial migration for the `Note` model.

Notes and potential improvements

- Consider adding API docs (Swagger/OpenAPI) with `drf-yasg` or `drf-spectacular`.
- Add unit tests for views/serializers and CI to run them.
- Tighten CORS/DEBUG settings for production and use environment-specific settings.
