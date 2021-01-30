require('express-async-errors')
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const app = express();
const server = http.createServer(app);
const path = require('path');

const routes = require('./src/routes');
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).send({ message: "Invalid JSON payload passed.", status: "error", data: null }); // Bad request
  }
  next();
});

app.use('/', routes())

server.listen(port, () => {
  console.log(`::: server listening on port ${port}. Open via http://localhost:${port}/`);
});

server.on('error', (error) => {
  console.log(`::> an error occurred in our server: \n ${error}`);
});


module.exports = app