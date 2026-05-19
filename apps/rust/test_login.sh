#!/bin/bash
set -e

echo "Testing Rust API - Login"
LOGIN_RES=$(curl -s -c cookie.txt -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}')
echo $LOGIN_RES | jq

echo -e "\nTesting Rust API - Me (using cookies)"
curl -s -b cookie.txt -X GET http://localhost:3002/auth/me | jq

echo -e "\nTesting Rust API - Sessions"
curl -s -b cookie.txt -X GET http://localhost:3002/auth/sessions | jq

echo -e "\nTesting Rust API - Logout"
curl -s -b cookie.txt -X POST http://localhost:3002/auth/logout | jq
