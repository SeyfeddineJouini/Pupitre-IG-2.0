@echo off
set BACKUP_DIR=C:\backups
set MONGO_URI=mongodb://localhost:27017
set DB_NAME=BC
set UPLOADS_DIR=C:\Users\ing\Desktop\projet-Bilan-Carbone\server\node-js\uploads

REM Demander à l'utilisateur de saisir le nom de la sauvegarde
set /p BACKUP_NAME="Enter the backup name to restore (e.g., backup-2024-01-07-1543): "

set RESTORE_DIR=%BACKUP_DIR%\%BACKUP_NAME%

REM Vérifier si l'archive tar.gz existe
if not exist %BACKUP_DIR%\%BACKUP_NAME%.tar.gz (
    echo Backup file %BACKUP_DIR%\%BACKUP_NAME%.tar.gz not found. Aborting.
    pause
    exit /b 1
)

REM Extraire l'archive tar.gz
echo Extracting tar.gz archive...
tar -xzvf %BACKUP_DIR%\%BACKUP_NAME%.tar.gz -C %BACKUP_DIR%

REM Vérifier si le répertoire extrait existe
if not exist %RESTORE_DIR% (
    echo Extracted directory %RESTORE_DIR% not found. Aborting.
    pause
    exit /b 1
)

REM Restaurer la base de données MongoDB
echo Restoring MongoDB database...
"C:\Users\ing\Documents\Outils de sauvegard-BilanCarbone\mongodb-database-tools-windows-x86_64-100.9.4\mongodb-database-tools-windows-x86_64-100.9.4\bin\mongorestore.exe" --uri=%MONGO_URI% --db=%DB_NAME% %RESTORE_DIR%\BC --drop

REM Restaurer les fichiers uploadés
echo Restoring uploaded files...
if exist %RESTORE_DIR%\uploads (
    xcopy %RESTORE_DIR%\uploads %UPLOADS_DIR% /E /I /Y
    echo Uploaded files restored successfully.
) else (
    echo The uploads directory was not found in the backup.
)

echo Restoration completed successfully.
pause



@REM @echo off
@REM set TIMESTAMP=%date:~10,4%-%date:~7,2%
@REM set BACKUP_DIR=C:\backups
@REM set RESTORE_DIR=%BACKUP_DIR%\backup-%TIMESTAMP%
@REM set MONGO_URI=mongodb://localhost:27017
@REM set DB_NAME=BC
@REM set UPLOADS_DIR=C:\Users\ing\Desktop\projet-Bilan-Carbone\server\node-js\uploads

@REM REM Extraire l'archive tar.gz
@REM echo Extracting tar.gz archive...
@REM tar -xzvf %BACKUP_DIR%\backup-%TIMESTAMP%.tar.gz -C %BACKUP_DIR%

@REM REM Restaurer la base de données MongoDB
@REM echo Restoring MongoDB database...
@REM "C:\Users\ing\Documents\Outils de sauvegard-BilanCarbone\mongodb-database-tools-windows-x86_64-100.9.4\mongodb-database-tools-windows-x86_64-100.9.4\bin\mongorestore.exe" --uri=%MONGO_URI% --db=%DB_NAME% %RESTORE_DIR%\BC

@REM REM Restaurer les fichiers uploadés
@REM echo Restoring uploaded files...
@REM if exist %RESTORE_DIR%\uploads (
@REM     xcopy %RESTORE_DIR%\uploads %UPLOADS_DIR% /E /I /Y
@REM     echo Uploaded files restored successfully.
@REM ) else (
@REM     echo The uploads directory was not found in the backup.
@REM )

@REM echo Restoration completed successfully.
@REM pause
