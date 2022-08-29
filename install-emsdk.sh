#!/usr/bin/env bash
set -eu

HERE=$(cd $(dirname $0); pwd)

TOOL_DIR="$HERE/tools"
EMSDK_DIR="$TOOL_DIR/emsdk"

mkdir -p "$TOOL_DIR"
# Get the emsdk repo
if [ ! -d "$EMSDK_DIR" ]; then
    git clone https://github.com/emscripten-core/emsdk.git "$EMSDK_DIR"
fi
cd "$EMSDK_DIR"
./emsdk install latest
./emsdk activate latest
