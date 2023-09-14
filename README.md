# Portfolio Showcase Project

Welcome to my portfolio showcase project! This project is a representation of my professional portfolio.

## Introduction

This is the server side of my project

Note that the jwt is disabled im make the api open at cors options to public

I will refactor the code soon

## Technologies and Tools

This project utilizes a range of technologies and tools, including:

- NodeJS
- TypeScript / missing some types /refactoring soon
- MongoDB (Local and Atlas)
- Docker
- Continuous Integration/Continuous Deployment (CI/CD) with OnRender
- Postman for testing
- JWT
- BCrypt
- Express

## API Routes

- `https://rbvc-profile-v2-server.onrender.com/createuser`: POST
- `https://rbvc-profile-v2-server.onrender.com/users`: GET / PUT / DELETE
- `https://rbvc-profile-v2-server.onrender.com/messages`: GET / POST / PUT / DELETE
- `https://rbvc-profile-v2-server.onrender.com/auth`: POST
- `https://rbvc-profile-v2-server.onrender.com/auth/refresh`: GET
- `https://rbvc-profile-v2-server.onrender.com/auth/logout`: POST

## The JSON format for New User: 

    {
        "firstName": " ",
        "lastName": " ",
        "email": " ",
        "phone": " ",
        "roles": " ",
        "password": " "
    },

roles can be: Admin / Visitor / Subscribed
firstName: at least 3 chars
lastName: at least 3 chars
email: xxxx@xxxx.xxx / xxxx@xxxx.xxx.xx - unique
phone: internacional format
password: min 8 chars, a: number, upper and low case and special char

## The JSON format for messages:

    {
        "user": " ",
        "title": " ",
        "message": " ",
    },

user: The id from previously created user: mongo String format (ex: 64cefc01fbffa3b6dcbdbc88)

## Future Plans

I'm planning to implement tests for this project. For this project for personal reasons I will do it after publishing (different from test first - the correct way):
- Architecture Testing
- End-to-End Testing
- Functional Testing

## Get in Touch

Im deploying the front end at https://rbvcprofile.netlify.app/ need to finish to work with back end, btw mvp up

I hope you enjoy exploring my portfolio showcase! Feel free to leave me a message.

Thank you!
