@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

REM Matar processos anteriores
echo 🔴 Limpando processos anteriores...
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM python.exe /T 2>nul
timeout /t 2 /nobreak

REM Deletar scripts extras
for %%A in (fixpath.bat install-deps.bat kill-node.bat main.bat run.bat setup.bat start-system.bat) do (
    if exist "%%A" del "%%A" /F /Q 2>nul
)

REM Executar main.py
echo.
SET PATH=C:\Program Files\nodejs;%PATH%
python main.py

pause
