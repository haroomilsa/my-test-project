const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user-routes');
const projectRoutes = require('./src/routes/project-routes');


const app = express();

app.use(bodyParser.json());

app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
