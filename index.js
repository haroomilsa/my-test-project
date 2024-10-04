const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user-routes');
const projectRoutes = require('./src/routes/project-routes');
const peopleRoutes = require('./src/routes/people-routes');
require('dotenv').config(); 


const app = express();

app.use(bodyParser.json());

app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
app.use('/peoples',peopleRoutes)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
