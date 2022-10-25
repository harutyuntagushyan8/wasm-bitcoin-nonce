#!/usr/bin/env bash
set -euo pipefail

# Sets up emsdk
cd emsdk/ \
&& ./emsdk install latest \
&& ./emsdk activate latest \
&& source emsdk_env.sh \
&& cd ../ \

# Run Cmake
mkdir build dist \
&& cd build \
&& emcmake cmake ../ \
&& make \
&& cd ../ \

# Run server
cd server \
node index.js
