1. Update file .env -> change location of the service account to your service account location 
2. Run command:  npm install 
   to install the neccessary in package.json file
3. Run command: npm run cypress:open
   to open cypress for the first time
4. Copy file mousecontrol.js to folder: cypress/integration
5. Run command: npm start
   to start detection server
6. Open new Terminal then run command: npm run cypress:open then choose mousecontrol.js in cypress windows

Remember to start detection server first then open cypress windows and start your test file