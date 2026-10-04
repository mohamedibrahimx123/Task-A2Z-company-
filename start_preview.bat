@echo off
title A2Z Media - High-End Preview Server
echo Launching A2Z Media Showcase Experience on http://localhost:8080 ...
powershell -ExecutionPolicy Bypass -File "%~dp0start_server.ps1"
pause
