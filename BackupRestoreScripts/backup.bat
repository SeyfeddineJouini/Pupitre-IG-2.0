@echo off
for /f %%a in ('powershell -Command "Get-Date -Format 'yyyy-MM-dd-HHmm'"') do set TIMESTAMP=%%a

set BACKUP_DIR=C:\backups
set MONGO_URI="mongodb://localhost:27017"
set DB_NAME=BC
set UPLOADS_DIR=C:\Users\User157\Desktop\projet-Bilan-Carbone\server\node-js\uploads
set BACKUP_NAME=backup-%TIMESTAMP%
set MONGO_DUMP_PATH="C:\Users\User157\Documents\Outils de sauvegard-BilanCarbone\mongodb-database-tools-windows-x86_64-100.9.4\mongodb-database-tools-windows-x86_64-100.9.4\bin\mongodump.exe"

echo Creating backup directory if it does not exist...
if not exist "%BACKUP_DIR%" (
    mkdir "%BACKUP_DIR%"
    echo Created directory "%BACKUP_DIR%"
) else (
    echo Directory "%BACKUP_DIR%" already exists
)

echo Creating MongoDB dump...
%MONGO_DUMP_PATH% --uri=%MONGO_URI% --db=%DB_NAME% --out="%BACKUP_DIR%\%BACKUP_NAME%"
if errorlevel 1 (
    echo MongoDB dump failed.
    exit /b 1
)

if exist "%BACKUP_DIR%\%BACKUP_NAME%" (
    echo Copying uploaded files...
    xcopy "%UPLOADS_DIR%" "%BACKUP_DIR%\%BACKUP_NAME%\uploads" /E /I /Y
    if errorlevel 1 (
        echo Copying uploaded files failed.
        exit /b 1
    )

    echo Creating tar.gz archive...
    tar -czvf "%BACKUP_DIR%\%BACKUP_NAME%.tar.gz" -C "%BACKUP_DIR%" "%BACKUP_NAME%"
    if errorlevel 1 (
        echo Creating tar.gz archive failed.
        exit /b 1
    )
    echo Backup completed successfully.

    REM Retain only the last 4 backups
    echo Removing old backups, retaining only the last 4...
    for /F "skip=4 delims=" %%F in ('dir "%BACKUP_DIR%\backup-*.tar.gz" /B /O-D') do (
        del "%BACKUP_DIR%\%%F"
    )

    REM Remove old directories that are not among the latest 4 backups
    for /F "skip=4 delims=" %%D in ('dir "%BACKUP_DIR%\backup-*" /AD /B /O-D') do (
        rmdir /S /Q "%BACKUP_DIR%\%%D"
    )
) else (
    echo Backup directory "%BACKUP_DIR%\%BACKUP_NAME%" not found. Aborting.
    exit /b 1
)