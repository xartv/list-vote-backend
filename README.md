## Description

Backend for **list-vote** project. 
Frontend you can find here https://github.com/xartv/list-vote-frontend

**The project idea** is shared lists with the ability for users to rate the items on the list. It's convenient for choosing weekend activities with a group of friends or selecting a movie for a family viewing. Everyone can add their suggestion to the list and vote for other options.

**Stack: Typescript + Node.js + NestJS + PostgreSQL + Prisma**

Demo api you can find here https://list-vote-backend-production.up.railway.app/api

## Installation and running

1. The project uses postgreSQL as a database, for the application to work you need to install it from the official website [postgresql.org](https://www.postgresql.org/)

2. After installation, create a database named **list-vote-db** (you can use any name, but in this case you will need to make changes to the .env file)

3. The next step is to download the project and install the dependencies
```bash
git clone https://github.com/xartv/list-vote-backend.git
```
```bash
cd list-vote-backend/
npm i
```
4. Create a .env file in the root of the project and copy the following code into it
```
DATABASE_URL="postgresql://user:password@localhost:5432/list-vote-db?schema=public"
JWT_SECRET="secret"
```
5. Instead of user and password in DATABASE_URL, substitute the database user data, you also need to make sure that the database was launched on port 5432 and if you previously created a database with a name different from **list-vote-db**, then you need to replace it
6. You are at the finish line, all that remains is migrate db using Prisma
```bash
npx prisma migrate dev --name init
```
7. Phew, that's it, you can launch the application 🏆
```bash
npm run start:dev
```
🐈 *For the full functioning of the entire project, it is recommended to also run the frontend application https://github.com/xartv/list-vote-frontend* 

