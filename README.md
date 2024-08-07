# Movies App

## Introduction

This is a web page project dedicated to movies. It allows users to search for information about films, write reviews, rate movies, and share their opinions. The purpose of the site is to help visitors make more informed choices about what to watch.

## What Is Implemented

* User authentication (login and registration)
* Posting reviews and opinions, and rating movies (only for registered users)
* Searching for movies by title
* Filtering movies based on their genres
* A rating system that determines movie rating based on the scores given by users of the site

## Technologies

* Node.js
* Express
* MongoDB
* JWT
* Bcrypt
* Angular
* RxJS
* TypeScript

## How To Run

1. Clone the repository: `git clone https://github.com/przemyslawrutkowski/movies-app.git`
2. Navigate into the project directory: `cd movies-app`
3. Install required dependencies in each part of the project (backend, frontend):
    1. `cd project_part`
    2. `npm install`
    3. If `project_part` is backend, run the Typescript compiler: `npx tsc`
4. Create a .env file in the backend part and add the following configuration there:  
`MONGODB_URI = 'your_mongodb_uri_here'`  
`DB_NAME = 'your_database_name_here'`  
`PORT = your_port_here`  
`SECRET_KEY='your_secret_key_here'`  
5. Run the main script in the backend part: `node ./dist/index.js`
6. Build and serve the app in the frontend part: `ng serve`
7. Open `localhost:4200` in a browser