#!/bin/bash

set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ASSET_DIR="$ROOT_DIR/game-assets"
ASSET_ZIP="$ROOT_DIR/SRB2-Legacy-v2130-Full.zip"
ASSET_URL="https://github.com/srb2-preservation/srb2-legacy/releases/download/SRB2_release_2.1.30/SRB2-Legacy-v2130-Full.zip"

trap 'rm -f "$ASSET_ZIP"' EXIT

mkdir -p "$ASSET_DIR"
curl --fail --location --show-error --output "$ASSET_ZIP" "$ASSET_URL"
unzip -q -o "$ASSET_ZIP" -d "$ASSET_DIR"

# We only need the game resources so delete the binaries.

rm $ASSET_DIR/*.dll
rm $ASSET_DIR/*.exe