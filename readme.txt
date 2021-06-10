Step 1: Before you start
	1. You have to download google cloud sdk installer: https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe
	2. Then install and sign in with your account
	3. Install nodejs in your machine
	
Step 2: Create service_account to use google vision
	1. Create a project in http://console.cloud.google.com/
	2. Then you have to create 1 service account on that project https://console.cloud.google.com/apis/credentials
	3. After create your service account, you have to create a key file to access that service account
	4. Download the key then add it to your running environment
	   For us we add it to nodejs .env file to access it from nodejs (GOOGLE_APPLICATION_CREDENTIALS=”YOUR KEY PATH”)
	   REMEMBER TO ADD EXACTLY THE KEY NAME: GOOGLE_APPLICATION_CREDENTIALS THAT GOOGLE LIB CAN AUTOMATICALY GET IT
	5. Then you have to serach google vision api on google console and enabled it
	   REMEMBER TO ENABLE BILLING BEFORE YOU USE THE API

Step 3: To run Program

	1. Update file .env and cypress.json -> change location of the service account to your service_account.json location 
	2. Run command:  npm install 
	   to install the neccessary in package.json file
	3. Run command: npm run cypress:open
	   to open cypress for the first time
	4. Copy file mousecontrol.js to folder: cypress/integration
	5. Run command: npm start
	   to start detection server
	6. Open new Terminal then run command: npm run cypress:open then choose mousecontrol.js in cypress windows
	   Remember to start detection server first then open cypress windows and start your test file