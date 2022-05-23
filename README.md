# Skipped API

This Node.js service use 
- Express.js framework
- MySQL database
- Sequelize ORM
```
npm install
npm run start --> on server
npm run dev --> for developer
```

## Database

The application connect to MySQL database using sequalize. The configuration of database added in 'models/index.js'.

```
var sequelize = new Sequelize('dbname', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});
```

## APIs

### Profile
1. GET ALL      `/profile`
1. GET By ID    `/profile/:id`
1. POST         `/profile`
1. PUT          `/profile/:id`
1. DELETE       `/profile/:id`
1. Find         `/profile/find`


### Job
1. GET ALL      `/job`
1. GET By ID    `/job/:id`
1. POST         `/job`
1. PUT          `/job/:id`
1. DELETE       `/job/:id`
1. Find         `/job/find`

### JobApplication
1. GET ALL      `/jobApplication`
1. GET By ID    `/jobApplication/:id`
1. POST         `/jobApplication`
1. PUT          `/jobApplication/:id`
1. DELETE       `/jobApplication/:id`
