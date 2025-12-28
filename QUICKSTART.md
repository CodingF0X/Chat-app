# Quick Start Guide - Docker Deployment

This guide will help you quickly set up and run the Chat App using Docker.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)
- Git (to clone the repository)

## Quick Start (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CodingF0X/Chat-app.git
   cd Chat-app
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual AWS credentials and secrets
   nano .env
   ```

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

5. **View logs:**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

6. **Stop services:**
   ```bash
   docker-compose down
   ```

## Quick Start (Using Pre-built Images from GitHub Container Registry)

If the Docker images have been built and published via GitHub Actions:

1. **Pull the images:**
   ```bash
   docker pull ghcr.io/codingf0x/chat-app/backend:latest
   docker pull ghcr.io/codingf0x/chat-app/frontend:latest
   ```

2. **Run MongoDB:**
   ```bash
   docker run -d \
     --name chat-mongo \
     -p 27017:27017 \
     -v mongo-data:/data/db \
     mongo:latest
   ```

3. **Run Backend:**
   ```bash
   docker run -d \
     --name chat-backend \
     -p 3000:3000 \
     -e MONGODB_URI=mongodb://host.docker.internal:27017/chatapp \
     -e JWT_SECRET=your-secret-key \
     -e AWS_ACCESS_KEY_ID=your-aws-key \
     -e AWS_SECRET_ACCESS_KEY=your-aws-secret \
     -e S3_BUCKET_NAME=your-bucket \
     ghcr.io/codingf0x/chat-app/backend:latest
   ```
   
   **Note for Linux users:** Replace `host.docker.internal` with `172.17.0.1` (Docker bridge IP) or use `--network host` mode.
   
   ```bash
   # Alternative for Linux
   docker run -d \
     --name chat-backend \
     -p 3000:3000 \
     -e MONGODB_URI=mongodb://172.17.0.1:27017/chatapp \
     -e JWT_SECRET=your-secret-key \
     ghcr.io/codingf0x/chat-app/backend:latest
   ```

4. **Run Frontend:**
   ```bash
   docker run -d \
     --name chat-frontend \
     -p 80:80 \
     ghcr.io/codingf0x/chat-app/frontend:latest
   ```

## GitHub Actions - Automated Builds

The repository includes a GitHub Actions workflow that automatically:

1. Builds Docker images when you push to `main` or `develop` branches
2. Pushes images to GitHub Container Registry (GHCR)
3. Tags images appropriately

### How to trigger a build:

- **Push to main/develop:** Images are built and pushed automatically
- **Create a version tag:** `git tag v1.0.0 && git push origin v1.0.0`
- **Manual trigger:** Go to Actions tab in GitHub → Select workflow → Run workflow

### Access built images:

Images are available at:
- `ghcr.io/codingf0x/chat-app/backend:latest`
- `ghcr.io/codingf0x/chat-app/frontend:latest`

## Troubleshooting

### Services won't start
```bash
# Check service status
docker-compose ps

# View logs for errors
docker-compose logs
```

### Database connection issues
```bash
# Ensure MongoDB is running
docker-compose ps mongo

# Check MongoDB logs
docker-compose logs mongo
```

### Port already in use
```bash
# Find what's using the port
sudo lsof -i :3000  # For backend
sudo lsof -i :80    # For frontend

# Or change ports in docker-compose.yml
```

### Reset everything
```bash
# Stop and remove all containers, networks, and volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Next Steps

- Read [DOCKER.md](./DOCKER.md) for detailed documentation
- Configure AWS S3 for file uploads
- Set up proper JWT secrets for production
- Consider using Kubernetes for production deployment

## Support

For issues or questions:
- Create an issue on GitHub
- Check existing documentation in DOCKER.md
- Review Docker logs for error messages
