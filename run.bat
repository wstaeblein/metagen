:: Check if NodeJS is in the right version before running the program
@echo off
(node --version & echo.) >2 & (set /p ver=)<2

if NOT %ver:~1,2% == 18 (goto changenode) else (goto electron)

:changenode
nvm use 18
:: Espera 1 segundo para as mudanças ficarem disponíveis
timeout /t 1

:electron
npm run dev