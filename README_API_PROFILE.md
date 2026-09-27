# Profile API integration

This version uses the real Swagger endpoints currently available on `https://frontend53.somee.com`.

## Implemented now

- `PATCH /api/user/profile`
  - `userId`
  - `userName`
  - `country`
  - `birthDate`
  - `aboutMe`
- `POST /api/user/changeEmail`
- `GET /api/user/confirmEmailChange`
- `PATCH /api/user/avatar` with `FormData`
- `GET /api/user` is used after login/app startup to resolve the real user ID and prevent `userId: 0`.

## Future backend fields

The profile UI still lets the user edit first name, last name, phone, city and birth place, but these fields are not sent to the current backend because the supplied Swagger does not expose endpoints for them. The code contains placeholder API methods for a future C# backend, but `saveProfile` does not call them yet.

All API calls use Axios and `async/await`.
