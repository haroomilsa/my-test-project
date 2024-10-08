const express = require('express');
const bodyParser = require('body-parser');

const projectRoutes = require('./src/routes/projects-routes');
const userAuthRoutes = require('./src/routes/users-routes');

require('dotenv').config(); 


const app = express();

app.use(bodyParser.json());


app.use('/projects',projectRoutes);
app.use('/user-auth',userAuthRoutes)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
