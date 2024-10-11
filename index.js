const express = require('express');
const bodyParser = require('body-parser');


const projectRoutes = require('./src/routes/projects-routes');
const userAuthRoutes = require('./src/routes/users-routes');
const userProjectsRoutes = require('./src/routes/user-project-routes');
const authorsRoutes = require('./src/routes/authors-routes');
const articlesRoutes = require('./src/routes/articles-routes')

const { createUsersTable } = require('./src/database/users-table');
const { createUserProjectsTable } = require('./src/database/user-project-table');
const { createProjectsTable } = require('./src/database/projects-tables');
const {createAuthorTable} = require('./src/database/authors-table');
const {createArticleTable} = require('./src/database/articles-table')

require('dotenv').config(); 

createUsersTable();
createProjectsTable();
createUserProjectsTable();
createAuthorTable();
createArticleTable();


const app = express();

app.use(bodyParser.json());

app.use('/user-projects', userProjectsRoutes);
app.use('/projects',projectRoutes);
app.use('/users',userAuthRoutes);
app.use('/authors',authorsRoutes);
app.use('/articles',articlesRoutes)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
