# BLSS

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


Using BLSS:

(Default page is the game list page, which showing all the games played by all players)

4 icons on the top of the page, "new game(landlord)", "game list(pair of aces)", "players", and "stats".  

![default](https://github.com/franxxu/blss/assets/109082755/8b513e23-259e-4fb9-8521-6a4eb8c5579e)

The first thing to do is to create players on the player page.


(Player page, which you can create, edit, and remove players, 3 players are required to play a game)

![users](https://github.com/franxxu/blss/assets/109082755/710b5ed0-6d9c-4ef7-ab92-fe7c50226519)

Lets create 4 players.

![users3](https://github.com/franxxu/blss/assets/109082755/5e797153-112d-4949-85c3-178e22c4dbf1)



We go to "new game" page to start a new game by click the first icon(landlord).

(New Game page, which you start a game)

Choose 3 players(first 3 players are selected by default) to start a new game.

![newgame2](https://github.com/franxxu/blss/assets/109082755/edca94ac-8e74-459e-aea2-f329c41c04a5)



Clicking the start button to go to "Play Game" page.

(Play Game page, which you record all rounds of a game)

The page is using table like interface with a "header row" and "control row" on the top of the table.
![playgame](https://github.com/franxxu/blss/assets/109082755/09614a16-7146-4174-b842-b101074263b7)

For "header row" and "control row", here are the descriptions of each column from left to right:

[round] - headher: number of each round;  control: submit button, to submit the round;

[badge] - headher: indicating whether the landlord of the game has won or not;  control: check if the landlord won the game, leave unchecked if the landlord lost the game;

[player] - headher: the score of player 1 through 3, negative score for lost and positive for won;  control: click if the player is the landlord;

[score]  - headher: base score of each game;  control: decrease or increase the base score, defaulted to 3;

[bomb]   - headher: number of bombs of each game;  control: decrease of increase the number of bombs happened in the game;

[spring] - headher: indicating a "spring" event for each game;  control: check if a "spring" event happened during the game, leave uncheck if not;

[landlord] - headher: showing the landload of each game;  control: remove button, to remove the round in case of error (a round needs to be selected by click on the row)

Also a "subtotal row" appears as the third row, which shows a subtotal of each column.  For landlord column, colors are used to group users.

A garbage bin icon on the to right is to delete the whole game.

The start time of the game is on the very top right.

![playegame2](https://github.com/franxxu/blss/assets/109082755/59f8eae2-63d8-4770-9ea2-2f11d6b04e47)


        




