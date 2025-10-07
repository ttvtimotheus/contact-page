# Dockerizing Clarik Contact (Next.js)

This document explains how to build and run the Next.js app in Docker for local testing and production servers.

Build the image (PowerShell):

```powershell
# Build the image
docker build -t clarik-contact:latest .

# Run the container (map port 3000)
docker run -it --rm -p 3000:3000 --name clarik-contact clarik-contact:latest
```

Using docker-compose (PowerShell):

```powershell
docker compose up --build
```

Notes for production:
- This Dockerfile runs Next.js in production mode using `npm run build` and `npm run start`.
- Use an environment variable or a reverse proxy (NGINX, Traefik) in front of the container to manage TLS and routing.
- If you use a process manager or Kubernetes, prefer building the image in CI and deploying the image artifact.

Environment variables:
- PORT (default 3000)
- NODE_ENV should be set to `production`

Troubleshooting:
- If you see build errors, run `npm run build` locally to surface TypeScript/Next errors before building the image.