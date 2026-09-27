# Refactor v3

This version keeps the existing visual design and responsive CSS while improving the application architecture for a future ASP.NET Core API.

## Main changes

- Centralized browser storage access in `src/services/storage.js`.
- Moved demo authentication logic from `App.jsx` into `src/services/authService.js`.
- Added Redux selectors in `src/app/store/selectors.js`.
- Replaced the global Redux `subscribe()` persistence with action-scoped middleware. UI-only Redux changes no longer write all data to localStorage.
- Added separated API service modules for auth, users, friends, messages, photos, music and notes.
- Kept Axios configured with `VITE_API_URL` and Bearer-token support.
- Replaced page-level `alert()` calls with `react-toastify` notifications where appropriate.
- Preserved existing localStorage keys for the demo data.
- Kept the existing custom music player to avoid changing its visual behavior.

## Backend migration

When ASP.NET Core is ready, page-level localStorage operations can be replaced by the API service modules without redesigning the pages. The intended flow is:

React pages/components -> API services -> ASP.NET Core Web API -> database/storage.

The API paths are placeholders and can be aligned with the final Swagger contract.
