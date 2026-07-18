#!/bin/bash

# --- "TRY / EXCEPT" GUARD: Check if Docker is running ---
echo "🔍 Checking Docker connection..."
if ! docker info >/dev/null 2>&1; then
    echo "❌ ERROR: Cannot connect to Docker!"
    echo "💡 Fix: Start Docker Desktop on Windows, or run 'sudo service docker start' in WSL."
    exit 1
fi

echo "🧹 Cleaning up any old containers..."  
docker rm -f docker-ci-dummy-app 2>/dev/null

echo "🔨 Building the Docker image..."  
# If the build fails, catch the error and exit
if ! docker build -t docker-ci-dummy-app:dev .; then
    echo "❌ BUILD FAILED: Fix the errors above and try again."
    exit 1
fi

echo "🚀 Starting docker-ci-dummy-app..."  
# If running the container fails, catch the error and exit
if ! docker run -d -p 8080:3000 --name docker-ci-dummy-app docker-ci-dummy-app:dev; then
    echo "❌ RUN FAILED: Could not start the container."
    exit 1
fi

echo "✅ docker-ci-dummy-app is now running!"  
echo "👉 Open your browser to: http://localhost:8080"  
echo "------------------------------------------------"

# Wait for input to kill the container  
while true; do  
    read -p "Type 'k' and press Enter to kill the server (or anything else to ignore): " input  
      
    if [ "$input" == "k" ]; then  
        echo "🛑 Stopping and removing docker-ci-dummy-app..."  
        docker rm -f docker-ci-dummy-app  
        echo "👋 All clean! Server stopped."  
        break  
    else  
        echo "👍 Keeping the server running."  
    fi  
done