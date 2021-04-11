const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    "origin": "https://kodilla.com", //origin sets domains that we approve
    "methods": "GET,POST", //we allow only GET and POST methods
  }));

  

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});