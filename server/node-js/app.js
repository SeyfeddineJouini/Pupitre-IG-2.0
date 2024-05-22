const express = require('express');
const app = express();
const routes = require('./routes');
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "build"))); // put this line of code in app.js

app.use('/', routes);

app.listen(3000, () => {
  //console.log('Server is running on port 3000');
});