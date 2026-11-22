#!/bin/zsh
# Çift tıklayınca oyunu başlatır ve sunucu ekranını tarayıcıda açar.
cd "$(dirname "$0")"
(sleep 1; open "http://localhost:3000/host") &
node server.js
