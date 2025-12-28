# Docker Deployment Guide

This guide explains how to build and deploy the Chat App using Docker and the automated GitHub Actions workflow.

## Overview

The Chat App consists of two main components:
- **Backend**: NestJS application (port 3000)
- **Frontend**: React application served by nginx (port 80)

Each component has its own Dockerfile for building optimized production images.

## GitHub Actions Workflow

The repository includes an automated workflow (`.github/workflows/docker-build-push.yml`) that:

1. **Builds Docker images** for both backend and frontend
2. **Pushes images** to GitHub Container Registry (ghcr.io)
3. **Tags images** appropriately based on the trigger:
   - `latest` tag for the default branch (main)
   - Branch name tags for branch pushes
   - Semantic version tags for version tags (v*.*.*)
   - PR tags for pull requests
   - SHA-based tags for all builds

### Triggering the Workflow

The workflow automatically runs on:
- Push to `main` or `develop` branches
- Creation of version tags (e.g., `v1.0.0`)
- Pull requests to `main` or `develop`
- Manual trigger via GitHub Actions UI

### Accessing Built Images

After the workflow completes, images are available at:
- Backend: `ghcr.io/codingf0x/chat-app/backend:latest`
- Frontend: `ghcr.io/codingf0x/chat-app/frontend:latest`

To pull and run the images:

```bash
# Pull images
docker pull ghcr.io/codingf0x/chat-app/backend:latest
docker pull ghcr.io/codingf0x/chat-app/frontend:latest

# Run backend
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://your-mongo-uri \
  -e JWT_SECRET=your-secret \
  ghcr.io/codingf0x/chat-app/backend:latest

# Run frontend
docker run -p 80:80 ghcr.io/codingf0x/chat-app/frontend:latest
```

## Local Docker Build

### Building Images Locally

To build the Docker images locally:

```bash
# Build backend image
cd backend
docker build -t chat-app-backend .

# Build frontend image
cd frontend
docker build -t chat-app-frontend .
```

### Running Locally with Docker

```bash
# Run backend
docker run -d \
  --name chat-backend \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://localhost:27017/chatapp \
  -e JWT_SECRET=your-secret-key \
  -e AWS_ACCESS_KEY_ID=your-aws-key \
  -e AWS_SECRET_ACCESS_KEY=your-aws-secret \
  -e S3_BUCKET_NAME=your-bucket \
  chat-app-backend

# Run frontend
docker run -d \
  --name chat-frontend \
  -p 80:80 \
  chat-app-frontend
```

## Docker Compose

For easier local development and testing, use the included `docker-compose.yml`:

```bash
# Copy environment variables template
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor

# Start all services (backend, frontend, and MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This deletes database data)
docker-compose down -v
```

The docker-compose setup includes:
- **MongoDB**: Database service with persistent volume
- **Backend**: NestJS application connected to MongoDB
- **Frontend**: React application served by nginx
- **Health checks**: All services have health checks configured
- **Automatic restart**: Services restart on failure

Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:3000
- MongoDB: localhost:27017

## Image Features

### Backend Image
- **Base**: node:20-slim (optimized for size)
- **Multi-stage build**: Separate build and production stages
- **Security**: Runs as non-root user (nestjs:nodejs)
- **Health check**: Built-in health check endpoint
- **Port**: 3000

### Frontend Image
- **Base Builder**: node:20-slim
- **Base Production**: nginx:alpine (minimal size)
- **Multi-stage build**: Build with Node, serve with nginx
- **SPA Support**: Configured for React Router
- **Health check**: nginx health check
- **Port**: 80

## Environment Variables

### Backend Required Variables:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `AWS_ACCESS_KEY_ID`: AWS credentials for S3
- `AWS_SECRET_ACCESS_KEY`: AWS credentials for S3
- `S3_BUCKET_NAME`: S3 bucket for file uploads
- `STAGE`: Environment stage (dev/prod)

### Frontend Configuration:
The frontend build includes the API endpoint configuration. Update the environment variables before building if needed.

## Troubleshooting

### Build Issues
- **Circular dependency**: The Dockerfiles automatically remove the circular `"backend": "file:"` and `"frontend": "file:"` dependencies from package.json
- **Network timeouts**: Use `--legacy-peer-deps` flag (already included in Dockerfiles)
- **Missing packages**: The build uses `npm install` without lock file to avoid corruption issues

### Runtime Issues
- **Backend won't start**: Check environment variables, especially `MONGODB_URI`
- **Frontend 404 errors**: nginx is configured for SPA routing, check browser console for API errors
- **Connection refused**: Ensure backend is accessible at the configured API endpoint

## Production Deployment

For production deployment:

1. **Use version tags** instead of `latest`:
   ```bash
   docker pull ghcr.io/codingf0x/chat-app/backend:v1.0.0
   ```

2. **Set proper environment variables** using secrets management

3. **Use orchestration** (Kubernetes, Docker Swarm, or ECS) for:
   - Auto-scaling
   - Load balancing
   - Health checks
   - Rolling updates

4. **Monitor logs**:
   ```bash
   docker logs -f chat-backend
   docker logs -f chat-frontend
   ```

## GitHub Container Registry Authentication

To push/pull from GHCR locally:

```bash
# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Pull private images
docker pull ghcr.io/codingf0x/chat-app/backend:latest
```

The GitHub Actions workflow uses `GITHUB_TOKEN` automatically, no manual configuration needed.
