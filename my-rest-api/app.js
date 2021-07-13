const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require ("cors");

mongoose
.connect('mongodb://localhost/my_rest_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.use(cors())
app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);

const port = 4000;
http.listen(port, () => console.log(`Listening on port ${port}...`));