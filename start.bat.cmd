@echo off
SETLOCAL

REM Démarrer le serveur Flask
echo Démarrage du serveur Flask...
cd server\flask
start "" /min cmd /k "python app.py"
cd ..\..

REM Démarrer le serveur Flask2
echo Démarrage du serveur Flask...
cd server\flask
start "" /min cmd /k "python app2.py"
cd ..\..

REM Démarrer le serveur
echo Démarrage du serveur...
cd server\node-js
start "" /min cmd /k "npm start"
cd ..\..

REM Démarrer le client
echo Démarrage du client...
cd client
start "" /min cmd /k "npm start"
cd ..

REM Attendre quelques secondes pour s'assurer que les serveurs sont lancés
timeout /t 10

REM Lancer Google Chrome en plein écran via PowerShell
echo Lancement du navigateur en mode plein écran...

REM Vérifier le chemin de Google Chrome
set "chrome_path=C:\Program Files\Google\Chrome\Application\chrome.exe"

if exist "%chrome_path%" (
    powershell -Command "Start-Process '%chrome_path%' -ArgumentList '--kiosk http://localhost:3000'"
) else (
    echo Google Chrome n'est pas installé à l'emplacement par défaut, utilisation de Microsoft Edge...
    start msedge --kiosk http://localhost:3000
)

ENDLOCAL



