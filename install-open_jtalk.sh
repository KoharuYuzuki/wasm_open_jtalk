#!/usr/bin/env bash
set -eu

HERE=$(cd $(dirname $0); pwd)

TOOL_DIR="$HERE/tools"
JS_DIR="$HERE/js"
ETC_DIR="$HERE/etc"
EMSDK_DIR="$TOOL_DIR/emsdk"
OPEN_JTALK_DIR="$TOOL_DIR/open_jtalk"
HTS_ENGINE_API_DIR="$TOOL_DIR/hts_engine_API"

mkdir -p "$TOOL_DIR"
mkdir -p "$JS_DIR"

if [ ! -d "$OPEN_JTALK_DIR" ]; then
    git clone https://github.com/r9y9/open_jtalk.git "$OPEN_JTALK_DIR"
fi

mkdir -p "$OPEN_JTALK_DIR/src/build"
cd "$OPEN_JTALK_DIR/src/build"

# emsdkのコマンドにPATHを通す
source "$EMSDK_DIR/emsdk_env.sh"

# libopenjtalk.aをsrc/buildに作成する
emcmake cmake -DCMAKE_BUILD_TYPE=Release \
       -DHTS_ENGINE_LIB=../../../hts_engine_API/lib \
       -DHTS_ENGINE_INCLUDE_DIR=../../../hts_engine_API/include ..
emmake make
