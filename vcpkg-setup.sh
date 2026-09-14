#!/bin/bash

# Check if vcpkg is already bootstrapped
if [ -f "./libs/vcpkg/vcpkg" ] || [ -f "./libs/vcpkg/vcpkg.exe" ]; then
    echo "vcpkg already bootstrapped, skipping bootstrap."
else
    ./libs/vcpkg/bootstrap-vcpkg.sh
fi

./libs/vcpkg/vcpkg install --triplet=wasm32-emscripten