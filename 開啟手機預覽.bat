@echo off
cd /d "%~dp0"
echo.
echo 手機請開這個網址：
echo.
echo http://192.168.1.102:4173/
echo.
echo 請保持這個視窗開著；關掉視窗後手機就看不到頁面。
echo 如果 Windows 防火牆詢問，請允許私人網路。
echo.
node serve-local.mjs
pause
