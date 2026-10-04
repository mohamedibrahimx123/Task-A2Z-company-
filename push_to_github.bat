@echo off
set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%PATH%"
cd /d "%~dp0"
cls
echo =========================================================================
echo   A2Z Media - Push to GitHub
echo   Repository: https://github.com/mohamedibrahimx123/Task-A2Z-company-.git
echo =========================================================================
echo.
echo Commits are ready. Pushing to GitHub...
echo.
echo Note: If asked for:
echo   Username: mohamedibrahimx123
echo   Password: Use your GitHub Personal Access Token (ghp_...)
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo =========================================================================
    echo   SUCCESS! All project files deployed to GitHub!
    echo   Repo: https://github.com/mohamedibrahimx123/Task-A2Z-company-
    echo =========================================================================
) else (
    echo.
    echo If authentication failed:
    echo 1. Open: https://github.com/settings/tokens
    echo 2. Generate a token with 'repo' checked.
    echo 3. Run this file again and paste your token as password.
)
echo.
pause
