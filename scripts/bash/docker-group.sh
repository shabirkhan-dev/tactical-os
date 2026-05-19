#!/usr/bin/env bash
# Add current user to the docker group so you can run docker/compose without sudo.
# After running: log out and back in, or run: newgrp docker

set -e

if ! getent group docker >/dev/null 2>&1; then
    echo "Creating docker group..."
    sudo groupadd docker 2>/dev/null || true
fi

if groups "$USER" | grep -q '\bdocker\b'; then
    echo "User $USER is already in the docker group."
else
    echo "Adding $USER to the docker group..."
    sudo usermod -aG docker "$USER"
    echo "Done. Log out and back in, or run: newgrp docker"
    echo "Then run: docker compose up --build -d"
fi
