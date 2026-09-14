#!/bin/bash

# Check if emsdk already exists
if [ -f "emsdk/emsdk" ]; then
    echo "emsdk already exists, skipping clone."
    cd emsdk
    ./emsdk activate latest
    cd ..
else
    git clone https://github.com/emscripten-core/emsdk.git
    cd emsdk
    ./emsdk install latest
    ./emsdk activate latest
    cd ..
fi

# Source the environment
if [ -f "./emsdk/emsdk_env.sh" ]; then
    source ./emsdk/emsdk_env.sh
else
    echo "emsdk_env.sh not found. Please check emsdk installation."
    exit 1
fi