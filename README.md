# blss

Summary:
BLSS, "Beat the Landlord Scoring System", is a software for keeping socres for "beat the landlord" game. BL is called "dou4di4zhu3" in Chinese, which is very popular in mainland China.  
Commonly, people grab a pen and peice of paper to keep the score. I became inspired by my lasiness and erro-proned record keeping.

As I progressed through the project, when I was at GUI stage, I found myself trying hard to avoid using written words to convey information and error messages. I began to search for images and icons to better express my meanings.

From years of GUI design exprerience, allocating real estate to populate messages is a headaching and constant thing, not to mentioning the compound effect of internationalization or localization.

So I decided to using only images and icons for the GUI part of this project. This project is my proof-of-concept on "pictation GUI design".

Software requirements:
NodeJS(18) and MongoDB (Atlas or Community version).

Software used:
systems - nodejs, mongodb;
language - javascript, css;
GUI - html5, tailwindcss, pug;
nodejs modules/middelwares - express, mongoose, morgan, multer, dotenv,
design framework - mvc;
development tools - vscode, prettier, eslint, postcss;
deployment environment - aws ec2, linux, windows;

Installation:
"npm install"
This will install all the dependencies.

Running:
modify config.env to reflect your environment.
"npm run dev" as commond for development
"npm run prod" as command for production

Development(on windows):
"npm run debug" as command for debugging web app.
"npm run debug-prod" as command for debugging as in production environment
"npm run tailwind-watch" as command for tailwind watch
"npm run postcss" as command for postcssing the style.css file
