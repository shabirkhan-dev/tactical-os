#!/bin/bash
set -e

echo "Testing Rust API - Register"
curl -s -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}' | jq

echo -e "\nTesting Hono API - Register (for comparison)"
curl -s -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Hono User", "email": "hono@example.com", "password": "password123"}' | jq
