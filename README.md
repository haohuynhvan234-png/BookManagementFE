# React + Vite

## API configuration

The frontend uses the Vite `/api` proxy during local development. Production
builds call the Railway API directly. To use another API server, create a
`.env.local` file from `.env.example` and set `VITE_API_URL` to the API base
URL, including `/api`.

For GitHub Pages, set `VITE_API_URL` in the GitHub Actions build environment:

```yaml
env:
	VITE_API_URL: https://bookmanagementapi-production-7272.up.railway.app/api
```

The API server must allow requests from the deployed GitHub Pages origin via
CORS.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
