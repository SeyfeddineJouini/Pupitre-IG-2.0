@echo off
for /f %%a in ('powershell -Command "Get-Date -Format 'yyyy-MM-dd-HHmm'"') do set TIMESTAMP=%%a

set BACKUP_DIR=C:\backups
set BACKUP_NAME=backup-%TIMESTAMP%

REM Transférer l'archive sur le serveur de l'université
"C:\Program Files (x86)\WinSCP\WinSCP.com" /command "open sftp://abdoulaye:GxV?Kqva3?HM27@194.254.165.157:22022" "put ""%BACKUP_DIR%\%BACKUP_NAME%.tar.gz"" /data/" "exit"
if errorlevel 1 (
    echo Upload failed.
    exit /b 1
)

REM Supprimer l'archive locale pour économiser de l'espace
del "%BACKUP_DIR%\%BACKUP_NAME%.tar.gz"
if errorlevel 1 (
    echo Deleting local backup file failed.
    exit /b 1
)

REM Remove old backups from the server, retaining only the last 4
echo Removing old backups from the server, retaining only the last 4...
"C:\Program Files (x86)\WinSCP\WinSCP.com" /command "open sftp://abdoulaye:GxV?Kqva3?HM27@194.254.165.157:22022" "cd /data/" "ls" "exit" | findstr /R "^backup-" | sort /R | more +4 | for /F "delims=" %%F in ('more +4') do (
    "C:\Program Files (x86)\WinSCP\WinSCP.com" /command "open sftp://abdoulaye:GxV?Kqva3?HM27@194.254.165.157:22022" "rm /data/%%F" "exit"
)