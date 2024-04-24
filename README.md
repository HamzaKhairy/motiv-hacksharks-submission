# motiv
What's your Motiv? The Ultimate Sports Community for Athletes



# Front-end 

## How To Use
### Clone this repository
``` git clone <repository-url> ``` 
or use GitHub Desktop 

### Run the following in the repo to install and update required dependencies:
``` 
npm install
npx cap sync
npm i -g @ionic/cli
``` 

## Frequently used commands (Android could be replaced with ios)
- ``` ionic serve``` Spins up a development server that launches in your browser.
- ```npx cap open android/``` Opens the Android Studio project for Android development.
- ```ionic cap run android --livereload --external```  Runs the application in AS on an emulator with live reload.
- ```npm install @capacitor/xxxxx``` Installs a Capacitor plugin. Replace xxxxx with the specific plugin name.
- ```Ionic build``` Builds the Ionic project for deployment.
- ```npx cap sync``` Syncs web with Android and iOS projects and updates the native dependencies.
 
# API 

### Run the following in the repo to install required dependencies and libraries:
``` 
pip install -r requirements.txt
``` 

## We have two modes for development:
### - Local DB 

1- Download  [Postgresql](https://www.enterprisedb.com/postgresql-tutorial-resources-training-1?uuid=c7ba5619-2f80-49e6-8b3f-771e43cbdbfe&campaignId=Product_Trial_PostgreSQL_16)

2- Add the bin folder of PostgreSQL (e.g., C:\Program Files\PostgreSQL\16\bin) to the system PATH:
- Open "Environment Variables" (search for it in the Start menu)
- Under User variables, find "Path," click Edit
- Click New and add the path to the bin folder (e.g., "C:\Program Files\PostgreSQL\16\bin")

3- Open the cloned repo in your code editor, in the terminal:
- ```  psql -U postgres ``` Then input your PC password
- ```  CREATE DATABASE motiv_dev; ```  
- Navigate to Motiv.App.API\src\config\database.js and change the database configuration:
javascript as following:
```  
// Database configuration
const databaseConfig = {
  database: "motiv_dev",
  username: 'postgres',
  password: '<your device password>',
  host: 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
```  
4- Go back to the console, then run the DB: ```  node src/app.js ```  


### - Tembo DB
- Environment Variables: .env (Place in the root directory)
- Digital Certeficate file: ca.crt (Place in '...\\src\\config\\ca.crt')

``` 
npm start
``` 
Then you should see: "Connection has been established successfully"

