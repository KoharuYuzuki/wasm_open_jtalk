#!/usr/bin/env bash
set -eu

HERE=$(cd $(dirname $0); pwd)

TOOL_DIR="$HERE/tools"
JS_DIR="$HERE/js"
EMSDK_DIR="$TOOL_DIR/emsdk"
OPEN_JTALK_DIR="$TOOL_DIR/open_jtalk"
HTS_ENGINE_API_DIR="$TOOL_DIR/hts_engine_API"

source "$EMSDK_DIR/emsdk_env.sh"

# libopenjtalk.aからwasm及びjsファイルを作成
# src/bin/open_jtalk.cをビルド
emcc "$OPEN_JTALK_DIR/src/bin/open_jtalk.c" \
  -O0 \
  -lnodefs.js \
  "$OPEN_JTALK_DIR/src/build/libopenjtalk.a" \
  "$HTS_ENGINE_API_DIR/src/build/lib/libhts_engine_API.a" \
	-I $OPEN_JTALK_DIR/src/jpcommon \
	-I $OPEN_JTALK_DIR/src/mecab/src \
	-I $OPEN_JTALK_DIR/src/mecab2njd \
	-I $OPEN_JTALK_DIR/src/njd \
	-I $OPEN_JTALK_DIR/src/njd2jpcommon \
	-I $OPEN_JTALK_DIR/src/njd_set_accent_phrase \
	-I $OPEN_JTALK_DIR/src/njd_set_accent_type \
	-I $OPEN_JTALK_DIR/src/njd_set_digit \
	-I $OPEN_JTALK_DIR/src/njd_set_long_vowel \
	-I $OPEN_JTALK_DIR/src/njd_set_pronunciation \
	-I $OPEN_JTALK_DIR/src/njd_set_unvoiced_vowel \
	-I $OPEN_JTALK_DIR/src/text2mecab \
  -I $HTS_ENGINE_API_DIR/lib \
  -I $HTS_ENGINE_API_DIR/include \
  -o "$JS_DIR/open_jtalk.js" \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s NODERAWFS=1
  # --embed-file "etc" \
